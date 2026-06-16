import React, { useState, useEffect, useRef } from "react";
import { 
  BookOpen, 
  Sparkles, 
  UploadCloud, 
  RefreshCw, 
  ChevronLeft, 
  ChevronRight, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Trophy, 
  Bookmark, 
  Grid,
  Check,
  X,
  BookMarked,
  HelpCircle,
  BarChart3,
  Sliders,
  ChevronDown,
  Sun,
  Moon
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Question, ExamSession, VerificationResult } from "./types";
import { defaultQuestions } from "./data/defaultQuestions";

interface AnswerAttempt {
  questionText: string;
  topic: string;
  isCorrect: boolean;
  timestamp: number;
  mode: "practice" | "exam";
}

const babokTopicRecommendations: Record<string, { read: string; focus: string }> = {
  "Solution Evaluation": {
    read: "BABOK V3 Chapter 8: Solution Evaluation",
    focus: "Prioritize Solution Performance Assessment (Section 8.4) and Analyze Value Suggestion (Section 8.5)."
  },
  "Strategy Analysis": {
    read: "BABOK V3 Chapter 6: Strategy Analysis",
    focus: "Strengthen focus on Defining Future State Capabilities (Section 6.2) and Assessing Risks (Section 6.3)."
  },
  "Requirements Life Cycle Management": {
    read: "BABOK V3 Chapter 5: Requirements Life Cycle Management",
    focus: "Review Requirements Prioritization criteria (Section 5.3) and Integrity Traceability Matrices (Section 5.1)."
  },
  "Requirements Analysis and Design Definition": {
    read: "BABOK V3 Chapter 7: Requirements Analysis and Design Definition",
    focus: "Focus on Specifying and Modeling Requirements (Section 7.1) and Defining Solution/Design Options (Section 7.4)."
  },
  "Business Analysis Planning and Monitoring": {
    read: "BABOK V3 Chapter 3: Business Analysis Planning and Monitoring",
    focus: "Review Planning BA Governance (Section 3.3) and BA Information Management approaches (Section 3.4)."
  },
  "Elicitation and Collaboration": {
    read: "BABOK V3 Chapter 4: Elicitation and Collaboration",
    focus: "Understand Elicitation Results Refinement (Section 4.3) and Stakeholder Collaboration tactics (Section 4.4)."
  },
  "Uploaded Exam Questions": {
    read: "Review your custom uploaded syllabus",
    focus: "Cross-reference missed indices against BABOK V3 Chapter 10 core Business Analysis techniques."
  },
  "All Topics": {
    read: "Complete BABOK Guide V3",
    focus: "Broad spectrum review across all 6 core Knowledge Areas."
  }
};

export default function App() {
  // --- States ---
  const [questions, setQuestions] = useState<Question[]>(defaultQuestions);
  const [targetQuestionCount, setTargetQuestionCount] = useState<number>(15);
  const [activeSessionQuestions, setActiveSessionQuestions] = useState<Question[]>([]);
  const [cumulativeHistory, setCumulativeHistory] = useState<AnswerAttempt[]>([]);
  
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [sessionMode, setSessionMode] = useState<"practice" | "exam">("practice");
  const [userAnswers, setUserAnswers] = useState<Record<string, 'A' | 'B' | 'C' | 'D'>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<string, boolean>>({});
  
  // Exam simulator mechanics
  const [examStarted, setExamStarted] = useState<boolean>(false);
  const [examSubmitted, setExamSubmitted] = useState<boolean>(false);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Filters & UI Configuration
  const [selectedTopic, setSelectedTopic] = useState<string>("All Topics");
  const [questionFilter, setQuestionFilter] = useState<"all" | "unanswered" | "flagged" | "incorrect">("all");
  const [showQuestionsGrid, setShowQuestionsGrid] = useState<boolean>(false);

  // Drag and drop state
  const [dragActive, setDragDropActive] = useState<boolean>(false);
  const [customCountInput, setCustomCountInput] = useState<string>("");

  // --- Calculated Helpers ---
  const activeQuestion: Question | undefined = activeSessionQuestions[currentIndex];
  
  // Filter active session questions based on topic and unanswered/flagged statuses
  const filteredQuestions = activeSessionQuestions.filter((q) => {
    const matchesTopic = selectedTopic === "All Topics" || q.topic === selectedTopic;
    const isAnswered = !!userAnswers[q.id];
    const matchesFilterType = (() => {
      if (questionFilter === "unanswered") return !isAnswered;
      if (questionFilter === "flagged") return !flaggedQuestions[q.id] === false;
      if (questionFilter === "incorrect") {
        return isAnswered && userAnswers[q.id] !== q.correctAnswer;
      }
      return true;
    })();
    return matchesTopic && matchesFilterType;
  });
  
  // Theme state: light or dark
  const [theme, setTheme] = useState<"light" | "dark" | "ambient">("light");

  // Global shortcut: Enter key takes you to next question
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is inside an input field or interactive form element
      const target = e.target as HTMLElement;
      if (
        !target ||
        target.tagName === "INPUT" || 
        target.tagName === "TEXTAREA" || 
        target.isContentEditable ||
        target.getAttribute("role") === "textbox"
      ) {
        return;
      }
      if (e.key === "Enter") {
        e.preventDefault();
        setCurrentIndex((prev) => Math.min(filteredQuestions.length - 1, prev + 1));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [filteredQuestions.length]);

  // Load and apply theme mode
  useEffect(() => {
    const cachedTheme = (localStorage.getItem("babok_theme") as "light" | "dark" | "ambient") || "light";
    setTheme(cachedTheme);
  }, []);

  useEffect(() => {
    localStorage.setItem("babok_theme", theme);
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  // --- Initialize or Load Cached state ---
  useEffect(() => {
    const cachedQuestions = localStorage.getItem("babok_questions");
    const cachedAnswers = localStorage.getItem("babok_user_answers");
    const cachedFlags = localStorage.getItem("babok_flagged");
    const cachedMode = localStorage.getItem("babok_session_mode");
    const cachedTargetCount = localStorage.getItem("babok_target_count");
    const cachedHistory = localStorage.getItem("babok_cumulative_history");

    let loadedQuestions = defaultQuestions;
    if (cachedQuestions) {
      try {
        loadedQuestions = JSON.parse(cachedQuestions);
        setQuestions(loadedQuestions);
      } catch (e) {
        console.error("Failed to parse cached questions", e);
      }
    }

    if (cachedTargetCount) {
      setTargetQuestionCount(parseInt(cachedTargetCount, 10));
    } else {
      setTargetQuestionCount(loadedQuestions.length);
    }

    if (cachedHistory) {
      try {
        setCumulativeHistory(JSON.parse(cachedHistory));
      } catch (e) {
        console.error("Failed to parse cumulative history", e);
      }
    }

    if (cachedAnswers) {
      try {
        setUserAnswers(JSON.parse(cachedAnswers));
      } catch (e) {
        console.error("Failed to parse cached answers", e);
      }
    }
    if (cachedFlags) {
      try {
        setFlaggedQuestions(JSON.parse(cachedFlags));
      } catch (e) {
         console.error("Failed to parse cached flags", e);
      }
    }
    if (cachedMode) {
      setSessionMode(cachedMode as "practice" | "exam");
    }
  }, []);

  // Save states back to local storage on modification
  useEffect(() => {
    localStorage.setItem("babok_questions", JSON.stringify(questions));
  }, [questions]);

  useEffect(() => {
    localStorage.setItem("babok_target_count", targetQuestionCount.toString());
  }, [targetQuestionCount]);

  useEffect(() => {
    localStorage.setItem("babok_user_answers", JSON.stringify(userAnswers));
  }, [userAnswers]);

  useEffect(() => {
    localStorage.setItem("babok_flagged", JSON.stringify(flaggedQuestions));
  }, [flaggedQuestions]);

  useEffect(() => {
    localStorage.setItem("babok_session_mode", sessionMode);
  }, [sessionMode]);

  // Synchronize activeSessionQuestions based on target size and master question pool
  useEffect(() => {
    if (!questions || questions.length === 0) return;
    
    // Synthesize exam/practice question slots of exact target size
    const list: Question[] = [];
    for (let i = 0; i < targetQuestionCount; i++) {
      const baseQ = questions[i % questions.length];
      const isRepeated = i >= questions.length;
      list.push({
        ...baseQ,
        id: `${baseQ.id}-index-${i}`,
        number: i + 1,
        text: isRepeated 
          ? `${baseQ.text} (Review Set ${Math.floor(i / questions.length) + 1})`
          : baseQ.text
      });
    }
    setActiveSessionQuestions(list);
  }, [questions, targetQuestionCount]);

  // Exam timer control
  useEffect(() => {
    if (sessionMode === "exam" && examStarted && !examSubmitted) {
      timerRef.current = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [sessionMode, examStarted, examSubmitted]);

  // Re-map the current slide index safely if filter changes or returns empty
  useEffect(() => {
    if (filteredQuestions.length > 0 && currentIndex >= filteredQuestions.length) {
      setCurrentIndex(filteredQuestions.length - 1);
    } else if (filteredQuestions.length === 0 && currentIndex > 0) {
      setCurrentIndex(0);
    }
  }, [selectedTopic, questionFilter, filteredQuestions.length]);

  // Build a distinct set of topics/chapters detected in Master questions
  const topics: string[] = Array.from(new Set(questions.map((q) => q.topic || "Solution Evaluation")));

  // Calculate scores and performance
  const totalQuestionsCount = activeSessionQuestions.length;
  const answeredCount = Object.keys(userAnswers).length;
  const unansweredCount = Math.max(0, totalQuestionsCount - answeredCount);

  const correctAnswersList = activeSessionQuestions.map((q) => {
    const isAnswered = !!userAnswers[q.id];
    return isAnswered && userAnswers[q.id] === q.correctAnswer;
  });
  const correctCount = correctAnswersList.filter(Boolean).length;
  const wrongCount = Math.max(0, answeredCount - correctCount);
  const scorePercent = answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : 0;
  const examScorePercent = totalQuestionsCount > 0 ? Math.round((correctCount / totalQuestionsCount) * 100) : 0;

  // Identify strength or weakness based on topics inside the active session
  const performanceByTopic = topics.reduce((acc, topic) => {
    const topicQuestions = activeSessionQuestions.filter(q => q.topic === topic);
    const topicAnswered = topicQuestions.filter(q => !!userAnswers[q.id]);
    const topicCorrect = topicQuestions.filter(q => userAnswers[q.id] === q.correctAnswer);
    
    acc[topic] = {
      total: topicQuestions.length,
      answered: topicAnswered.length,
      correct: topicCorrect.length,
      percentage: topicAnswered.length > 0 ? Math.round((topicCorrect.length / topicAnswered.length) * 100) : 0
    };
    return acc;
  }, {} as Record<string, { total: number; answered: number; correct: number; percentage: number }>);

  // Historical accuracy rates & topic strengths/weaknesses
  const hasHistory = cumulativeHistory.length > 0;
  
  const historyTopicStats = topics.reduce((acc, topic) => {
    const topicAttempts = cumulativeHistory.filter(h => h.topic === topic);
    const correct = topicAttempts.filter(h => h.isCorrect).length;
    acc[topic] = {
      total: topicAttempts.length,
      correct: correct,
      rate: topicAttempts.length > 0 ? Math.round((correct / topicAttempts.length) * 100) : 0
    };
    return acc;
  }, {} as Record<string, { total: number; correct: number; rate: number }>);

  // Find weakest and strongest areas
  const topicStatsArray = Object.entries(historyTopicStats).filter(([_, s]) => s.total > 0);
  
  const weakestArea = topicStatsArray.length > 0 
    ? topicStatsArray.reduce((min, current) => current[1].rate < min[1].rate ? current : min, topicStatsArray[0])
    : null;

  const strongestArea = topicStatsArray.length > 0
    ? topicStatsArray.reduce((max, current) => current[1].rate > max[1].rate ? current : max, topicStatsArray[0])
    : null;

  const totalLifetimeAnswered = cumulativeHistory.length;
  const totalLifetimeCorrect = cumulativeHistory.filter(h => h.isCorrect).length;
  const lifetimeAccuracy = totalLifetimeAnswered > 0 
    ? Math.round((totalLifetimeCorrect / totalLifetimeAnswered) * 100) 
    : 0;

  // --- Handlers ---
  const recordAttempt = (questionText: string, topic: string, isCorrect: boolean, mode: "practice" | "exam") => {
    const newAttempt: AnswerAttempt = {
      questionText,
      topic,
      isCorrect,
      timestamp: Date.now(),
      mode
    };
    setCumulativeHistory((prev) => {
      const updated = [...prev, newAttempt];
      localStorage.setItem("babok_cumulative_history", JSON.stringify(updated));
      return updated;
    });
  };

  const submitExamStats = () => {
    const newAttempts = activeSessionQuestions.map(q => {
      const selected = userAnswers[q.id];
      if (!selected) return null;
      const isCorrect = selected === q.correctAnswer;
      return {
        questionText: q.text,
        topic: q.topic || "Solution Evaluation",
        isCorrect,
        timestamp: Date.now(),
        mode: "exam" as const
      };
    }).filter((x): x is AnswerAttempt => x !== null);

    if (newAttempts.length > 0) {
      setCumulativeHistory((prev) => {
        const updated = [...prev, ...newAttempts];
        localStorage.setItem("babok_cumulative_history", JSON.stringify(updated));
        return updated;
      });
    }
  };

  const handleSelectAnswer = (choice: 'A' | 'B' | 'C' | 'D') => {
    if (!activeQuestion) return;
    
    // In Exam Mode, if submitted, block updates
    if (sessionMode === "exam" && examSubmitted) return;

    setUserAnswers((prev) => {
      const updated = {
        ...prev,
        [activeQuestion.id]: choice,
      };

      // Record performance in practice mode on click
      if (sessionMode === "practice") {
        const isCorrect = choice === activeQuestion.correctAnswer;
        recordAttempt(activeQuestion.text, activeQuestion.topic || "Solution Evaluation", isCorrect, "practice");
      }

      return updated;
    });
  };

  const handleToggleFlag = (id: string) => {
    setFlaggedQuestions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleResetApp = () => {
    if (window.confirm("Are you sure you want to clear your current progress and restore the default BABOK v3 Question Bank?")) {
      setQuestions(defaultQuestions);
      setTargetQuestionCount(defaultQuestions.length);
      setUserAnswers({});
      setFlaggedQuestions({});
      setCurrentIndex(0);
      setExamStarted(false);
      setExamSubmitted(false);
      setElapsedTime(0);
    }
  };

  const startExamSim = () => {
    setUserAnswers({});
    setElapsedTime(0);
    setExamStarted(true);
    setExamSubmitted(false);
    setCurrentIndex(0);
  };

  const submitExamSim = () => {
    if (window.confirm("Are you sure you want to submit your exam answers now?")) {
      setExamSubmitted(true);
      submitExamStats();
    }
  };

  const formatTime = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div id="babok-app-root" className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-indigo-500/10 selection:text-indigo-950 dark:selection:text-indigo-200 transition-colors duration-300">
      
      {/* Top Banner Navigation */}
      <header id="babok-header" className="border-b border-slate-200 dark:border-slate-800/80 bg-white/90 dark:bg-slate-900/90 backdrop-blur sticky top-0 z-40 px-4 py-3 sm:px-6 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-md shadow-indigo-100 shrink-0">
              B
            </div>
            <div>
              <h1 className="font-display font-semibold text-lg sm:text-xl tracking-tight text-slate-800 dark:text-slate-100 flex items-center gap-2">
                BABOK® V3 Exam Studio
                <span className="text-[10px] uppercase font-mono tracking-wider bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 px-2.5 py-0.5 rounded-full border border-indigo-100 dark:border-indigo-900/50 font-semibold">
                  CBAP & CCBA
                </span>
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">Interactive CBAP & CCBA simulator built around the official guide</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="bg-slate-100 dark:bg-slate-800 p-0.5 rounded-xl border border-slate-200/60 dark:border-slate-705 flex">
              <button
                id="btn-mode-practice"
                onClick={() => {
                  setSessionMode("practice");
                  setExamStarted(false);
                  setExamSubmitted(false);
                }}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                  sessionMode === "practice" 
                    ? "bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-100" 
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                }`}
              >
                <Sliders className="h-3.5 w-3.5" />
                Practice Mode
              </button>
              <button
                id="btn-mode-exam"
                onClick={() => {
                  setSessionMode("exam");
                  setExamStarted(false);
                  setExamSubmitted(false);
                }}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                  sessionMode === "exam" 
                    ? "bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-100" 
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                }`}
              >
                <Clock className="h-3.5 w-3.5" />
                Exam Simulator
              </button>
            </div>

            <button
              id="btn-theme-toggle"
              onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
              title={`Switch to ${theme === "light" ? "Dark" : "Light"} Mode`}
              className="p-2 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-100 border border-slate-200 dark:border-slate-700 shadow-sm transition"
            >
              {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </button>

            <button
              id="btn-global-reset"
              onClick={handleResetApp}
              title="Reset progress to default bank"
              className="p-2 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-100 border border-slate-200 dark:border-slate-700 shadow-sm transition"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Workspace Frame */}
      <main id="babok-main" className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Left Side: Stats and Uploader */}
        <section id="sidebar-left" className="lg:col-span-1 space-y-6">
          

          {/* Configure Test Size & Simulator Card */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/85 rounded-2xl p-5 shadow-sm shadow-slate-100 dark:shadow-none space-y-4 transition-colors duration-300">
            <h2 className="font-display font-semibold text-sm text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <Sliders className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
              Configure Session Size
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-normal">
              Select or type the exact number of practice or exam questions to compile.
            </p>

            {/* Presets */}
            <div className="grid grid-cols-5 gap-1">
              {[15, 40, 100, 300, 500].map((preset) => (
                <button
                  key={preset}
                  onClick={() => {
                    setTargetQuestionCount(preset);
                    setUserAnswers({});
                    setCurrentIndex(0);
                    setExamSubmitted(false);
                    setExamStarted(false);
                    setElapsedTime(0);
                  }}
                  className={`py-1.5 px-0.5 rounded-lg text-xs font-semibold border transition-all ${
                    targetQuestionCount === preset
                      ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                      : "bg-slate-50 dark:bg-slate-800 text-slate-650 dark:text-slate-355 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700"
                  }`}
                >
                  {preset}
                </button>
              ))}
            </div>

            {/* Custom Input */}
            <div className="flex gap-2">
              <input
                type="number"
                min="1"
                max="1000"
                placeholder="Custom (e.g. 240)"
                value={customCountInput}
                onChange={(e) => setCustomCountInput(e.target.value)}
                className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 w-full"
              />
              <button
                onClick={() => {
                  const val = parseInt(customCountInput, 10);
                  if (!isNaN(val) && val > 0) {
                    setTargetQuestionCount(val);
                    setUserAnswers({});
                    setCurrentIndex(0);
                    setExamSubmitted(false);
                    setExamStarted(false);
                    setElapsedTime(0);
                    setCustomCountInput("");
                  }
                }}
                className="bg-indigo-600 text-white hover:bg-indigo-700 px-3 py-1.5 rounded-xl text-xs font-semibold transition shrink-0"
              >
                Apply
              </button>
            </div>

          </div>


          {/* Exam Simulator controller, if mode is "exam" */}
          {sessionMode === "exam" && (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm shadow-slate-100 dark:shadow-none space-y-4 transition-colors duration-300">
              <h2 className="font-display font-semibold text-sm text-slate-800 dark:text-slate-100 flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
                <Clock className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                Exam Simulator Mode
              </h2>

              {!examStarted ? (
                <div className="text-center py-4">
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">Under simulator conditions: correct responses are isolated until submission. Total time is tracked.</p>
                  <button
                    id="btn-start-exam"
                    onClick={startExamSim}
                    className="w-full py-2.5 rounded-xl bg-indigo-600 text-white font-semibold tracking-wide text-xs hover:bg-indigo-700 shadow-md shadow-indigo-100 transition"
                  >
                    Start Exam Session
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold font-mono">Timer</span>
                    <span className="text-indigo-600 dark:text-indigo-400 font-mono font-semibold text-sm bg-indigo-50/50 dark:bg-indigo-950/40 px-3 py-1 rounded-lg border border-indigo-100/50 dark:border-indigo-900/30">
                      {formatTime(elapsedTime)}
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                      <span>Completion</span>
                      <span>{answeredCount}/{totalQuestionsCount} questions</span>
                    </div>
                    <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden border border-slate-205 dark:border-slate-700">
                      <div 
                        className="h-full bg-indigo-600 transition-all duration-300"
                        style={{ width: `${(answeredCount / totalQuestionsCount) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  {!examSubmitted ? (
                    <button
                      id="btn-submit-exam"
                      onClick={submitExamSim}
                      className="w-full py-2.5 rounded-xl bg-amber-500 text-slate-950 font-semibold text-xs tracking-wider hover:bg-amber-400 transition"
                    >
                      Submit Exam Paper
                    </button>
                  ) : (
                    <div className="bg-emerald-55 dark:bg-emerald-950/20 p-3 rounded-xl border border-emerald-110 border-emerald-100 dark:border-emerald-900/30 text-center">
                      <p className="text-xs text-emerald-800 dark:text-emerald-300 font-semibold">Exam Finished & Graded</p>
                      <button
                        onClick={startExamSim}
                        className="mt-2 text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 underline font-medium"
                      >
                        Retake Exam
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Quick Stats Dashboard */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm shadow-slate-100 dark:shadow-none space-y-4 transition-colors duration-300">
            <h2 className="font-display font-semibold text-sm text-slate-800 dark:text-slate-100 mb-2 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                Performance Metrics
              </span>
              {sessionMode === "practice" && answeredCount > 0 && (
                <span className={`text-xs px-2.5 py-0.5 rounded-full font-mono font-semibold ${
                  scorePercent >= 70 ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-950" : "bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-955"
                }`}>
                  {scorePercent}% Avg
                </span>
              )}
            </h2>

            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="bg-slate-50 dark:bg-slate-800/65 p-3 rounded-xl border border-slate-200/60 dark:border-slate-705">
                <div className="text-xl font-display font-bold text-slate-800 dark:text-slate-100 mb-0.5">{totalQuestionsCount}</div>
                <div className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-widest font-bold font-mono">Bank Pool</div>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800/65 p-3 rounded-xl border border-slate-200/60 dark:border-slate-705">
                <div className="text-xl font-display font-bold text-indigo-600 dark:text-indigo-450 mb-0.5">{answeredCount}</div>
                <div className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-widest font-bold font-mono">Answered</div>
              </div>
            </div>

            {sessionMode === "practice" ? (
              <div className="space-y-2 text-xs">
                <div className="flex justify-between items-center py-1.5 border-b border-slate-100 dark:border-slate-800/60">
                  <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                    Correct
                  </span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-450 font-mono">{correctCount}</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-slate-100 dark:border-slate-800/60">
                  <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-rose-500"></span>
                    Incorrect
                  </span>
                  <span className="font-semibold text-rose-600 dark:text-rose-455 font-mono">{wrongCount}</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-slate-100 dark:border-slate-800/60">
                  <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-slate-300 dark:bg-slate-600"></span>
                    Remaining Tasks
                  </span>
                  <span className="font-semibold text-slate-650 dark:text-slate-300 font-mono">{unansweredCount}</span>
                </div>
              </div>
            ) : examSubmitted ? (
              <div className="space-y-4 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Trophy className={`h-5 w-5 ${examScorePercent >= 70 ? "text-amber-500" : "text-slate-400 dark:text-slate-500"}`} />
                  <span className="text-lg font-bold font-display text-slate-800 dark:text-slate-105">{examScorePercent}%</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {examScorePercent >= 70 
                    ? "Congratulations! You exceeded the standard 70% passing threshold for the CBAP exam." 
                    : "Score below 70%. Focus on development chapters below to strengthen competencies."}
                </p>
                <div className="text-xs text-slate-600 dark:text-slate-300 text-left pt-2 border-t border-slate-200 dark:border-slate-705 space-y-1">
                  <div className="flex justify-between"><span>Correct:</span> <span className="font-semibold text-emerald-600 dark:text-emerald-400">{correctCount}</span></div>
                  <div className="flex justify-between"><span>Wrong:</span> <span className="font-semibold text-rose-600 dark:text-rose-400">{wrongCount}</span></div>
                  <div className="flex justify-between"><span>Unanswered:</span> <span className="font-semibold text-slate-705 dark:text-slate-300">{unansweredCount}</span></div>
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-400 dark:text-slate-400 text-center py-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-705 border-dashed">
                Submit exam to unlock comprehensive simulator metrics.
              </p>
            )}
          </div>

          {/* Chapter-wise Breakdown */}
          {questions.length > 0 && (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm shadow-slate-100 dark:shadow-none space-y-3 transition-colors duration-300">
              <h2 className="font-display font-semibold text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                <BookMarked className="h-3.5 w-3.5 text-indigo-600" />
                Knowledge Area Breakdown
              </h2>
              <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
                {Object.entries(performanceByTopic).map(([topic, stat]) => (
                  <div key={topic} className="space-y-1 text-xs">
                    <div className="flex justify-between text-[11px] text-slate-505 dark:text-slate-400 font-mono">
                      <span className="text-slate-700 dark:text-slate-200 font-semibold truncate max-w-[140px]" title={topic}>{topic}</span>
                      <span className="font-semibold">{stat.correct}/{stat.total}</span>
                    </div>
                    <div className="h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden border border-slate-200 dark:border-slate-700/60">
                      <div 
                        className={`h-full transition-all duration-300 ${stat.percentage >= 70 ? "bg-emerald-500" : "bg-amber-400"}`}
                        style={{ width: `${(stat.correct / stat.total) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </section>

        {/* Center/Main Area: Question Card & options */}
        <section id="main-test-stage" className="lg:col-span-3 space-y-6">

          {/* Question Filter Controller Bar */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-3.5 flex flex-wrap items-center justify-between gap-4 shadow-sm shadow-slate-100 dark:shadow-none transition-colors duration-300">
            
            <div className="flex items-center gap-2.5 flex-wrap">
              <select
                id="select-filter-topic"
                value={selectedTopic}
                onChange={(e) => {
                  setSelectedTopic(e.target.value);
                  setCurrentIndex(0);
                }}
                className="bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-100 rounded-xl px-3 py-1.5 border border-slate-200 dark:border-slate-700 focus:border-indigo-500 focus:outline-none transition max-w-[200px] font-semibold"
              >
                <option value="All Topics">All Knowledge Areas</option>
                {topics.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>

              <div className="flex bg-slate-100/80 dark:bg-slate-800/80 rounded-xl p-0.5 border border-slate-200 dark:border-slate-700">
                <button
                  id="tab-filter-all"
                  onClick={() => { setQuestionFilter("all"); setCurrentIndex(0); }}
                  className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-all ${
                    questionFilter === "all" ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-105 shadow-sm border border-slate-200/40 dark:border-slate-600/40" : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                  }`}
                >
                  All ({filteredQuestions.length})
                </button>
                <button
                  id="tab-filter-unanswered"
                  onClick={() => { setQuestionFilter("unanswered"); setCurrentIndex(0); }}
                  className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-all ${
                    questionFilter === "unanswered" ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-105 shadow-sm border border-slate-200/40 dark:border-slate-600/40" : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                  }`}
                >
                  Unanswered
                </button>
                <button
                  id="tab-filter-flagged"
                  onClick={() => { setQuestionFilter("flagged"); setCurrentIndex(0); }}
                  className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-all ${
                    questionFilter === "flagged" ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-105 shadow-sm border border-slate-200/40 dark:border-slate-600/40" : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                  }`}
                >
                  Flagged
                </button>
                {sessionMode === "practice" && (
                  <button
                    id="tab-filter-incorrect"
                    onClick={() => { setQuestionFilter("incorrect"); setCurrentIndex(0); }}
                    className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-all ${
                      questionFilter === "incorrect" ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-105 shadow-sm border border-slate-200/40 dark:border-slate-600/40" : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                    }`}
                  >
                    Weak Areas
                  </button>
                )}
              </div>
            </div>

            <button
              id="btn-toggle-grid"
              onClick={() => setShowQuestionsGrid(!showQuestionsGrid)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-850 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-350 hover:text-slate-900 dark:hover:text-slate-100 transition shadow-sm ${
                showQuestionsGrid ? "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 border-slate-300 dark:border-slate-600" : ""
              }`}
            >
              <Grid className="h-3.5 w-3.5" />
              Question Index Grid
            </button>
          </div>

          {/* Expanded Navigation grid of questions indices */}
          {showQuestionsGrid && filteredQuestions.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm shadow-slate-100 dark:shadow-none transition-colors duration-300"
            >
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs uppercase tracking-wider font-mono text-slate-500 dark:text-slate-400 font-semibold block">Select Slide To Jump</span>
                <div className="flex items-center gap-3 text-[10px] uppercase font-mono text-slate-400 dark:text-slate-500 font-semibold">
                  <span className="flex items-center gap-1"><span className="h-2.5 w-2.5 rounded bg-white border border-slate-200"></span> Unvisited</span>
                  <span className="flex items-center gap-1"><span className="h-2.5 w-2.5 rounded bg-emerald-100 border border-emerald-200"></span> Answered</span>
                  <span className="flex items-center gap-1"><span className="h-2.5 w-2.5 rounded bg-amber-50 border border-amber-200"></span> Flagged</span>
                </div>
              </div>
              <div className="grid grid-cols-6 sm:grid-cols-10 md:grid-cols-12 gap-1.5">
                {filteredQuestions.map((q, idx) => {
                  const isAnswered = !!userAnswers[q.id];
                  const isFlagged = !!flaggedQuestions[q.id];
                  const isActive = idx === currentIndex;
                  
                  return (
                    <button
                      key={q.id}
                      onClick={() => {
                        setCurrentIndex(idx);
                        setShowQuestionsGrid(false);
                      }}
                      className={`h-8 text-xs font-mono font-bold rounded-lg border transition-all ${
                        isActive
                          ? "bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-100 scale-105"
                          : isAnswered
                            ? "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800"
                            : isFlagged
                              ? "bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800"
                              : "bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50"
                      }`}
                    >
                      {q.number || idx + 1}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Active Question Panel */}
          {filteredQuestions.length > 0 && activeQuestion ? (
            <div className="grid grid-cols-1 md:grid-cols-10 gap-6">
              
              {/* Question area */}
              <div className="md:col-span-6 space-y-6">
                
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-sm shadow-slate-100 dark:shadow-none relative overflow-hidden transition-colors duration-300">
                  
                  {/* Subtle design gradient elements */}
                  <div className="absolute top-0 right-0 h-40 w-40 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none"></div>

                  {/* Header metadata */}
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-[11px] font-mono tracking-widest text-indigo-600 dark:text-indigo-400 uppercase bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-100 dark:border-indigo-900/50 px-3 py-1 rounded-full">
                      {activeQuestion.topic || "Core Questions"}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleToggleFlag(activeQuestion.id)}
                        className={`p-2 rounded-xl border transition ${
                          flaggedQuestions[activeQuestion.id]
                            ? "bg-amber-50 dark:bg-amber-950/45 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800/65 animate-pulse"
                            : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:border-slate-300 dark:hover:border-slate-650"
                        }`}
                        title="Flag/Bookmark question for review"
                      >
                        <Bookmark className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Horizontal Scrollable Question Index Tracker */}
                  <div className="flex items-center gap-1.5 overflow-x-auto py-1.5 mb-6 border-b border-slate-100 dark:border-slate-800/70 scrollbar-none select-none">
                    <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-slate-400 shrink-0 mr-1">Navigation:</span>
                    {filteredQuestions.map((q, idx) => {
                      const isAnswered = !!userAnswers[q.id];
                      const isFlagged = !!flaggedQuestions[q.id];
                      const isCurrent = idx === currentIndex;
                      
                      let circleStyle = "bg-slate-50 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700/60";
                      
                      if (isAnswered) {
                        circleStyle = "bg-emerald-100/80 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/70";
                      } else if (isFlagged) {
                        circleStyle = "bg-amber-100/85 dark:bg-amber-950/60 text-amber-850 dark:text-amber-300 border-amber-200 dark:border-amber-800/70";
                      }
                      if (isCurrent) {
                        circleStyle = "bg-indigo-600 text-white dark:bg-indigo-600 border-indigo-500 shadow-sm font-bold scale-105 ring-2 ring-indigo-500/20";
                      }
                      
                      return (
                        <button
                          key={`horizontal-indicator-${q.id}`}
                          onClick={() => setCurrentIndex(idx)}
                          className={`w-7 h-7 rounded-lg text-[11px] font-mono font-semibold shrink-0 flex items-center justify-center border transition-all ${circleStyle}`}
                          title={`Question ${idx + 1}: ${isAnswered ? "Answered" : "Unanswered"}${isFlagged ? " (Flagged)" : ""}`}
                        >
                          {idx + 1}
                        </button>
                      );
                    })}
                  </div>

                  {/* Question Text */}
                  <div className="space-y-4">
                    <div className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-widest font-mono">
                      Question {currentIndex + 1} of {filteredQuestions.length}
                    </div>
                    <p className="font-display font-semibold text-base sm:text-lg text-slate-800 dark:text-slate-100 leading-relaxed">
                      {activeQuestion.text}
                    </p>
                  </div>
                  {/* Option List */}
                  <div className="mt-8 space-y-3">
                    {(['A', 'B', 'C', 'D'] as const).map((key) => {
                      const optionText = activeQuestion.options[key];
                      if (!optionText) return null;

                      const isSelected = userAnswers[activeQuestion.id] === key;
                      const showFeedback = sessionMode === "practice" && !!userAnswers[activeQuestion.id];
                      const isCorrect = key === activeQuestion.correctAnswer;
                      
                      // Highlight styles depending on selected & mode
                      let btnStyle = "bg-slate-50/50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-indigo-400 dark:hover:border-indigo-600";
                      let indicatorStyle = "bg-slate-200/60 dark:bg-slate-700 text-slate-600 dark:text-slate-300";
                      
                      if (isSelected) {
                        btnStyle = "bg-indigo-50 dark:bg-indigo-950/30 border-indigo-650 dark:border-indigo-500 text-indigo-900 dark:text-indigo-200";
                        indicatorStyle = "bg-indigo-600 text-white font-bold";
                      }

                      if (showFeedback) {
                        if (isCorrect) {
                          btnStyle = "bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-500 dark:border-emerald-600/70 text-emerald-900 dark:text-emerald-200";
                          indicatorStyle = "bg-emerald-600 dark:bg-emerald-500 text-white font-bold";
                        } else if (isSelected) {
                          btnStyle = "bg-rose-50 dark:bg-rose-950/30 border border-rose-500 dark:border-rose-600/70 text-rose-900 dark:text-rose-200";
                          indicatorStyle = "bg-rose-600 dark:bg-rose-500 text-white font-bold";
                        }
                      }

                      // Exam mode submitted feedback matches practice
                      if (sessionMode === "exam" && examSubmitted) {
                        if (isCorrect) {
                          btnStyle = "bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-500 dark:border-emerald-600/70 text-emerald-900 dark:text-emerald-200";
                          indicatorStyle = "bg-emerald-600 dark:bg-emerald-500 text-white font-bold";
                        } else if (isSelected) {
                          btnStyle = "bg-rose-50 dark:bg-rose-950/30 border border-rose-500 dark:border-rose-600/70 text-rose-900 dark:text-rose-200";
                          indicatorStyle = "bg-rose-600 dark:bg-rose-500 text-white font-bold";
                        }
                      }

                      return (
                        <button
                          key={key}
                          onClick={() => handleSelectAnswer(key)}
                          disabled={sessionMode === "exam" && examStarted && examSubmitted}
                          className={`w-full p-4 rounded-xl border text-left flex items-start gap-4 transition-all duration-200 group relative ${btnStyle}`}
                        >
                          <span className={`h-6 w-6 rounded-lg text-xs font-mono flex items-center justify-center shrink-0 uppercase tracking-widest mt-0.5 transition-colors ${indicatorStyle}`}>
                            {key}
                          </span>
                          <span className="text-sm font-semibold tracking-wide flex-1">{optionText}</span>
                          
                          {/* Checked Checkbox Icon overlays */}
                          <div className="absolute right-4 top-1/2 -translate-y-1/2">
                            {isSelected && !showFeedback && (
                              <Check className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                            )}
                            {showFeedback && isCorrect && (
                              <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-450" />
                            )}
                            {showFeedback && isSelected && !isCorrect && (
                              <AlertCircle className="h-5 w-5 text-rose-650 dark:text-rose-400" />
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Practice Feedback explanations (Preloaded or cached) */}
                  {sessionMode === "practice" && !!userAnswers[activeQuestion.id] && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 space-y-3"
                    >
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-705 dark:text-slate-200">
                        {userAnswers[activeQuestion.id] === activeQuestion.correctAnswer ? (
                          <span className="text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                            <CheckCircle2 className="h-4 w-4" />
                            Correct answer Verified
                          </span>
                        ) : (
                          <span className="text-rose-700 dark:text-rose-400 flex items-center gap-1.5">
                            <AlertCircle className="h-4 w-4" />
                            Incorrect. Correct choice is {activeQuestion.correctAnswer}
                          </span>
                        )}
                      </div>

                      {activeQuestion.explanation && (
                        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                          {activeQuestion.explanation}
                        </p>
                      )}

                      {activeQuestion.babokSection && (
                        <div className="text-[10px] text-slate-400 dark:text-slate-500 font-mono flex items-center gap-1">
                          <BookOpen className="h-3 w-3" />
                          Official Reference: {activeQuestion.babokSection}
                        </div>
                      )}
                    </motion.div>
                  )}

                  {/* Navigation Panel */}
                  <div className="mt-8 pt-4 border-t border-slate-150 dark:border-slate-850 flex justify-between items-center text-xs">
                    <button
                      id="btn-navigate-prev"
                      onClick={() => setCurrentIndex((idx) => Math.max(0, idx - 1))}
                      disabled={currentIndex === 0}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-slate-100 disabled:opacity-40 hover:bg-slate-50 dark:hover:bg-slate-705 border-slate-200 hover:border-slate-300 dark:hover:border-slate-600 transition"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Previous Question
                    </button>

                    <span className="text-slate-500 dark:text-slate-400 font-mono">
                      {currentIndex + 1} / {filteredQuestions.length}
                    </span>
                    <button
                      id="btn-navigate-next"
                      onClick={() => setCurrentIndex((idx) => Math.min(filteredQuestions.length - 1, idx + 1))}
                      disabled={currentIndex === filteredQuestions.length - 1}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 border border-indigo-500 text-white font-semibold disabled:opacity-40 hover:bg-indigo-750 transition"
                    >
                      Next Question
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>

              </div>

              {/* Sidebar Panel for local real-time verification info */}
              <div className="md:col-span-4 space-y-6">
                
                {/* Active sidebar verified loader card */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-sm shadow-slate-100 dark:shadow-none min-h-[300px] flex flex-col justify-between transition-colors duration-300">
                  <div>
                    <h3 className="font-display font-semibold text-sm text-slate-800 dark:text-slate-100 mb-4 pb-2 border-b border-slate-100 dark:border-slate-800/80 flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-indigo-650 dark:text-indigo-400" />
                      BABOK Section Citation
                    </h3>

                    {userAnswers[activeQuestion.id] ? (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-4 text-xs text-slate-600 dark:text-slate-300"
                      >
                        <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                          <div className="flex justify-between text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-widest font-mono font-bold">
                            <span>Knowledge Area / Topic</span>
                            {userAnswers[activeQuestion.id] === activeQuestion.correctAnswer ? (
                              <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                                <Check className="h-3 w-3" /> Correct
                              </span>
                            ) : (
                              <span className="text-rose-600 dark:text-rose-400 font-bold flex items-center gap-1">
                                <X className="h-3 w-3" /> Incorrect
                              </span>
                            )}
                          </div>
                          <div className="text-slate-800 dark:text-slate-100 font-semibold text-xs tracking-wide">
                            {activeQuestion.topic || "Core Topic"}
                          </div>
                          {activeQuestion.babokSection && (
                            <div className="text-[10px] text-indigo-650 dark:text-indigo-405 font-mono uppercase bg-indigo-50 dark:bg-indigo-950/40 px-2 py-0.5 rounded border border-indigo-100 dark:border-indigo-900/55 inline-block font-semibold">
                              {activeQuestion.babokSection}
                            </div>
                          )}
                        </div>

                        <div className="space-y-2">
                          <div className="text-[10px] uppercase font-mono tracking-wider text-slate-400 dark:text-slate-550 font-bold">BABOK Verification Study Guide:</div>
                          <p className="text-slate-605 dark:text-slate-300 leading-relaxed font-sans max-h-72 overflow-y-auto pr-1">
                            {activeQuestion.explanation || "No explanation preloaded for this question pool entry."}
                          </p>
                        </div>

                      </motion.div>
                    ) : (
                      <div className="flex flex-col items-center justify-center text-center py-16 px-4">
                        <HelpCircle className="h-10 w-10 text-slate-350 dark:text-slate-600 mb-3 animate-pulse" />
                        <p className="text-xs text-slate-700 dark:text-slate-300 font-bold mb-1">Study Guide Pending</p>
                        <p className="text-[11px] text-slate-450 dark:text-slate-500 leading-normal">
                          Select your answer to immediately unlock the high-precision **BABOK v3 citations and comparative analysis proofs** here.
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-400 dark:text-slate-500 font-bold">
                    <span>BABOK Guide v3</span>
                    <span className="flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-indigo-500"></span> Verified Sync
                    </span>
                  </div>
                </div>

              </div>

            </div>
          ) : (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-12 text-center max-w-lg mx-auto shadow-sm shadow-slate-100 dark:shadow-none transition-colors duration-300">
              <BookOpen className="h-12 w-12 text-slate-350 dark:text-slate-600 mx-auto mb-4" />
              <h3 className="font-display font-semibold text-lg text-slate-800 dark:text-slate-105 mb-2">No Matches Identified</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                No active questions match your filter choices ({questionFilter}). Change active filter categories above or reload defaults.
              </p>
              <button
                onClick={() => {
                  setSelectedTopic("All Topics");
                  setQuestionFilter("all");
                }}
                className="mt-6 px-5 py-2.5 bg-indigo-600 border border-indigo-500 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold transition shadow-md shadow-indigo-100"
              >
                Clear Search Filter
              </button>
            </div>
          )}

        </section>

        {/* --- Lifetime Study Progress & Strength Analysis Dashboard --- */}
        <section id="study-progress-dashboard" className="col-span-1 lg:col-span-4 mt-8 bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
          {/* Accent lighting glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-violet-650/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-indigo-500/20 pb-6">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest bg-indigo-500/25 text-indigo-300 px-3 py-1 rounded-full border border-indigo-400/20 inline-block mb-1 font-bold select-none">
                  Adaptive Analytics
                </span>
                <h2 className="font-display font-semibold text-xl tracking-tight flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-indigo-400" />
                  Study Progress & Strength Analysis
                </h2>
                <p className="text-xs text-indigo-200/75 mt-1 font-normal">
                  Your lifetime progress is updated in real-time as you complete practice sessions and submit mock exams.
                </p>
              </div>

              {hasHistory && (
                <button
                  onClick={() => {
                    if (window.confirm("Are you sure you want to erase all your lifetime progress statistics?")) {
                      setCumulativeHistory([]);
                      localStorage.removeItem("babok_cumulative_history");
                    }
                  }}
                  className="text-xs text-indigo-300/80 hover:text-white underline font-semibold transition"
                >
                  Reset Analytics History
                </button>
              )}
            </div>

            {hasHistory ? (
              <div className="space-y-6">
                
                {/* Lifetime Metrics HUD */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-4.5">
                    <span className="text-[10px] text-indigo-300 uppercase font-mono tracking-wider font-semibold">Total Answered</span>
                    <div className="text-2xl font-bold font-display mt-1">{totalLifetimeAnswered}</div>
                    <p className="text-[10px] text-slate-400 font-mono mt-1">Practice & exam attempts combined</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-4.5">
                    <span className="text-[10px] text-indigo-300 uppercase font-mono tracking-wider font-semibold">Average Accuracy</span>
                    <div className="text-2xl font-bold font-display mt-1 flex items-center gap-2">
                      <span>{lifetimeAccuracy}%</span>
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                        lifetimeAccuracy >= 70 ? "bg-emerald-500/25 text-emerald-300 border border-emerald-400/10" : "bg-rose-500/25 text-rose-300 border border-rose-400/10"
                      }`}>
                        {lifetimeAccuracy >= 70 ? "Passing" : "Developing"}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400 font-mono mt-1">Passing standard is 70% accuracy</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-4.5">
                    <span className="text-[10px] text-indigo-300 uppercase font-mono tracking-wider font-semibold">Exam Level Questions</span>
                    <div className="text-2xl font-bold font-display mt-1 text-indigo-450">
                      {cumulativeHistory.filter(h => h.mode === "exam").length} questions
                    </div>
                    <p className="text-[10px] text-slate-400 font-mono mt-1">Completed under realistic timer pressure</p>
                  </div>
                </div>

                {/* Cognitive Evaluation Breakdown: strengths vs weaknesses */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Left: Strength & Weakness Highlights */}
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6 space-y-4">
                    <h3 className="text-sm font-semibold font-display tracking-tight text-indigo-300 uppercase font-bold text-xs font-mono">
                      Cognitive Competency Highlights
                    </h3>

                    {weakestArea && (
                      <div className="bg-rose-950/40 border border-rose-500/20 rounded-xl p-4 space-y-2">
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-bold text-rose-300 flex items-center gap-1.5 font-mono text-[11px] uppercase">
                            <span className="h-1.5 w-1.5 rounded-full bg-rose-400"></span>
                            Primary Weakness Area
                          </span>
                          <span className="font-bold text-rose-400">{weakestArea[1].rate}% accuracy</span>
                        </div>
                        <h4 className="text-sm font-semibold text-white tracking-tight">{weakestArea[0]}</h4>
                        
                        <div className="pt-2 border-t border-rose-500/10 mt-2 space-y-1.5 text-slate-300 text-[11px] font-normal leading-relaxed">
                          <div>
                            <strong className="text-white">Recommended Reading:</strong> <span className="text-indigo-200">{babokTopicRecommendations[weakestArea[0]]?.read || `BABOK V3 Chapter: ${weakestArea[0]}`}</span>
                          </div>
                          <div>
                            <strong className="text-white">Revision Focus:</strong> <span className="text-indigo-200">{babokTopicRecommendations[weakestArea[0]]?.focus || "Review missed indices and consult verification reasoning guides."}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {strongestArea && strongestArea[0] !== weakestArea?.[0] && (
                      <div className="bg-emerald-950/40 border border-emerald-500/20 rounded-xl p-4 space-y-2">
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-bold text-emerald-300 flex items-center gap-1.5 font-mono text-[11px] uppercase">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
                            Primary Strength Area
                          </span>
                          <span className="font-bold text-emerald-400">{strongestArea[1].rate}% accuracy</span>
                        </div>
                        <h4 className="text-sm font-semibold text-white tracking-tight">{strongestArea[0]}</h4>
                        
                        <div className="pt-2 border-t border-emerald-500/10 mt-2 text-slate-300 text-[11px] font-normal leading-relaxed">
                          Outstanding comprehension of BABOK core practices. Continue to review other chapters to balance out total preparedness.
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right: Knowledge Area Progress Bars */}
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6 space-y-4">
                    <h3 className="text-sm font-semibold font-display tracking-tight text-indigo-300 uppercase font-bold text-xs font-mono">
                      BABOK® Knowledge Areas Accuracy Index
                    </h3>

                    <div className="space-y-3.5">
                      {Object.entries(historyTopicStats).map(([topic, stats]) => {
                        if (stats.total === 0) return null;
                        return (
                          <div key={topic} className="space-y-1 text-xs">
                            <div className="flex justify-between items-center text-[11px]">
                              <span className="text-slate-200 font-semibold truncate max-w-[70%]">{topic}</span>
                              <span className="text-indigo-300 font-mono font-semibold text-[10px]">
                                {stats.correct}/{stats.total} correct ({stats.rate}%)
                              </span>
                            </div>
                            <div className="h-1.5 bg-indigo-950/90 rounded-full overflow-hidden border border-white/5 relative">
                              <div
                                className={`h-full rounded-full transition-all duration-500 ${
                                  stats.rate >= 70 
                                    ? "bg-gradient-to-r from-emerald-500 to-teal-400" 
                                    : stats.rate >= 50 
                                      ? "bg-gradient-to-r from-amber-500 to-orange-400" 
                                      : "bg-gradient-to-r from-rose-500 to-red-400"
                                }`}
                                style={{ width: `${stats.rate}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                </div>

              </div>
            ) : (
              <div className="text-center py-10 bg-white/5 border border-white/10 border-dashed rounded-2xl">
                <BarChart3 className="h-10 w-10 text-indigo-400/70 mx-auto mb-3" />
                <h3 className="text-sm font-semibold mb-1">Analytical Insights Await</h3>
                <p className="text-xs text-indigo-200/60 max-w-sm mx-auto">
                  Begin answering practice questions or hit "Submit Exam" to load your historical analytics charts.
                </p>
              </div>
            )}
          </div>
        </section>

      </main>

    </div>
  );
}
