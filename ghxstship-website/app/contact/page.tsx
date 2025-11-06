'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/layout/Container';
import { Typography } from '@/components/ui/Typography';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { SlideUp } from '@/components/animations/SlideUp';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    projectType: '',
    budget: '',
    timeline: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-24 bg-black text-white">
          <Container>
            <SlideUp>
              <div className="text-center max-w-3xl mx-auto">
                <Typography variant="hero" className="text-white mb-6" uppercase>
                  Let&apos;s Create
                </Typography>
                <Typography variant="body" className="text-grey-400 text-xl">
                  Ready to disrupt the industry? Tell us about your project and let&apos;s 
                  create something impossible together.
                </Typography>
              </div>
            </SlideUp>
          </Container>
        </section>

        {/* Contact Form */}
        <section className="py-24 bg-white">
          <Container maxWidth="md">
            <SlideUp delay={0.2}>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Input
                    label="Name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                  />
                  <Input
                    label="Email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                  />
                </div>

                <Input
                  label="Company"
                  name="company"
                  type="text"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Your company name"
                />

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Typography variant="h6" uppercase className="mb-2">
                      Project Type
                    </Typography>
                    <select
                      name="projectType"
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-black bg-white font-share text-base"
                      required
                    >
                      <option value="">Select type</option>
                      <option value="immersive">Immersive Entertainment</option>
                      <option value="experiential">Experiential Marketing</option>
                      <option value="media">Creative Media</option>
                      <option value="technology">Integrated Technology</option>
                    </select>
                  </div>

                  <div>
                    <Typography variant="h6" uppercase className="mb-2">
                      Budget Range
                    </Typography>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-black bg-white font-share text-base"
                      required
                    >
                      <option value="">Select range</option>
                      <option value="<50k">&lt; $50K</option>
                      <option value="50k-100k">$50K - $100K</option>
                      <option value="100k-250k">$100K - $250K</option>
                      <option value="250k-500k">$250K - $500K</option>
                      <option value=">500k">&gt; $500K</option>
                    </select>
                  </div>
                </div>

                <Input
                  label="Timeline"
                  name="timeline"
                  type="text"
                  value={formData.timeline}
                  onChange={handleChange}
                  placeholder="When do you need this?"
                />

                <Input
                  label="Project Description"
                  name="message"
                  type="textarea"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your project..."
                  rows={6}
                />

                <Button type="submit" variant="filled" size="lg" className="w-full">
                  Submit Project Inquiry
                </Button>
              </form>
            </SlideUp>
          </Container>
        </section>

        {/* Contact Info */}
        <section className="py-24 bg-black text-white">
          <Container>
            <div className="grid md:grid-cols-3 gap-12 text-center">
              <SlideUp>
                <Typography variant="h5" uppercase className="text-white mb-4">
                  Headquarters
                </Typography>
                <Typography variant="body" className="text-grey-400">
                  Tampa, FL<br />
                  Global Remote Team
                </Typography>
              </SlideUp>

              <SlideUp delay={0.1}>
                <Typography variant="h5" uppercase className="text-white mb-4">
                  Email
                </Typography>
                <Typography variant="body" className="text-grey-400">
                  hello@ghxstship.com
                </Typography>
              </SlideUp>

              <SlideUp delay={0.2}>
                <Typography variant="h5" uppercase className="text-white mb-4">
                  Global Reach
                </Typography>
                <Typography variant="body" className="text-grey-400">
                  52+ Countries<br />
                  Worldwide Operations
                </Typography>
              </SlideUp>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
