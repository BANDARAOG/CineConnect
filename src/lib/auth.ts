// Authentication Utilities
// Functions for user registration, login, and session management

import { auth, db } from './firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
  sendPasswordResetEmail,
  updateProfile,
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { Filmmaker, Sponsor } from '@/types';

export interface AuthError {
  code: string;
  message: string;
}

// Register a new user (Filmmaker or Sponsor)
export const registerUser = async (
  email: string,
  password: string,
  fullName: string,
  role: 'filmmaker' | 'sponsor',
  additionalData: any
) => {
  try {
    // Create Firebase user
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Update profile with name
    await updateProfile(user, {
      displayName: fullName,
    });

    // Create user document in Firestore
    const userDoc = {
      id: user.uid,
      email: user.email,
      role: role,
      createdAt: new Date(),
      updatedAt: new Date(),
      lastLogin: new Date(),
    };

    await setDoc(doc(db, 'users', user.uid), userDoc);

    // Create role-specific document
    if (role === 'filmmaker') {
      const filmmakerDoc = {
        userId: user.uid,
        fullName: fullName,
        nicNumber: additionalData.nicNumber || '',
        studentId: additionalData.studentId || '',
        role: additionalData.filmmakerRole || 'independent',
        pastWorks: additionalData.pastWorks || [],
        verified: false,
        profileImage: '',
        bio: '',
        createdAt: new Date(),
      };
      await setDoc(doc(db, 'filmmakers', user.uid), filmmakerDoc);
    } else if (role === 'sponsor') {
      const sponsorDoc = {
        userId: user.uid,
        companyName: additionalData.companyName,
        businessRegNo: additionalData.businessRegNo || '',
        phone: additionalData.phone,
        industryCategory: additionalData.industryCategory,
        verified: false,
        profileImage: '',
        website: '',
        bio: '',
        totalInvested: 0,
        createdAt: new Date(),
      };
      await setDoc(doc(db, 'sponsors', user.uid), sponsorDoc);
    }

    return {
      success: true,
      user: { uid: user.uid, email: user.email, role: role },
    };
  } catch (error: any) {
    return {
      success: false,
      error: {
        code: error.code,
        message: getAuthErrorMessage(error.code),
      },
    };
  }
};

// Login with email and password
export const loginUser = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Get user role from Firestore
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    const userData = userDoc.data();

    // Update last login
    await updateDoc(doc(db, 'users', user.uid), {
      lastLogin: new Date(),
    });

    return {
      success: true,
      user: {
        uid: user.uid,
        email: user.email,
        role: userData?.role,
        displayName: user.displayName,
      },
    };
  } catch (error: any) {
    return {
      success: false,
      error: {
        code: error.code,
        message: getAuthErrorMessage(error.code),
      },
    };
  }
};

// Logout user
export const logoutUser = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      error: {
        code: error.code,
        message: getAuthErrorMessage(error.code),
      },
    };
  }
};

// Send password reset email
export const resetPassword = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true, message: 'Password reset email sent' };
  } catch (error: any) {
    return {
      success: false,
      error: {
        code: error.code,
        message: getAuthErrorMessage(error.code),
      },
    };
  }
};

// Get current user
export const getCurrentUser = () => {
  return auth.currentUser;
};

// Listen to auth state changes
export const onAuthChange = (callback: (user: FirebaseUser | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

// Get user role
export const getUserRole = async (uid: string) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    return userDoc.data()?.role || null;
  } catch (error) {
    console.error('Error getting user role:', error);
    return null;
  }
};

// Get filmmaker profile
export const getFilmmakerProfile = async (uid: string): Promise<Filmmaker | null> => {
  try {
    const filmmakerDoc = await getDoc(doc(db, 'filmmakers', uid));
    if (filmmakerDoc.exists()) {
      return filmmakerDoc.data() as Filmmaker;
    }
    return null;
  } catch (error) {
    console.error('Error getting filmmaker profile:', error);
    return null;
  }
};

// Get sponsor profile
export const getSponsorProfile = async (uid: string): Promise<Sponsor | null> => {
  try {
    const sponsorDoc = await getDoc(doc(db, 'sponsors', uid));
    if (sponsorDoc.exists()) {
      return sponsorDoc.data() as Sponsor;
    }
    return null;
  } catch (error) {
    console.error('Error getting sponsor profile:', error);
    return null;
  }
};

// Update filmmaker profile
export const updateFilmmakerProfile = async (uid: string, updates: Partial<Filmmaker>) => {
  try {
    await updateDoc(doc(db, 'filmmakers', uid), {
      ...updates,
      updatedAt: new Date(),
    });
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

// Update sponsor profile
export const updateSponsorProfile = async (uid: string, updates: Partial<Sponsor>) => {
  try {
    await updateDoc(doc(db, 'sponsors', uid), {
      ...updates,
      updatedAt: new Date(),
    });
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

// Helper function to get user-friendly error messages
function getAuthErrorMessage(code: string): string {
  const errorMessages: { [key: string]: string } = {
    'auth/email-already-in-use': 'This email is already registered',
    'auth/weak-password': 'Password should be at least 6 characters',
    'auth/invalid-email': 'Invalid email address',
    'auth/user-not-found': 'User not found',
    'auth/wrong-password': 'Incorrect password',
    'auth/too-many-requests': 'Too many login attempts. Please try again later',
    'auth/account-exists-with-different-credential':
      'An account with this email already exists',
  };
  return errorMessages[code] || 'An authentication error occurred';
}
