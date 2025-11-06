import { VerticalTemplate } from '@/components/sections/VerticalTemplate';

export default function ImmersiveEntertainmentPage() {
  return (
    <VerticalTemplate
      title="Immersive Entertainment"
      subtitle="Concerts // Festivals // Tours // Theatrical"
      description="We create unforgettable entertainment experiences that transport audiences beyond reality. From intimate concerts to massive festivals, from world tours to theatrical productions, we design and deliver experiences that resonate long after the lights go down."
      services={[
        'Concert Production',
        'Festival Design & Build',
        'World Tours',
        'Theatrical Experiences',
        'Live Event Production',
        'Stage Design',
        'Lighting & Visual Design',
        'Audio Engineering',
        'Artist Management Support',
      ]}
      examples={[
        {
          title: 'Formula 1 Miami Grand Prix',
          client: 'Formula 1',
          description: 'Multi-day immersive entertainment experience combining racing, music, and brand activations for 250,000+ attendees.',
        },
        {
          title: 'Insomniac EDC Experience',
          client: 'Insomniac',
          description: 'Large-scale festival production featuring multiple stages, immersive art installations, and cutting-edge production technology.',
        },
        {
          title: 'Red Bull Music Festival',
          client: 'Red Bull',
          description: 'Multi-city music festival series with custom stage designs and interactive brand experiences.',
        },
        {
          title: 'Global Artist Tour',
          client: 'Various Artists',
          description: 'End-to-end tour production management across 30+ cities, including stage design, logistics, and technical direction.',
        },
      ]}
    />
  );
}
