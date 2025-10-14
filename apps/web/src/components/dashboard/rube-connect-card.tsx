import { ExternalLink, PlugZap, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export function RubeConnectCard() {
  return (
    <div className="glass-panel p-6 space-y-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold">Connect Rube MCP</h2>
          <p className="text-sm text-muted-foreground">
            Link your favourite SaaS tools in minutes and let automations follow you everywhere you log in.
          </p>
        </div>
        <span className="rounded-full bg-primary/10 p-3 text-primary" aria-hidden>
          <PlugZap className="h-6 w-6" />
        </span>
      </div>

      <ol className="space-y-3 text-sm text-muted-foreground">
        <li className="flex gap-3">
          <span className="font-semibold text-primary">1</span>
          <span>
            Install the Rube MCP connector from your preferred client (Cursor, Claude, VS Code, or any MCP compatible app).
          </span>
        </li>
        <li className="flex gap-3">
          <span className="font-semibold text-primary">2</span>
          <span>
            Authenticate with Composio and choose the apps you want to make available inside the dashboard.
          </span>
        </li>
        <li className="flex gap-3">
          <span className="font-semibold text-primary">3</span>
          <span>
            Trigger those connections directly from generated posts or from your existing Zapier and n8n flows.
          </span>
        </li>
      </ol>

      <div className="flex flex-wrap gap-3">
        <Link
          href="https://rube.app"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Launch Rube setup
          <ExternalLink className="h-4 w-4" aria-hidden />
        </Link>
        <Link
          href="https://docs.composio.dev/rube"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-accent"
        >
          Read quickstart
          <ExternalLink className="h-4 w-4" aria-hidden />
        </Link>
      </div>

      <div className="flex items-center gap-2 rounded-md bg-muted/60 p-3 text-sm text-muted-foreground">
        <ShieldCheck className="h-4 w-4 text-primary" aria-hidden />
        <span>
          Connections are managed by Composio with OAuth 2.1, encryption, and SOC 2 compliant security.
        </span>
      </div>
    </div>
  );
}
