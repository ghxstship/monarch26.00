'use client';

import { VerticalTemplate } from '@/components/sections/VerticalTemplate';

export default function CreativeMediaPage() {
  return (
    <VerticalTemplate
      title="Creative Media"
      subtitle="Video Production // Photography // Strategic Content"
      description="Visual storytelling for brands competing in saturated markets. Video production, photography, design, and digital content created by teams who understand both aesthetic excellence and strategic objectives. We've shot across multiple continents—every location taught us something about light, logistics, and what actually works when the sun sets in 20 minutes and the talent is late."
      services={[
        'Video Production',
        'Commercial Production',
        'Documentary Filmmaking',
        'Brand Films & Content',
        'Event Videography',
        'Live Streaming Production',
        'Photography & Stills',
        'Event Photography',
        'Product Photography',
        'Aerial Drone Cinematography',
        'Social Media Content Creation',
        'Short-Form Video Content',
        'Post-Production & Editing',
        'Color Grading & Correction',
        'Motion Graphics & Animation',
        'Visual Effects (VFX)',
        'Sound Design & Audio Post',
        'Music Video Production',
        'Behind-the-Scenes Content',
        'Recap & Highlight Videos',
        'Content Strategy & Planning',
      ]}
      examples={[
        {
          title: 'Brand Documentary Series',
          client: 'Global Brand',
          description: 'Multi-episode documentary series showcasing brand heritage and innovation, filmed across 15 countries.',
        },
        {
          title: 'Event Recap Content',
          client: 'Major Festival',
          description: 'Comprehensive event coverage including highlight reels, social content, and behind-the-scenes footage.',
        },
        {
          title: 'Commercial Campaign',
          client: 'Consumer Brand',
          description: 'Full-scale commercial production including concept development, filming, and post-production.',
        },
        {
          title: 'Artist Music Video',
          client: 'Recording Artist',
          description: 'High-concept music video production featuring innovative visual effects and storytelling.',
        },
      ]}
    />
  );
}
