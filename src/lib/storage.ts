// File Upload Service
// Handles file uploads to Firebase Cloud Storage

import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';
import { storage } from './firebase';

// Supported file types
const ALLOWED_TYPES = {
  image: ['image/jpeg', 'image/png', 'image/webp'],
  document: ['application/pdf'],
  video: ['video/mp4', 'video/quicktime'],
};

const MAX_FILE_SIZES = {
  image: 5 * 1024 * 1024, // 5MB
  document: 10 * 1024 * 1024, // 10MB
  video: 100 * 1024 * 1024, // 100MB
};

export interface UploadResult {
  success: boolean;
  url?: string;
  path?: string;
  error?: string;
}

// Validate file
const validateFile = (
  file: File,
  fileType: 'image' | 'document' | 'video'
): { valid: boolean; error?: string } => {
  // Check file size
  if (file.size > MAX_FILE_SIZES[fileType]) {
    return {
      valid: false,
      error: `File size exceeds ${MAX_FILE_SIZES[fileType] / 1024 / 1024}MB limit`,
    };
  }

  // Check file type
  if (!ALLOWED_TYPES[fileType].includes(file.type)) {
    return {
      valid: false,
      error: `Invalid file type. Allowed: ${ALLOWED_TYPES[fileType].join(', ')}`,
    };
  }

  return { valid: true };
};

// Upload profile image
export const uploadProfileImage = async (
  file: File,
  userId: string,
  role: 'filmmaker' | 'sponsor'
): Promise<UploadResult> => {
  try {
    const validation = validateFile(file, 'image');
    if (!validation.valid) {
      return { success: false, error: validation.error };
    }

    const fileName = `${userId}-${Date.now()}`;
    const filePath = `profiles/${role}/${userId}/${fileName}`;
    const fileRef = ref(storage, filePath);

    await uploadBytes(fileRef, file);
    const url = await getDownloadURL(fileRef);

    return { success: true, url, path: filePath };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

// Upload project file (poster, budget sheet, etc.)
export const uploadProjectFile = async (
  file: File,
  projectId: string,
  fileType: 'poster' | 'budget' | 'script' | 'video'
): Promise<UploadResult> => {
  try {
    let uploadFileType: 'image' | 'document' | 'video' = 'document';
    if (fileType === 'poster') uploadFileType = 'image';
    if (fileType === 'video') uploadFileType = 'video';

    const validation = validateFile(file, uploadFileType);
    if (!validation.valid) {
      return { success: false, error: validation.error };
    }

    const fileName = `${fileType}-${Date.now()}`;
    const filePath = `projects/${projectId}/${fileType}/${fileName}`;
    const fileRef = ref(storage, filePath);

    await uploadBytes(fileRef, file);
    const url = await getDownloadURL(fileRef);

    return { success: true, url, path: filePath };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

// Upload agreement document
export const uploadAgreement = async (
  file: File,
  applicationId: string
): Promise<UploadResult> => {
  try {
    const validation = validateFile(file, 'document');
    if (!validation.valid) {
      return { success: false, error: validation.error };
    }

    const fileName = `agreement-${Date.now()}`;
    const filePath = `agreements/${applicationId}/${fileName}`;
    const fileRef = ref(storage, filePath);

    await uploadBytes(fileRef, file);
    const url = await getDownloadURL(fileRef);

    return { success: true, url, path: filePath };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

// Get download URL for existing file
export const getDownloadUrl = async (filePath: string): Promise<UploadResult> => {
  try {
    const fileRef = ref(storage, filePath);
    const url = await getDownloadURL(fileRef);
    return { success: true, url };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

// Delete file
export const deleteFile = async (filePath: string): Promise<{ success: boolean; error?: string }> => {
  try {
    const fileRef = ref(storage, filePath);
    await deleteObject(fileRef);
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

// Upload multiple files
export const uploadMultipleFiles = async (
  files: File[],
  projectId: string,
  fileType: string
): Promise<UploadResult[]> => {
  const results = await Promise.all(
    files.map((file) =>
      uploadProjectFile(file, projectId, fileType as 'poster' | 'budget' | 'script' | 'video')
    )
  );
  return results;
};

// Generate safe file name
export const generateSafeFileName = (fileName: string): string => {
  return fileName
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
};

// Get file extension
export const getFileExtension = (fileName: string): string => {
  return fileName.split('.').pop() || '';
};

// Check if file is image
export const isImage = (mimeType: string): boolean => {
  return ALLOWED_TYPES.image.includes(mimeType);
};

// Check if file is document
export const isDocument = (mimeType: string): boolean => {
  return ALLOWED_TYPES.document.includes(mimeType);
};

// Check if file is video
export const isVideo = (mimeType: string): boolean => {
  return ALLOWED_TYPES.video.includes(mimeType);
};
