// Custom React Hooks for CineConnect
// Handle authentication, profile, projects, and real-time data

'use client';

import { useEffect, useState, useCallback } from 'react';
import { User } from 'firebase/auth';
import { onSnapshot, doc } from 'firebase/firestore';
import {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  onAuthChange,
  getUserRole,
  getFilmmakerProfile,
  getSponsorProfile,
} from '@/lib/auth';
import { db } from '@/lib/firebase';
import { Filmmaker, Sponsor, FilmProject, SponsorshipApplication } from '@/types';

// ===== AUTHENTICATION HOOKS =====

// useAuth - Global authentication state
export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<'filmmaker' | 'sponsor' | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Listen to auth changes
  useEffect(() => {
    const unsubscribe = onAuthChange(async (authUser) => {
      if (authUser) {
        setUser(authUser);
        const roleResult = await getUserRole(authUser.uid);
        if (roleResult.success) {
          setRole(roleResult.role as 'filmmaker' | 'sponsor');
        }
      } else {
        setUser(null);
        setRole(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const register = useCallback(
    async (
      email: string,
      password: string,
      fullName: string,
      userRole: 'filmmaker' | 'sponsor',
      additionalData: any
    ) => {
      setLoading(true);
      setError(null);
      const result = await registerUser(email, password, fullName, userRole, additionalData);
      if (!result.success) {
        setError(result.error?.message || 'Registration failed');
      }
      setLoading(false);
      return result;
    },
    []
  );

  const login = useCallback(async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    const result = await loginUser(email, password);
    if (result.success) {
      setUser(result.user);
      setRole(result.role as 'filmmaker' | 'sponsor');
    } else {
      setError(result.error);
    }
    setLoading(false);
    return result;
  }, []);

  const logout = useCallback(async () => {
    setLoading(true);
    const result = await logoutUser();
    if (result.success) {
      setUser(null);
      setRole(null);
    }
    setLoading(false);
    return result;
  }, []);

  return { user, role, loading, error, register, login, logout };
};

// ===== FILMMAKER PROFILE HOOK =====

export const useFilmmakerProfile = (filmmakerIds: string[]) => {
  const [profile, setProfile] = useState<Partial<Filmmaker> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (filmmakerIds.length === 0) {
      setLoading(false);
      return;
    }

    const unsubscribe = onSnapshot(
      doc(db, 'filmmakers', filmmakerIds[0]),
      (docSnap) => {
        if (docSnap.exists()) {
          setProfile({ id: docSnap.id, ...docSnap.data() } as Filmmaker);
          setError(null);
        } else {
          setError('Filmmaker profile not found');
        }
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [filmmakerIds]);

  return { profile, loading, error };
};

// ===== SPONSOR PROFILE HOOK =====

export const useSponsorProfile = (sponsorId: string) => {
  const [profile, setProfile] = useState<Partial<Sponsor> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!sponsorId) {
      setLoading(false);
      return;
    }

    const unsubscribe = onSnapshot(
      doc(db, 'sponsors', sponsorId),
      (docSnap) => {
        if (docSnap.exists()) {
          setProfile({ id: docSnap.id, ...docSnap.data() } as Sponsor);
          setError(null);
        } else {
          setError('Sponsor profile not found');
        }
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [sponsorId]);

  return { profile, loading, error };
};

// ===== PROJECTS HOOK =====

export const useProjects = (filters?: {
  status?: string;
  genre?: string;
  limit?: number;
}) => {
  const [projects, setProjects] = useState<FilmProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let constraints: any[] = [];

    if (filters?.status) {
      constraints.push(['status', '==', filters.status]);
    }
    if (filters?.genre) {
      constraints.push(['genre', '==', filters.genre]);
    }

    // Note: This is a simplified version. Full implementation requires
    // Firebase query builder with constraints
    const unsubscribe = onSnapshot(
      doc(db, 'projects', 'all'),
      (docSnap) => {
        if (docSnap.exists()) {
          setProjects(docSnap.data().projects || []);
          setError(null);
        }
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [filters]);

  return { projects, loading, error };
};

// ===== APPLICATIONS HOOK =====

export const useApplications = (userId: string, userRole: 'filmmaker' | 'sponsor') => {
  const [applications, setApplications] = useState<SponsorshipApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const collectionPath = userRole === 'sponsor' 
      ? `applications_sponsor_${userId}`
      : `applications_filmmaker_${userId}`;

    const unsubscribe = onSnapshot(
      doc(db, 'applications', collectionPath),
      (docSnap) => {
        if (docSnap.exists()) {
          setApplications(docSnap.data().applications || []);
          setError(null);
        }
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [userId, userRole]);

  return { applications, loading, error };
};

// ===== MESSAGES HOOK =====

export const useMessages = (userId: string, otherUserId?: string) => {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const path = otherUserId
      ? `conversation_${userId}_${otherUserId}`
      : `inbox_${userId}`;

    const unsubscribe = onSnapshot(
      doc(db, 'messages', path),
      (docSnap) => {
        if (docSnap.exists()) {
          setMessages(docSnap.data().messages || []);
          setError(null);
        }
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [userId, otherUserId]);

  return { messages, loading, error };
};

// ===== PROJECT FUNDING HOOK =====

export const useProjectFunding = (projectId: string) => {
  const [funding, setFunding] = useState({
    current: 0,
    needed: 0,
    percentage: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!projectId) {
      setLoading(false);
      return;
    }

    const unsubscribe = onSnapshot(
      doc(db, 'projects', projectId),
      (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          const percentage = ((data.currentFunding || 0) / (data.sponsorshipNeeded || 1)) * 100;
          setFunding({
            current: data.currentFunding || 0,
            needed: data.sponsorshipNeeded || 0,
            percentage: Math.min(100, Math.round(percentage)),
          });
          setError(null);
        }
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [projectId]);

  return { funding, loading, error };
};

// ===== NOTIFICATIONS HOOK =====

export const useNotifications = (userId: string) => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const unsubscribe = onSnapshot(
      doc(db, 'notifications', userId),
      (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          setNotifications(data.notifications || []);
          setUnreadCount((data.notifications || []).filter((n: any) => !n.read).length);
        }
        setLoading(false);
      },
      (err) => {
        console.error('Error loading notifications:', err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [userId]);

  return { notifications, unreadCount, loading };
};
