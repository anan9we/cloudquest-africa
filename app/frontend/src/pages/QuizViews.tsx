import { ArrowLeft, ArrowRight, Check, CheckCircle2, RotateCcw, Trophy, X } from 'lucide-react';
import type { AnswerRecord, Question } from './quizData';
import { domains } from './quizData';

interface QuizProps { questions: Question[]; index: number; answers: AnswerRecord[]; onAnswer: (index: number) => void; onNext: () => void; onBack: () => void }
export function QuizView({ questions, index, answers, onAnswer, onNext, onBack }: QuizProps) {
  const question = questions[index];
  const answer = answers[index];
  const domain = domains.find(d => d.id === question.domainId);
  return <section className="session-wrap">
    <button className="text-button back-link" onClick={onBack}><ArrowLeft size={16} /> Back to practice</button>
    <div className="session-card">
      <div className="session-meta"><span className="eyebrow">{domain?.short}</span><span>Question {index + 1} of {questions.length}</span></div>
      <div className="meter" role="progressbar" aria-label="Quiz progress" aria-valuemin={0} aria-valuemax={questions.length} aria-valuenow={answers.length}><span style={{ width: `${answers.length / questions.length * 100}%` }} /></div>
      <span className="topic-label">{question.topic}</span><h1 className="question-title">{question.text}</h1>
      <div className="answer-options">{question.options.map((option, i) => {
        const correct = !!answer && i === question.correctIndex;
        const incorrect = !!answer && answer.selectedIndex === i && !answer.isCorrect;
        return <button key={option} onClick={() => onAnswer(i)} disabled={!!answer} className={`answer-option ${correct ? 'correct' : ''} ${incorrect ? 'incorrect' : ''}`}><span className="answer-letter">{String.fromCharCode(65 + i)}</span><span>{option}</span>{correct && <Check size={20} />}{incorrect && <X size={20} />}</button>;
      })}</div>
      {answer && <div role="status" className={`answer-feedback ${answer.isCorrect ? 'correct' : 'incorrect'}`}><strong>{answer.isCorrect ? 'Nicely done! That’s correct.' : 'A learning moment. Keep going!'}</strong><p>{question.explanation}</p></div>}
      <div className="session-actions"><span>No timer. Take your time to learn.</span><button className="primary-button" disabled={!answer} onClick={onNext}>{index === questions.length - 1 ? 'See my results' : 'Next question'}<ArrowRight size={17} /></button></div>
    </div>
  </section>;
}
interface ResultsProps { questions: Question[]; answers: AnswerRecord[]; saveError: string; onRetry: () => void; onBack: () => void }
export function ResultsView({ questions, answers, saveError, onRetry, onBack }: ResultsProps) {
  const correct = answers.filter(a => a.isCorrect).length;
  const percentage = Math.round(correct / questions.length * 100);
  const mistakes = questions.filter((_, i) => !answers[i].isCorrect);
  return <section className="session-wrap"><div className="session-card results-card">
    <div className="result-icon"><Trophy size={30} /></div><span className="eyebrow">PRACTICE COMPLETE</span><h1>One step closer to cloud confidence.</h1><p className="muted">Every question is a chance to learn. Here’s how you did.</p>
    <div className="score-box"><strong>{percentage}<small>%</small></strong><div><h2>{correct} of {questions.length} correct</h2><p>{percentage >= 80 ? 'Great work! Keep building on this foundation.' : 'Keep practicing — you’re building your foundation.'}</p></div></div>
    <h2 className="section-title">Your domain breakdown</h2><div className="breakdown">{domains.map(domain => {
      const entries = questions.map((q, i) => ({ q, a: answers[i] })).filter(e => e.q.domainId === domain.id);
      if (!entries.length) return null;
      const right = entries.filter(e => e.a.isCorrect).length;
      return <div key={domain.id}><span>{domain.short}</span><strong>{right} / {entries.length}</strong><div className="meter"><span style={{ width: `${right / entries.length * 100}%` }} /></div></div>;
    })}</div>
    {mistakes.length > 0 ? <><h2 className="section-title">A little revision goes a long way</h2><div className="review-list">{mistakes.map(q => { const a = answers[questions.indexOf(q)]; return <details key={q.id}><summary>{q.text}</summary><div><p className="wrong-text">Your answer: {q.options[a.selectedIndex]}</p><p className="right-text">Correct answer: {q.options[q.correctIndex]}</p><p>{q.explanation}</p></div></details>; })}</div></> : <p className="perfect-note"><CheckCircle2 size={19} /> All correct — excellent practice session!</p>}
    <p className="save-note" role="status">{saveError || 'Your progress has been saved on this browser.'}</p>
    <div className="result-actions"><button className="primary-button" onClick={onRetry}><RotateCcw size={17} /> Try again</button><button className="secondary-button" onClick={onBack}>Choose another domain <ArrowRight size={17} /></button></div>
  </div></section>;
}
