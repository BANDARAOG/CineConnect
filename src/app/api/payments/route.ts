// POST /api/payments - Create payment order
// GET /api/payments - Get payment status
// POST /api/payments/webhook - PayHere webhook handler

import { NextRequest, NextResponse } from 'next/server';
import {
  createPaymentOrder,
  getPaymentStatus,
  verifyPayment,
  handlePaymentWebhook,
} from '@/lib/payments';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      applicationId,
      amount,
      customerEmail,
      customerPhone,
      customerName,
      returnUrl,
      notifyUrl,
    } = body;

    // Validation: Required fields check
    const requiredFields = ['applicationId', 'amount', 'customerEmail', 'customerName'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          {
            success: false,
            error: `${field} is required`,
          },
          { status: 400 }
        );
      }
    }

    // Validation: applicationId should be non-empty string
    if (typeof applicationId !== 'string' || applicationId.trim() === '') {
      return NextResponse.json(
        { success: false, error: 'applicationId must be a non-empty string' },
        { status: 400 }
      );
    }

    // Validation: Amount must be a positive number
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      return NextResponse.json(
        { success: false, error: 'amount must be a positive number' },
        { status: 400 }
      );
    }

    // Validation: Amount must be reasonable (not exceeding 999,999.99 LKR)
    if (parsedAmount > 999999.99) {
      return NextResponse.json(
        { success: false, error: 'amount exceeds maximum allowed value' },
        { status: 400 }
      );
    }

    // Validation: Email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(customerEmail)) {
      return NextResponse.json(
        { success: false, error: 'customerEmail must be a valid email address' },
        { status: 400 }
      );
    }

    // Validation: Customer name should be non-empty
    if (typeof customerName !== 'string' || customerName.trim() === '') {
      return NextResponse.json(
        { success: false, error: 'customerName must be a non-empty string' },
        { status: 400 }
      );
    }

    // Validation: Phone format if provided
    if (customerPhone && !/^[0-9+\-\s()]+$/.test(customerPhone)) {
      return NextResponse.json(
        { success: false, error: 'customerPhone format is invalid' },
        { status: 400 }
      );
    }

    const result = await createPaymentOrder({
      applicationId: applicationId.trim(),
      amount: parsedAmount,
      currency: 'LKR',
      customerEmail: customerEmail.trim(),
      customerPhone: customerPhone?.trim() || '',
      customerName: customerName.trim(),
      returnUrl: returnUrl || `${process.env.NEXT_PUBLIC_APP_URL}/payment/return`,
      notifyUrl: notifyUrl || `${process.env.NEXT_PUBLIC_APP_URL}/api/payments/webhook`,
    });

    if (result.success) {
      return NextResponse.json(
        {
          success: true,
          message: 'Payment order created successfully',
          paymentId: result.paymentId,
          paymentUrl: result.paymentUrl,
          applicationId: applicationId.trim(),
        },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        { success: false, error: result.error || 'Failed to create payment order' },
        { status: 400 }
      );
    }
  } catch (error: any) {
    console.error('Create payment error:', error);
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { success: false, error: 'Invalid JSON in request body' },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const paymentId = searchParams.get('paymentId');
    const applicationId = searchParams.get('applicationId');

    // Validation: At least one identifier is required
    if ((!paymentId || paymentId.trim() === '') && (!applicationId || applicationId.trim() === '')) {
      return NextResponse.json(
        { success: false, error: 'paymentId or applicationId is required' },
        { status: 400 }
      );
    }

    let result;
    if (paymentId && paymentId.trim() !== '') {
      // Get status by payment ID
      result = await getPaymentStatus(paymentId.trim());
    } else {
      // For application ID, we would need to query the database first
      // For now, we return an error indicating paymentId is needed
      return NextResponse.json(
        { success: false, error: 'paymentId is required for status lookup' },
        { status: 400 }
      );
    }

    if (result.success) {
      return NextResponse.json(
        {
          success: true,
          paymentStatus: result.status,
          amount: result.amount,
          currency: result.currency,
          lastUpdated: result.updatedAt,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { success: false, error: result.error || 'Payment not found' },
        { status: 404 }
      );
    }
  } catch (error: any) {
    console.error('Get payment status error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
