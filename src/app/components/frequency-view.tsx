import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import { ArrowLeft, Clock, Activity, Calendar, Zap } from "lucide-react";
import type { OnboardingData } from "./onboarding-flow";

interface FrequencyViewProps {
  onboardingData: OnboardingData;
  onBack: () => void;
  onUpdateFrequency: (frequency: string) => void;
}

export function FrequencyView({ onboardingData, onBack, onUpdateFrequency }: FrequencyViewProps) {
  const getFrequencyDetails = (frequency: string) => {
    const freqMap: Record<string, { interval: string, checksPerDay: number, icon: string }> = {
      "Every 15 minutes": { interval: "15 min", checksPerDay: 96, icon: "⚡" },
      "Every 30 minutes": { interval: "30 min", checksPerDay: 48, icon: "🚀" },
      "Every 1 hour": { interval: "1 hour", checksPerDay: 24, icon: "⏰" },
      "Every 6 hours": { interval: "6 hours", checksPerDay: 4, icon: "🕐" }
    };
    return freqMap[frequency] || { interval: frequency, checksPerDay: 0, icon: "📊" };
  };

  const details = getFrequencyDetails(onboardingData.frequency);

  // Generate next check times
  const getNextCheckTimes = () => {
    const times = [];
    const now = new Date();
    
    const intervalMinutes = onboardingData.frequency === "Every 15 minutes" ? 15 :
                           onboardingData.frequency === "Every 30 minutes" ? 30 :
                           onboardingData.frequency === "Every 1 hour" ? 60 : 360;
    
    for (let i = 1; i <= 5; i++) {
      const nextTime = new Date(now.getTime() + (intervalMinutes * i * 60000));
      times.push(nextTime);
    }
    
    return times;
  };

  const nextCheckTimes = getNextCheckTimes();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
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
          <div className="flex items-center gap-4">
            <Clock className="size-8 text-blue-600" />
            <div>
              <h1 className="text-3xl font-bold">Monitoring Frequency</h1>
              <p className="text-slate-600">
                Check schedule and frequency settings for {onboardingData.domain}
              </p>
            </div>
          </div>

          {/* Current Frequency Card */}
          <Card className="p-8 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
            <div className="text-center">
              <div className="text-6xl mb-4">{details.icon}</div>
              <div className="text-4xl font-bold mb-2">{onboardingData.frequency}</div>
              <p className="text-lg text-slate-600 mb-4">
                Checking {onboardingData.paths.length} pages every {details.interval}
              </p>
              <Badge className="bg-blue-600 text-lg px-4 py-2">
                {details.checksPerDay} checks per day
              </Badge>
            </div>
          </Card>

          {/* Change Frequency */}
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">Change Frequency</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-slate-600 mb-3">
                  Select how often you want to check your pages. Available frequencies depend on your plan.
                </p>
                <Select 
                  value={onboardingData.frequency}
                  onValueChange={onUpdateFrequency}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {onboardingData.plan === "growth" && (
                      <SelectItem value="Every 15 minutes">
                        <div className="flex items-center gap-2">
                          <Zap className="size-4" />
                          <span>Every 15 minutes (96 checks/day)</span>
                        </div>
                      </SelectItem>
                    )}
                    {(onboardingData.plan === "starter" || onboardingData.plan === "growth") && (
                      <>
                        <SelectItem value="Every 30 minutes">
                          <div className="flex items-center gap-2">
                            <Activity className="size-4" />
                            <span>Every 30 minutes (48 checks/day)</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="Every 1 hour">
                          <div className="flex items-center gap-2">
                            <Clock className="size-4" />
                            <span>Every 1 hour (24 checks/day)</span>
                          </div>
                        </SelectItem>
                      </>
                    )}
                    {onboardingData.plan === "free" && (
                      <SelectItem value="Every 6 hours">
                        <div className="flex items-center gap-2">
                          <Calendar className="size-4" />
                          <span>Every 6 hours (4 checks/day)</span>
                        </div>
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </div>

              {onboardingData.plan === "free" && (
                <div className="bg-slate-50 p-4 rounded-lg">
                  <p className="text-sm text-slate-700">
                    Want faster monitoring?{" "}
                    <button className="text-blue-600 hover:underline font-medium">
                      Upgrade to Starter
                    </button>{" "}
                    for 30-minute checks or{" "}
                    <button className="text-blue-600 hover:underline font-medium">
                      Growth
                    </button>{" "}
                    for 15-minute checks.
                  </p>
                </div>
              )}
            </div>
          </Card>

          {/* Next Check Schedule */}
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Calendar className="size-5" />
              Upcoming Checks
            </h2>
            <div className="space-y-3">
              {nextCheckTimes.map((time, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50"
                >
                  <div className="flex items-center gap-3">
                    <div className={`size-2 rounded-full ${
                      index === 0 ? "bg-blue-600 animate-pulse" : "bg-slate-300"
                    }`}></div>
                    <span className="font-medium">
                      {index === 0 ? "Next check" : `Check ${index + 1}`}
                    </span>
                  </div>
                  <div className="text-sm text-slate-600">
                    {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    {" "}
                    ({Math.round((time.getTime() - new Date().getTime()) / 60000)} min)
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Plan Comparison */}
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">Frequency by Plan</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className={`p-4 border rounded-lg ${
                onboardingData.plan === "free" ? "border-blue-200 bg-blue-50" : ""
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">Free</h3>
                  {onboardingData.plan === "free" && (
                    <Badge className="bg-blue-600">Current</Badge>
                  )}
                </div>
                <p className="text-2xl font-bold mb-1">Every 6 hours</p>
                <p className="text-sm text-slate-600">4 checks per day</p>
              </div>

              <div className={`p-4 border rounded-lg ${
                onboardingData.plan === "starter" ? "border-blue-200 bg-blue-50" : ""
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">Starter</h3>
                  {onboardingData.plan === "starter" && (
                    <Badge className="bg-blue-600">Current</Badge>
                  )}
                </div>
                <p className="text-2xl font-bold mb-1">Every 30 min</p>
                <p className="text-sm text-slate-600">Up to 48 checks/day</p>
              </div>

              <div className={`p-4 border rounded-lg ${
                onboardingData.plan === "growth" ? "border-blue-200 bg-blue-50" : ""
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">Growth</h3>
                  {onboardingData.plan === "growth" && (
                    <Badge className="bg-blue-600">Current</Badge>
                  )}
                </div>
                <p className="text-2xl font-bold mb-1">Every 15 min</p>
                <p className="text-sm text-slate-600">Up to 96 checks/day</p>
              </div>
            </div>
          </Card>

          {/* Info Card */}
          <Card className="p-6 bg-blue-50 border-blue-200">
            <h3 className="font-semibold mb-2">How Frequency Works</h3>
            <ul className="text-sm text-slate-700 space-y-1">
              <li>• Each page is checked at your selected frequency</li>
              <li>• We use a headless browser to visit each page</li>
              <li>• HTTP status, load time, and JS errors are captured</li>
              <li>• If any issues are found, you receive an email alert</li>
              <li>• More frequent checks = faster issue detection</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
