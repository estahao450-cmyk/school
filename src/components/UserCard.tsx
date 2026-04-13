/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ReactNode } from 'react';
import { motion } from 'motion/react';
import { UserProfile, UserRole } from '../types';
import { Camera, CreditCard, BookOpen, Mail, Calendar, Wallet, RefreshCw, ShieldCheck } from 'lucide-react';

interface UserCardProps {
  user: UserProfile;
  onSwitchRole: () => void;
  onUploadAvatar: () => void;
}

export default function UserCard({ user, onSwitchRole, onUploadAvatar }: UserCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl overflow-hidden shadow-sm border border-blue-100 user-card-gradient relative"
    >
      {/* User Management Badge */}
      <div className="absolute top-0 right-0 px-3 py-1 bg-blue-500/80 text-white text-[10px] rounded-bl-xl flex items-center gap-1">
        <ShieldCheck className="w-3 h-3" />
        用户管理
      </div>

      <div className="p-6">
        <div className="flex items-start gap-4 mb-6">
          {/* Avatar Section */}
          <div className="relative group">
            <img 
              src={user.avatar} 
              alt={user.name} 
              className="w-20 h-20 rounded-full object-cover border-2 border-white shadow-sm"
              referrerPolicy="no-referrer"
            />
            <button 
              onClick={onUploadAvatar}
              className="absolute bottom-0 right-0 p-1.5 bg-white rounded-full shadow-md border border-slate-100 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Camera className="w-3 h-3 text-slate-600" />
            </button>
          </div>

          {/* Info Section */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h2 className="text-xl font-bold text-slate-800">{user.name}</h2>
              <button 
                onClick={onSwitchRole}
                className="p-1 hover:bg-white/50 rounded-lg transition-colors text-slate-400 hover:text-blue-600"
                title="切换身份"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>
            
            <div className="space-y-0.5 text-xs text-slate-500">
              {user.role === 'student' ? (
                <>
                  <p>学号 <span className="text-slate-700 ml-2">{user.studentId}</span></p>
                  <p>专业 <span className="text-slate-700 ml-2">{user.major || '-'}</span></p>
                  <p>学院 <span className="text-slate-700 ml-2">{user.college}</span></p>
                </>
              ) : (
                <>
                  <p>工号 <span className="text-slate-700 ml-2">{user.employeeId}</span></p>
                  <p>职称 <span className="text-slate-700 ml-2">{user.title || '-'}</span></p>
                  <p>部门 <span className="text-slate-700 ml-2">{user.department}</span></p>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="bg-white/90 rounded-xl p-3 flex items-center justify-around shadow-sm border border-white/50">
          <div className="flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-blue-400" />
            <span className="text-xs text-slate-500">一卡通余额</span>
            <span className="text-sm font-bold text-slate-800">{user.balance.toFixed(1)}</span>
            <span className="text-[10px] text-slate-400">(元)</span>
          </div>
          <div className="w-px h-4 bg-slate-100" />
          <div className="flex items-center gap-2">
            {user.role === 'student' ? (
              <>
                <BookOpen className="w-4 h-4 text-emerald-400" />
                <span className="text-xs text-slate-500">在借数量</span>
                <span className="text-sm font-bold text-slate-800">{user.borrowedBooks}</span>
                <span className="text-[10px] text-slate-400">(本)</span>
              </>
            ) : (
              <>
                <Mail className="w-4 h-4 text-amber-400" />
                <span className="text-xs text-slate-500">我的待办</span>
                <span className="text-sm font-bold text-slate-800">{user.unreadEmails}</span>
                <span className="text-[10px] text-slate-400">(个)</span>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function QuickStatItem({ icon, label, value, color, highlight = false }: { 
  icon: ReactNode, 
  label: string, 
  value: string, 
  color: string,
  highlight?: boolean
}) {
  return (
    <button className="flex flex-col items-center p-3 rounded-xl hover:bg-slate-50 transition-colors group">
      <div className={`p-2 rounded-lg bg-${color}-50 mb-2 group-hover:scale-110 transition-transform`}>
        {icon}
      </div>
      <p className="text-[10px] text-slate-400 uppercase tracking-widest mb-0.5">{label}</p>
      <p className={`text-sm font-bold ${highlight ? 'text-rose-500' : 'text-slate-700'}`}>{value}</p>
    </button>
  );
}
