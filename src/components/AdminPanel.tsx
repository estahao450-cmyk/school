/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion } from 'motion/react';
import { AppConfig, AuditLog } from '../types';
import { Settings, Shield, List, Search, Download, ToggleLeft, ToggleRight, Bell, Type, Layout, Clock } from 'lucide-react';

interface AdminPanelProps {
  apps: AppConfig[];
  logs: AuditLog[];
  onToggleApp: (id: string) => void;
}

export default function AdminPanel({ apps, logs, onToggleApp }: AdminPanelProps) {
  const [activeView, setActiveView] = useState<'apps' | 'logs' | 'announcements'>('apps');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-2">
        <button 
          onClick={() => setActiveView('apps')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${activeView === 'apps' ? 'bg-brand-500 text-white shadow-md' : 'bg-white text-slate-500 hover:bg-slate-50'}`}
        >
          <Settings className="w-4 h-4" />
          应用配置
        </button>
        <button 
          onClick={() => setActiveView('announcements')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${activeView === 'announcements' ? 'bg-brand-500 text-white shadow-md' : 'bg-white text-slate-500 hover:bg-slate-50'}`}
        >
          <Bell className="w-4 h-4" />
          滚动公告
        </button>
        <button 
          onClick={() => setActiveView('logs')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${activeView === 'logs' ? 'bg-brand-500 text-white shadow-md' : 'bg-white text-slate-500 hover:bg-slate-50'}`}
        >
          <Shield className="w-4 h-4" />
          日志审计
        </button>
      </div>

      <motion.div 
        key={activeView}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="card-base"
      >
        {activeView === 'apps' && (
          <div className="p-6">
            <h3 className="text-xl font-bold text-slate-900 mb-6">企业微信应用管理</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {apps.map(app => (
                <div key={app.id} className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-slate-800">{app.name}</h4>
                    <div className="flex gap-1 mt-1">
                      {app.permissions.map(p => (
                        <span key={p} className="text-[10px] px-1.5 py-0.5 bg-white border border-slate-200 text-slate-500 rounded font-bold uppercase">
                          {p === 'student' ? '学生' : p === 'teacher' ? '教师' : '管理员'}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button 
                    onClick={() => onToggleApp(app.id)}
                    className={`transition-colors ${app.enabled ? 'text-brand-500' : 'text-slate-300'}`}
                  >
                    {app.enabled ? <ToggleRight className="w-10 h-10" /> : <ToggleLeft className="w-10 h-10" />}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeView === 'announcements' && (
          <div className="p-6">
            <h3 className="text-xl font-bold text-slate-900 mb-6">滚动公告配置</h3>
            <div className="space-y-6 max-w-2xl">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                  <Layout className="w-4 h-4" /> 公告位置
                </label>
                <select className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-brand-500 outline-none">
                  <option>顶部通栏</option>
                  <option>资讯中心上方</option>
                  <option>个人卡片下方</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                  <Type className="w-4 h-4" /> 公告内容
                </label>
                <textarea 
                  className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-brand-500 outline-none h-32"
                  placeholder="输入公告内容，多条请换行..."
                  defaultValue={"欢迎使用高校企业微信工作台！\n请各位老师及时提交本周教学进度报告。\n图书馆本周六凌晨维护，请知悉。"}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                    <Clock className="w-4 h-4" /> 轮播间隔 (秒)
                  </label>
                  <input type="number" defaultValue={5} className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-brand-500 outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                    <Type className="w-4 h-4" /> 字体大小
                  </label>
                  <select className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-brand-500 outline-none">
                    <option>小 (12px)</option>
                    <option selected>中 (14px)</option>
                    <option>大 (16px)</option>
                  </select>
                </div>
              </div>
              <button className="w-full py-3 bg-brand-500 text-white font-bold rounded-xl shadow-lg shadow-brand-200 hover:bg-brand-600 transition-all active:scale-95">
                保存配置
              </button>
            </div>
          </div>
        )}

        {activeView === 'logs' && (
          <div className="p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <h3 className="text-xl font-bold text-slate-900">日志审计</h3>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="搜索日志..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-brand-500 outline-none text-sm"
                  />
                </div>
                <button className="p-2 bg-slate-100 text-slate-600 rounded-xl hover:bg-slate-200 transition-colors" title="导出日志">
                  <Download className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="pb-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">操作人</th>
                    <th className="pb-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">时间</th>
                    <th className="pb-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">内容</th>
                    <th className="pb-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">结果</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {logs.filter(log => log.content.includes(searchQuery) || log.operator.includes(searchQuery)).map(log => (
                    <tr key={log.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-4 text-sm font-bold text-slate-700">{log.operator}</td>
                      <td className="py-4 text-sm text-slate-500 font-mono">{log.time}</td>
                      <td className="py-4 text-sm text-slate-600">{log.content}</td>
                      <td className="py-4">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${log.result === 'success' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                          {log.result === 'success' ? '成功' : '失败'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
