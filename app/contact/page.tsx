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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          message: formData.message,
          formType: 'CONTACT',
          projectType: formData.projectType,
          projectBudget: formData.budget,
          projectTimeline: formData.timeline,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          company: '',
          projectType: '',
          budget: '',
          timeline: '',
          message: '',
        });
      } else {
        setSubmitStatus('error');
        setErrorMessage(data.error || 'Failed to submit form. Please try again.');
      }
    } catch {
      setSubmitStatus('error');
      setErrorMessage('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
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
                <Typography variant="hero" className="text-white mb-4" uppercase>
                  Let&apos;s Make Problems
                </Typography>
                <Typography variant="h3" className="text-grey-400 mb-6">
                  The fun kind. The kind that ends with champagne and case studies.
                </Typography>
                <Typography variant="body" className="text-grey-400 text-xl">
                  From festival grounds to Formula 1 hospitality to Fortune 500 brand activations—we&apos;ve navigated 
                  complex productions where failure wasn&apos;t an option. If you&apos;ve got the vision and the budget, 
                  we&apos;ve got the operational expertise to make it real. Tell us about your project. We&apos;ll tell you 
                  if it&apos;s possible. Spoiler: it probably is.
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
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

                {submitStatus === 'success' && (
                  <div className="p-4 bg-green-100 border-2 border-green-600 mb-6">
                    <Typography variant="body" className="text-green-800">
                      Thank you! Your message has been sent successfully. We&apos;ll get back to you soon.
                    </Typography>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="p-4 bg-red-100 border-2 border-red-600 mb-6">
                    <Typography variant="body" className="text-red-800">
                      {errorMessage}
                    </Typography>
                  </div>
                )}

                <Button 
                  type="submit" 
                  variant="filled" 
                  size="lg" 
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Project Inquiry'}
                </Button>
              </form>
            </SlideUp>
          </Container>
        </section>

        {/* Contact Info */}
        <section className="py-24 bg-black text-white">
          <Container>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 text-center">
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
                  greetings@ghxstship.pro
                </Typography>
              </SlideUp>

              <SlideUp delay={0.2}>
                <Typography variant="h5" uppercase className="text-white mb-4">
                  Global Reach
                </Typography>
                <Typography variant="body" className="text-grey-400">
                  Worldwide Operations<br />
                  Multi-Continental Experience
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
