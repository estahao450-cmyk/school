/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { UserProfile, TodoItem, NewsItem, ScheduleItem, AuditLog, AppConfig } from './types';

export const MOCK_STUDENT: UserProfile = {
  id: 's1',
  name: '张三',
  avatar: 'https://picsum.photos/seed/student/200/200',
  role: 'student',
  studentId: '2021001234',
  college: '计算机学院',
  major: '软件工程',
  class: '2101班',
  balance: 156.50,
  borrowedBooks: 3,
  unreadEmails: 5,
  scheduleCount: 4,
};

export const MOCK_TEACHER: UserProfile = {
  id: 't1',
  name: '李华',
  avatar: 'https://picsum.photos/seed/teacher/200/200',
  role: 'teacher',
  employeeId: 'T88001',
  title: '副教授',
  department: '信息工程系',
  balance: 1240.00,
  borrowedBooks: 1,
  unreadEmails: 12,
  scheduleCount: 2,
  salary: 12500,
};

export const MOCK_TODOS: TodoItem[] = [
  { id: '1', title: '提交学期注册申请', category: '教务系统', status: 'pending', time: '2024-04-15' },
  { id: '2', title: '图书馆逾期图书归还', category: '图书馆', status: 'pending', time: '2024-04-14' },
  { id: '3', title: '完善个人基本信息', category: '人事系统', status: 'completed', time: '2024-04-10' },
  { id: '4', title: '参加学院周会', category: '会议系统', status: 'pending', time: '2024-04-16' },
];

export const MOCK_NEWS: NewsItem[] = [
  { id: '1', title: '我校在全国大学生数学建模竞赛中喜获佳绩', type: 'headline', content: '近日，2024年全国大学生数学建模竞赛结果揭晓...', time: '2024-04-12 10:00', read: false, image: 'https://picsum.photos/seed/news1/800/400' },
  { id: '2', title: '关于2024年春季学期奖学金评定的通知', type: 'notice', content: '各学院：根据学校奖学金评定办法，现启动本学期奖学金评定工作...', time: '2024-04-11 15:30', read: true },
  { id: '3', title: '校园网维护公告', type: 'notice', content: '因系统升级，校园网将于本周六凌晨2:00-4:00进行维护...', time: '2024-04-11 09:00', read: false },
  { id: '4', title: '办事指南：如何申请出国交流项目', type: 'guide', content: '第一步：登录国际交流处官网下载申请表；第二步：准备语言成绩证明...', time: '2024-04-10 14:20', read: true },
];

export const MOCK_SCHEDULE: ScheduleItem[] = [
  { id: '1', title: '高等数学', time: '08:00 - 09:35', location: '教一 302', teacher: '王老师', credits: 4, type: 'course', dayOfWeek: 1 },
  { id: '2', title: '大学物理', time: '10:00 - 11:35', location: '实验楼 105', teacher: '赵老师', credits: 3, type: 'course', dayOfWeek: 1 },
  { id: '3', title: '系务会议', time: '14:00 - 15:30', location: '办公楼 402', type: 'meeting', dayOfWeek: 2 },
  { id: '4', title: '数据结构', time: '08:00 - 09:35', location: '教二 201', teacher: '陈老师', credits: 4, type: 'course', dayOfWeek: 3 },
  { id: '5', title: '学术讲座', time: '19:00 - 21:00', location: '大礼堂', type: 'event', dayOfWeek: 4 },
];

export const MOCK_LOGS: AuditLog[] = [
  { id: '1', operator: 'admin', time: '2024-04-12 18:30', content: '修改了应用配置：教务系统', result: 'success' },
  { id: '2', operator: 'admin', time: '2024-04-12 17:45', content: '导出了3月份操作日志', result: 'success' },
  { id: '3', operator: 'admin', time: '2024-04-12 16:20', content: '更新了滚动公告内容', result: 'success' },
  { id: '4', operator: 'system', time: '2024-04-12 00:00', content: '系统自动备份', result: 'success' },
];

export const MOCK_APPS: AppConfig[] = [
  { id: '1', name: '教务系统', enabled: true, permissions: ['student', 'teacher'] },
  { id: '2', name: '人事系统', enabled: true, permissions: ['teacher', 'admin'] },
  { id: '3', name: '财务系统', enabled: false, permissions: ['teacher', 'admin'] },
  { id: '4', name: '图书馆', enabled: true, permissions: ['student', 'teacher'] },
];
