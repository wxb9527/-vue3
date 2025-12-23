
import React from 'react';
import { User, Role } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: '计算机学院', 咨询: 400, 测评: 240 },
  { name: '商学院', 咨询: 300, 测评: 139 },
  { name: '艺术学院', 咨询: 200, 测评: 980 },
  { name: '医学院', 咨询: 278, 测评: 390 },
  { name: '外语学院', 咨询: 189, 测评: 480 },
];

const AdminView: React.FC<{ user: User }> = ({ user }) => {
  return (
    <div className="space-y-8">
      {/* Global Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: '注册学生总数', value: '12,402', color: 'border-l-4 border-indigo-500' },
          { label: '专职咨询师', value: '24', color: 'border-l-4 border-emerald-500' },
          { label: '本周新增预警', value: '3', color: 'border-l-4 border-rose-500 text-rose-600' },
          { label: '系统在线人数', value: '156', color: 'border-l-4 border-sky-500' },
        ].map((stat, i) => (
          <div key={i} className={`bg-white p-6 rounded-xl shadow-sm border border-slate-100 ${stat.color}`}>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{stat.label}</p>
            <p className="text-2xl font-bold mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Department Distribution */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="font-bold text-slate-800 mb-6">各学院心理健康服务统计</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94a3b8'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94a3b8'}} />
                <Tooltip cursor={{fill: '#f8fafc'}} />
                <Legend />
                <Bar dataKey="咨询" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                <Bar dataKey="测评" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity Log */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="font-bold text-slate-800 mb-6">系统最新日志</h3>
          <div className="space-y-6">
            {[
              { time: '10分钟前', user: '系统管理员', action: '更新了咨询师排班表', icon: 'bg-indigo-100 text-indigo-600' },
              { time: '45分钟前', user: '周医生', action: '提交了学生 [李某] 的初诊报告', icon: 'bg-emerald-100 text-emerald-600' },
              { time: '2小时前', user: '系统监控', action: '触发自动预警：检测到高压力测评结果', icon: 'bg-rose-100 text-rose-600' },
              { time: '4小时前', user: '陈医生', action: '完成了危机干预案例记录', icon: 'bg-amber-100 text-amber-600' },
            ].map((log, idx) => (
              <div key={idx} className="flex gap-4">
                <div className={`w-10 h-10 rounded-full shrink-0 flex items-center justify-center ${log.icon}`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-800 text-sm">{log.user}</span>
                    <span className="text-[10px] text-slate-400 font-medium">{log.time}</span>
                  </div>
                  <p className="text-sm text-slate-600 mt-0.5">{log.action}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-8 py-2 border-2 border-dashed border-slate-200 text-slate-400 text-sm rounded-xl hover:border-indigo-300 hover:text-indigo-400 transition-all">
            点击查看更多日志
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminView;
