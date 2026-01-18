import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import { CheckCircle2, AlertCircle, Globe, Bell, Activity, Shield } from "lucide-react";

interface LandingPageProps {
  onGetStarted: () => void;
  onViewPricing: () => void;
  onLogin: () => void;
}

export function LandingPage({ onGetStarted, onViewPricing, onLogin }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="size-6 text-blue-600" />
            <span className="font-semibold text-xl">ClickPing</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={onViewPricing}>
              Pricing
            </Button>
            <Button variant="outline" onClick={onLogin}>
              Log In
            </Button>
            <Button onClick={onGetStarted}>Get Started</Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h1 className="text-5xl font-bold tracking-tight">
            Monitor Every Important Page
            <br />
            <span className="text-blue-600">Before Your Users Notice</span>
          </h1>
          <p className="text-xl text-slate-600">
            We monitor every important page of your website and alert you the moment any path breaks.
          </p>
          <div className="flex items-center justify-center gap-4 pt-4">
            <Button size="lg" onClick={onGetStarted}>
              Start Monitoring Free
            </Button>
            <Button size="lg" variant="outline" onClick={onViewPricing}>
              View Pricing
            </Button>
          </div>
          <p className="text-sm text-slate-500">
            No credit card required • 5-minute setup
          </p>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Modern Websites Break Silently</h2>
            <p className="text-lg text-slate-600">
              Traditional uptime monitors only check your homepage. But what about everything else?
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 border-red-200 bg-red-50">
              <AlertCircle className="size-8 text-red-600 mb-4" />
              <h3 className="font-semibold mb-2">The Problem</h3>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>• Routes disappear after deployments</li>
                <li>• Pages return 404 or 500 errors</li>
                <li>• JavaScript errors break pages silently</li>
                <li>• SEO and paid traffic suffer</li>
                <li>• Existing tools only check the homepage</li>
              </ul>
            </Card>

            <Card className="p-6 border-green-200 bg-green-50">
              <CheckCircle2 className="size-8 text-green-600 mb-4" />
              <h3 className="font-semibold mb-2">The Solution</h3>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>• Monitors all important pages automatically</li>
                <li>• Detects 404, 500, and network failures</li>
                <li>• Catches JavaScript console errors</li>
                <li>• Clear, consolidated email alerts</li>
                <li>• Setup in 5 minutes via sitemap</li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-4 py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="size-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="size-8 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">1. Auto-Discovery</h3>
              <p className="text-sm text-slate-600">
                We automatically detect all pages from your sitemap.xml or you can add them manually.
              </p>
            </div>

            <div className="text-center">
              <div className="size-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Activity className="size-8 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">2. Continuous Monitoring</h3>
              <p className="text-sm text-slate-600">
                We check every page on your schedule using a real browser to catch HTTP and JavaScript errors.
              </p>
            </div>

            <div className="text-center">
              <div className="size-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bell className="size-8 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">3. Instant Alerts</h3>
              <p className="text-sm text-slate-600">
                Get clear email alerts the moment any page breaks, with full error details.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6">
              <CheckCircle2 className="size-6 text-green-600 mb-3" />
              <h3 className="font-semibold mb-2">Path-Based Monitoring</h3>
              <p className="text-sm text-slate-600">
                Monitor all critical pages, not just your homepage. Track pricing, features, blog posts, and landing pages.
              </p>
            </Card>

            <Card className="p-6">
              <CheckCircle2 className="size-6 text-green-600 mb-3" />
              <h3 className="font-semibold mb-2">JavaScript Error Detection</h3>
              <p className="text-sm text-slate-600">
                Catch frontend errors that break your pages but don't trigger server errors.
              </p>
            </Card>

            <Card className="p-6">
              <CheckCircle2 className="size-6 text-green-600 mb-3" />
              <h3 className="font-semibold mb-2">HTTP Status Monitoring</h3>
              <p className="text-sm text-slate-600">
                Detect 404 and 500 errors immediately, before they impact SEO or user experience.
              </p>
            </Card>

            <Card className="p-6">
              <CheckCircle2 className="size-6 text-green-600 mb-3" />
              <h3 className="font-semibold mb-2">Consolidated Alerts</h3>
              <p className="text-sm text-slate-600">
                One clear email per monitoring cycle listing all broken pages. No alert fatigue.
              </p>
            </Card>

            <Card className="p-6">
              <CheckCircle2 className="size-6 text-green-600 mb-3" />
              <h3 className="font-semibold mb-2">Automatic Sitemap Discovery</h3>
              <p className="text-sm text-slate-600">
                Setup in minutes by connecting your domain. We'll find and monitor all pages automatically.
              </p>
            </Card>

            <Card className="p-6">
              <CheckCircle2 className="size-6 text-green-600 mb-3" />
              <h3 className="font-semibold mb-2">Flexible Frequencies</h3>
              <p className="text-sm text-slate-600">
                Choose monitoring intervals from 15 minutes to 6 hours based on your needs.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Target Users */}
      <section className="container mx-auto px-4 py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Built For</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6">
              <h3 className="font-semibold mb-2">SaaS Companies</h3>
              <p className="text-sm text-slate-600">
                Protect your marketing site and product pages from silent breakage.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="font-semibold mb-2">SEO & Growth Teams</h3>
              <p className="text-sm text-slate-600">
                Catch broken pages before they tank your rankings and paid campaigns.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="font-semibold mb-2">Digital Agencies</h3>
              <p className="text-sm text-slate-600">
                Monitor multiple client websites from one dashboard.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Product Principles */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Product Principles</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex gap-4">
              <Shield className="size-6 text-blue-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">Safe</h3>
                <p className="text-sm text-slate-600">
                  We never mutate your data. Read-only page monitoring.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <CheckCircle2 className="size-6 text-blue-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">Simple</h3>
                <p className="text-sm text-slate-600">
                  Pages only. No CTA tracking or form submission testing.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Bell className="size-6 text-blue-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">Trustworthy</h3>
                <p className="text-sm text-slate-600">
                  Clear alerts with no noise. Only real issues.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Activity className="size-6 text-blue-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">Scalable</h3>
                <p className="text-sm text-slate-600">
                  Pricing tied to paths monitored and frequency chosen.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <h2 className="text-4xl font-bold">
            Stop Losing Traffic to Broken Pages
          </h2>
          <p className="text-xl text-slate-600">
            Start monitoring your website in the next 5 minutes.
          </p>
          <Button size="lg" onClick={onGetStarted}>
            Get Started Free
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-slate-50">
        <div className="container mx-auto px-4 py-8 text-center text-sm text-slate-600">
          <p>© 2026 ClickPing. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}