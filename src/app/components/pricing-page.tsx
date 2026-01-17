import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { CheckCircle2, X, ArrowLeft } from "lucide-react";

interface PricingPageProps {
  onSelectPlan: (plan: "free" | "starter" | "growth") => void;
  onBack: () => void;
}

export function PricingPage({ onSelectPlan, onBack }: PricingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="size-4 mr-2" />
            Back
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
        <p className="text-lg text-slate-600 mb-2">
          Choose the plan that fits your monitoring needs
        </p>
        <p className="text-sm text-slate-500">
          Need more pages? Add flexible page bundles to any plan.
        </p>
      </section>

      {/* Pricing Cards */}
      <section className="container mx-auto px-4 pb-16">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {/* Free Plan */}
          <Card className="p-8 relative">
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-2">Free</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold">$0</span>
                <span className="text-slate-600">/month</span>
              </div>
              <p className="text-sm text-slate-600">Perfect for testing and small sites</p>
            </div>

            <Button 
              variant="outline" 
              className="w-full mb-6"
              onClick={() => onSelectPlan("free")}
            >
              Get Started Free
            </Button>

            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="size-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm">Up to 5 pages monitored</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="size-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm">6-hour check frequency</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="size-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm">Basic dashboard</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="size-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm">HTTP status monitoring</span>
              </div>
              <div className="flex items-start gap-2">
                <X className="size-5 text-slate-300 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-slate-400">Email alerts (3 per day max)</span>
              </div>
              <div className="flex items-start gap-2">
                <X className="size-5 text-slate-300 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-slate-400">JavaScript error detection</span>
              </div>
            </div>
          </Card>

          {/* Starter Plan */}
          <Card className="p-8 relative border-blue-200 shadow-lg">
            <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600">
              Most Popular
            </Badge>

            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-2">Starter</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold">$29</span>
                <span className="text-slate-600">/month</span>
              </div>
              <p className="text-sm text-slate-600">For growing websites and startups</p>
            </div>

            <Button 
              className="w-full mb-6"
              onClick={() => onSelectPlan("starter")}
            >
              Start Free Trial
            </Button>

            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="size-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm font-medium">Up to 20 pages monitored</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="size-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm font-medium">30-minute check frequency</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="size-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm">Full dashboard with history</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="size-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm">HTTP status monitoring</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="size-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm font-medium">Unlimited email alerts</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="size-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm font-medium">JavaScript error detection</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="size-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm font-medium">Error stack traces</span>
              </div>
            </div>
          </Card>

          {/* Growth Plan */}
          <Card className="p-8 relative">
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-2">Growth</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold">$79</span>
                <span className="text-slate-600">/month</span>
              </div>
              <p className="text-sm text-slate-600">For larger sites and agencies</p>
            </div>

            <Button 
              className="w-full mb-6"
              onClick={() => onSelectPlan("growth")}
            >
              Start Free Trial
            </Button>

            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="size-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm font-medium">Up to 100 pages monitored</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="size-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm font-medium">15-minute check frequency</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="size-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm">Full dashboard with history</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="size-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm">HTTP status monitoring</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="size-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm">Unlimited email alerts</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="size-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm">JavaScript error detection</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="size-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm">Error stack traces</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="size-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm font-medium">Priority monitoring</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="size-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm font-medium">Slack integration</span>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="container mx-auto px-4 pb-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Detailed Feature Comparison</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2">
                  <th className="text-left py-4 px-4">Feature</th>
                  <th className="text-center py-4 px-4">Free</th>
                  <th className="text-center py-4 px-4 bg-blue-50">Starter</th>
                  <th className="text-center py-4 px-4">Growth</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="py-4 px-4 font-medium">Pages Monitored</td>
                  <td className="text-center py-4 px-4">5</td>
                  <td className="text-center py-4 px-4 bg-blue-50">20</td>
                  <td className="text-center py-4 px-4">100</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-medium">Check Frequency</td>
                  <td className="text-center py-4 px-4 text-sm">Every 6 hours</td>
                  <td className="text-center py-4 px-4 bg-blue-50 text-sm">Every 30 min</td>
                  <td className="text-center py-4 px-4 text-sm">Every 15 min</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-medium">HTTP Status Monitoring</td>
                  <td className="text-center py-4 px-4"><CheckCircle2 className="size-5 text-green-600 mx-auto" /></td>
                  <td className="text-center py-4 px-4 bg-blue-50"><CheckCircle2 className="size-5 text-green-600 mx-auto" /></td>
                  <td className="text-center py-4 px-4"><CheckCircle2 className="size-5 text-green-600 mx-auto" /></td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-medium">JavaScript Error Detection</td>
                  <td className="text-center py-4 px-4"><X className="size-5 text-slate-300 mx-auto" /></td>
                  <td className="text-center py-4 px-4 bg-blue-50"><CheckCircle2 className="size-5 text-green-600 mx-auto" /></td>
                  <td className="text-center py-4 px-4"><CheckCircle2 className="size-5 text-green-600 mx-auto" /></td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-medium">Email Alerts</td>
                  <td className="text-center py-4 px-4 text-sm">3/day max</td>
                  <td className="text-center py-4 px-4 bg-blue-50 text-sm">Unlimited</td>
                  <td className="text-center py-4 px-4 text-sm">Unlimited</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-medium">Error Stack Traces</td>
                  <td className="text-center py-4 px-4"><X className="size-5 text-slate-300 mx-auto" /></td>
                  <td className="text-center py-4 px-4 bg-blue-50"><CheckCircle2 className="size-5 text-green-600 mx-auto" /></td>
                  <td className="text-center py-4 px-4"><CheckCircle2 className="size-5 text-green-600 mx-auto" /></td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-medium">Dashboard History</td>
                  <td className="text-center py-4 px-4 text-sm">7 days</td>
                  <td className="text-center py-4 px-4 bg-blue-50 text-sm">30 days</td>
                  <td className="text-center py-4 px-4 text-sm">90 days</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-medium">Slack Integration</td>
                  <td className="text-center py-4 px-4"><X className="size-5 text-slate-300 mx-auto" /></td>
                  <td className="text-center py-4 px-4 bg-blue-50"><X className="size-5 text-slate-300 mx-auto" /></td>
                  <td className="text-center py-4 px-4"><CheckCircle2 className="size-5 text-green-600 mx-auto" /></td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-medium">Priority Support</td>
                  <td className="text-center py-4 px-4"><X className="size-5 text-slate-300 mx-auto" /></td>
                  <td className="text-center py-4 px-4 bg-blue-50"><X className="size-5 text-slate-300 mx-auto" /></td>
                  <td className="text-center py-4 px-4"><CheckCircle2 className="size-5 text-green-600 mx-auto" /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Add-ons Section */}
      <section className="container mx-auto px-4 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Need More Pages?</h2>
            <p className="text-lg text-slate-600">
              Add flexible page bundles to any plan. No hard limits.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 text-center">
              <div className="text-3xl font-bold mb-2">+10 Pages</div>
              <div className="text-2xl font-bold text-blue-600 mb-4">$5/mo</div>
              <p className="text-sm text-slate-600">Perfect for small overages</p>
            </Card>

            <Card className="p-6 text-center border-blue-200">
              <div className="text-3xl font-bold mb-2">+50 Pages</div>
              <div className="text-2xl font-bold text-blue-600 mb-4">$20/mo</div>
              <p className="text-sm text-slate-600">Best value for growing sites</p>
              <Badge className="mt-2 bg-blue-600">Most Popular</Badge>
            </Card>

            <Card className="p-6 text-center">
              <div className="text-3xl font-bold mb-2">+100 Pages</div>
              <div className="text-2xl font-bold text-blue-600 mb-4">$35/mo</div>
              <p className="text-sm text-slate-600">For large websites</p>
            </Card>
          </div>

          <div className="mt-8 p-6 bg-blue-50 rounded-lg">
            <h3 className="font-semibold mb-2">How Add-ons Work</h3>
            <ul className="space-y-2 text-sm text-slate-700">
              <li>• Add as many bundles as you need</li>
              <li>• Works with any plan (Free, Starter, Growth)</li>
              <li>• Billing automatically adjusts to your usage</li>
              <li>• No hard limits - your website can grow freely</li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container mx-auto px-4 pb-16 bg-slate-50">
        <div className="max-w-3xl mx-auto py-12">
          <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">Can I change plans later?</h3>
              <p className="text-sm text-slate-600">
                Yes! You can upgrade or downgrade at any time. Changes take effect immediately.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">What happens if I exceed my page limit?</h3>
              <p className="text-sm text-slate-600">
                You can add flexible page bundles without changing your base plan. There are no hard blocks.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">How do consolidated alerts work?</h3>
              <p className="text-sm text-slate-600">
                We send one email per monitoring cycle listing all broken pages. This prevents alert fatigue.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Do you monitor authenticated pages?</h3>
              <p className="text-sm text-slate-600">
                Not in the current version. We focus on public pages only to keep things simple and safe.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white">
        <div className="container mx-auto px-4 py-8 text-center text-sm text-slate-600">
          <p>© 2026 PathGuard. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
