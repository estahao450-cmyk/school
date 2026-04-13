/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type UserRole = 'student' | 'teacher' | 'admin';

export interface UserProfile {
  id: string;
  name: string;
  avatar: string;
  role: UserRole;
  // Student specific
  studentId?: string;
  college?: string;
  major?: string;
  class?: string;
  // Teacher specific
  employeeId?: string;
  title?: string;
  department?: string;
  // Stats
  balance: number;
  borrowedBooks: number;
  unreadEmails: number;
  scheduleCount: number;
  salary?: number;
}

export interface TodoItem {
  id: string;
  title: string;
  category: string;
  status: 'pending' | 'completed';
  time: string;
}

export interface NewsItem {
  id: string;
  title: string;
  type: 'headline' | 'notice' | 'guide' | 'news';
  content: string;
  time: string;
  read: boolean;
  image?: string;
}

export interface ScheduleItem {
  id: string;
  title: string;
  time: string;
  location: string;
  teacher?: string;
  credits?: number;
  type: 'course' | 'meeting' | 'event';
  dayOfWeek: number; // 1-7
}

export interface AuditLog {
  id: string;
  operator: string;
  time: string;
  content: string;
  result: 'success' | 'failure';
}

export interface AppConfig {
  id: string;
  name: string;
  enabled: boolean;
  permissions: string[];
}
