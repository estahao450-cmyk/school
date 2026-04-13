/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, ReactNode } from 'react';
import { motion } from 'motion/react';
import { UserRole } from '../types';
import { LayoutDashboard, ShieldCheck, GraduationCap, User, Lock, ArrowRight } from 'lucide-react';

interface LoginPageProps {
  onLogin: (role: UserRole) => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [selectedRole, setSelectedRole] = useState<UserRole>('student');

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4 font-sans">
      <div className="max-w-md w-full">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden"
        >
          <div className="p-8 pb-4 text-center">
            <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200 mx-auto mb-6">
              <LayoutDashboard className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900">高校企业微信工作台</h1>
            <p className="text-slate-400 mt-2 text-sm">请选择您的身份并登录系统</p>
          </div>

          <div className="p-8 pt-4 space-y-6">
            <div className="grid grid-cols-3 gap-3">
              <RoleButton 
                active={selectedRole === 'student'} 
                onClick={() => setSelectedRole('student')}
                icon={<GraduationCap className="w-6 h-6" />}
                label="学生"
              />
              <RoleButton 
                active={selectedRole === 'teacher'} 
                onClick={() => setSelectedRole('teacher')}
                icon={<User className="w-6 h-6" />}
                label="教职工"
              />
              <RoleButton 
                active={selectedRole === 'admin'} 
                onClick={() => setSelectedRole('admin')}
                icon={<ShieldCheck className="w-6 h-6" />}
                label="管理员"
              />
            </div>

            <div className="space-y-4">
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input 
                  type="text" 
                  placeholder={selectedRole === 'admin' ? "管理员账号" : "学号 / 工号"}
                  className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm"
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input 
                  type="password" 
                  placeholder="请输入密码"
                  className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm"
                />
              </div>
            </div>

            <button 
              onClick={() => onLogin(selectedRole)}
              className="w-full py-4 bg-blue-600 text-white font-bold rounded-2xl shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all active:scale-[0.98] flex items-center justify-center gap-2 group"
            >
              立即登录
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="flex items-center justify-between text-xs text-slate-400">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" />
                记住我
              </label>
              <button className="hover:text-blue-600 transition-colors">忘记密码？</button>
            </div>
          </div>

          <div className="p-4 bg-slate-50 text-center border-t border-slate-100">
            <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">
              © 2024 南京工业大学 信息化建设与管理办公室
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function RoleButton({ active, onClick, icon, label }: { 
  active: boolean, 
  onClick: () => void, 
  icon: ReactNode, 
  label: string 
}) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${
        active 
          ? 'border-blue-500 bg-blue-50 text-blue-600 shadow-sm' 
          : 'border-slate-100 bg-white text-slate-400 hover:border-slate-200 hover:bg-slate-50'
      }`}
    >
      {icon}
      <span className="text-xs font-bold">{label}</span>
    </button>
  );
}
