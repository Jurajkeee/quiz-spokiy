import React, { useState } from 'react';
import { AlertCircle, CheckCircle, ChevronRight, Send, ChevronLeft, Book, Users, Music } from 'lucide-react';

const PsychologicalQuiz = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const questions = [
    {
      id: 1,
      text: "Як ви почуваєтеся останнім часом?",
      options: [
        { text: "Чудово, стабільно й позитивно", emoji: "😊" },
        { text: "Нормально, але бувають важкі моменти", emoji: "🙂" },
        { text: "Часто відчуваю стрес або занепокоєння", emoji: "😟" },
        { text: "Постійно втомлений/-а, складно розслабитись", emoji: "😞" }
      ],
      visualType: "emotional"
    },
    {
      id: 2,
      text: "Чи помічали ви за собою хоча б одну з цих ознак: дратівливість, поганий сон, постійне напруження?",
      options: [
        { text: "Ні, нічого з цього", emoji: "😊" },
        { text: "Іноді буває, але рідко", emoji: "🙂" },
        { text: "Досить часто останнім часом", emoji: "😕" },
        { text: "Так, ці ознаки стали моєю нормою життя", emoji: "😫" }
      ],
      visualType: "standard"
    },
    {
      id: 3,
      text: "Чи траплялося вам думати, що ви «вигораєте»?",
      options: [
        { text: "Ні, це не про мене", emoji: "👍" },
        { text: "Інколи є таке відчуття", emoji: "🤔" },
        { text: "Так, часто думаю про це", emoji: "🔥" },
        { text: "Так, впевнений/-а, що саме це зі мною і відбувається", emoji: "💥" }
      ],
      alternativeOptions: [
        { label: "Енергійний", icon: "⚡" },
        { label: "Втомлений", icon: "🔋" },
        { label: "Виснажений", icon: "🌡️" },
        { label: "Вигорання", icon: "🔥" }
      ],
      visualType: "energy"
    },
    {
      id: 4,
      text: "Чи відчуваєте ви підтримку від свого оточення?",
      options: [
        { text: "Так, маю підтримку близьких", emoji: "❤️" },
        { text: "Не завжди, іноді почуваюся самотнім/-ьою", emoji: "🙂" },
        { text: "Зазвичай не відчуваю підтримки", emoji: "😕" },
        { text: "Почуваюся абсолютно самотньо у своїх проблемах", emoji: "😔" }
      ],
      visualType: "standard"
    },
    {
      id: 5,
      text: "Чи хотіли б ви отримати прості, але ефективні рекомендації, як покращити свій стан уже сьогодні?",
      options: [
        { text: "Так, хочу дізнатися, як це зробити", emoji: "👍" },
        { text: "Можливо, було б цікаво", emoji: "🤔" },
        { text: "Не впевнений/-а, що це допоможе, але спробую", emoji: "😐" },
        { text: "Ні, мені це не цікаво", emoji: "👎" }
      ],
      visualType: "standard"
    }
  ];

  const handleOptionSelect = (questionId: number, optionIndex: number): void => {
    setAnswers({
      ...answers,
      [questionId]: optionIndex,
    });
    if (currentStep < questions.length) {
      setTimeout(() => setCurrentStep(currentStep + 1), 400);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setSubmitted(true);
    console.log("Form submitted:", { answers, email, phone, name });
  };

  const progressPercentage = currentStep <= questions.length
    ? (currentStep / (questions.length + 1)) * 100
    : (questions.length / (questions.length + 1)) * 100;

  const calculateStressLevel = (): number => {
    let score = 0;
    const maxScore = questions.length * 3; // Максимальний можливий бал
    Object.entries(answers).forEach(([_, value]) => {
      score += value;
    });
    return Math.min(Math.round((score / maxScore) * 100), 100);
  };

  const getStressLevelLabel = (percentage: number): string => {
    if (percentage < 25) return "Низький";
    if (percentage < 50) return "Середній";
    if (percentage < 75) return "Підвищений";
    return "Високий";
  };

  const getRecommendations = () => {
    return [
      {
        title: "Дихальні вправи",
        description: "Практикуйте глибоке дихання протягом 5 хвилин кілька разів на день.",
        icon: <AlertCircle />
      },
      {
        title: "Ведення щоденника",
        description: "Записуйте свої думки та почуття, щоб краще розуміти свої емоції.",
        icon: <Book />
      },
      {
        title: "Соціальна підтримка",
        description: "Не соромтеся звертатися за підтримкою до друзів або сім'ї.",
        icon: <Users />
      }
    ];
  };

  // Якщо це стартова сторінка (інтро)
  if (currentStep === 0) {
    return (
      <div className="container">
        <div className="card">
          <div className="header">
            <h1>90% людей не помічають ознаки психологічної кризи. А ви?</h1>
          </div>
          <div className="content">
            <button className="btn-primary" onClick={() => setCurrentStep(1)}>
              Почати тест <ChevronRight />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Якщо показується питання
  const currentQuestion = questions[currentStep - 1];
  const renderQuestionContent = () => {
    return (
      <div className="question-card">
        <span className="question-number">{currentQuestion.id}</span>
        <div className="question-text">{currentQuestion.text}</div>
        <div>
          {currentQuestion.options.map((option, index) => (
            <div
              key={index}
              className={`answer-option ${answers[currentQuestion.id] === index ? 'selected' : ''}`}
              onClick={() => handleOptionSelect(currentQuestion.id, index)}
            >
              <span className="answer-emoji">{option.emoji}</span>
              <span>{option.text}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Якщо всі питання пройдені – сторінка з результатами
  if (currentStep > questions.length) {
    const stressLevel = calculateStressLevel();
    const stressLabel = getStressLevelLabel(stressLevel);
    const recommendations = getRecommendations();
    return (
      <div className="container">
        <div className="card">
          <div className="header">
            <h2>Ваш рівень стресу: {stressLabel}</h2>
          </div>
          <div className="content">
            <p>Ваш результат: {stressLevel}%</p>
            <h2>Рекомендації для вас</h2>
            {recommendations.map((rec, index) => (
              <div key={index} className="recommendation-item">
                <div className="recommendation-icon">{rec.icon}</div>
                <div>
                  <div className="recommendation-title">{rec.title}</div>
                  <div className="recommendation-text">{rec.description}</div>
                </div>
              </div>
            ))}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label" htmlFor="name">Ваше ім'я</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-input"
                  placeholder="Введіть ваше ім'я"
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="email">Ваш e-mail *</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="form-input"
                  placeholder="Введіть ваш email"
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="phone">Ваш телефон (за бажанням)</label>
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="form-input"
                  placeholder="Введіть ваш телефон"
                />
              </div>
              <button type="submit" className="btn-primary">
                Отримати мій результат <ChevronRight />
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // Якщо показується сторінка питання з навігацією
  return (
    <div className="container">
      {renderQuestionContent()}
      <div className="flex" style={{ justifyContent: 'space-between' }}>
        <button className="btn-secondary" onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}>
          НАЗАД <ChevronLeft />
        </button>
        <button className="btn-next" onClick={() => setCurrentStep(currentStep + 1)}>
          ДАЛІ <ChevronRight />
        </button>
      </div>
    </div>
  );
};

export default PsychologicalQuiz;
