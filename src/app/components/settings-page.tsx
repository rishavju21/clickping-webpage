import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Badge } from "@/app/components/ui/badge";
import { Switch } from "@/app/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import { ArrowLeft, CreditCard, Bell, Trash2 } from "lucide-react";
import type { OnboardingData } from "./onboarding-flow";

interface SettingsPageProps {
  onboardingData: OnboardingData;
  onBack: () => void;
  onUpdateSettings: (data: Partial<OnboardingData>) => void;
  onManagePaths: () => void;
  onChangePlan: () => void;
}

export function SettingsPage({ onboardingData, onBack, onUpdateSettings, onManagePaths, onChangePlan }: SettingsPageProps) {
  const getPlanDetails = (plan: string) => {
    switch (plan) {
      case "free":
        return { name: "Free", price: 0, maxPaths: 5 };
      case "starter":
        return { name: "Starter", price: 29, maxPaths: 20 };
      case "growth":
        return { name: "Growth", price: 79, maxPaths: 100 };
      default:
        return { name: "Free", price: 0, maxPaths: 5 };
    }
  };

  const currentPlan = getPlanDetails(onboardingData.plan);
  const pathsMonitored = onboardingData.paths.length;
  const needsAddOn = pathsMonitored > currentPlan.maxPaths;
  const excessPaths = Math.max(0, pathsMonitored - currentPlan.maxPaths);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="size-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Settings</h1>
            <p className="text-slate-600">Manage your monitoring configuration and billing</p>
          </div>

          {/* Current Plan */}
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">Current Plan</h2>
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl font-bold">{currentPlan.name} Plan</span>
                  <Badge className={
                    onboardingData.plan === "free" ? "bg-slate-600" :
                    onboardingData.plan === "starter" ? "bg-blue-600" : "bg-purple-600"
                  }>
                    ${currentPlan.price}/month
                  </Badge>
                </div>
                <p className="text-slate-600 mb-4">
                  Up to {currentPlan.maxPaths} pages • {onboardingData.frequency}
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="size-2 bg-green-600 rounded-full"></div>
                    <span>Currently monitoring {pathsMonitored} pages</span>
                  </div>
                  {needsAddOn && (
                    <div className="flex items-center gap-2">
                      <div className="size-2 bg-orange-600 rounded-full"></div>
                      <span className="text-orange-600 font-medium">
                        {excessPaths} pages require add-ons
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <Button variant="outline" onClick={onChangePlan}>
                <CreditCard className="size-4 mr-2" />
                Change Plan
              </Button>
            </div>
          </Card>

          {/* Add-Ons */}
          {needsAddOn && (
            <Card className="p-6 border-orange-200 bg-orange-50">
              <h2 className="text-xl font-bold mb-4">Active Add-Ons</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-white rounded-lg border">
                  <div>
                    <p className="font-semibold">+{excessPaths <= 10 ? 10 : excessPaths <= 50 ? 50 : 100} Pages Bundle</p>
                    <p className="text-sm text-slate-600">Covers {excessPaths} excess pages</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">
                      ${excessPaths <= 10 ? 5 : excessPaths <= 50 ? 20 : 35}/month
                    </p>
                    <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                      <Trash2 className="size-3 mr-1" />
                      Remove
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Website Configuration */}
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">Website Configuration</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="domain">Domain</Label>
                <Input
                  id="domain"
                  value={onboardingData.domain}
                  disabled
                  className="bg-slate-50"
                />
              </div>
              <div>
                <Label htmlFor="frequency">Check Frequency</Label>
                <Select 
                  value={onboardingData.frequency}
                  onValueChange={(value) => onUpdateSettings({ frequency: value })}
                >
                  <SelectTrigger id="frequency">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {onboardingData.plan === "growth" && (
                      <SelectItem value="Every 15 minutes">Every 15 minutes</SelectItem>
                    )}
                    {(onboardingData.plan === "starter" || onboardingData.plan === "growth") && (
                      <>
                        <SelectItem value="Every 30 minutes">Every 30 minutes</SelectItem>
                        <SelectItem value="Every 1 hour">Every 1 hour</SelectItem>
                      </>
                    )}
                    {onboardingData.plan === "free" && (
                      <SelectItem value="Every 6 hours">Every 6 hours</SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Monitored Paths</Label>
                <p className="text-sm text-slate-600 mb-2">
                  {pathsMonitored} paths currently monitored
                </p>
                <Button variant="outline" size="sm" onClick={onManagePaths}>
                  Manage Paths
                </Button>
              </div>
            </div>
          </Card>

          {/* Email Alerts */}
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Bell className="size-5" />
              Email Alerts
            </h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="alert-email">Alert Email</Label>
                <Input
                  id="alert-email"
                  type="email"
                  value={onboardingData.email}
                  disabled
                  className="bg-slate-50"
                />
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">Consolidated Alerts</p>
                  <p className="text-sm text-slate-600">
                    Receive one email per monitoring cycle with all broken pages
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">Instant Notifications</p>
                  <p className="text-sm text-slate-600">
                    Get notified immediately when a page breaks
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              {onboardingData.plan === "free" && (
                <div className="bg-slate-50 p-4 rounded-lg">
                  <p className="text-sm text-slate-700">
                    Free plan is limited to 3 email alerts per day.{" "}
                    <button className="text-blue-600 hover:underline font-medium">
                      Upgrade to Starter
                    </button>{" "}
                    for unlimited alerts.
                  </p>
                </div>
              )}
            </div>
          </Card>

          {/* Integrations */}
          {onboardingData.plan === "growth" && (
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Integrations</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Slack</p>
                    <p className="text-sm text-slate-600">Send alerts to Slack channels</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Connect
                  </Button>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg opacity-50">
                  <div>
                    <p className="font-medium">Webhook</p>
                    <p className="text-sm text-slate-600">Send alerts to custom endpoints</p>
                  </div>
                  <Badge variant="outline">Coming Soon</Badge>
                </div>
              </div>
            </Card>
          )}

          {/* Account */}
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">Account</h2>
            <div className="space-y-4">
              <div>
                <Label>Email</Label>
                <p className="text-slate-700">{onboardingData.email}</p>
              </div>
              <div className="pt-4 border-t">
                <Button variant="outline" className="text-red-600 hover:text-red-700">
                  Delete Account
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}