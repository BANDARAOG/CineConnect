// GET /api/applications - Get applications (sponsor or filmmaker)
// POST /api/applications - Submit sponsorship application

import { NextRequest, NextResponse } from 'next/server';
import {
  createApplication,
  getSponsorApplications,
  getProjectApplications,
  updateApplicationStatus,
} from '@/lib/db';
import { SponsorshipApplication } from '@/types';

/**
 * GET /api/applications
 * Query params: userId (required), projectId (optional), role (optional)
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get('userId');
    const projectId = searchParams.get('projectId');
    const role = searchParams.get('role'); // 'sponsor' or 'filmmaker'

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'userId is required' },
        { status: 400 }
      );
    }

    let result;
    if (projectId) {
      // Get applications for a specific project
      result = await getProjectApplications(projectId);
    } else if (role === 'sponsor') {
      // Get sponsor's applications
      result = await getSponsorApplications(userId);
    } else {
      return NextResponse.json(
        { success: false, error: 'Invalid query parameters' },
        { status: 400 }
      );
    }

    if (result.success) {
      return NextResponse.json(
        { 
          success: true, 
          applications: result.applications,
          count: result.applications?.length || 0
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      );
    }
  } catch (error: any) {
    console.error('Get applications error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch applications' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/applications
 * Submit a new sponsorship application
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { projectId, sponsorId, sponsorshipPackageId, amount } = body;

    // Validate required fields
    const requiredFields = ['projectId', 'sponsorId', 'sponsorshipPackageId', 'amount'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Validate amount
    if (typeof amount !== 'number' || amount <= 0) {
      return NextResponse.json(
        { success: false, error: 'Amount must be a positive number' },
        { status: 400 }
      );
    }

    // Create application data
    const applicationData: Omit<SponsorshipApplication, 'id'> = {
      projectId,
      sponsorId,
      sponsorshipPackageId,
      status: 'pending',
      amount,
      applicationDate: new Date(),
      paymentStatus: 'pending',
      responseDate: undefined,
      agreementUrl: undefined
    };

    const result = await createApplication(applicationData);

    if (result.success) {
      return NextResponse.json(
        {
          success: true,
          applicationId: result.applicationId,
          message: 'Application submitted successfully'
        },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      );
    }
  } catch (error: any) {
    console.error('Create application error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create application' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/applications/:id
 * Update application status
 */
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { applicationId, status } = body;

    // Validate required fields
    if (!applicationId || !status) {
      return NextResponse.json(
        { success: false, error: 'applicationId and status are required' },
        { status: 400 }
      );
    }

    // Validate status
    const validStatuses = ['pending', 'accepted', 'rejected', 'completed'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { success: false, error: 'Invalid application status' },
        { status: 400 }
      );
    }

    const result = await updateApplicationStatus(applicationId, status, new Date());

    if (result.success) {
      return NextResponse.json(
        { success: true, message: 'Application updated successfully' },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      );
    }
  } catch (error: any) {
    console.error('Update application error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update application' },
      { status: 500 }
    );
  }
}
