'use client';

import { ChangeEvent, FormEvent, useState } from 'react';
import { CalendarDays, Check, Copy, ExternalLink, Loader2, Sparkles, Zap } from 'lucide-react';
import Link from 'next/link';

import { siteConfig } from '@/config/site';
import { RubeConnectCard } from '@/components/dashboard/rube-connect-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type PlatformOption = 'Instagram' | 'LinkedIn' | 'Facebook' | 'TikTok' | 'Twitter' | 'Pinterest';
type ToneOption = 'Friendly' | 'Professional' | 'Bold' | 'Playful' | 'Empathetic';
type CampaignGoal = 'Awareness' | 'Engagement' | 'Conversion' | 'Launch' | 'Event';

interface FormState {
  platform: PlatformOption;
  tone: ToneOption;
  campaignGoal: CampaignGoal;
  brand: string;
  offer: string;
  callToAction: string;
  audience: string;
  scheduledDate: string;
  keywords: string;
}

interface GenerationResult {
  platform: PlatformOption;
  copy: string;
  hashtags: string[];
  imagePrompt: string;
  guidance: string;
  schedule: string[];
  automation: {
    zapier: string;
    n8n: string;
    webhookPayload: Record<string, string>;
  };
}

const platformOptions: PlatformOption[] = ['Instagram', 'LinkedIn', 'Facebook', 'TikTok', 'Twitter', 'Pinterest'];
const toneOptions: ToneOption[] = ['Friendly', 'Professional', 'Bold', 'Playful', 'Empathetic'];
const campaignGoals: CampaignGoal[] = ['Awareness', 'Engagement', 'Conversion', 'Launch', 'Event'];

const initialState: FormState = {
  platform: 'Instagram',
  tone: 'Friendly',
  campaignGoal: 'Awareness',
  brand: '',
  offer: '',
  callToAction: `Visit ${new URL(siteConfig.baseUrl).hostname} to learn more`,
  audience: 'neighbors across Seattle',
  scheduledDate: '',
  keywords: 'reuse, sustainability, community spotlight',
};

export default function SocialMediaStudioPage() {
  const [form, setForm] = useState<FormState>(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<GenerationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/social-posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error('Unable to generate social media copy.');
      }

      const data = (await response.json()) as GenerationResult;
      setResult(data);
      setCopiedField(null);
    } catch (requestError) {
      console.error(requestError);
      setError('We could not generate content. Please review the form and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopy = async (value: string, field: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2500);
    } catch (copyError) {
      console.error(copyError);
      setError('Clipboard access was blocked. Copy the text manually instead.');
    }
  };

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8 space-y-8">
      <div className="glass-panel p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-wide text-primary">Social Media Studio</p>
            <h1 className="mt-2 text-3xl font-bold">Create ready-to-post campaigns in minutes</h1>
            <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
              Blend the Encore Social Media Post Generator with Rube MCP connections. Generate channel-specific copy,
              capture image prompts, and push the results directly into Zapier or n8n workflows without leaving the dashboard.
            </p>
          </div>
          <div className="flex items-center gap-3 rounded-lg bg-primary/10 px-4 py-3 text-sm text-primary">
            <Sparkles className="h-5 w-5" aria-hidden />
            <span>Built with Encore.dev prompts + Composio automations.</span>
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[2fr,1fr]">
        <form onSubmit={handleSubmit} className="glass-panel space-y-6 p-6">
          <div className="flex flex-wrap gap-4">
            <div className="min-w-[200px] flex-1">
              <label htmlFor="platform" className="mb-1 block text-sm font-medium">
                Platform
              </label>
              <select
                id="platform"
                name="platform"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                value={form.platform}
                onChange={handleChange}
              >
                {platformOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div className="min-w-[200px] flex-1">
              <label htmlFor="tone" className="mb-1 block text-sm font-medium">
                Tone
              </label>
              <select
                id="tone"
                name="tone"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                value={form.tone}
                onChange={handleChange}
              >
                {toneOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div className="min-w-[200px] flex-1">
              <label htmlFor="campaignGoal" className="mb-1 block text-sm font-medium">
                Campaign goal
              </label>
              <select
                id="campaignGoal"
                name="campaignGoal"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                value={form.campaignGoal}
                onChange={handleChange}
              >
                {campaignGoals.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="brand" className="mb-1 block text-sm font-medium">
                Organization or campaign name
              </label>
              <Input id="brand" name="brand" value={form.brand} onChange={handleChange} placeholder="Seattle Reuse Exchange" />
            </div>
            <div>
              <label htmlFor="offer" className="mb-1 block text-sm font-medium">
                Highlight or announcement
              </label>
              <Input
                id="offer"
                name="offer"
                value={form.offer}
                onChange={handleChange}
                placeholder="launching a neighborhood repair workshop"
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="audience" className="mb-1 block text-sm font-medium">
                Primary audience
              </label>
              <Input
                id="audience"
                name="audience"
                value={form.audience}
                onChange={handleChange}
                placeholder="Reuse-minded neighbors"
              />
            </div>
            <div>
              <label htmlFor="scheduledDate" className="mb-1 block text-sm font-medium">
                Launch or event date
              </label>
              <div className="relative">
                <Input
                  id="scheduledDate"
                  name="scheduledDate"
                  value={form.scheduledDate}
                  onChange={handleChange}
                  placeholder="April 22, 2025"
                />
                <CalendarDays className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="callToAction" className="mb-1 block text-sm font-medium">
                Call to action
              </label>
              <Input
                id="callToAction"
                name="callToAction"
                value={form.callToAction}
                onChange={handleChange}
                placeholder="Reserve your toolkit today"
              />
            </div>
            <div>
              <label htmlFor="keywords" className="mb-1 block text-sm font-medium">
                Focus keywords (comma separated)
              </label>
              <Input
                id="keywords"
                name="keywords"
                value={form.keywords}
                onChange={handleChange}
                placeholder="upcycling, DIY, reuse"
              />
            </div>
          </div>

          <div className="rounded-md border border-dashed border-border bg-background/80 p-4 text-xs text-muted-foreground">
            <p className="font-medium text-foreground">Workflow tip</p>
            <p className="mt-2">
              Need a longer brief? Generate once, then push the JSON payload into Zapier or n8n to append reminders, assign owners,
              or drop tasks into Trello, Asana, or any Rube-connected tool.
            </p>
          </div>

          {error && <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">{error}</p>}

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button type="submit" className="w-full sm:w-auto" disabled={isSubmitting}>
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                  Generating...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Zap className="h-4 w-4" aria-hidden />
                  Generate post
                </span>
              )}
            </Button>

            <Link
              href="https://zapier.com/apps/webhook/integrations"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary/80"
            >
              Explore Zapier recipes
              <ExternalLink className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </form>

        <RubeConnectCard />
      </div>

      {result && (
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="glass-panel space-y-4 p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold">Channel-ready copy</h2>
                <p className="text-sm text-muted-foreground">Optimised for {result.platform}. Tap copy to paste anywhere.</p>
              </div>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => handleCopy(result.copy, 'copy')}
                className="gap-2"
              >
                {copiedField === 'copy' ? <Check className="h-4 w-4" aria-hidden /> : <Copy className="h-4 w-4" aria-hidden />}
                {copiedField === 'copy' ? 'Copied' : 'Copy text'}
              </Button>
            </div>
            <pre className="whitespace-pre-wrap rounded-md border border-border bg-background/80 p-4 text-sm leading-6">
              {result.copy}
            </pre>

            <div className="rounded-lg bg-muted/60 p-4 text-sm text-muted-foreground">
              <p className="font-medium text-foreground">Encore guidance</p>
              <p className="mt-1">{result.guidance}</p>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Suggested hashtags</h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {result.hashtags.map((tag) => (
                  <span key={tag} className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="glass-panel space-y-4 p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold">Creative brief</h2>
                  <p className="text-sm text-muted-foreground">
                    Feed this into the Encore image generator or any design workflow.
                  </p>
                </div>
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => handleCopy(result.imagePrompt, 'prompt')}
                  className="gap-2"
                >
                  {copiedField === 'prompt' ? (
                    <Check className="h-4 w-4" aria-hidden />
                  ) : (
                    <Copy className="h-4 w-4" aria-hidden />
                  )}
                  {copiedField === 'prompt' ? 'Copied' : 'Copy prompt'}
                </Button>
              </div>

              <p className="rounded-md border border-dashed border-border bg-background/80 p-4 text-sm leading-6">
                {result.imagePrompt}
              </p>

              <Link
                href="https://encore.dev"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary/80"
              >
                Open Encore image generator
                <ExternalLink className="h-4 w-4" aria-hidden />
              </Link>
            </div>

            <div className="glass-panel space-y-4 p-6">
              <h2 className="text-xl font-semibold">Scheduling playbook</h2>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {result.schedule.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 text-primary" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass-panel space-y-4 p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold">Automation payloads</h2>
                  <p className="text-sm text-muted-foreground">
                    Drop this JSON into Zapier Webhooks or the n8n HTTP Request node to keep everything in sync.
                  </p>
                </div>
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => handleCopy(JSON.stringify(result.automation.webhookPayload, null, 2), 'payload')}
                  className="gap-2"
                >
                  {copiedField === 'payload' ? (
                    <Check className="h-4 w-4" aria-hidden />
                  ) : (
                    <Copy className="h-4 w-4" aria-hidden />
                  )}
                  {copiedField === 'payload' ? 'Copied' : 'Copy JSON'}
                </Button>
              </div>

              <pre className="overflow-x-auto rounded-md border border-border bg-background/80 p-4 text-xs">
                {JSON.stringify(result.automation.webhookPayload, null, 2)}
              </pre>

              <div className="space-y-3 text-sm text-muted-foreground">
                <p className="flex items-center gap-2 font-medium text-foreground">
                  <Zap className="h-4 w-4 text-primary" aria-hidden />
                  Zapier quick start
                </p>
                <p>{result.automation.zapier}</p>
                <p className="flex items-center gap-2 font-medium text-foreground">
                  <Zap className="h-4 w-4 text-primary" aria-hidden />
                  n8n flow idea
                </p>
                <p>{result.automation.n8n}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
