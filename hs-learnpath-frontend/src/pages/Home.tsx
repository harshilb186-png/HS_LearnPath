import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, BookOpen, Users, BarChart3, Video, Zap, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../components/Button';
import Card from '../components/Card';

export default function Home() {
  const navigate = useNavigate();
  const isAuthenticated = Boolean(localStorage.getItem('authToken'));

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
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-border/20 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-lg">HS</span>
            </div>
            <h1 className="text-xl font-bold text-foreground">HS LearnPath+</h1>
          </div>
          <div className="flex gap-4">
            {isAuthenticated ? (
              <Button onClick={() => navigate('/admin/dashboard')}>Dashboard</Button>
            ) : (
              <>
                <Button variant="ghost" onClick={() => navigate('/login')}>
                  Sign In
                </Button>
                <Button onClick={() => navigate('/signup')}>Get Started</Button>
              </>
            )}
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 py-24 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              The Future of <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Education</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              HS LearnPath+ combines AI-powered learning, real-time collaboration, and comprehensive analytics to transform education.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={() => navigate('/signup')}>
                Start Learning <ArrowRight size={20} />
              </Button>
              <Button size="lg" variant="secondary" onClick={() => navigate('/login')}>
                Sign In
              </Button>
            </div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative rounded-2xl overflow-hidden shadow-2xl"
          >
            <img
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=600&fit=crop"
              alt="HS LearnPath+ Platform"
              className="w-full h-auto object-cover filter brightness-75"
              width={1200}
              height={600}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" aria-hidden />
            <div className="absolute left-8 bottom-8 text-left">
              <h3 className="text-2xl font-bold text-white">AI-driven learning for schools</h3>
              <p className="text-sm text-white/80">Create, share and analyze learning materials with ease.</p>
            </div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h3 className="text-4xl font-bold text-foreground mb-4">Powerful Features</h3>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Everything you need to teach, learn, and grow together.
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {[
                {
                  icon: BookOpen,
                  title: 'Material Management',
                  description: 'Upload, organize, and share educational materials with ease.',
                },
                {
                  icon: BarChart3,
                  title: 'AI-Powered Quizzes',
                  description: 'Generate intelligent quizzes from materials using NotebookLM.',
                },
                {
                  icon: Video,
                  title: 'Live Meetings',
                  description: 'Conduct real-time classes with automatic attendance tracking.',
                },
                {
                  icon: Users,
                  title: 'Role-Based Access',
                  description: 'Separate dashboards for admins, teachers, and students.',
                },
                {
                  icon: Zap,
                  title: 'Analytics & Insights',
                  description: 'Track progress and performance with detailed analytics.',
                },
                {
                  icon: Shield,
                  title: 'Secure & Reliable',
                  description: 'Enterprise-grade security with MongoDB Atlas backend.',
                },
              ].map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div key={index} variants={itemVariants}>
                    <Card className="p-8 h-full">
                      <div className="w-12 h-12 bg-card/50 rounded-lg flex items-center justify-center mb-4">
                        <Icon className="text-primary-foreground" size={24} />
                      </div>
                      <h4 className="text-xl font-bold text-foreground mb-2">{feature.title}</h4>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h3 className="text-4xl font-bold text-foreground mb-4">Ready to Transform Education?</h3>
              <p className="text-xl text-muted-foreground mb-8">
                Join thousands of educators and students using HS LearnPath+ today.
              </p>
              <Button size="lg" variant="primary" onClick={() => navigate('/signup')}>
                Get Started Now <ArrowRight size={20} />
              </Button>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-card text-card-foreground py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-400 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">HS</span>
              </div>
              <h3 className="text-lg font-bold">HS LearnPath+</h3>
            </div>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-card-foreground transition-colors duration-200">Privacy</a>
              <a href="#" className="hover:text-card-foreground transition-colors duration-200">Terms</a>
              <a href="#" className="hover:text-card-foreground transition-colors duration-200">Contact</a>
            </div>
          </div>
          <div className="border-t border-border/10 pt-8 text-center text-muted-foreground text-sm">
            <p>&copy; 2026 HS LearnPath+. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}