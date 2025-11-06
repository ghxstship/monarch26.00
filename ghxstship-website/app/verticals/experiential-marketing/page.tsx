import { VerticalTemplate } from '@/components/sections/VerticalTemplate';

export default function ExperientialMarketingPage() {
  return (
    <VerticalTemplate
      title="Experiential Marketing"
      subtitle="Brand Activations // Pop-ups // Installations"
      description="We transform brands into experiences that audiences can touch, feel, and remember. Our experiential marketing campaigns create emotional connections that drive engagement, loyalty, and measurable results."
      services={[
        'Brand Activations',
        'Pop-up Experiences',
        'Interactive Installations',
        'Product Launches',
        'Sampling Campaigns',
        'Guerrilla Marketing',
        'Retail Experiences',
        'Trade Show Exhibits',
        'Sponsorship Activations',
      ]}
      examples={[
        {
          title: 'PATRÓN Global Activation',
          client: 'PATRÓN Tequila',
          description: 'Multi-market brand activation series featuring immersive tasting experiences and interactive installations across major cities.',
        },
        {
          title: 'Heineken UEFA Champions League',
          client: 'Heineken',
          description: 'Global sponsorship activation program creating memorable fan experiences at major football events worldwide.',
        },
        {
          title: 'Tech Product Launch',
          client: 'Major Tech Brand',
          description: 'Innovative product launch experience combining physical and digital elements to showcase new technology.',
        },
        {
          title: 'Luxury Automotive Experience',
          client: 'Luxury Auto Brand',
          description: 'Exclusive brand experience center featuring interactive displays and immersive test drive experiences.',
        },
      ]}
    />
  );
}
