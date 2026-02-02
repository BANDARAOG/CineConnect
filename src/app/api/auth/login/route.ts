// API route for authenticating users
// POST /api/auth/login

import { NextRequest, NextResponse } from 'next/server';
import { loginUser, getUserRole } from '@/lib/auth';

/**
 * POST /api/auth/login
 * 
 * Request body:
 * {
 *   email: string (required)
 *   password: string (required, min 6 chars)
 * }
 * 
 * Response: 200 OK
 * {
 *   success: true
 *   user: { uid, email, displayName }
 *   role: 'filmmaker' | 'sponsor' | 'admin'
 * }
 * 
 * Errors:
 * 400: Missing required fields or invalid input
 * 401: Invalid credentials
 * 500: Server error
 */
export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate password
    if (password.length < 6) {
      return NextResponse.json(
        { success: false, error: 'Password must be at least 6 characters' },
        { status: 400 }
      );
    }

    // Authenticate user with Firebase
    const result = await loginUser(email, password);

    if (result.success && result.user) {
      // Get user's role from Firestore
      const roleResult = await getUserRole(result.user.uid);

      return NextResponse.json(
        {
          success: true,
          user: {
            uid: result.user.uid,
            email: result.user.email,
            displayName: result.user.displayName || 'User'
          },
          role: roleResult.role || 'filmmaker' // Default role
        },
        { status: 200 }
      );
    } else {
      // Handle Firebase authentication errors
      if (result.error?.code === 'auth/user-not-found') {
        return NextResponse.json(
          { success: false, error: 'User not found. Please register first.' },
          { status: 401 }
        );
      } else if (result.error?.code === 'auth/wrong-password') {
        return NextResponse.json(
          { success: false, error: 'Invalid email or password' },
          { status: 401 }
        );
      } else if (result.error?.code === 'auth/too-many-requests') {
        return NextResponse.json(
          { success: false, error: 'Too many failed login attempts. Try again later.' },
          { status: 429 }
        );
      }

      return NextResponse.json(
        { success: false, error: result.error?.message || 'Login failed' },
        { status: 401 }
      );
    }
  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
