
import React from 'react';
import { User } from '../types';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: '周一', count: 4 },
  { name: '周二', count: 6 },
  { name: '周三', count: 3 },
  { name: '周四', count: 8 },
  { name: '周五', count: 5 },
  { name: '周六', count: 2 },
  { name: '周日', count: 1 },
];

const DoctorView: React.FC<{ user: User }> = ({ user }) => {
  return (
    <div className="space-y-8">
      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: '今日咨询', value: '4', color: 'bg-indigo-50 text-indigo-600' },
          { label: '待处理预约', value: '12', color: 'bg-amber-50 text-amber-600' },
          { label: '本月服务人数', value: '86', color: 'bg-emerald-50 text-emerald-600' },
          { label: '患者好评率', value: '98%', color: 'bg-rose-50 text-rose-600' },
        ].map((stat, i) => (
          <div key={i} className={`${stat.color} p-6 rounded-2xl border border-white shadow-sm`}>
            <p className="text-xs font-bold uppercase tracking-wider mb-2 opacity-70">{stat.label}</p>
            <p className="text-3xl font-black">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Appointments List */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-slate-800">今日预约安排</h3>
            <button className="text-indigo-600 text-sm font-medium hover:underline">查看完整日程</button>
          </div>
          <div className="space-y-4">
            {[
              { name: '张同学', time: '10:00 - 11:00', type: '初诊', status: '待进行' },
              { name: '李同学', time: '14:00 - 15:00', type: '复诊', status: '待进行' },
              { name: '王同学', time: '16:30 - 17:30', type: '危机干预', status: '重要' },
            ].map((apt, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center font-bold text-slate-400 border border-slate-200">
                    {apt.name[0]}
                  </div>
                  <div>
                    <p className="font-bold text-slate-800">{apt.name}</p>
                    <p className="text-xs text-slate-500">{apt.time} · {apt.type}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${apt.status === '重要' ? 'bg-rose-100 text-rose-600' : 'bg-indigo-100 text-indigo-600'}`}>
                    {apt.status}
                  </span>
                  <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Workload Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="font-bold text-slate-800 mb-6">本周咨询趋势</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94a3b8'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94a3b8'}} />
                <Tooltip />
                <Area type="monotone" dataKey="count" stroke="#4f46e5" fillOpacity={1} fill="url(#colorCount)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <p className="text-center text-xs text-slate-400 mt-4">咨询次数随时间变化情况</p>
        </div>
      </div>
    </div>
  );
};

export default DoctorView;
