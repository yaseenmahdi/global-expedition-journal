import { useMemo, useState } from "react";
import { getCountry } from "@/data/countries";
import { masterQuizData, type QuizQuestion } from "@/data/quizBanks";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

interface Props {
  countryId: string;
  isComplete: boolean;
  onComplete: () => void;
}

const encourageCorrect = ["Amazing! 🎉", "You got it! 🌟", "Awesome job! 🏆", "Brilliant! ✨", "Wow, great answer! 🎊"];
const encourageWrong = ["Not quite — but now you know! 🌟", "Good guess! Keep learning! 💪", "Almost! Now you'll remember! 🧠"];

const SEEN_KEY = (countryId: string) => `quiz-seen-${countryId}`;

function loadSeen(countryId: string): string[] {
  try { return JSON.parse(localStorage.getItem(SEEN_KEY(countryId)) || "[]"); } catch { return []; }
}
function saveSeen(countryId: string, qs: string[]) {
  try { localStorage.setItem(SEEN_KEY(countryId), JSON.stringify(qs)); } catch { /* localStorage may be unavailable */ }
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Pick 3 questions, prioritizing unseen ones on retake.
function pickQuestions(bank: QuizQuestion[], countryId: string, isRetake: boolean): QuizQuestion[] {
  if (bank.length <= 3) return shuffle(bank);
  const seen = isRetake ? loadSeen(countryId) : [];
  const unseen = bank.filter(q => !seen.includes(q.question));
  const seenInBank = bank.filter(q => seen.includes(q.question));
  const pool = shuffle(unseen).concat(shuffle(seenInBank));
  return pool.slice(0, 3);
}

export default function CountryQuiz({ countryId, isComplete, onComplete }: Props) {
  const [open, setOpen] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isRetake, setIsRetake] = useState(false);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);

  const country = getCountry(countryId);

  // Build a unified bank: prefer expanded bank, fall back to legacy quizQuestions.
  const fullBank: QuizQuestion[] = useMemo(() => {
    const expanded = masterQuizData[countryId];
    if (expanded && expanded.length > 0) return expanded;
    // Convert legacy { options, answer:number } to new format
    const legacy = country?.quizQuestions || [];
    return legacy.map(q => ({
      question: q.question,
      options: q.options,
      correctAnswer: q.options[q.answer],
      explanation: "",
    }));
  }, [countryId, country]);

  if (fullBank.length === 0) return null;

  const q = questions[currentQ];
  const correctIdx = q ? q.options.indexOf(q.correctAnswer) : -1;
  const isCorrect = selected === correctIdx;
  const answered = selected !== null;

  const startQuiz = (retake: boolean) => {
    const picked = pickQuestions(fullBank, countryId, retake);
    setQuestions(picked);
    setIsRetake(retake);
    setCurrentQ(0);
    setSelected(null);
    setScore(0);
    setShowResult(false);
    setOpen(true);
  };

  const handleSelect = (idx: number) => {
    if (answered) return;
    setSelected(idx);
    if (idx === correctIdx) setScore(s => s + 1);
  };

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(c => c + 1);
      setSelected(null);
    } else {
      // Mark these questions as seen
      const prevSeen = loadSeen(countryId);
      const newSeen = Array.from(new Set([...prevSeen, ...questions.map(q => q.question)]));
      // If we've now seen all, reset so next retake can start fresh
      saveSeen(countryId, newSeen.length >= fullBank.length ? [] : newSeen);
      setShowResult(true);
    }
  };

  const handleDone = () => {
    if (!isRetake) onComplete();
    setOpen(false);
  };

  const resultMessage = score === questions.length
    ? "Explorer Genius! 🏆"
    : score >= 2 ? "Great job, keep going! ⭐" : "Good try! Try again? 🌍";

  return (
    <>
      {isComplete ? (
        <div className="inline-flex items-center gap-2">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold">
            Quiz Complete ✅
          </span>
          <Button onClick={() => startQuiz(true)} variant="outline" size="sm" className="font-bold text-xs">
            Retake Quiz 🔄
          </Button>
        </div>
      ) : (
        <Button onClick={() => startQuiz(false)} variant="outline" size="sm" className="font-bold">
          Take the Quiz ❓
        </Button>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl">
              {country?.flag} {country?.name} Quiz {isRetake && <span className="text-xs font-bold text-secondary">· Practice 🔄</span>}
            </DialogTitle>
            <DialogDescription>
              {isRetake ? "Practice round — XP already earned ⭐" : `Answer ${questions.length || 3} questions about ${country?.name}!`}
            </DialogDescription>
          </DialogHeader>

          {!showResult && q ? (
            <div className="flex flex-col gap-4">
              <p className="text-xs text-muted-foreground font-semibold">Question {currentQ + 1} of {questions.length}</p>
              <p className="text-lg font-bold text-foreground">{q.question}</p>

              <div className="flex flex-col gap-2">
                {q.options.map((opt, idx) => {
                  let btnClass = "w-full py-3 text-left px-4 rounded-xl border-2 font-semibold text-sm transition-all ";
                  if (!answered) {
                    btnClass += "border-border bg-card hover:bg-muted text-foreground";
                  } else if (idx === correctIdx) {
                    btnClass += "border-primary bg-primary/10 text-primary";
                  } else if (idx === selected) {
                    btnClass += "border-destructive bg-destructive/10 text-destructive";
                  } else {
                    btnClass += "border-border bg-card text-muted-foreground opacity-50";
                  }
                  return (
                    <button key={idx} onClick={() => handleSelect(idx)} className={btnClass} disabled={answered}>
                      <span className="flex items-center gap-2">
                        {answered && idx === correctIdx && <span>✅</span>}
                        {answered && idx === selected && idx !== correctIdx && <span>❌</span>}
                        {opt}
                      </span>
                    </button>
                  );
                })}
              </div>

              {answered && (
                <div className="text-center">
                  <p className="text-base font-bold text-foreground mb-2">
                    {isCorrect
                      ? encourageCorrect[currentQ % encourageCorrect.length]
                      : encourageWrong[currentQ % encourageWrong.length]}
                  </p>
                  {q.explanation && (
                    <p className="text-xs text-muted-foreground mb-3 px-2 leading-relaxed">{q.explanation}</p>
                  )}
                  <Button onClick={handleNext} className="px-8 font-bold">
                    {currentQ < questions.length - 1 ? "Next Question →" : "See Results 🎯"}
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-6">
              <p className="text-5xl mb-4">{score === questions.length ? "🏆" : score >= 2 ? "⭐" : "🌍"}</p>
              <p className="text-3xl font-heading text-foreground mb-2">{score} / {questions.length}</p>
              <p className="text-lg font-bold text-foreground mb-2">{resultMessage}</p>
              {isRetake && (
                <p className="text-sm font-semibold text-muted-foreground mb-4">
                  Great practice! XP already earned for this quiz ⭐
                </p>
              )}
              <Button onClick={handleDone} className="px-8 py-5 text-base font-bold rounded-xl">
                Done ✅
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
