import { useState } from 'react';
import { ArrowDown, ArrowRight, BookOpen, ChartNoAxesCombined, Check, CheckCircle2, ChevronDown, Cloud, Globe2, GraduationCap, Layers3, Lightbulb, ListChecks, ShieldCheck, Sparkles, Target, Trophy } from 'lucide-react';
import { QuizView, ResultsView } from './QuizViews';
import { StudyPlanner } from '../components/StudyPlanner';
import { StudyBuddy } from '../components/StudyBuddy';
import { domains, questions as bank, selectQuestions, loadHistory, historyKey } from './quizData';
import type { AnswerRecord, Attempt, Question } from './quizData';

const domainIcons = [Cloud, Layers3, ShieldCheck];

export default function Index() {
  const [screen, setScreen] = useState<'start' | 'quiz' | 'results'>('start');
  const [activeTab, setActiveTab] = useState<'quiz' | 'planner'>('quiz');
  const [selectedDomain, setSelectedDomain] = useState('all');
  const [sessionDomain, setSessionDomain] = useState('all');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);
  const [history, setHistory] = useState<Attempt[]>(loadHistory);
  const [saveError, setSaveError] = useState('');
  const totalCorrect = history.reduce((sum, a) => sum + a.correct, 0);
  const totalAnswered = history.reduce((sum, a) => sum + a.total, 0);
  const bestScore = history.length ? Math.max(...history.map(a => Math.round((a.correct / a.total) * 100))) : 0;
  const recent = history[history.length - 1];
  const questionCount = bank.filter(q => selectedDomain === 'all' || q.domainId === selectedDomain).length;

  function startQuiz(domainId = selectedDomain) {
    setQuestions(selectQuestions(domainId));
    setSessionDomain(domainId);
    setAnswers([]);
    setIndex(0);
    setSaveError('');
    setScreen('quiz');
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  function handleAnswer(selectedIndex: number) {
    if (answers[index]) return;
    const question = questions[index];
    setAnswers(prev => [...prev, { questionId: question.id, selectedIndex, isCorrect: selectedIndex === question.correctIndex }]);
  }

  function handleNext() {
    if (!answers[index]) return;
    if (index < questions.length - 1) {
      setIndex(index + 1);
      return;
    }
    const attempt: Attempt = {
      date: new Date().toISOString(),
      domainId: sessionDomain,
      correct: answers.filter(a => a.isCorrect).length,
      total: questions.length,
      weakTopics: [...new Set(questions.filter((_, i) => !answers[i].isCorrect).map(q => q.topic))]
    };
    const updated = [...history, attempt].slice(-50);
    setHistory(updated);
    try {
      localStorage.setItem(historyKey, JSON.stringify(updated));
    } catch {
      setSaveError('Your results are ready, but this browser could not save your progress.');
    }
    setScreen('results');
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  function navigate(section: string) {
    setScreen('start');
    setTimeout(() => document.getElementById(section)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 0);
  }

  return (
    <div className="cloudquest-app">
      <header className="site-header">
        <div className="header-inner">
          <button className="brand" onClick={() => navigate('home')} aria-label="CloudQuest Africa home">
            <span className="brand-mark"><Cloud size={26} strokeWidth={2.5} /></span>
            <span>CloudQuest<span className="brand-africa">Africa<span className="brand-dot" /></span></span>
          </button>
          <nav aria-label="Main navigation">
            <button className={screen !== 'results' ? 'nav-active' : ''} onClick={() => navigate('domains')}>Practice</button>
            <button onClick={() => navigate('progress')}>My progress</button>
          </nav>
          <span className="certification-pill"><GraduationCap size={16} /> AZ-900 Practice</span>
        </div>
      </header>

      <main className="main-container" id="home">
        {screen === 'start' ? (
          <>
            <section className="hero">
              <div className="hero-copy">
                <span className="hero-eyebrow"><span /> YOUR CLOUD JOURNEY STARTS HERE</span>
                <h1>Big cloud dreams.<br /><span>Start with the<br className="desktop-break" /> fundamentals.</span></h1>
                <p>Build your Azure confidence, one question at a time.<br className="wide-break" /> Free, focused AZ-900 practice. Made for your next step.</p>
                <div className="hero-actions">
                  <button className="primary-button" onClick={() => startQuiz('all')}>Let’s practice <ArrowRight size={18} /></button>
                  <button className="hero-text-link" onClick={() => navigate('domains')}>Explore the domains <ArrowDown size={16} /></button>
                </div>
                <div className="hero-benefits">
                  <span><CheckCircle2 size={15} /> Always free</span>
                  <span><CheckCircle2 size={15} /> Learn at your pace</span>
                  <span><CheckCircle2 size={15} /> Track your growth</span>
                </div>
              </div>
              <div className="cloud-illustration" aria-hidden="true">
                <div className="orbit orbit-one" />
                <div className="orbit orbit-two" />
                <span className="tiny-star star-one">✦</span>
                <span className="tiny-star star-two">✦</span>
                <span className="orbit-dot dot-one" />
                <span className="orbit-dot dot-two" />
                <div className="cloud-shadow" />
                <div className="big-cloud"><Cloud size={172} strokeWidth={1.1} fill="white" /></div>
                <div className="azure-tile"><span className="azure-symbol">A</span></div>
                <div className="float-tile layers-tile"><Layers3 size={26} /></div>
                <div className="float-tile shield-tile"><ShieldCheck size={26} /></div>
                <div className="float-tag"><Sparkles size={14} /> A little practice. A big possibility.</div>
                <span className="illustration-caption">YOUR NEXT CHAPTER, IN THE CLOUD.</span>
              </div>
            </section>

            <div className="learning-strip">
              <span><BookOpen size={18} /><strong>Practice with purpose.</strong></span>
              <p>Three exam domains. Clear explanations. Real progress.</p>
              <span className="strip-end"><Globe2 size={16} /> Built for curious minds, across Africa.</span>
            </div>

            <section id="domains" className="domain-section">
              <div className="section-heading">
                <div>
                  <span className="eyebrow">FIND YOUR FOCUS</span>
                  <h2>One certification. Three building blocks.</h2>
                  <p>Choose a domain to sharpen your skills, or mix them all for a well-rounded session.</p>
                </div>
                <span className="section-badge">Aligned to AZ-900 domains</span>
              </div>
              <div className="domain-grid">
                {domains.map((domain, i) => {
                  const Icon = domainIcons[i];
                  const selected = selectedDomain === domain.id;
                  return (
                    <button key={domain.id} aria-pressed={selected} className={`domain-card ${domain.color} ${selected ? 'selected' : ''}`} onClick={() => setSelectedDomain(domain.id)}>
                      <div className="domain-card-top">
                        <span className="domain-icon"><Icon size={25} /></span>
                        <span className="weight-pill">{domain.weight} of exam</span>
                      </div>
                      <span className="domain-number">DOMAIN 0{i + 1}</span>
                      <h3>{domain.title}</h3>
                      <p>{domain.description}</p>
                      <div className="domain-card-bottom">
                        <span><ListChecks size={15} /> {bank.filter(q => q.domainId === domain.id).length} practice questions</span>
                        <span className="card-arrow">{selected ? <Check size={18} /> : <ArrowRight size={18} />}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* The Tab Toggles */}
            <div className="flex justify-center gap-3 my-8" id="study-section">
              <button
                onClick={() => setActiveTab('quiz')}
                style={{ padding: '10px 20px', borderRadius: '12px', fontWeight: 600, fontSize: '14px', cursor: 'pointer', border: 'none', transition: 'all 0.2s', backgroundColor: activeTab === 'quiz' ? '#4f46e5' : '#f1f5f9', color: activeTab === 'quiz' ? 'white' : '#475569' }}
              >
                📝 Smart Practice
              </button>
              <button
                onClick={() => setActiveTab('planner')}
                style={{ padding: '10px 20px', borderRadius: '12px', fontWeight: 600, fontSize: '14px', cursor: 'pointer', border: 'none', transition: 'all 0.2s', backgroundColor: activeTab === 'planner' ? '#9333ea' : '#f1f5f9', color: activeTab === 'planner' ? 'white' : '#475569' }}
              >
                📅 Study Planner
              </button>
            </div>

            {/* Render selected tab */}
            {activeTab === 'planner' ? (
              <StudyPlanner onStartQuiz={(domainId) => {
                setSelectedDomain(domainId);
                setActiveTab('quiz');
                setTimeout(() => document.getElementById('study-section')?.scrollIntoView({ behavior: 'smooth' }), 50);
              }} />
            ) : (
              <section className="study-grid">
                <div className="practice-panel">
                  <div className="panel-heading">
                    <span className="small-icon purple"><Target size={21} /></span>
                    <div>
                      <h2>Ready when you are.</h2>
                      <p>A small step today. More confidence tomorrow.</p>
                    </div>
                  </div>
                  <label htmlFor="domain-select">What would you like to practice?</label>
                  <div className="start-form">
                    <div className="select-wrap">
                      <select id="domain-select" value={selectedDomain} onChange={e => setSelectedDomain(e.target.value)}>
                        <option value="all">All domains — mixed practice</option>
                        {domains.map(d => <option key={d.id} value={d.id}>{d.title}</option>)}
                      </select>
                      <ChevronDown size={17} />
                    </div>
                    <button className="primary-button" onClick={() => startQuiz()}>Start practice <ArrowRight size={17} /></button>
                  </div>
                  <div className="practice-notes">
                    <span><ListChecks size={14} /> {questionCount} questions</span>
                    <span><Lightbulb size={14} /> Instant explanations</span>
                    <span>No timer, no pressure</span>
                  </div>
                  <div className="tip-box">
                    <Lightbulb size={18} />
                    <p><strong>A little tip:</strong> Start with all domains to discover your strengths, then focus on the areas that need a little more love.</p>
                  </div>
                </div>

                <div className="progress-panel" id="progress">
                  <div className="progress-heading">
                    <div>
                      <span className="eyebrow">KEEP MOVING FORWARD</span>
                      <h2>Your learning journey</h2>
                    </div>
                    <ChartNoAxesCombined size={24} />
                  </div>
                  <div className="progress-stats">
                    <div>
                      <strong>{history.length.toString().padStart(2, '0')}</strong>
                      <span>Sessions completed</span>
                    </div>
                    <div>
                      <strong>{bestScore}<small>%</small></strong>
                      <span>Best score</span>
                    </div>
                  </div>
                  <div className="journey-caption">
                    {history.length ? `${totalCorrect} correct answers across ${totalAnswered} questions. Keep it up!` : 'Your first session is the start of something good.'}
                  </div>
                  <div className="progress-divider" />
                  <div className="recent-progress">
                    <span className="journey-icon"><Trophy size={21} /></span>
                    <div>
                      <strong>{recent ? `Last session: ${Math.round((recent.correct / recent.total) * 100)}% correct` : 'A fresh start. Endless possibilities.'}</strong>
                      <p>{recent ? (recent.weakTopics.length ? `Next focus: ${recent.weakTopics.slice(0, 2).join(', ')}` : 'All answers correct. Nicely done!') : 'Complete a practice session to see your progress here.'}</p>
                    </div>
                  </div>
                  <span className="local-note">Progress is saved on this browser. Just for you.</span>
                </div>
              </section>
            )}

            <div className="encouragement">
              <span className="small-icon"><Sparkles size={18} /></span>
              <p>You don’t have to know it all yet. <strong>You just have to start.</strong></p>
              <span className="encouragement-tag">Keep learning. Keep growing.</span>
            </div>
          </>
        ) : screen === 'quiz' ? (
          <QuizView questions={questions} index={index} answers={answers} onAnswer={handleAnswer} onNext={handleNext} onBack={() => navigate('domains')} />
        ) : (
          <ResultsView questions={questions} answers={answers} saveError={saveError} onRetry={() => startQuiz(sessionDomain)} onBack={() => navigate('domains')} />
        )}
      </main>

      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-top">
            <span><Cloud size={18} /> CloudQuest Africa</span>
            <span>Made for the journey, not just the exam.</span>
          </div>
          <div style={{ marginTop: '1rem', padding: '0.85rem 1.1rem', borderRadius: '8px', background: '#fef2f2', border: '1.5px solid #ef4444', color: '#7f1d1d', fontSize: '0.82rem', lineHeight: '1.5' }}>
            <span style={{ fontWeight: 800, color: '#dc2626', textTransform: 'uppercase', letterSpacing: '0.04em', marginRight: '6px' }}>
              ⚠️ A friendly note:
            </span>
            CloudQuest Africa is an independent learning project, not affiliated with or endorsed by Microsoft. Our practice questions are original and are not actual certification exam questions.
          </div>
        </div>
      </footer>
      <StudyBuddy />
    </div>
  );
}