/**
 * Database Seed Script
 * Populates the database with initial data for development and testing
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create sample projects
  const projects = await Promise.all([
    prisma.project.create({
      data: {
        slug: 'formula-1-miami-grand-prix-2024',
        title: 'Formula 1 Miami Grand Prix 2024',
        subtitle: 'Immersive Fan Experience Design',
        excerpt: 'Created a multi-sensory fan experience zone spanning 50,000 sq ft for the Miami Grand Prix, featuring interactive installations and VIP hospitality.',
        description: 'Full project description here...',
        status: 'PUBLISHED',
        vertical: 'IMMERSIVE_ENTERTAINMENT',
        services: ['DESIGN', 'DEVELOPMENT', 'DIRECTION'],
        client: 'Formula 1',
        location: 'Miami, FL',
        year: 2024,
        challenge: 'Design and execute a world-class fan experience that captures the energy and excitement of Formula 1 racing.',
        solution: 'Created immersive zones with interactive displays, VR racing simulators, and exclusive meet-and-greet opportunities.',
        results: 'Over 100,000 attendees engaged with the experience, 95% satisfaction rating, featured in international press.',
        technologies: ['LED Walls', 'VR Systems', 'Interactive Displays', 'Custom Fabrication'],
        tags: ['motorsports', 'experiential', 'large-scale'],
        featured: true,
        publishedAt: new Date('2024-05-01'),
        featuredAt: new Date('2024-05-01'),
        metaTitle: 'F1 Miami Grand Prix Experience | GHXSTSHIP',
        metaDescription: 'Immersive fan experience design for Formula 1 Miami Grand Prix 2024',
      },
    }),
    prisma.project.create({
      data: {
        slug: 'patron-tequila-art-of-patron-tour',
        title: 'PATRÓN Tequila: Art of PATRÓN Tour',
        subtitle: 'National Brand Activation Series',
        excerpt: 'Multi-city experiential marketing campaign showcasing the craftsmanship behind PATRÓN Tequila through immersive installations.',
        status: 'PUBLISHED',
        vertical: 'EXPERIENTIAL_MARKETING',
        services: ['DESIGN', 'DEVELOPMENT', 'DIRECTION'],
        client: 'PATRÓN Spirits',
        location: 'Multi-City USA',
        year: 2023,
        challenge: 'Create a traveling experience that educates consumers about the premium tequila-making process.',
        solution: 'Designed modular installations featuring the agave lifecycle, distillation process, and artisan craftsmanship.',
        results: '15 cities, 50,000+ attendees, 300% increase in brand engagement, award-winning campaign.',
        technologies: ['Modular Design', 'Projection Mapping', 'Sensory Stations'],
        tags: ['spirits', 'touring', 'luxury'],
        featured: true,
        publishedAt: new Date('2023-09-15'),
        featuredAt: new Date('2023-09-15'),
      },
    }),
    prisma.project.create({
      data: {
        slug: 'insomniac-edc-las-vegas-stage-design',
        title: 'Insomniac EDC Las Vegas Stage Design',
        subtitle: 'Main Stage Production & Creative Direction',
        excerpt: 'Conceptualized and produced the main stage experience for EDC Las Vegas, one of the world\'s largest electronic music festivals.',
        status: 'PUBLISHED',
        vertical: 'IMMERSIVE_ENTERTAINMENT',
        services: ['DESIGN', 'DEVELOPMENT', 'DISRUPTION'],
        client: 'Insomniac Events',
        location: 'Las Vegas, NV',
        year: 2024,
        challenge: 'Design a stage that can accommodate 100,000+ attendees while delivering an unforgettable visual experience.',
        solution: 'Created a 300-foot wide stage with synchronized LED, pyrotechnics, and kinetic elements.',
        results: 'Headlined by top DJs, 500,000+ festival attendees, viral social media moments.',
        technologies: ['LED Technology', 'Pyrotechnics', 'Kinetic Systems', 'Real-time Control'],
        tags: ['music-festival', 'large-scale', 'technology'],
        featured: true,
        publishedAt: new Date('2024-05-20'),
      },
    }),
    prisma.project.create({
      data: {
        slug: 'heineken-champions-league-fan-zone',
        title: 'Heineken UEFA Champions League Fan Zone',
        subtitle: 'Global Activation Program',
        excerpt: 'Designed and deployed fan engagement zones across multiple Champions League host cities.',
        status: 'PUBLISHED',
        vertical: 'EXPERIENTIAL_MARKETING',
        services: ['DESIGN', 'DEVELOPMENT', 'DIRECTION'],
        client: 'Heineken',
        location: 'Europe (Multi-City)',
        year: 2023,
        technologies: ['Interactive Displays', 'Social Integration', 'Gamification'],
        tags: ['sports', 'international', 'brand-activation'],
        featured: false,
        publishedAt: new Date('2023-06-10'),
      },
    }),
  ]);

  console.log(`✅ Created ${projects.length} sample projects`);

  // Create sample blog posts
  const blogPosts = await Promise.all([
    prisma.blogPost.create({
      data: {
        slug: 'the-future-of-experiential-marketing',
        title: 'The Future of Experiential Marketing',
        subtitle: 'How Technology is Reshaping Brand Experiences',
        content: 'Full blog content here...',
        excerpt: 'Exploring the intersection of technology, creativity, and human connection in modern brand activations.',
        status: 'PUBLISHED',
        category: 'INDUSTRY_INSIGHTS',
        tags: ['experiential', 'technology', 'trends'],
        publishedAt: new Date('2024-01-15'),
        featured: true,
      },
    }),
    prisma.blogPost.create({
      data: {
        slug: 'behind-the-scenes-edc-las-vegas',
        title: 'Behind the Scenes: EDC Las Vegas',
        subtitle: 'A Look at Our Largest Production to Date',
        content: 'Full blog content here...',
        excerpt: 'Take a deep dive into the planning, design, and execution of our EDC Las Vegas main stage production.',
        status: 'PUBLISHED',
        category: 'BEHIND_THE_SCENES',
        tags: ['edc', 'production', 'case-study'],
        publishedAt: new Date('2024-06-01'),
        featured: false,
      },
    }),
  ]);

  console.log(`✅ Created ${blogPosts.length} sample blog posts`);

  // Create system settings
  const settings = await Promise.all([
    prisma.systemSetting.create({
      data: {
        key: 'site_maintenance_mode',
        value: 'false',
        description: 'Enable maintenance mode',
        category: 'system',
        isPublic: false,
      },
    }),
    prisma.systemSetting.create({
      data: {
        key: 'contact_email',
        value: 'hello@ghxstship.com',
        description: 'Primary contact email',
        category: 'contact',
        isPublic: true,
      },
    }),
    prisma.systemSetting.create({
      data: {
        key: 'featured_projects_limit',
        value: '4',
        description: 'Number of featured projects to display on homepage',
        category: 'content',
        isPublic: false,
      },
    }),
  ]);

  console.log(`✅ Created ${settings.length} system settings`);

  console.log('🎉 Database seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
