import React, { useState } from 'react';
import { Upload, Users, BarChart3, Video, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Card from '../components/Card';
import Button from '../components/Button';

export default function TeacherDashboard() {
  const userName = localStorage.getItem('userName') || 'Teacher';
  const [stats] = useState({
    materialsUploaded: 24,
    studentsEnrolled: 85,
    quizzesCreated: 12,
    meetingsHeld: 8,
  });

  const recentMaterials = [
    { id: 1, name: 'Chapter 5 - Advanced Calculus', date: '2 days ago', students: 85 },
    { id: 2, name: 'Physics Lab Report Template', date: '5 days ago', students: 78 },
    { id: 3, name: 'History Essay Guidelines', date: '1 week ago', students: 82 },
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
      <Header userRole="teacher" userName={userName} />

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold text-foreground mb-2">Welcome, {userName}!</h1>
          <p className="text-muted-foreground">Manage your classes, materials, and student progress.</p>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12"
        >
          <Button variant="primary" fullWidth className="h-auto py-4 flex-col gap-2">
            <Upload size={24} />
            <span>Upload Material</span>
          </Button>
          <Button variant="secondary" fullWidth className="h-auto py-4 flex-col gap-2">
            <Video size={24} />
            <span>Start Meeting</span>
          </Button>
          <Button variant="secondary" fullWidth className="h-auto py-4 flex-col gap-2">
            <BarChart3 size={24} />
            <span>View Analytics</span>
          </Button>
          <Button variant="secondary" fullWidth className="h-auto py-4 flex-col gap-2">
            <Users size={24} />
            <span>Manage Class</span>
          </Button>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {[
            { icon: FileText, label: 'Materials', value: stats.materialsUploaded, color: 'blue' },
            { icon: Users, label: 'Students', value: stats.studentsEnrolled, color: 'purple' },
            { icon: BarChart3, label: 'Quizzes', value: stats.quizzesCreated, color: 'green' },
            { icon: Video, label: 'Meetings', value: stats.meetingsHeld, color: 'orange' },
          ].map((stat, index) => {
            const Icon = stat.icon;
            const colorClasses = {
              blue: 'bg-primary/10 text-primary-foreground',
              purple: 'bg-accent/10 text-accent-foreground',
              green: 'bg-green-100 text-green-500',
              orange: 'bg-orange-100 text-orange-500',
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

        {/* Recent Materials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">Recent Materials</h2>
            <div className="space-y-4">
              {recentMaterials.map((material) => (
                <div key={material.id} className="flex items-center justify-between p-4 bg-card/50 rounded-lg hover:bg-card/60 transition-colors duration-200">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-card/40 rounded-lg flex items-center justify-center">
                      <FileText className="text-primary-foreground" size={20} />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{material.name}</p>
                      <p className="text-sm text-muted-foreground">{material.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users size={18} />
                    <span className="text-sm font-medium">{material.students} students</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}