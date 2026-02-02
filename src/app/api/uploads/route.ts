// POST /api/uploads - Upload files
// DELETE /api/uploads - Delete uploaded files

import { NextRequest, NextResponse } from 'next/server';
import {
  uploadProfileImage,
  uploadProjectFile,
  uploadAgreement,
  deleteFile,
} from '@/lib/storage';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const uploadType = formData.get('type') as string;
    const userId = formData.get('userId') as string;
    const projectId = formData.get('projectId') as string;
    const userRole = formData.get('userRole') as 'filmmaker' | 'sponsor';
    const applicationId = formData.get('applicationId') as string;
    const fileType = formData.get('fileType') as string;

    // Validation: Check if file is provided
    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file provided in request body' },
        { status: 400 }
      );
    }

    // Validation: Check file is not empty
    if (file.size === 0) {
      return NextResponse.json(
        { success: false, error: 'File cannot be empty' },
        { status: 400 }
      );
    }

    // Validation: uploadType is required
    if (!uploadType || uploadType.trim() === '') {
      return NextResponse.json(
        { success: false, error: 'Upload type is required (profile, project, or agreement)' },
        { status: 400 }
      );
    }

    let result;

    if (uploadType === 'profile') {
      // Validation: userId and userRole are required
      if (!userId || userId.trim() === '') {
        return NextResponse.json(
          { success: false, error: 'userId is required for profile uploads' },
          { status: 400 }
        );
      }
      if (!userRole || !['filmmaker', 'sponsor'].includes(userRole)) {
        return NextResponse.json(
          { success: false, error: 'userRole must be "filmmaker" or "sponsor"' },
          { status: 400 }
        );
      }
      // Upload profile image
      result = await uploadProfileImage(file, userId.trim(), userRole);
    } else if (uploadType === 'project') {
      // Validation: projectId and fileType are required
      if (!projectId || projectId.trim() === '') {
        return NextResponse.json(
          { success: false, error: 'projectId is required for project uploads' },
          { status: 400 }
        );
      }
      if (!fileType || !['poster', 'budget', 'script', 'video'].includes(fileType)) {
        return NextResponse.json(
          { success: false, error: 'fileType must be "poster", "budget", "script", or "video"' },
          { status: 400 }
        );
      }
      // Upload project file
      result = await uploadProjectFile(file, projectId.trim(), fileType as 'poster' | 'budget' | 'script' | 'video');
    } else if (uploadType === 'agreement') {
      // Validation: applicationId is required
      if (!applicationId || applicationId.trim() === '') {
        return NextResponse.json(
          { success: false, error: 'applicationId is required for agreement uploads' },
          { status: 400 }
        );
      }
      // Upload agreement
      result = await uploadAgreement(file, applicationId.trim());
    } else {
      return NextResponse.json(
        { success: false, error: 'Invalid upload type. Allowed: profile, project, agreement' },
        { status: 400 }
      );
    }

    if (result.success) {
      return NextResponse.json(
        {
          success: true,
          message: 'File uploaded successfully',
          url: result.url,
          path: result.path,
          fileName: file.name,
          size: file.size,
        },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        { success: false, error: result.error || 'Upload failed' },
        { status: 400 }
      );
    }
  } catch (error: any) {
    console.error('Upload error:', error);
    if (error instanceof TypeError && error.message.includes('FormData')) {
      return NextResponse.json(
        { success: false, error: 'Invalid request format. Expected multipart/form-data' },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, error: 'Upload failed due to server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { filePath } = body;

    // Validation: filePath is required
    if (!filePath || filePath.trim() === '') {
      return NextResponse.json(
        { success: false, error: 'filePath is required' },
        { status: 400 }
      );
    }

    // Validation: Prevent path traversal attacks
    if (filePath.includes('..')) {
      return NextResponse.json(
        { success: false, error: 'Invalid file path' },
        { status: 400 }
      );
    }

    const result = await deleteFile(filePath.trim());

    if (result.success) {
      return NextResponse.json(
        {
          success: true,
          message: 'File deleted successfully',
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { success: false, error: result.error || 'Failed to delete file' },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error('Delete file error:', error);
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
