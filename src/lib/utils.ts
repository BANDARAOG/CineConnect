// Utility Functions
// Common helpers and formatters for the application

// ===== CURRENCY FORMATTING =====

export const formatCurrency = (amount: number, currency: string = 'LKR'): string => {
  const formatter = new Intl.NumberFormat('en-LK', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
  return formatter.format(amount);
};

// ===== DATE FORMATTING =====

export const formatDate = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-LK', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const formatDateTime = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleString('en-LK', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const formatTimeAgo = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const seconds = Math.floor((now.getTime() - d.getTime()) / 1000);

  if (seconds < 60) return 'Just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 2592000) return `${Math.floor(seconds / 86400)}d ago`;

  return formatDate(d);
};

// ===== TEXT FORMATTING =====

export const truncate = (text: string, length: number): string => {
  if (text.length <= length) return text;
  return text.substring(0, length) + '...';
};

export const capitalize = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const titleCase = (text: string): string => {
  return text
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

// ===== VALIDATION =====

export const isValidEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const isValidPhone = (phone: string): boolean => {
  const re = /^(?:\+94|0)[0-9]{9}$/;
  return re.test(phone.replace(/\s/g, ''));
};

export const isValidNIC = (nic: string): boolean => {
  // Simple NIC validation for Sri Lanka
  return /^[0-9]{9}[vVxX]?$/.test(nic);
};

export const isValidPassword = (password: string): boolean => {
  return password.length >= 6;
};

// ===== PROJECT CALCULATIONS =====

export const calculateFundingPercentage = (current: number, needed: number): number => {
  if (needed === 0) return 0;
  return Math.min(100, Math.round((current / needed) * 100));
};

export const calculateFundingRemaining = (current: number, needed: number): number => {
  return Math.max(0, needed - current);
};

export const calculateDaysRemaining = (deadline: Date | string): number => {
  const d = typeof deadline === 'string' ? new Date(deadline) : deadline;
  const now = new Date();
  const diff = d.getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
};

// ===== URL ENCODING =====

export const encodeQueryParams = (params: Record<string, any>): string => {
  return Object.entries(params)
    .filter(([, value]) => value !== null && value !== undefined)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');
};

export const decodeQueryParams = (query: string): Record<string, string> => {
  const params: Record<string, string> = {};
  new URLSearchParams(query).forEach((value, key) => {
    params[key] = value;
  });
  return params;
};

// ===== ARRAY HELPERS =====

export const groupBy = <T>(arr: T[], key: keyof T): Record<string, T[]> => {
  return arr.reduce((result: Record<string, T[]>, item: T) => {
    const group = String(item[key]);
    if (!result[group]) result[group] = [];
    result[group].push(item);
    return result;
  }, {});
};

export const sortBy = <T>(arr: T[], key: keyof T, order: 'asc' | 'desc' = 'asc'): T[] => {
  return [...arr].sort((a, b) => {
    const aVal = a[key];
    const bVal = b[key];

    if (aVal < bVal) return order === 'asc' ? -1 : 1;
    if (aVal > bVal) return order === 'asc' ? 1 : -1;
    return 0;
  });
};

export const unique = <T>(arr: T[], key?: keyof T): T[] => {
  if (!key) return [...new Set(arr)];

  const seen = new Set();
  return arr.filter((item) => {
    const k = item[key];
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
};

// ===== OBJECT HELPERS =====

export const pick = <T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> => {
  return keys.reduce((result, key) => {
    result[key] = obj[key];
    return result;
  }, {} as Pick<T, K>);
};

export const omit = <T extends object, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> => {
  const result = { ...obj };
  keys.forEach((key) => {
    delete result[key];
  });
  return result as Omit<T, K>;
};

// ===== ID GENERATION =====

export const generateId = (prefix: string = ''): string => {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substring(2, 8);
  return prefix ? `${prefix}_${timestamp}${randomStr}` : `${timestamp}${randomStr}`;
};

export const generateApplicationId = (): string => generateId('APP');
export const generateProjectId = (): string => generateId('PROJ');
export const generateTransactionId = (): string => generateId('TXN');

// ===== ERROR HANDLING =====

export const getErrorMessage = (error: any): string => {
  if (typeof error === 'string') return error;
  if (error instanceof Error) return error.message;
  if (error?.message) return error.message;
  if (error?.error) return error.error;
  return 'An unexpected error occurred';
};

// ===== LOCAL STORAGE =====

export const setLocalStorage = (key: string, value: any): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('LocalStorage error:', error);
  }
};

export const getLocalStorage = <T = any>(key: string, defaultValue?: T): T | null => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue ?? null;
  } catch (error) {
    console.error('LocalStorage error:', error);
    return defaultValue ?? null;
  }
};

export const removeLocalStorage = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('LocalStorage error:', error);
  }
};

// ===== COLOR UTILITIES =====

export const getCategoryColor = (category: string): string => {
  const colors: Record<string, string> = {
    drama: '#EF4444',
    comedy: '#F59E0B',
    thriller: '#8B5CF6',
    horror: '#DC2626',
    action: '#EF4444',
    romance: '#EC4899',
    documentary: '#3B82F6',
    animation: '#06B6D4',
  };
  return colors[category.toLowerCase()] || '#3B82F6';
};

export const getStatusColor = (status: string): string => {
  const colors: Record<string, string> = {
    pending: '#FCD34D',
    approved: '#10B981',
    rejected: '#EF4444',
    completed: '#3B82F6',
    active: '#10B981',
    inactive: '#6B7280',
    draft: '#9CA3AF',
  };
  return colors[status.toLowerCase()] || '#9CA3AF';
};

// ===== DELAY UTILITY =====

export const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
