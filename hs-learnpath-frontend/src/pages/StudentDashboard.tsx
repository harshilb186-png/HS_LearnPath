import React, { useState } from 'react';
import { BookOpen, BarChart3, Video, Award, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Card from '../components/Card';
import Button from '../components/Button';

export default function StudentDashboard() {
  const userName = localStorage.getItem('userName') || 'Student';
  const [stats] = useState({
    materialsAccessed: 45,
    quizzesCompleted: 8,
    averageScore: 87,
    meetingsAttended: 12,
  });

  const recentMaterials = [
    { id: 1, name: 'Advanced Calculus - Chapter 5', teacher: 'John Teacher', date: '2 days ago' },
    { id: 2, name: 'Physics Lab Report', teacher: 'Sarah Physics', date: '5 days ago' },
    { id: 3, name: 'History Essay Guidelines', teacher: 'Mike History', date: '1 week ago' },
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
      <Header userRole="student" userName={userName} />

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold text-foreground mb-2">Welcome, {userName}!</h1>
          <p className="text-muted-foreground">Access your materials, take quizzes, and track your progress.</p>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12"
        >
          <Button variant="primary" fullWidth className="h-auto py-4 flex-col gap-2">
            <BookOpen size={24} />
            <span>Browse Materials</span>
          </Button>
          <Button variant="secondary" fullWidth className="h-auto py-4 flex-col gap-2">
            <BarChart3 size={24} />
            <span>Take Quiz</span>
          </Button>
          <Button variant="secondary" fullWidth className="h-auto py-4 flex-col gap-2">
            <Video size={24} />
            <span>Join Meeting</span>
          </Button>
          <Button variant="secondary" fullWidth className="h-auto py-4 flex-col gap-2">
            <Award size={24} />
            <span>View Progress</span>
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
            { icon: BookOpen, label: 'Materials', value: stats.materialsAccessed, color: 'blue' },
            { icon: BarChart3, label: 'Quizzes Done', value: stats.quizzesCompleted, color: 'purple' },
            { icon: Award, label: 'Avg Score', value: `${stats.averageScore}%`, color: 'green' },
            { icon: Video, label: 'Meetings', value: stats.meetingsAttended, color: 'orange' },
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
                      <p className="text-sm text-muted-foreground">by {material.teacher}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{material.date}</p>
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