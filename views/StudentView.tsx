
import React, { useState } from 'react';
import { User, Message } from '../types';
import { getGeminiChatResponse } from '../services/geminiService';

const StudentView: React.FC<{ user: User }> = ({ user }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: '你好！我是你的专属AI心理助手。今天心情怎么样？有什么想和我聊聊的吗？', timestamp: Date.now() }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { role: 'user', text: input, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const history = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));
    history.push({ role: 'user', parts: [{ text: input }] });

    const response = await getGeminiChatResponse(history);
    setMessages(prev => [...prev, { role: 'model', text: response, timestamp: Date.now() }]);
    setIsLoading(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Quick Stats & Actions */}
      <div className="lg:col-span-1 space-y-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="font-bold text-slate-800 mb-4">我的状态</h3>
          <div className="space-y-4">
            <div className="bg-indigo-50 p-4 rounded-xl">
              <p className="text-xs text-indigo-600 font-semibold mb-1 uppercase">心理压力指数</p>
              <div className="flex items-end gap-2">
                <span className="text-3xl font-bold text-indigo-700">32</span>
                <span className="text-indigo-400 text-sm mb-1">/ 100 (低)</span>
              </div>
            </div>
            <div className="bg-emerald-50 p-4 rounded-xl">
              <p className="text-xs text-emerald-600 font-semibold mb-1 uppercase">已完成咨询</p>
              <div className="flex items-end gap-2">
                <span className="text-3xl font-bold text-emerald-700">3</span>
                <span className="text-emerald-400 text-sm mb-1">次</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="font-bold text-slate-800 mb-4">快捷操作</h3>
          <div className="grid grid-cols-2 gap-3">
            <button className="flex flex-col items-center justify-center p-4 bg-slate-50 hover:bg-indigo-50 hover:text-indigo-600 rounded-xl transition-all group">
              <div className="p-3 bg-white rounded-lg shadow-sm group-hover:bg-indigo-100 mb-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <span className="text-sm font-medium">预约咨询</span>
            </button>
            <button className="flex flex-col items-center justify-center p-4 bg-slate-50 hover:bg-rose-50 hover:text-rose-600 rounded-xl transition-all group">
              <div className="p-3 bg-white rounded-lg shadow-sm group-hover:bg-rose-100 mb-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <span className="text-sm font-medium">心理测评</span>
            </button>
          </div>
        </div>
      </div>

      {/* AI Chatbot */}
      <div className="lg:col-span-2 flex flex-col bg-white rounded-2xl shadow-sm border border-slate-100 h-[600px] overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
          <div>
            <h3 className="font-bold text-slate-800">AI 心理树洞</h3>
            <p className="text-xs text-slate-400">7x24小时温暖陪伴</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] px-4 py-2 rounded-2xl ${
                msg.role === 'user' 
                ? 'bg-indigo-600 text-white rounded-tr-none' 
                : 'bg-slate-100 text-slate-700 rounded-tl-none'
              }`}>
                <p className="text-sm">{msg.text}</p>
                <p className="text-[10px] mt-1 opacity-50 text-right">
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-slate-100 px-4 py-2 rounded-2xl rounded-tl-none flex gap-1 items-center">
                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-75"></div>
                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-150"></div>
              </div>
            </div>
          )}
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-100">
          <div className="flex gap-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1 px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="在这里输入你想聊的内容..."
            />
            <button 
              onClick={handleSendMessage}
              disabled={isLoading || !input.trim()}
              className="bg-indigo-600 text-white px-6 py-2 rounded-xl hover:bg-indigo-700 disabled:opacity-50 transition-colors shadow-sm"
            >
              发送
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentView;
