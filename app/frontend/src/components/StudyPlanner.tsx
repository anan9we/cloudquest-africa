import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Target, CheckCircle2, Sparkles, BookOpen, AlertTriangle, RotateCcw, ArrowRight } from 'lucide-react';
import { domains, loadHistory, Attempt } from '../pages/quizData';

interface StudyDay {
  day: number;
  date: string;
  domainId: string;
  domainTitle: string;
  topic: string;
  isWeakSpot: boolean;
  hours: number;
  tasks: string[];
  completed: boolean;
}

const DOMAIN_TOPICS: Record<string, string[]> = {
  cloud: [
    'Cloud models (Public, Private, Hybrid, Multi-cloud)',
    'Shared Responsibility Model & Security layers',
    'IaaS vs PaaS vs SaaS service models',
    'Consumption-based billing, CapEx vs OpEx',
    'High Availability, Elasticity, Scalability & Agility',
    'Disaster Recovery & Fault Tolerance'
  ],
  architecture: [
    'Azure Regions, Availability Zones & Region Pairs',
    'Management Groups, Subscriptions & Resource Groups',
    'Azure Compute: VMs, Scale Sets, App Service, ACI, AKS & Functions',
    'Azure Networking: VNets, Subnets, Peering, VPN Gateway & ExpressRoute',
    'Azure Storage: Blobs, Files, Tiers (Hot/Cool/Cold/Archive) & Redundancy',
    'Databases & Identity: Cosmos DB, Azure SQL, Entra ID, MFA & SSO'
  ],
  management: [
    'Cost Management: Pricing & TCO Calculators, Budgets & Tags',
    'Governance: Azure Policy, RBAC vs Resource Locks (ReadOnly/CanNotDelete)',
    'Infrastructure as Code: ARM Templates, Bicep & Azure Automation',
    'Monitoring: Azure Monitor, Log Analytics, Alerts & Application Insights',
    'Health & Best Practices: Service Health, Resource Health & Azure Advisor',
    'Security & Compliance: Defender for Cloud, Zero Trust & Service Trust Portal'
  ]
};

const STORAGE_KEY = 'cloudquest-africa-study-plan-v2';

export const StudyPlanner: React.FC<{ onStartQuiz?: (domainId: string) => void }> = ({ onStartQuiz }) => {
  const [examDate, setExamDate] = useState<string>(() => {
    const d = new Date();
    d.setDate(d.getDate() + 10);
    return d.toISOString().split('T')[0];
  });
  const [dailyHours, setDailyHours] = useState<number>(2);
  const [focusDomain, setFocusDomain] = useState<string>('auto');
  const [history, setHistory] = useState<Attempt[]>([]);
  const [plan, setPlan] = useState<StudyDay[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    setHistory(loadHistory());
  }, []);

  // Analyze quiz attempts to find weak topics and lowest-scoring domain
  const weakTopicsSet = new Set<string>();
  const domainScores: Record<string, { correct: number; total: number }> = {
    cloud: { correct: 0, total: 0 },
    architecture: { correct: 0, total: 0 },
    management: { correct: 0, total: 0 }
  };

  history.forEach((attempt) => {
    attempt.weakTopics.forEach((t) => weakTopicsSet.add(t));
    if (domainScores[attempt.domainId]) {
      domainScores[attempt.domainId].correct += attempt.correct;
      domainScores[attempt.domainId].total += attempt.total;
    }
  });

  const detectedWeakTopics = Array.from(weakTopicsSet);

  const generatePlan = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const target = new Date(examDate);
    target.setHours(0, 0, 0, 0);

    const diffDays = Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    const totalDays = Math.max(3, Math.min(30, diffDays > 0 ? diffDays : 7));

    // Build prioritized topic queue
    const queue: { domainId: string; domainTitle: string; topic: string; isWeakSpot: boolean }[] = [];

    // 1. First inject user's actual weak topics from quiz history
    if (detectedWeakTopics.length > 0 && (focusDomain === 'auto' || focusDomain === 'all')) {
      detectedWeakTopics.forEach((weakTopic) => {
        const matchedDomain =
          domains.find((d) =>
            DOMAIN_TOPICS[d.id]?.some((t) => t.toLowerCase().includes(weakTopic.toLowerCase()))
          ) || domains[0];

        queue.push({
          domainId: matchedDomain.id,
          domainTitle: matchedDomain.short,
          topic: `Priority Weak Area Review: ${weakTopic}`,
          isWeakSpot: true
        });
      });
    }

    // 2. Fill remaining days based on selected domain filter
    const targetDomains =
      focusDomain === 'auto' || focusDomain === 'all'
        ? domains
        : domains.filter((d) => d.id === focusDomain);

    let round = 0;
    while (queue.length < totalDays) {
      for (const d of targetDomains) {
        const topicsList = DOMAIN_TOPICS[d.id] || DOMAIN_TOPICS.cloud;
        const topic = topicsList[round % topicsList.length];
        queue.push({
          domainId: d.id,
          domainTitle: d.short,
          topic,
          isWeakSpot: false
        });
        if (queue.length >= totalDays) break;
      }
      round++;
    }

    const newPlan: StudyDay[] = [];
    for (let i = 0; i < totalDays; i++) {
      const scheduleDate = new Date(today);
      scheduleDate.setDate(today.getDate() + i + 1);
      const item = queue[i];
      const isFinalDay = i === totalDays - 1;

      const tasks = isFinalDay
        ? [
            'Take a full 30-question timed mock exam across all 3 domains',
            'Review all flagged explanations and verify > 80% readiness score',
            'Rest early and verify your exam check-in requirements'
          ]
        : [
            `Spend ${Math.round(dailyHours * 25)} mins studying Microsoft Learn modules on ${item.topic}`,
            `Complete a 15-question practice round in "${item.domainTitle}" and read every explanation`,
            item.isWeakSpot
              ? `Write 3 flash-notes on why you previously missed questions in ${item.topic}`
              : `Summarize key SLAs, pricing tiers, and exam traps for ${item.topic}`
          ];

      newPlan.push({
        day: i + 1,
        date: scheduleDate.toLocaleDateString('en-GB', {
          weekday: 'short',
          day: 'numeric',
          month: 'short'
        }),
        domainId: item.domainId,
        domainTitle: item.domainTitle,
        topic: isFinalDay ? 'Final Mock Exam & Readiness Check' : item.topic,
        isWeakSpot: item.isWeakSpot,
        hours: dailyHours,
        tasks,
        completed: false
      });
    }

    setPlan(newPlan);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newPlan));
  };

  const toggleDay = (index: number) => {
    const updated = [...plan];
    updated[index].completed = !updated[index].completed;
    setPlan(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const clearPlan = () => {
    setPlan([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  const completedCount = plan.filter((d) => d.completed).length;
  const progressPercent = plan.length > 0 ? Math.round((completedCount / plan.length) * 100) : 0;

  return (
    <div className="max-w-4xl mx-auto my-6 space-y-6">
      {/* Main Configuration Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              Smart Exam Roadmap
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Personal AZ-900 Study Planner</h2>
            <p className="text-sm text-slate-600 mt-1">
              Automatically adapts to your target exam date, daily availability, and missed quiz topics.
            </p>
          </div>

          {plan.length > 0 && (
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 min-w-[210px]">
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1.5">
                <span>Roadmap Progress</span>
                <span className="text-purple-700">{progressPercent}%</span>
              </div>
              <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="bg-purple-600 h-full rounded-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-500 mt-1.5">
                {completedCount} of {plan.length} study days completed
              </p>
            </div>
          )}
        </div>

        {/* Weak Topics Banner (if user has taken quizzes) */}
        {detectedWeakTopics.length > 0 && (
          <div className="mt-5 p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs text-amber-900">
              <span className="font-bold block mb-1">
                Detected Weak Areas from Your Quiz History:
              </span>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {detectedWeakTopics.map((topic) => (
                  <span
                    key={topic}
                    className="px-2 py-0.5 bg-amber-100/80 border border-amber-300 rounded-md font-semibold text-amber-900"
                  >
                    {topic}
                  </span>
                ))}
              </div>
              <p className="mt-1.5 text-amber-800">
                Choosing <strong>"Auto-Prioritize My Weak Areas"</strong> below will front-load these topics into your first study days!
              </p>
            </div>
          </div>
        )}

        {/* Controls Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-purple-600" />
              Target Exam Date
            </label>
            <input
              type="date"
              value={examDate}
              onChange={(e) => setExamDate(e.target.value)}
              className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-teal-600" />
              Daily Study Commitment
            </label>
            <select
              value={dailyHours}
              onChange={(e) => setDailyHours(Number(e.target.value))}
              className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value={1}>1 Hour / day (Light pace)</option>
              <option value={2}>2 Hours / day (Recommended)</option>
              <option value={3}>3 Hours / day (Fast-track bootcamp)</option>
              <option value={4}>4 Hours / day (Weekend sprint)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <Target className="w-4 h-4 text-orange-600" />
              Focus Strategy
            </label>
            <select
              value={focusDomain}
              onChange={(e) => setFocusDomain(e.target.value)}
              className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="auto">⚡ Auto-Prioritize Weak Areas + All Domains</option>
              <option value="all">Balanced (All 3 AZ-900 Domains)</option>
              <option value="cloud">Domain 1: Cloud Concepts (25–30%)</option>
              <option value="architecture">Domain 2: Architecture & Services (35–40%)</option>
              <option value="management">Domain 3: Management & Governance (30–35%)</option>
            </select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-slate-100">
          {plan.length > 0 && (
            <button
              onClick={clearPlan}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset
            </button>
          )}
          <button
            onClick={generatePlan}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-purple-600 hover:bg-purple-700 active:scale-95 text-white font-semibold text-sm rounded-xl shadow-sm transition-all"
          >
            <Sparkles className="w-4 h-4" />
            {plan.length > 0 ? 'Update My Study Plan' : 'Generate My Study Plan'}
          </button>
        </div>
      </div>

      {/* Schedule List */}
      {plan.length === 0 ? (
        <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center">
          <BookOpen className="w-10 h-10 text-slate-400 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">Ready to build your exam roadmap?</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
            Select your upcoming AZ-900 exam date and daily study hours above, then click{' '}
            <strong>Generate My Study Plan</strong> to get a customized day-by-day checklist.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {plan.map((item, idx) => (
            <div
              key={item.day}
              className={`bg-white rounded-2xl border p-5 transition-all ${
                item.completed
                  ? 'border-emerald-200 bg-emerald-50/40'
                  : item.isWeakSpot
                  ? 'border-amber-300 shadow-sm'
                  : 'border-slate-200 hover:border-slate-300 shadow-sm'
              }`}
            >
              <div className="flex items-start gap-4">
                <button
                  onClick={() => toggleDay(idx)}
                  className={`mt-0.5 w-6 h-6 rounded-full flex items-center justify-center border transition-colors shrink-0 ${
                    item.completed
                      ? 'bg-emerald-600 border-emerald-600 text-white'
                      : 'border-slate-300 text-transparent hover:border-purple-500'
                  }`}
                  title="Mark day as complete"
                >
                  <CheckCircle2 className="w-4 h-4" />
                </button>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-slate-900 text-white">
                        Day {item.day}
                      </span>
                      <span className="text-xs font-semibold text-slate-500">{item.date}</span>
                      <span className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200">
                        {item.domainTitle}
                      </span>
                      {item.isWeakSpot && (
                        <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-300">
                          ⚡ Priority Weak Area
                        </span>
                      )}
                    </div>

                    <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg">
                      ⏱ {item.hours} {item.hours === 1 ? 'hr' : 'hrs'}
                    </span>
                  </div>

                  <h4
                    className={`text-base font-bold mt-2 ${
                      item.completed ? 'line-through text-slate-400' : 'text-slate-900'
                    }`}
                  >
                    {item.topic}
                  </h4>

                  <ul className="mt-2.5 space-y-1.5">
                    {item.tasks.map((task, tidx) => (
                      <li key={tidx} className="text-xs text-slate-600 flex items-start gap-2">
                        <ArrowRight className="w-3.5 h-3.5 text-purple-500 shrink-0 mt-0.5" />
                        <span className={item.completed ? 'line-through text-slate-400' : ''}>{task}</span>
                      </li>
                    ))}
                  </ul>

                  {onStartQuiz && !item.completed && (
                    <div className="mt-3 pt-3 border-t border-slate-100 flex justify-end">
                      <button
                        onClick={() => onStartQuiz(item.domainId)}
                        className="text-xs font-bold text-purple-700 hover:text-purple-900 inline-flex items-center gap-1"
                      >
                        Practice {item.domainTitle} Quiz Now →
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};