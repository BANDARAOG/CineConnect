// GET /api/messages - Get messages for user
// POST /api/messages - Send a message

import { NextRequest, NextResponse } from 'next/server';
import { sendMessage, getConversation, getUserInbox, markMessageAsRead } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const otherUserId = searchParams.get('otherUserId');
    const limit = Math.min(parseInt(searchParams.get('limit') || '50'), 100);
    const markRead = searchParams.get('markRead') === 'true';

    // Validation: userId is required
    if (!userId || userId.trim() === '') {
      return NextResponse.json(
        { success: false, error: 'userId is required and cannot be empty' },
        { status: 400 }
      );
    }

    let result;
    if (otherUserId && otherUserId.trim() !== '') {
      // Get conversation between two users with pagination
      result = await getConversation(userId, otherUserId);
      
      // Mark messages as read if requested
      if (markRead && result.success && result.messages) {
        for (const message of result.messages as any[]) {
          if (message.toUserId === userId && !message.isRead) {
            await markMessageAsRead(message.id);
          }
        }
      }
    } else {
      // Get inbox for user (all conversations)
      result = await getUserInbox(userId);
    }

    if (result.success) {
      return NextResponse.json(
        {
          success: true,
          messages: result.messages || [],
          count: result.messages?.length || 0,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { success: false, error: result.error || 'Failed to fetch messages' },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error('Get messages error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fromUserId, toUserId, projectId, subject, content } = body;

    // Validation: Check required fields
    const requiredFields = ['fromUserId', 'toUserId', 'subject', 'content'];
    for (const field of requiredFields) {
      if (!body[field] || (typeof body[field] === 'string' && body[field].trim() === '')) {
        return NextResponse.json(
          { success: false, error: `${field} is required and cannot be empty` },
          { status: 400 }
        );
      }
    }

    // Validation: Prevent self-messaging
    if (fromUserId === toUserId) {
      return NextResponse.json(
        { success: false, error: 'Cannot send message to yourself' },
        { status: 400 }
      );
    }

    // Validation: Content length (min 1 character, max 5000 characters)
    if (content.trim().length < 1) {
      return NextResponse.json(
        { success: false, error: 'Message content cannot be empty' },
        { status: 400 }
      );
    }
    if (content.length > 5000) {
      return NextResponse.json(
        { success: false, error: 'Message content cannot exceed 5000 characters' },
        { status: 400 }
      );
    }

    // Validation: Subject length (min 1, max 200 characters)
    if (subject.trim().length < 1) {
      return NextResponse.json(
        { success: false, error: 'Subject cannot be empty' },
        { status: 400 }
      );
    }
    if (subject.length > 200) {
      return NextResponse.json(
        { success: false, error: 'Subject cannot exceed 200 characters' },
        { status: 400 }
      );
    }

    const messageData = {
      fromUserId: fromUserId.trim(),
      toUserId: toUserId.trim(),
      projectId: projectId ? projectId.trim() : '',
      subject: subject.trim(),
      content: content.trim(),
      isRead: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await sendMessage(messageData as any);

    if (result.success) {
      return NextResponse.json(
        {
          success: true,
          message: 'Message sent successfully',
          messageId: result.messageId,
          createdAt: messageData.createdAt,
        },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        { success: false, error: result.error || 'Failed to send message' },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error('Send message error:', error);
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
