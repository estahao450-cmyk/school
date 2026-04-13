/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { NewsItem } from '../types';
import { Megaphone, FileText, Info, Newspaper, Share2, ZoomIn, ZoomOut, ChevronRight, X } from 'lucide-react';

interface NewsCenterProps {
  news: NewsItem[];
  onMarkRead: (id: string) => void;
}

export default function NewsCenter({ news, onMarkRead }: NewsCenterProps) {
  const [activeTab, setActiveTab] = useState<NewsItem['type'] | 'all'>('all');
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [fontSize, setFontSize] = useState(16);

  const filteredNews = news
    .filter(item => activeTab === 'all' || item.type === activeTab)
    .sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());

  const tabs: { id: NewsItem['type'] | 'all', label: string }[] = [
    { id: 'headline', label: '南工新闻' },
    { id: 'notice', label: '通知公告' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="card-base flex flex-col h-full"
    >
      <div className="p-4 border-b border-slate-50 flex items-center justify-between">
        <div className="flex gap-6">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-2 text-sm transition-all whitespace-nowrap ${
                activeTab === tab.id 
                  ? 'news-tab-active' 
                  : 'news-tab-inactive'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <button className="text-xs text-slate-400 hover:text-blue-600 transition-colors">
          更多 &gt;&gt;
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        <AnimatePresence mode="popLayout">
          {filteredNews.map((item) => (
            <motion.button
              key={item.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={() => {
                setSelectedNews(item);
                onMarkRead(item.id);
              }}
              className="w-full text-left group flex items-center justify-between gap-4 p-3 border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors"
            >
              <h4 className={`text-sm truncate flex-1 ${item.read ? 'text-slate-400' : 'text-slate-700'}`}>
                {item.title}
              </h4>
              <span className="text-[10px] text-slate-400 flex-shrink-0">
                {item.time.split(' ')[0]}
              </span>
            </motion.button>
          ))}
        </AnimatePresence>
      </div>

      {/* News Detail Modal */}
      <AnimatePresence>
        {selectedNews && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col"
            >
              <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setFontSize(prev => Math.max(12, prev - 2))}
                    className="p-2 hover:bg-white rounded-lg transition-colors text-slate-500"
                    title="减小字体"
                  >
                    <ZoomOut className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => setFontSize(prev => Math.min(24, prev + 2))}
                    className="p-2 hover:bg-white rounded-lg transition-colors text-slate-500"
                    title="增大字体"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </button>
                  <button className="p-2 hover:bg-white rounded-lg transition-colors text-slate-500" title="分享">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
                <button 
                  onClick={() => setSelectedNews(null)}
                  className="p-2 hover:bg-white rounded-lg transition-colors text-slate-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8">
                <div className="max-w-prose mx-auto">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs font-bold text-brand-600 uppercase tracking-widest">{selectedNews.type}</span>
                    <span className="text-xs text-slate-400">{selectedNews.time}</span>
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-6 leading-tight">{selectedNews.title}</h2>
                  
                  {selectedNews.image && (
                    <img 
                      src={selectedNews.image} 
                      alt={selectedNews.title} 
                      className="w-full aspect-video rounded-2xl object-cover mb-8 shadow-sm"
                      referrerPolicy="no-referrer"
                    />
                  )}

                  <div 
                    className="text-slate-700 leading-relaxed space-y-4"
                    style={{ fontSize: `${fontSize}px` }}
                  >
                    {selectedNews.content.split('\n').map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                    <p>更多详情请咨询相关部门或登录校内门户网站查看。</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
