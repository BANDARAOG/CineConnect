// Database Utilities
// Functions for CRUD operations on Firestore collections

import { db } from './firebase';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  Query,
  QueryConstraint,
} from 'firebase/firestore';
import { FilmProject, SponsorshipApplication, Message, Review } from '@/types';

// ===== PROJECT OPERATIONS =====

// Create a new film project
export const createProject = async (projectData: Omit<FilmProject, 'id' | 'createdAt' | 'updatedAt'>) => {
  try {
    const docRef = await addDoc(collection(db, 'projects'), {
      ...projectData,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return { success: true, projectId: docRef.id };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

// Get single project
export const getProject = async (projectId: string) => {
  try {
    const docSnap = await getDoc(doc(db, 'projects', projectId));
    if (docSnap.exists()) {
      return { success: true, project: { id: docSnap.id, ...docSnap.data() } };
    }
    return { success: false, error: 'Project not found' };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

// Get all projects with filters
export const getProjects = async (filters?: {
  status?: string;
  genre?: string;
  minBudget?: number;
  maxBudget?: number;
  limit?: number;
}) => {
  try {
    const constraints: QueryConstraint[] = [];

    if (filters?.status) {
      constraints.push(where('status', '==', filters.status));
    }
    if (filters?.genre) {
      constraints.push(where('genre', '==', filters.genre));
    }

    constraints.push(orderBy('createdAt', 'desc'));
    if (filters?.limit) {
      constraints.push(limit(filters.limit));
    }

    const q = query(collection(db, 'projects'), ...constraints);
    const querySnapshot = await getDocs(q);

    const projects = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    return { success: true, projects };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

// Get filmmaker's projects
export const getFilmmakerProjects = async (filmmakerIds: string[]) => {
  try {
    const q = query(
      collection(db, 'projects'),
      where('filmmakerIds', 'array-contains-any', filmmakerIds),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    const projects = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    return { success: true, projects };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

// Update project
export const updateProject = async (projectId: string, updates: Partial<FilmProject>) => {
  try {
    await updateDoc(doc(db, 'projects', projectId), {
      ...updates,
      updatedAt: new Date(),
    });
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

// Delete project
export const deleteProject = async (projectId: string) => {
  try {
    await deleteDoc(doc(db, 'projects', projectId));
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

// ===== SPONSORSHIP APPLICATION OPERATIONS =====

// Create sponsorship application
export const createApplication = async (appData: Omit<SponsorshipApplication, 'id'>) => {
  try {
    const docRef = await addDoc(collection(db, 'applications'), {
      ...appData,
      createdAt: new Date(),
    });
    return { success: true, applicationId: docRef.id };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

// Get application
export const getApplication = async (applicationId: string) => {
  try {
    const docSnap = await getDoc(doc(db, 'applications', applicationId));
    if (docSnap.exists()) {
      return { success: true, application: { id: docSnap.id, ...docSnap.data() } };
    }
    return { success: false, error: 'Application not found' };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

// Get applications for a sponsor
export const getSponsorApplications = async (sponsorId: string) => {
  try {
    const q = query(
      collection(db, 'applications'),
      where('sponsorId', '==', sponsorId),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    const applications = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    return { success: true, applications };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

// Get applications for a project
export const getProjectApplications = async (projectId: string) => {
  try {
    const q = query(
      collection(db, 'applications'),
      where('projectId', '==', projectId),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    const applications = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    return { success: true, applications };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

// Update application status
export const updateApplicationStatus = async (
  applicationId: string,
  status: string,
  updates?: any
) => {
  try {
    await updateDoc(doc(db, 'applications', applicationId), {
      status: status,
      ...updates,
      updatedAt: new Date(),
    });
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

// ===== MESSAGE OPERATIONS =====

// Send message
export const sendMessage = async (messageData: Omit<Message, 'id' | 'updatedAt'>) => {
  try {
    const docRef = await addDoc(collection(db, 'messages'), {
      ...messageData,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return { success: true, messageId: docRef.id };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

// Get messages between two users
export const getConversation = async (userId1: string, userId2: string) => {
  try {
    const q = query(
      collection(db, 'messages'),
      where('fromUserId', 'in', [userId1, userId2]),
      where('toUserId', 'in', [userId1, userId2]),
      orderBy('createdAt', 'desc'),
      limit(50)
    );
    const querySnapshot = await getDocs(q);
    const messages = querySnapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() }))
      .reverse();
    return { success: true, messages };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

// Get user's inbox
export const getUserInbox = async (userId: string) => {
  try {
    const q = query(
      collection(db, 'messages'),
      where('toUserId', '==', userId),
      orderBy('createdAt', 'desc'),
      limit(100)
    );
    const querySnapshot = await getDocs(q);
    const messages = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    return { success: true, messages };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

// Mark message as read
export const markMessageAsRead = async (messageId: string) => {
  try {
    await updateDoc(doc(db, 'messages', messageId), {
      isRead: true,
      updatedAt: new Date(),
    });
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

// ===== REVIEW OPERATIONS =====

// Create review
export const createReview = async (reviewData: Omit<Review, 'id'>) => {
  try {
    const docRef = await addDoc(collection(db, 'reviews'), {
      ...reviewData,
      createdAt: new Date(),
    });
    return { success: true, reviewId: docRef.id };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

// Get reviews for a user
export const getUserReviews = async (userId: string) => {
  try {
    const q = query(
      collection(db, 'reviews'),
      where('toUserId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    const reviews: Review[] = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...(doc.data() as Omit<Review, 'id'>),
    }));

    // Calculate average rating
    const avgRating =
      reviews.length > 0
        ? reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / reviews.length
        : 0;

    return { success: true, reviews, averageRating: avgRating };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

// ===== ANALYTICS OPERATIONS =====

// Increment project views
export const incrementProjectViews = async (projectId: string) => {
  try {
    const project = await getProject(projectId);
    if (project.success) {
      const currentViews = (project.project as any).views || 0;
      await updateProject(projectId, {
        views: currentViews + 1,
      } as any);
      return { success: true };
    }
    return { success: false };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

// Get project funding progress
export const getProjectFundingProgress = async (projectId: string) => {
  try {
    const project = await getProject(projectId);
    if (project.success) {
      const p = project.project as any;
      const percentage = (p.currentFunding / p.sponsorshipNeeded) * 100;
      return {
        success: true,
        funded: p.currentFunding,
        needed: p.sponsorshipNeeded,
        percentage: Math.min(100, Math.round(percentage)),
      };
    }
    return { success: false };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};
