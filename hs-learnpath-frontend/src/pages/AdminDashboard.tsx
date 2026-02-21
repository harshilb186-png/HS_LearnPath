import React, { useState } from 'react';
import { Users, BookOpen, BarChart3, TrendingUp, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Card from '../components/Card';

export default function AdminDashboard() {
  const userName = localStorage.getItem('userName') || 'Admin';
  const [stats] = useState({
    totalUsers: 1250,
    totalTeachers: 45,
    totalStudents: 1200,
    totalMaterials: 320,
    activeClasses: 28,
    quizzesCreated: 156,
  });

  const recentActivities = [
    { id: 1, user: 'John Teacher', action: 'Uploaded new PDF', time: '2 hours ago', type: 'upload' },
    { id: 2, user: 'Jane Student', action: 'Completed quiz', time: '4 hours ago', type: 'quiz' },
    { id: 3, user: 'Mike Teacher', action: 'Started live meeting', time: '6 hours ago', type: 'meeting' },
    { id: 4, user: 'Sarah Student', action: 'Submitted assignment', time: '8 hours ago', type: 'assignment' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen bg-background">
      <Header userRole="admin" userName={userName} />

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold text-foreground mb-2">Welcome back, {userName}!</h1>
          <p className="text-muted-foreground">Here's what's happening in your platform today.</p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          {[
            { icon: Users, label: 'Total Users', value: stats.totalUsers, color: 'blue' },
            { icon: BookOpen, label: 'Materials', value: stats.totalMaterials, color: 'purple' },
            { icon: BarChart3, label: 'Quizzes', value: stats.quizzesCreated, color: 'green' },
            { icon: Users, label: 'Teachers', value: stats.totalTeachers, color: 'orange' },
            { icon: Users, label: 'Students', value: stats.totalStudents, color: 'pink' },
            { icon: TrendingUp, label: 'Active Classes', value: stats.activeClasses, color: 'indigo' },
          ].map((stat, index) => {
            const Icon = stat.icon;
            const colorClasses = {
              blue: 'bg-primary/10 text-primary-foreground',
              purple: 'bg-accent/10 text-accent-foreground',
              green: 'bg-green-100 text-green-500',
              orange: 'bg-orange-100 text-orange-500',
              pink: 'bg-pink-100 text-pink-500',
              indigo: 'bg-indigo-100 text-indigo-500',
            };

            return (
              <motion.div key={index} variants={itemVariants}>
                <Card className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-muted-foreground text-sm font-medium mb-1">{stat.label}</p>
                      <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                    </div>
                    <div className={`p-3 rounded-lg ${colorClasses[stat.color as keyof typeof colorClasses]}`}>
                      <Icon size={24} />
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Recent Activities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">Recent Activities</h2>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-4 bg-card/50 rounded-lg hover:bg-card/60 transition-colors duration-200">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {activity.user.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{activity.user}</p>
                      <p className="text-sm text-muted-foreground">{activity.action}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{activity.time}</p>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* System Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12"
        >
          <Card className="p-8 border-green-200 bg-card/50">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <AlertCircle className="text-green-500" size={24} />
              </div>
              <div>
                <h3 className="font-bold text-foreground">System Status</h3>
                <p className="text-sm text-muted-foreground">All systems operational. No issues detected.</p>
              </div>
            </div>
          </Card>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}