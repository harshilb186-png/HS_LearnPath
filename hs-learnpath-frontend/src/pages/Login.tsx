import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';
import AuthLayout from '../components/AuthLayout';
import Input from '../components/Input';
import Button from '../components/Button';
import { toast } from 'react-toastify';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors: typeof errors = {};
    if (!email) newErrors.email = 'Email is required';
    if (!password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      // TODO: Replace with actual API call to your Spring backend
      // const response = await fetch('http://localhost:8080/api/auth/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password }),
      // });
      // const data = await response.json();

      // Mock authentication for demo
      const mockUsers: Record<string, { password: string; role: 'admin' | 'teacher' | 'student'; name: string }> = {
        'admin@learnpath.com': { password: 'admin123', role: 'admin', name: 'Admin User' },
        'teacher@learnpath.com': { password: 'teacher123', role: 'teacher', name: 'John Teacher' },
        'student@learnpath.com': { password: 'student123', role: 'student', name: 'Jane Student' },
      };

      const user = mockUsers[email];
      if (!user || user.password !== password) {
        toast.error('Invalid email or password');
        setLoading(false);
        return;
      }

      localStorage.setItem('authToken', 'mock-token-' + Date.now());
      localStorage.setItem('userRole', user.role);
      localStorage.setItem('userName', user.name);
      localStorage.setItem('userEmail', email);

      toast.success('Login successful!');
      navigate(`/${user.role}/dashboard`);
    } catch (error) {
      toast.error('Login failed. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Welcome Back" subtitle="Sign in to your LearnPath+ account">
      <form onSubmit={handleLogin} className="space-y-6">
        <Input
          label="Email Address"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (errors.email) setErrors({ ...errors, email: '' });
          }}
          error={errors.email}
          icon={<Mail size={18} />}
          required
        />

        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (errors.password) setErrors({ ...errors, password: '' });
          }}
          error={errors.password}
          icon={<Lock size={18} />}
          required
        />

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="w-4 h-4 rounded border-slate-300" />
            <span className="text-slate-600">Remember me</span>
          </label>
          <a href="#" className="text-blue-600 hover:text-blue-700 font-semibold">
            Forgot password?
          </a>
        </div>

        <Button type="submit" fullWidth loading={loading}>
          Sign In
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-slate-600">Or</span>
          </div>
        </div>

        <p className="text-center text-slate-600">
          Don't have an account?{' '}
          <button
            type="button"
            onClick={() => navigate('/signup')}
            className="text-blue-600 hover:text-blue-700 font-semibold"
          >
            Sign up
          </button>
        </p>

        {/* Demo Credentials */}
        <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-xs font-semibold text-blue-900 mb-2">Demo Credentials:</p>
          <div className="space-y-1 text-xs text-blue-800">
            <p><strong>Admin:</strong> admin@learnpath.com / admin123</p>
            <p><strong>Teacher:</strong> teacher@learnpath.com / teacher123</p>
            <p><strong>Student:</strong> student@learnpath.com / student123</p>
          </div>
        </div>
      </form>
    </AuthLayout>
  );
}