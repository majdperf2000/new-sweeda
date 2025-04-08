import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.js';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.js';
import { Lock, Server, LayoutGrid, Puzzle, BarChart, FileText } from 'lucide-react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  MarkerType,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

interface NodeData {
  label: string;
  icon?: React.ReactNode;
  technologies?: string[];
  description?: string;
}

const CustomNode = ({ data }: { data: NodeData }) => {
  return (
    <div className="p-2 rounded-md border bg-white shadow-sm min-w-40">
      <div className="flex items-center mb-1">
        {data.icon && <div className="mr-2">{data.icon}</div>}
        <div className="font-medium">{data.label}</div>
      </div>
      {data.technologies && (
        <div className="text-xs text-muted-foreground">{data.technologies.join(' • ')}</div>
      )}
    </div>
  );
};

const nodeTypes = {
  custom: CustomNode,
};

export const SystemArchitecture = () => {
  const [activeTab, setActiveTab] = useState<string>('visual');

  const initialNodes = [
    {
      id: 'security',
      type: 'custom',
      position: { x: 250, y: 50 },
      data: {
        label: 'Security Layer',
        icon: <Lock className="h-4 w-4" />,
        technologies: ['Auth0/JWT', 'Encrypted DB'],
        description: 'Authentication and data protection',
      },
      style: { background: '#FFEFEF', borderColor: '#FFC5C5' },
    },
    {
      id: 'backend',
      type: 'custom',
      position: { x: 250, y: 180 },
      data: {
        label: 'Backend',
        icon: <Server className="h-4 w-4" />,
        technologies: ['Node.js + MongoDB', 'REST API'],
        description: 'Server and database infrastructure',
      },
      style: { background: '#EFF8FF', borderColor: '#C5DCFF' },
    },
    {
      id: 'frontend',
      type: 'custom',
      position: { x: 250, y: 310 },
      data: {
        label: 'Frontend',
        icon: <LayoutGrid className="h-4 w-4" />,
        technologies: ['React + Bootstrap', 'Responsive UI'],
        description: 'User interface components',
      },
      style: { background: '#EFFFEF', borderColor: '#C5FFC5' },
    },
    {
      id: 'features',
      type: 'custom',
      position: { x: 250, y: 440 },
      data: {
        label: 'Features',
        icon: <Puzzle className="h-4 w-4" />,
        technologies: ['Admin + Store + Delivery Panels', 'Real-time Updates'],
        description: 'Application functionality',
      },
      style: { background: '#F8EFFF', borderColor: '#DCC5FF' },
    },
    {
      id: 'analytics',
      type: 'custom',
      position: { x: 100, y: 560 },
      data: {
        label: 'Analytics',
        icon: <BarChart className="h-4 w-4" />,
        technologies: ['Dashboard Analytics', 'Data Visualization'],
        description: 'Performance monitoring and insights',
      },
      style: { background: '#FFF8EF', borderColor: '#FFDEC5' },
    },
    {
      id: 'reporting',
      type: 'custom',
      position: { x: 400, y: 560 },
      data: {
        label: 'Reporting',
        icon: <FileText className="h-4 w-4" />,
        technologies: ['Export Capabilities', 'Custom Reports'],
        description: 'Data export and reporting tools',
      },
      style: { background: '#F0EFFF', borderColor: '#C5CAFF' },
    },
  ];

  const initialEdges = [
    {
      id: 's-b',
      source: 'security',
      target: 'backend',
      animated: true,
      style: { stroke: '#888' },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        width: 15,
        height: 15,
      },
    },
    {
      id: 'b-f',
      source: 'backend',
      target: 'frontend',
      animated: true,
      style: { stroke: '#888' },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        width: 15,
        height: 15,
      },
    },
    {
      id: 'f-ft',
      source: 'frontend',
      target: 'features',
      animated: true,
      style: { stroke: '#888' },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        width: 15,
        height: 15,
      },
    },
    {
      id: 'ft-an',
      source: 'features',
      target: 'analytics',
      animated: true,
      style: { stroke: '#888' },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        width: 15,
        height: 15,
      },
    },
    {
      id: 'ft-rp',
      source: 'features',
      target: 'reporting',
      animated: true,
      style: { stroke: '#888' },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        width: 15,
        height: 15,
      },
    },
  ];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  return (
    <div className="p-4 border rounded-lg">
      <Tabs defaultValue="visual" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="visual">Visual Map</TabsTrigger>
          <TabsTrigger value="details">Component Details</TabsTrigger>
          <TabsTrigger value="connections">Connections</TabsTrigger>
        </TabsList>

        <TabsContent value="visual" className="space-y-6">
          <div className="h-[600px] bg-accent/20 rounded-md">
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              nodeTypes={nodeTypes}
              fitView
              proOptions={{ hideAttribution: true }}
            >
              <Background color="#aaa" gap={16} />
              <Controls />
              <MiniMap nodeBorderRadius={2} />
            </ReactFlow>
          </div>
        </TabsContent>

        <TabsContent value="details" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Lock className="h-4 w-4 mr-2" />
                  Security Layer
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li>Authentication via Auth0/JWT tokens</li>
                  <li>Role-based access control</li>
                  <li>Data encryption in transit and at rest</li>
                  <li>Secure password policies</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Server className="h-4 w-4 mr-2" />
                  Backend Infrastructure
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li>Node.js server with Express</li>
                  <li>MongoDB database for data storage</li>
                  <li>RESTful API architecture</li>
                  <li>Mongoose for ODM</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <LayoutGrid className="h-4 w-4 mr-2" />
                  Frontend Stack
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li>React for UI components</li>
                  <li>Bootstrap for responsive design</li>
                  <li>Mobile-first approach</li>
                  <li>State management with Context API</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Puzzle className="h-4 w-4 mr-2" />
                  Feature Set
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li>Admin, Store, and Delivery control panels</li>
                  <li>Real-time updates and notifications</li>
                  <li>Dashboard analytics</li>
                  <li>Reporting and export capabilities</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <BarChart className="h-4 w-4 mr-2" />
                  Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li>Interactive dashboards for each panel</li>
                  <li>KPI monitoring and visualization</li>
                  <li>User behavior analytics</li>
                  <li>Performance metrics tracking</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <FileText className="h-4 w-4 mr-2" />
                  Reporting
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li>Customizable report generation</li>
                  <li>Multiple export formats (PDF, CSV, Excel)</li>
                  <li>Scheduled report delivery</li>
                  <li>Filtered and segmented data views</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="connections" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Connections</CardTitle>
              <CardDescription>How the components interact with each other</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Frontend ↔ Backend</h3>
                  <p className="text-sm text-muted-foreground">
                    The React frontend communicates with the backend via RESTful API calls.
                    Authentication tokens are sent with each request to validate user sessions.
                  </p>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Backend ↔ Database</h3>
                  <p className="text-sm text-muted-foreground">
                    Node.js server uses Mongoose ODM to interact with MongoDB. Data is encrypted
                    before storage and decrypted when retrieved.
                  </p>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Security Layer Integration</h3>
                  <p className="text-sm text-muted-foreground">
                    Auth0 provides JWT tokens that are verified by middleware in the backend. Tokens
                    contain user roles that determine access levels to different panels.
                  </p>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Real-time Updates</h3>
                  <p className="text-sm text-muted-foreground">
                    WebSockets are used to push real-time updates from the server to the client,
                    enabling instant notifications and data refreshes without page reloads.
                  </p>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Analytics & Reporting Integration</h3>
                  <p className="text-sm text-muted-foreground">
                    The feature layer feeds data to both analytics and reporting modules. Analytics
                    processes data for visualization while reporting formats it for export.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
