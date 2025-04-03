import type { ControlPanel } from './types';

export const controlPanelsData: ControlPanel[] = [
  {
    id: '1',
    title: 'AI CORE',
    description: 'Core AI system components and functionalities',
    items: [
      {
        id: '1.1',
        title: 'Authentication',
        description: 'User authentication and identity verification',
        children: [
          {
            id: '1.1.1',
            title: 'Role Detection',
            description: 'Automatic user role detection and assignment',
          },
          {
            id: '1.1.2',
            title: 'Biometrics',
            description: 'Biometric authentication methods',
          },
        ],
      },
      {
        id: '1.2',
        title: 'Data Routing',
        description: 'Intelligent data routing and processing',
        children: [
          {
            id: '1.2.1',
            title: 'NLP Query',
            description: 'Natural language processing for queries',
          },
          {
            id: '1.2.2',
            title: 'Role Filtering',
            description: 'Data filtering based on user roles',
          },
        ],
      },
      {
        id: '1.3',
        title: 'Predictive Engine',
        description: 'AI-powered predictive analytics',
        children: [
          {
            id: '1.3.1',
            title: 'Forecasts',
            description: 'Predictive forecasting and trend analysis',
          },
        ],
      },
    ],
  },
  {
    id: '2',
    title: 'ADMIN',
    description: 'Administrative tools and dashboards',
    items: [
      {
        id: '2.1',
        title: 'System Monitoring',
        description: 'Monitor system performance and health',
        children: [
          {
            id: '2.1.1',
            title: 'Heatmaps',
            description: 'Visual performance heatmaps',
          },
          {
            id: '2.1.2',
            title: 'Infrastructure',
            description: 'Infrastructure monitoring and alerts',
          },
        ],
      },
      {
        id: '2.2',
        title: 'Financial Hub',
        description: 'Financial management and analytics',
        children: [
          {
            id: '2.2.1',
            title: 'Revenue Analytics',
            description: 'Revenue tracking and analytics',
          },
          {
            id: '2.2.2',
            title: 'Audits',
            description: 'Financial audit tools and reports',
          },
        ],
      },
      {
        id: '2.3',
        title: 'User Management',
        description: 'User account management and analytics',
        children: [
          {
            id: '2.3.1',
            title: 'Store Performance',
            description: 'Store-level performance metrics',
          },
          {
            id: '2.3.2',
            title: 'Delivery Fleet',
            description: 'Delivery fleet management and analytics',
          },
        ],
      },
    ],
  },
  {
    id: '3',
    title: 'STORE OWNER',
    description: 'Tools for store owners and managers',
    items: [
      {
        id: '3.1',
        title: 'Inventory',
        description: 'Inventory management tools',
        children: [
          {
            id: '3.1.1',
            title: 'Restocking',
            description: 'Automated inventory restocking',
          },
          {
            id: '3.1.2',
            title: 'Product Tips',
            description: 'AI-driven product recommendations',
          },
        ],
      },
      {
        id: '3.2',
        title: 'Customer360',
        description: 'Comprehensive customer insights',
        children: [
          {
            id: '3.2.1',
            title: 'Sentiment',
            description: 'Customer sentiment analysis',
          },
          {
            id: '3.2.2',
            title: 'Retention',
            description: 'Customer retention strategies',
          },
        ],
      },
      {
        id: '3.3',
        title: 'Order HQ',
        description: 'Order management headquarters',
        children: [
          {
            id: '3.3.1',
            title: 'Order Assigner',
            description: 'Automated order assignment system',
          },
        ],
      },
    ],
  },
  {
    id: '4',
    title: 'DELIVERY',
    description: 'Delivery management and logistics',
    items: [
      {
        id: '4.1',
        title: 'Route Master',
        description: 'Route optimization and management',
        children: [
          {
            id: '4.1.1',
            title: 'Live Routing',
            description: 'Real-time route optimization',
          },
          {
            id: '4.1.2',
            title: 'Vehicle Health',
            description: 'Vehicle maintenance and health monitoring',
          },
        ],
      },
      {
        id: '4.2',
        title: 'Customer Comms',
        description: 'Customer communication tools',
        children: [
          {
            id: '4.2.1',
            title: 'ETAs',
            description: 'Estimated time of arrival predictions',
          },
          {
            id: '4.2.2',
            title: 'Proof',
            description: 'Delivery proof and confirmation system',
          },
        ],
      },
      {
        id: '4.3',
        title: 'Earnings',
        description: 'Earnings tracking and management',
        children: [
          {
            id: '4.3.1',
            title: 'Payroll AI',
            description: 'AI-powered payroll management',
          },
        ],
      },
    ],
  },
  {
    id: '5',
    title: 'SECURITY',
    description: 'Security and data protection',
    items: [
      {
        id: '5.1',
        title: 'Encryption',
        description: 'Data encryption services',
        children: [
          {
            id: '5.1.1',
            title: 'AES-256',
            description: 'AES-256 encryption implementation',
          },
          {
            id: '5.1.2',
            title: 'Tokenization',
            description: 'Data tokenization services',
          },
        ],
      },
      {
        id: '5.2',
        title: 'Anomaly Detection',
        description: 'Security anomaly detection',
        children: [
          {
            id: '5.2.1',
            title: 'Alerts',
            description: 'Security alerts and notifications',
          },
        ],
      },
      {
        id: '5.3',
        title: 'Audit Trails',
        description: 'Security audit trails',
        children: [
          {
            id: '5.3.1',
            title: 'Logs',
            description: 'Detailed security logs and reports',
          },
        ],
      },
    ],
  },
];
