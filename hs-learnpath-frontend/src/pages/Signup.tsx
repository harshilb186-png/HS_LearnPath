import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, BookOpen } from 'lucide-react';
import AuthLayout from '../components/AuthLayout';
import Input from '../components/Input';
import Select from '../components/Select';
import Button from '../components/Button';
import { toast } from 'react-toastify';

export default function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!formData.role) newErrors.role = 'Please select a role';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      // TODO: Replace with actual API call to your Spring backend
      // const response = await fetch('http://localhost:8080/api/auth/signup', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData),
      // });

      localStorage.setItem('authToken', 'mock-token-' + Date.now());
      localStorage.setItem('userRole', formData.role);
      localStorage.setItem('userName', formData.name);
      localStorage.setItem('userEmail', formData.email);

      toast.success('Account created successfully!');
      navigate(`/${formData.role}/dashboard`);
    } catch (error) {
      toast.error('Signup failed. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Create Account" subtitle="Join LearnPath+ today">
      <form onSubmit={handleSignup} className="space-y-6">
        <Input
          label="Full Name"
          placeholder="John Doe"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          error={errors.name}
          icon={<User size={18} />}
          required
        />

        <Input
          label="Email Address"
          type="email"
          placeholder="you@example.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          error={errors.email}
          icon={<Mail size={18} />}
          required
        />

        <Select
          label="I am a"
          options={[
            { value: 'student', label: 'Student' },
            { value: 'teacher', label: 'Teacher' },
            { value: 'admin', label: 'Admin' },
          ]}
          value={formData.role}
          onChange={(value) => setFormData({ ...formData, role: value })}
          error={errors.role}
          icon={<BookOpen size={18} />}
          required
        />

        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          error={errors.password}
          icon={<Lock size={18} />}
          required
        />

        <Input
          label="Confirm Password"
          type="password"
          placeholder="••••••••"
          value={formData.confirmPassword}
          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
          error={errors.confirmPassword}
          icon={<Lock size={18} />}
          required
        />

        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" className="w-4 h-4 rounded border-slate-300" required />
          <span className="text-sm text-slate-600">
            I agree to the{' '}
            <a href="#" className="text-blue-600 hover:text-blue-700 font-semibold">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="text-blue-600 hover:text-blue-700 font-semibold">
              Privacy Policy
            </a>
          </span>
        </label>

        <Button type="submit" fullWidth loading={loading}>
          Create Account
        </Button>

        <p className="text-center text-slate-600">
          Already have an account?{' '}
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="text-blue-600 hover:text-blue-700 font-semibold"
          >
            Sign in
          </button>
        </p>
      </form>
    </AuthLayout>
  );
}