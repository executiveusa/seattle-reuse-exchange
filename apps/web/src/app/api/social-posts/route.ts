import { NextResponse } from 'next/server';

type PlatformOption =
  | 'Instagram'
  | 'LinkedIn'
  | 'Facebook'
  | 'TikTok'
  | 'Twitter'
  | 'Pinterest';

type ToneOption =
  | 'Friendly'
  | 'Professional'
  | 'Bold'
  | 'Playful'
  | 'Empathetic';

type CampaignGoal = 'Awareness' | 'Engagement' | 'Conversion' | 'Launch' | 'Event';

interface SocialPostRequest {
  platform?: PlatformOption;
  tone?: ToneOption;
  campaignGoal?: CampaignGoal;
  brand?: string;
  offer?: string;
  callToAction?: string;
  audience?: string;
  scheduledDate?: string;
  keywords?: string;
}

const platformGuides: Record<PlatformOption, { intro: string; cadence: string[]; voiceHint: string; visualAngle: string }> = {
  Instagram: {
    intro: 'Pair this copy with a vibrant carousel or a Reels clip that shows the experience in motion.',
    cadence: ['Tuesday · 10 AM', 'Thursday · 2 PM', 'Saturday · 11 AM'],
    voiceHint: 'Keep it conversational with emoji and short, energetic sentences.',
    visualAngle: 'cinematic lifestyle photography, soft natural light, high-saturation color grading, authentic candid moment',
  },
  LinkedIn: {
    intro: 'Lead with the insight, support it with proof, and finish with a direct next step.',
    cadence: ['Tuesday · 9 AM', 'Wednesday · 11 AM', 'Thursday · 1 PM'],
    voiceHint: 'Use a confident but human tone that highlights measurable outcomes.',
    visualAngle: 'sleek minimal illustration, muted corporate palette, clean data overlays, professional setting',
  },
  Facebook: {
    intro: 'Open with community impact and invite quick reactions or shares.',
    cadence: ['Monday · 12 PM', 'Wednesday · 2 PM', 'Friday · 1 PM'],
    voiceHint: 'Friendly storytelling with a clear ask works best here.',
    visualAngle: 'warm documentary photography, smiling people, community moment, subtle brand elements',
  },
  TikTok: {
    intro: 'Hook the first three seconds, then show a before-and-after or behind-the-scenes moment.',
    cadence: ['Monday · 6 PM', 'Thursday · 7 PM', 'Sunday · 5 PM'],
    voiceHint: 'Write in quick beats that map to clips or subtitles.',
    visualAngle: 'vertical video storyboard, bold kinetic typography, playful motion graphics, vibrant neon lighting',
  },
  Twitter: {
    intro: 'Lead with the value statement in the first sentence and thread if you need more room.',
    cadence: ['Tuesday · 8 AM', 'Wednesday · 12 PM', 'Friday · 9 AM'],
    voiceHint: 'Aim for sharp, shareable lines with one hashtag max in the main copy.',
    visualAngle: 'bold typographic graphic, high contrast, minimal palette, crisp vector shapes',
  },
  Pinterest: {
    intro: 'Frame the benefit visually and provide a mini how-to within the caption.',
    cadence: ['Monday · 8 PM', 'Wednesday · 9 PM', 'Saturday · 10 AM'],
    voiceHint: 'Be descriptive and inspirational with sensory language.',
    visualAngle: 'flatlay photography, textured paper overlay, calm pastel palette, aspirational lifestyle scene',
  },
};

const toneModifiers: Record<ToneOption, string> = {
  Friendly: 'Warm and upbeat with approachable language.',
  Professional: 'Insight-led with concise, authoritative statements.',
  Bold: 'High-energy copy with confident, punchy verbs.',
  Playful: 'Light-hearted, whimsical phrasing with unexpected imagery.',
  Empathetic: 'Supportive tone that acknowledges audience needs and feelings.',
};

const campaignAngles: Record<CampaignGoal, string> = {
  Awareness: 'Spotlight what makes this stand out and share a memorable proof point.',
  Engagement: 'Prompt comments, saves, or shares with a compelling conversation starter.',
  Conversion: 'Lean into urgency and include a frictionless path to act right now.',
  Launch: 'Build anticipation, highlight what is new, and celebrate the moment.',
  Event: 'Clarify the when, where, and why, then reinforce limited availability.',
};

function sentenceCase(value: string | undefined): string {
  if (!value) {
    return '';
  }
  const trimmed = value.trim();
  if (!trimmed) {
    return '';
  }
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
}

function buildHashtags(body: SocialPostRequest, platform: PlatformOption): string[] {
  const source = new Set<string>();
  if (body.brand) {
    source.add(`#${body.brand.replace(/[^a-zA-Z0-9]/g, '')}`);
  }
  if (body.campaignGoal === 'Event' && body.scheduledDate) {
    source.add('#SaveTheDate');
  }
  if (body.campaignGoal === 'Launch') {
    source.add('#NowLive');
  }
  if (body.keywords) {
    body.keywords
      .split(',')
      .map((keyword) => keyword.trim())
      .filter(Boolean)
      .forEach((keyword) => source.add(`#${keyword.replace(/\s+/g, '')}`));
  }
  const platformDefaults: Record<PlatformOption, string[]> = {
    Instagram: ['#BehindTheScenes', '#TrendingNow', '#Inspiration'],
    LinkedIn: ['#Leadership', '#Growth', '#Strategy'],
    Facebook: ['#Community', '#LocalLove', '#SupportLocal'],
    TikTok: ['#ForYou', '#CreatorLife', '#DailyDrop'],
    Twitter: ['#ProTip', '#Update', '#Today'],
    Pinterest: ['#Moodboard', '#HowTo', '#Ideas'],
  };

  platformDefaults[platform].forEach((tag) => source.add(tag));
  return Array.from(source).slice(0, 6);
}

function buildCopy(body: SocialPostRequest, platform: PlatformOption): string {
  const pieces: string[] = [];
  const voice = toneModifiers[body.tone ?? 'Friendly'];
  const angle = campaignAngles[body.campaignGoal ?? 'Awareness'];
  const brand = sentenceCase(body.brand) || 'We';
  const offer = sentenceCase(body.offer) || '';
  const audience = body.audience ? sentenceCase(body.audience) : 'your community';
  const callToAction = body.callToAction ? sentenceCase(body.callToAction) : '';

  pieces.push(`${brand} ${offer ? `is ${offer}` : 'has something special for you'}!`);
  pieces.push(angle);
  if (body.keywords) {
    pieces.push(`Highlights: ${body.keywords.split(',').map((item) => item.trim()).filter(Boolean).join(' · ')}`);
  }
  if (body.campaignGoal === 'Event' && body.scheduledDate) {
    pieces.push(`📅 Happening on ${sentenceCase(body.scheduledDate)} — add it to your calendar now.`);
  }
  if (callToAction) {
    pieces.push(`👉 ${callToAction}`);
  }
  pieces.push(`Voice note: ${voice}`);
  pieces.push(platformGuides[platform].voiceHint);
  return pieces.filter(Boolean).join('\n\n');
}

function buildSchedule(platform: PlatformOption, requestedDate?: string) {
  const base = platformGuides[platform].cadence;
  if (!requestedDate) {
    return base;
  }
  const targeted = `Primary drop: ${sentenceCase(requestedDate)}`;
  return [targeted, ...base.filter((slot) => slot !== targeted)];
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as SocialPostRequest;
    const platform = platformGuides[payload.platform ?? 'Instagram'] ? payload.platform ?? 'Instagram' : 'Instagram';

    const response = {
      platform,
      copy: buildCopy(payload, platform),
      hashtags: buildHashtags(payload, platform),
      imagePrompt: `${payload.brand ? `${payload.brand} ` : ''}${platformGuides[platform].visualAngle}`.trim(),
      guidance: platformGuides[platform].intro,
      schedule: buildSchedule(platform, payload.scheduledDate),
      automation: {
        zapier: 'Send the generated copy into a Google Sheet or schedule it with Buffer using the Zapier Webhooks trigger.',
        n8n: 'Use the HTTP Request node to call this endpoint and forward the payload to the social network modules.',
        webhookPayload: {
          action: 'create_social_post',
          platform,
          tone: payload.tone ?? 'Friendly',
          goal: payload.campaignGoal ?? 'Awareness',
          brand: payload.brand ?? '',
          audience: payload.audience ?? '',
          call_to_action: payload.callToAction ?? '',
          copy_source: 'seattle-reuse-exchange-dashboard',
        },
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Failed to generate social post', error);
    return NextResponse.json({ message: 'Unable to generate post. Please try again.' }, { status: 400 });
  }
}
