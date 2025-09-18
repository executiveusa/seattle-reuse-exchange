export default function AboutPage() {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">About Seattle Reuse Exchange</h1>
      <div className="prose max-w-none">
        <p className="text-lg text-muted-foreground mb-6">
          Keeping office furniture out of landfills while funding nonprofit work.
        </p>
        <p>
          Seattle Reuse Exchange is a nonprofit-driven auction platform designed to rescue 
          usable office furniture and equipment from landfills. Each transaction supports 
          local reuse initiatives across Seattle, combining environmental sustainability 
          with community impact.
        </p>
      </div>
    </div>
  );
}