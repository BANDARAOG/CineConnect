// PayHere Payment Integration
// Handles payment processing for sponsorships

import axios from 'axios';
import { updateApplicationStatus } from './db';

const PAYHEREAPI_URL = process.env.PAYHEREAPI_URL || 'https://sandbox.payhere.lk/api/v2';
const MERCHANT_ID = process.env.PAYHERE_MERCHANT_ID;
const MERCHANT_SECRET = process.env.PAYHERE_MERCHANT_SECRET;

export interface PaymentRequest {
  applicationId: string;
  amount: number;
  currency: string;
  customerEmail: string;
  customerPhone: string;
  customerName: string;
  returnUrl: string;
  notifyUrl: string;
}

export interface PaymentResponse {
  success: boolean;
  paymentId?: string;
  paymentUrl?: string;
  error?: string;
}

// Create payment order with PayHere
export const createPaymentOrder = async (
  paymentRequest: PaymentRequest
): Promise<PaymentResponse> => {
  try {
    if (!MERCHANT_ID || !MERCHANT_SECRET) {
      return {
        success: false,
        error: 'PayHere configuration missing',
      };
    }

    // Prepare payment data
    const paymentData = {
      return_url: paymentRequest.returnUrl,
      cancel_url: paymentRequest.returnUrl,
      notify_url: paymentRequest.notifyUrl,
      order_id: paymentRequest.applicationId,
      items: `CineConnect Sponsorship - Application ${paymentRequest.applicationId}`,
      amount: paymentRequest.amount,
      currency: paymentRequest.currency || 'LKR',
      first_name: paymentRequest.customerName,
      last_name: '',
      email: paymentRequest.customerEmail,
      phone: paymentRequest.customerPhone,
      address: '',
      city: '',
      country: 'LK',
    };

    // Call PayHere API
    const response = await axios.post(
      `${PAYHEREAPI_URL}/checkout/initiate`,
      paymentData,
      {
        headers: {
          Authorization: `Basic ${Buffer.from(
            `${MERCHANT_ID}:${MERCHANT_SECRET}`
          ).toString('base64')}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.data.success) {
      return {
        success: true,
        paymentId: response.data.payment_id,
        paymentUrl: response.data.payment_url,
      };
    } else {
      return {
        success: false,
        error: response.data.msg || 'Payment initiation failed',
      };
    }
  } catch (error: any) {
    console.error('PayHere API error:', error.message);
    return {
      success: false,
      error: error.message || 'Payment processing error',
    };
  }
};

// Verify payment with PayHere
export const verifyPayment = async (paymentId: string): Promise<boolean> => {
  try {
    if (!MERCHANT_ID || !MERCHANT_SECRET) {
      return false;
    }

    const response = await axios.get(
      `${PAYHEREAPI_URL}/payment/search/payment_id/${paymentId}`,
      {
        headers: {
          Authorization: `Basic ${Buffer.from(
            `${MERCHANT_ID}:${MERCHANT_SECRET}`
          ).toString('base64')}`,
        },
      }
    );

    if (response.data.success && response.data.data.length > 0) {
      const payment = response.data.data[0];
      return payment.status === '2'; // '2' = Completed
    }

    return false;
  } catch (error: any) {
    console.error('PayHere verification error:', error.message);
    return false;
  }
};

// Handle PayHere webhook (called by PayHere after payment)
export const handlePaymentWebhook = async (webhookData: any) => {
  try {
    const {
      merchant_id,
      order_id: applicationId,
      payment_id: paymentId,
      status,
      amount,
      currency,
    } = webhookData;

    // Verify merchant ID
    if (merchant_id !== MERCHANT_ID) {
      return { success: false, error: 'Invalid merchant' };
    }

    // Status codes: 2 = Completed, 0 = Pending, -1 = Failed, -2 = Cancelled
    if (status === '2') {
      // Payment successful
      const result = await updateApplicationStatus(applicationId, 'approved', {
        paymentStatus: 'paid',
        paymentId: paymentId,
        paidAmount: amount,
        paidCurrency: currency,
      });

      return result;
    } else if (status === '-1' || status === '-2') {
      // Payment failed or cancelled
      const result = await updateApplicationStatus(applicationId, 'rejected', {
        paymentStatus: 'failed',
        paymentId: paymentId,
      });

      return result;
    }

    return { success: true };
  } catch (error: any) {
    console.error('Webhook handling error:', error);
    return { success: false, error: error.message };
  }
};

// Get payment status
export const getPaymentStatus = async (paymentId: string) => {
  try {
    if (!MERCHANT_ID || !MERCHANT_SECRET) {
      return { success: false, error: 'Configuration missing' };
    }

    const response = await axios.get(
      `${PAYHEREAPI_URL}/payment/search/payment_id/${paymentId}`,
      {
        headers: {
          Authorization: `Basic ${Buffer.from(
            `${MERCHANT_ID}:${MERCHANT_SECRET}`
          ).toString('base64')}`,
        },
      }
    );

    if (response.data.success && response.data.data.length > 0) {
      const payment = response.data.data[0];
      return {
        success: true,
        status: getStatusString(payment.status),
        amount: payment.amount,
        currency: payment.currency,
        updatedAt: payment.created_at,
      };
    }

    return { success: false, error: 'Payment not found' };
  } catch (error: any) {
    console.error('Get payment status error:', error);
    return { success: false, error: error.message };
  }
};

// Helper function to convert PayHere status codes to strings
const getStatusString = (status: string): string => {
  const statusMap: { [key: string]: string } = {
    '2': 'completed',
    '0': 'pending',
    '-1': 'failed',
    '-2': 'cancelled',
  };
  return statusMap[status] || 'unknown';
};
