/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MOCK_STUDENT, 
  MOCK_TEACHER, 
  MOCK_TODOS, 
  MOCK_NEWS, 
  MOCK_SCHEDULE, 
  MOCK_LOGS, 
  MOCK_APPS 
} from './constants';
import { UserProfile, TodoItem, NewsItem, ScheduleItem, AuditLog, AppConfig } from './types';
import UserCard from './components/UserCard';
import TodoList from './components/TodoList';
import NewsCenter from './components/NewsCenter';
import Schedule from './components/Schedule';
import AdminPanel from './components/AdminPanel';
import { LayoutDashboard, ShieldCheck, Bell, LogOut, Menu, X, MessageSquare, Mail, FileText, Users, Settings } from 'lucide-react';

// Update mock data to match image
const IMAGE_USER: UserProfile = {
  ...MOCK_STUDENT,
  name: '毛伟乐',
  studentId: 'W20231540',
  college: '信息化建设与管理办公室',
  major: '',
  balance: 0.0,
  borrowedBooks: 0,
};

export default function App() {
  // State
  const [currentUser, setCurrentUser] = useState<UserProfile>(IMAGE_USER);
  const [view, setView] = useState<'user' | 'admin'>('user');
  const [todos, setTodos] = useState<TodoItem[]>(MOCK_TODOS);
  const [news, setNews] = useState<NewsItem[]>(MOCK_NEWS);
  const [apps, setApps] = useState<AppConfig[]>(MOCK_APPS);
  const [logs, setLogs] = useState<AuditLog[]>(MOCK_LOGS);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Actions
  const handleSwitchRole = () => {
    const newUser = currentUser.role === 'student' ? MOCK_TEACHER : IMAGE_USER;
    setCurrentUser(newUser);
    addLog(`切换身份为：${newUser.role === 'student' ? '学生' : '教职工'}`);
  };

  const handleToggleTodo = (id: string) => {
    setTodos(prev => prev.map(t => t.id === id ? { ...t, status: t.status === 'pending' ? 'completed' : 'pending' } : t));
  };

  const handleDeleteTodo = (id: string) => {
    setTodos(prev => prev.filter(t => t.id !== id));
    addLog(`删除了待办事项：${id}`);
  };

  const handleMarkNewsRead = (id: string) => {
    setNews(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const handleToggleApp = (id: string) => {
    setApps(prev => prev.map(a => a.id === id ? { ...a, enabled: !a.enabled } : a));
    const app = apps.find(a => a.id === id);
    addLog(`${app?.enabled ? '关闭' : '开启'}了应用：${app?.name}`);
  };

  const addLog = (content: string) => {
    const newLog: AuditLog = {
      id: Date.now().toString(),
      operator: '当前用户',
      time: new Date().toLocaleString(),
      content,
      result: 'success'
    };
    setLogs(prev => [newLog, ...prev]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans pb-20">
      {/* Sidebar (Admin Only) */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-100 transform transition-transform duration-300 lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-full flex flex-col">
          <div className="p-6 flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
              <LayoutDashboard className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">高校工作台</h1>
          </div>

          <nav className="flex-1 px-4 space-y-1">
            <SidebarItem 
              icon={<LayoutDashboard className="w-5 h-5" />} 
              label="师生工作台" 
              active={view === 'user'} 
              onClick={() => { setView('user'); setIsSidebarOpen(false); }} 
            />
            <SidebarItem 
              icon={<ShieldCheck className="w-5 h-5" />} 
              label="管理后台" 
              active={view === 'admin'} 
              onClick={() => { setView('admin'); setIsSidebarOpen(false); }} 
            />
          </nav>

          <div className="p-4 border-t border-slate-50">
            <button className="flex items-center gap-3 w-full px-4 py-3 text-slate-500 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all font-medium">
              <LogOut className="w-5 h-5" />
              退出登录
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 ${view === 'admin' ? 'lg:ml-64' : ''} flex flex-col min-w-0`}>
        {/* Header */}
        <header className="sticky top-0 z-40 bg-white border-b border-slate-100 px-6 py-3 flex items-center justify-between">
          <div className="w-10" /> {/* Spacer */}
          <h2 className="text-lg font-medium text-slate-800">工作台</h2>
          <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
            <Settings className="w-5 h-5 text-slate-600" />
          </button>
        </header>

        {/* Content Area */}
        <div className="flex-1">
          <AnimatePresence mode="wait">
            {view === 'user' ? (
              <motion.div 
                key="user-view"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                {/* Banner */}
                <div className="px-4 pt-4">
                  <div className="relative h-48 rounded-2xl overflow-hidden shadow-sm">
                    <img 
                      src="https://picsum.photos/seed/campus/1200/600" 
                      alt="Campus Banner" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex flex-col justify-end p-6">
                      <h3 className="text-white font-bold text-lg">南邮连续六年获</h3>
                      <p className="text-white/90 text-sm">全省高质量发展综合考核第一等次</p>
                    </div>
                  </div>
                </div>

                <div className="px-4 space-y-4">
                  <UserCard 
                    user={currentUser} 
                    onSwitchRole={handleSwitchRole} 
                    onUploadAvatar={() => alert('头像上传功能开发中...')} 
                  />
                  
                  <div className="grid grid-cols-1 gap-4">
                    <NewsCenter 
                      news={news} 
                      onMarkRead={handleMarkNewsRead} 
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <TodoList 
                        todos={todos} 
                        onToggle={handleToggleTodo} 
                        onDelete={handleDeleteTodo} 
                      />
                      <Schedule 
                        schedule={MOCK_SCHEDULE} 
                        role={currentUser.role} 
                        onAddEvent={() => alert('日程添加功能开发中...')} 
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="admin-view"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-6"
              >
                <AdminPanel 
                  apps={apps} 
                  logs={logs} 
                  onToggleApp={handleToggleApp} 
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Bottom Navigation (User Only) */}
      {view === 'user' && (
        <nav className="fixed bottom-0 inset-x-0 bg-white border-t border-slate-100 flex items-center justify-around py-2 px-4 z-50">
          <BottomNavItem icon={<MessageSquare className="w-6 h-6" />} label="消息" badge="99+" />
          <BottomNavItem icon={<Mail className="w-6 h-6" />} label="邮件" badge="94" />
          <BottomNavItem icon={<FileText className="w-6 h-6" />} label="文档" />
          <BottomNavItem icon={<LayoutDashboard className="w-6 h-6" />} label="工作台" active />
          <BottomNavItem icon={<Users className="w-6 h-6" />} label="通讯录" />
        </nav>
      )}

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-slate-900/20 backdrop-blur-sm lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}

function BottomNavItem({ icon, label, badge, active }: { 
  icon: ReactNode, 
  label: string, 
  badge?: string,
  active?: boolean 
}) {
  return (
    <button className={`flex flex-col items-center gap-1 relative ${active ? 'text-blue-600' : 'text-slate-400'}`}>
      <div className="relative">
        {icon}
        {badge && (
          <span className="absolute -top-1 -right-2 bg-rose-500 text-white text-[10px] font-bold px-1 rounded-full border border-white">
            {badge}
          </span>
        )}
      </div>
      <span className="text-[10px] font-medium">{label}</span>
    </button>
  );
}

function SidebarItem({ icon, label, active, onClick }: { 
  icon: ReactNode, 
  label: string, 
  active: boolean, 
  onClick: () => void 
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${
        active 
          ? 'bg-brand-50 text-brand-600 shadow-sm ring-1 ring-brand-100' 
          : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
      }`}
    >
      <div className={`${active ? 'text-brand-600' : 'text-slate-400'}`}>
        {icon}
      </div>
      {label}
    </button>
  );
}
