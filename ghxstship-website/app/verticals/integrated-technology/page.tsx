'use client';

import { VerticalTemplate } from '@/components/sections/VerticalTemplate';

export default function IntegratedTechnologyPage() {
  return (
    <VerticalTemplate
      title="Integrated Technology"
      subtitle="AV Systems // Interactive Tech // Digital Integration"
      description="We harness cutting-edge technology to create seamless, interactive experiences. From complex AV systems to innovative digital integrations, we ensure that technology enhances rather than distracts from the experience."
      services={[
        'AV System Design',
        'Interactive Installations',
        'Digital Integration',
        'LED & Video Walls',
        'Projection Mapping',
        'Audio Engineering',
        'Network Infrastructure',
        'Control Systems',
        'Technical Direction',
      ]}
      examples={[
        {
          title: 'Interactive Brand Experience',
          client: 'Tech Company',
          description: 'Multi-room interactive experience featuring gesture control, AR elements, and synchronized AV systems.',
        },
        {
          title: 'Large-Scale Projection Mapping',
          client: 'Cultural Institution',
          description: 'Architectural projection mapping installation transforming a historic building into an immersive canvas.',
        },
        {
          title: 'Conference AV Production',
          client: 'Global Corporation',
          description: 'Complete technical production for multi-day conference including live streaming, LED walls, and interactive elements.',
        },
        {
          title: 'Permanent Installation',
          client: 'Museum',
          description: 'Permanent interactive technology installation featuring touch screens, motion sensors, and immersive audio.',
        },
      ]}
    />
  );
}
