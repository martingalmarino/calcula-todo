"use client"

import { useState, useEffect, useCallback } from 'react'
import { QuizLayoutIT } from '@/components/QuizLayoutIT'
import { Button } from '@/components/ui/button'
import { jsonLdCalculator } from '@/lib/seo'
import { triviasConfigIT } from '@/lib/trivias-config-it'
import { Share2, Check, Palette, Brush, Eye } from 'lucide-react'

interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
  type: 'multiple'
  colorPreview?: string
}

const quizQuestions: Question[] = [
  {
    id: 1,
    question: 'HEX #FF0000 corrisponde a:',
    options: ['RGB(255, 0, 0)', 'RGB(0, 255, 0)', 'RGB(0, 0, 255)'],
    correctAnswer: 0,
    explanation: 'HEX #FF0000 è rosso puro. In RGB, FF (hex) = 255 (decimale) per rosso, e 00 per verde e blu, risultando in RGB(255, 0, 0).',
    type: 'multiple',
    colorPreview: '#FF0000'
  },
  {
    id: 2,
    question: 'HEX #00FF00 è:',
    options: ['Verde', 'Blu', 'Rosso'],
    correctAnswer: 0,
    explanation: 'HEX #00FF00 è verde puro. Il valore FF è nella posizione del verde, mentre rosso e blu sono a 00.',
    type: 'multiple',
    colorPreview: '#00FF00'
  },
  {
    id: 3,
    question: 'RGB(0, 0, 0) equivale a:',
    options: ['Bianco', 'Nero', 'Grigio'],
    correctAnswer: 1,
    explanation: 'RGB(0, 0, 0) è nero puro. Quando tutti i valori RGB sono a 0, non c\'è luce di nessun colore, risultando in nero.',
    type: 'multiple',
    colorPreview: '#000000'
  },
  {
    id: 4,
    question: 'HEX #FFFFFF corrisponde a:',
    options: ['Bianco', 'Nero', 'Giallo'],
    correctAnswer: 0,
    explanation: 'HEX #FFFFFF è bianco puro. FF è il valore massimo in esadecimale (255 in decimale) per rosso, verde e blu, creando bianco.',
    type: 'multiple',
    colorPreview: '#FFFFFF'
  },
  {
    id: 5,
    question: 'HEX #0000FF è:',
    options: ['Blu', 'Rosso', 'Verde'],
    correctAnswer: 0,
    explanation: 'HEX #0000FF è blu puro. Il valore FF è nella posizione del blu, mentre rosso e verde sono a 00.',
    type: 'multiple',
    colorPreview: '#0000FF'
  },
  {
    id: 6,
    question: 'RGB(255, 255, 0) equivale a:',
    options: ['Arancione', 'Giallo', 'Rosa'],
    correctAnswer: 1,
    explanation: 'RGB(255, 255, 0) è giallo. La combinazione di rosso e verde al massimo (255) con blu a 0 produce giallo.',
    type: 'multiple',
    colorPreview: '#FFFF00'
  },
  {
    id: 7,
    question: 'HEX #FFA500 corrisponde a:',
    options: ['Arancione', 'Viola', 'Verde'],
    correctAnswer: 0,
    explanation: 'HEX #FFA500 è arancione. FF (255) per rosso, A5 (165) per verde, e 00 per blu creano un colore arancione vibrante.',
    type: 'multiple',
    colorPreview: '#FFA500'
  },
  {
    id: 8,
    question: 'RGB(128, 128, 128) equivale a:',
    options: ['Grigio', 'Nero', 'Argento'],
    correctAnswer: 0,
    explanation: 'RGB(128, 128, 128) è grigio medio. Quando tutti i valori RGB sono uguali e intermedi, si crea una tonalità di grigio.',
    type: 'multiple',
    colorPreview: '#808080'
  },
  {
    id: 9,
    question: 'HEX #800080 corrisponde a:',
    options: ['Rosa', 'Viola', 'Celeste'],
    correctAnswer: 1,
    explanation: 'HEX #800080 è viola/porpora. 80 (128) per rosso e blu, con 00 per verde, crea un colore viola intenso.',
    type: 'multiple',
    colorPreview: '#800080'
  },
  {
    id: 10,
    question: 'RGB(0, 255, 255) equivale a:',
    options: ['Ciano', 'Magenta', 'Giallo'],
    correctAnswer: 0,
    explanation: 'RGB(0, 255, 255) è ciano. La combinazione di verde e blu al massimo (255) con rosso a 0 produce ciano.',
    type: 'multiple',
    colorPreview: '#00FFFF'
  }
]

const structuredData = jsonLdCalculator({
  name: 'Indovina il Colore (HEX ↔ RGB)',
  description: 'Metti alla prova le tue conoscenze sui codici di colore. Impara a convertire tra codici esadecimali (HEX) e valori RGB in modo divertente.',
  url: '/it/trivias/indovina-colore-hex-rgb',
  category: 'Trivie Educative'
})

export default function IndovinaColoreHexRgbClientIT() {
  const [isActive, setIsActive] = useState(false)
  const [timeLeft, setTimeLeft] = useState(triviasConfigIT[8].timeLimit)
  const [score, setScore] = useState(0)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null)
  const [quizResult, setQuizResult] = useState<{ points: number; rank: string; emoji: string } | null>(null)
  const [showIntroduction, setShowIntroduction] = useState(true)
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set())
  const [copied, setCopied] = useState(false)

  const totalQuestions = quizQuestions.length

  const shuffleArray = useCallback((array: Question[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }, []);

  const getRankInfo = useCallback((points: number) => {
    if (points >= 8) return { rank: 'Maestro del Colore', emoji: '🎨' }
    if (points >= 5) return { rank: 'Designer in Progresso', emoji: '🖌️' }
    return { rank: 'Necessita Più Pratica', emoji: '🎭' }
  }, [])

  const startQuiz = useCallback(() => {
    setShowIntroduction(false)
    setIsActive(true)
    setTimeLeft(triviasConfigIT[8].timeLimit)
    setScore(0)
    setCurrentQuestionIndex(1)
    setSelectedAnswer(null)
    setFeedback(null)
    setQuizResult(null)
    setAnsweredQuestions(new Set())
    const shuffledQuestions = shuffleArray([...quizQuestions]);
    setCurrentQuestion(shuffledQuestions[0]);
  }, [shuffleArray])

  const resetQuiz = useCallback(() => {
    setShowIntroduction(true)
    setIsActive(false)
    setTimeLeft(triviasConfigIT[8].timeLimit)
    setScore(0)
    setCurrentQuestionIndex(0)
    setSelectedAnswer(null)
    setFeedback(null)
    setQuizResult(null)
    setAnsweredQuestions(new Set())
    setCurrentQuestion(null)
  }, [])

  const checkAnswer = useCallback((answerIndex: number) => {
    if (!isActive || feedback !== null || !currentQuestion || answeredQuestions.has(currentQuestion.id)) return

    setSelectedAnswer(answerIndex)
    const isCorrect = answerIndex === currentQuestion.correctAnswer
    setFeedback(isCorrect ? 'correct' : 'incorrect')

    if (isCorrect) {
      setScore(prevScore => prevScore + 1)
    }

    setAnsweredQuestions(prev => {
      const newAnswered = new Set(prev).add(currentQuestion.id)
      
      setTimeout(() => {
        setFeedback(null)
        setSelectedAnswer(null)
        
        if (newAnswered.size >= totalQuestions) {
          setIsActive(false)
          const finalScore = score + (isCorrect ? 1 : 0)
          const rankInfo = getRankInfo(finalScore)
          setQuizResult({ points: finalScore, rank: rankInfo.rank, emoji: rankInfo.emoji })
        } else {
          setCurrentQuestionIndex(prevIndex => prevIndex + 1)
          const unansweredQuestions = quizQuestions.filter(q => !newAnswered.has(q.id))
          if (unansweredQuestions.length > 0) {
            const nextQuestion = shuffleArray([...unansweredQuestions])[0]
            setCurrentQuestion(nextQuestion)
          }
        }
      }, 2500) // 2.5 secondi per leggere la spiegazione
      
      return newAnswered
    })
  }, [isActive, feedback, currentQuestion, answeredQuestions, currentQuestionIndex, totalQuestions, score, shuffleArray, getRankInfo])

  const shareResult = useCallback(() => {
    if (!quizResult) return
    
    const shareText = `Ho appena completato "Indovina il Colore (HEX ↔ RGB)"! 🎨\n\nPunteggio: ${quizResult.points}/10\nLivello: ${quizResult.rank} ${quizResult.emoji}\n\nSai convertire codici di colore? Provalo qui!`
    const shareUrl = window.location.href
    
    if (navigator.share) {
      navigator.share({
        title: 'Indovina il Colore (HEX ↔ RGB)',
        text: shareText,
        url: shareUrl
      })
    } else {
      const fullText = `${shareText}\n${shareUrl}`
      navigator.clipboard.writeText(fullText).then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      })
    }
  }, [quizResult])

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (isActive && timeLeft > 0 && !quizResult) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1)
      }, 1000)
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false)
      const rankInfo = getRankInfo(score)
      setQuizResult({ points: score, rank: rankInfo.rank, emoji: rankInfo.emoji })
    }
    return () => clearInterval(timer)
  }, [isActive, timeLeft, score, quizResult, getRankInfo])

  useEffect(() => {
    if (!showIntroduction && !currentQuestion && isActive) {
      const shuffledQuestions = shuffleArray([...quizQuestions]);
      setCurrentQuestion(shuffledQuestions[0]);
    }
  }, [showIntroduction, currentQuestion, isActive, shuffleArray]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
                  <QuizLayoutIT
        title="Indovina il Colore (HEX ↔ RGB)"
        description="Metti alla prova le tue conoscenze sui codici di colore. Impara a convertire tra codici esadecimali (HEX) e valori RGB in modo divertente."
        introduction="Benvenuto a Indovina il Colore! Ti faremo domande sulla conversione tra codici esadecimali (HEX) e valori RGB. Imparerai sui sistemi di colore digitale, come si rappresentano i colori nel web, e le equivalenze tra diversi formati. Scopri se conosci i codici di colore più comuni!"
        onStart={startQuiz}
        onReset={resetQuiz}
        isActive={isActive}
        timeLeft={timeLeft}
        score={score}
        feedback={feedback}
        quizResult={quizResult}
        showIntroduction={showIntroduction}
        currentQuestion={currentQuestionIndex}
        totalQuestions={totalQuestions}
        currentTriviaPath="/it/trivias/indovina-colore-hex-rgb/"
        relatedCalculator="/it/tecnologia/conversione-colori"
      >
        {currentQuestion && (
          <div className="w-full">
            {/* Question */}
            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold text-blue-900 mb-4">
                {currentQuestion.question}
              </h2>
              
              {/* Color Preview */}
              {currentQuestion.colorPreview && (
                <div className="mb-4">
                  <div 
                    className="w-16 h-16 mx-auto rounded-lg border-2 border-gray-300 shadow-md"
                    style={{ backgroundColor: currentQuestion.colorPreview }}
                    title={`Colore: ${currentQuestion.colorPreview}`}
                  ></div>
                  <p className="text-sm text-gray-600 mt-2 font-mono">
                    {currentQuestion.colorPreview}
                  </p>
                </div>
              )}
              
              {/* Feedback and Explanation */}
              {feedback && (
                <div className={`p-4 rounded-lg mb-4 ${
                  feedback === 'correct' 
                    ? 'bg-green-100 text-green-800 border border-green-200' 
                    : 'bg-red-100 text-red-800 border border-red-200'
                }`}>
                  <p className="font-semibold text-sm">
                    {currentQuestion.explanation}
                  </p>
                </div>
              )}
            </div>

            {/* Answer Options */}
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <Button
                  key={index}
                  onClick={() => checkAnswer(index)}
                  variant={selectedAnswer === index ? (feedback === 'correct' ? 'default' : 'destructive') : 'outline'}
                  size="lg"
                  className={`w-full py-3 text-left justify-start transition-all duration-200 ${
                    selectedAnswer === index
                      ? feedback === 'correct' 
                        ? 'bg-green-600 hover:bg-green-700 text-white' 
                        : 'bg-red-600 hover:bg-red-700 text-white'
                      : 'hover:bg-blue-50'
                  }`}
                  disabled={!isActive || feedback !== null || answeredQuestions.has(currentQuestion.id)}
                >
                  <span className="font-semibold mr-2">{String.fromCharCode(65 + index)}.</span>
                  {option}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Share Result Button */}
        {quizResult && (
          <div className="mt-4 text-center">
            <Button
              onClick={shareResult}
              variant="outline"
              size="lg"
              className="w-full max-w-md mx-auto"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Copiato!
                </>
              ) : (
                <>
                  <Share2 className="h-4 w-4 mr-2" />
                  Condividi Risultato
                </>
              )}
            </Button>
          </div>
        )}
                  </QuizLayoutIT>
    </>
  )
}
