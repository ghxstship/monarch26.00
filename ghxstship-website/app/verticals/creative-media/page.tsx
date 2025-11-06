import { VerticalTemplate } from '@/components/sections/VerticalTemplate';

export default function CreativeMediaPage() {
  return (
    <VerticalTemplate
      title="Creative Media"
      subtitle="Film // Video // Photography // Content"
      description="We tell stories that captivate, inspire, and move audiences. Our creative media services span the full spectrum of content production, from cinematic films to social media content, all crafted with the same attention to detail and creative excellence."
      services={[
        'Film Production',
        'Video Content',
        'Photography',
        'Documentary',
        'Commercial Production',
        'Social Media Content',
        'Live Streaming',
        'Post-Production',
        'Motion Graphics',
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
