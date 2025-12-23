
import React, { useState } from 'react';
import { Role, User } from '../types';

interface LoginProps {
  onLogin: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState<Role>(Role.STUDENT);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would be an API call
    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      username: username || 'demo_user',
      name: name || (isLogin ? username : '新用户'),
      role: role,
      avatar: `https://picsum.photos/seed/${username}/200`
    };
    onLogin(mockUser);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-purple-100 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-indigo-600 p-8 text-white text-center">
          <h1 className="text-3xl font-bold">高校心理咨询系统</h1>
          <p className="mt-2 text-indigo-100">温暖守护，悦纳自我</p>
        </div>
        
        <div className="p-8">
          <div className="flex justify-center mb-6">
            <div className="inline-flex rounded-lg border border-slate-200 p-1 bg-slate-50">
              <button 
                onClick={() => setIsLogin(true)}
                className={`px-6 py-2 rounded-md transition-all ${isLogin ? 'bg-white shadow-sm text-indigo-600 font-semibold' : 'text-slate-600'}`}
              >
                登录
              </button>
              <button 
                onClick={() => setIsLogin(false)}
                className={`px-6 py-2 rounded-md transition-all ${!isLogin ? 'bg-white shadow-sm text-indigo-600 font-semibold' : 'text-slate-600'}`}
              >
                注册
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">真实姓名</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" 
                  placeholder="请输入您的姓名"
                  required
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">学号 / 工号</label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" 
                placeholder="请输入学号或工号"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">登录密码</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" 
                placeholder="请输入密码"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">身份选择</label>
              <select 
                value={role}
                onChange={(e) => setRole(e.target.value as Role)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              >
                <option value={Role.STUDENT}>学生 (Student)</option>
                <option value={Role.DOCTOR}>咨询医生 (Doctor)</option>
                <option value={Role.ADMIN}>管理老师 (Admin)</option>
              </select>
            </div>

            <button 
              type="submit"
              className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-lg hover:bg-indigo-700 transition-colors shadow-md hover:shadow-lg mt-6"
            >
              {isLogin ? '立即登录' : '提交注册'}
            </button>
          </form>

          <p className="text-center text-xs text-slate-400 mt-6">
            © 2024 高校心理健康中心 版权所有
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
