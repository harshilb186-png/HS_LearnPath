
export type Module = {
  id: string;
  title: string;
  description: string;
  content: string;
  status: 'completed' | 'in-progress' | 'remaining';
  duration: string;
};

export type Curriculum = {
  id: string;
  title: string;
  careerPath: string;
  totalProgress: number;
  modules: Module[];
};

export const MOCK_CURRICULUM: Curriculum = {
  id: 'path-1',
  title: 'Modern Full-Stack Development',
  careerPath: 'Senior Software Engineer',
  totalProgress: 35,
  modules: [
    {
      id: 'm1',
      title: 'Advanced React Patterns',
      description: 'Mastering performance, composition, and state management in modern React applications.',
      content: 'This module covers: Higher-Order Components, Render Props, Custom Hooks, Context API optimization, and the new Concurrent Mode features. We explore how to build scalable UI systems using Atomic Design principles. Detailed analysis of state machines using XState for complex UI workflows. Performance profiling using React DevTools and optimization techniques like memoization and virtualization for large lists.',
      status: 'completed',
      duration: '12h'
    },
    {
      id: 'm2',
      title: 'Node.js Microservices Architecture',
      description: 'Building scalable, distributed systems using Node.js, Docker, and Kubernetes.',
      content: 'Deep dive into microservices communication patterns: Synchronous (REST, gRPC) and Asynchronous (Message Queues, Pub/Sub with Redis or RabbitMQ). Implementation of an API Gateway using NestJS. Database per service pattern and strategies for distributed transactions (Saga pattern). Deployment orchestration with Kubernetes and CI/CD pipelines using GitHub Actions.',
      status: 'in-progress',
      duration: '18h'
    },
    {
      id: 'm3',
      title: 'System Design and Scalability',
      description: 'Designing high-availability systems that serve millions of concurrent users.',
      content: 'Load balancing strategies (Layer 4 vs Layer 7), Caching layers (CDN, Redis, Memcached), Database sharding and replication (Read-only replicas vs Multi-master). Understanding CAP theorem and choosing the right consistency model. Real-world case studies of systems like Netflix, Uber, and WhatsApp.',
      status: 'remaining',
      duration: '24h'
    },
    {
      id: 'm4',
      title: 'DevOps & Cloud Infrastructure',
      description: 'Managing cloud infrastructure with Terraform and AWS.',
      content: 'Infrastructure as Code (IaC) principles. Managing AWS resources (EC2, S3, RDS, Lambda) using Terraform scripts. Security best practices including IAM roles and VPC networking. Monitoring and logging using ELK stack and Prometheus/Grafana.',
      status: 'remaining',
      duration: '15h'
    }
  ]
};
