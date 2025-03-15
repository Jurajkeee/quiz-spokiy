import React, { useState } from 'react';
import { AlertCircle, CheckCircle, ChevronRight, Send, ChevronLeft, Book, Users, Music } from 'lucide-react';

const PsychologicalQuiz = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
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

  const handleOptionSelect = (questionId, optionIndex) => {
    setAnswers({
      ...answers,
      [questionId]: optionIndex
    });
    
    // Auto-advance to next question after selection
    if (currentStep < questions.length) {
      setTimeout(() => setCurrentStep(currentStep + 1), 400);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would normally send the data to your backend
    setSubmitted(true);
    console.log("Form submitted:", { answers, email, phone, name });
  };

  const progressPercentage = currentStep <= questions.length 
    ? (currentStep / (questions.length + 1)) * 100
    : ((questions.length) / (questions.length + 1)) * 100;

  // Calculate stress level based on answers
  const calculateStressLevel = () => {
    // Simple algorithm: higher score = higher stress level
    let score = 0;
    const maxScore = questions.length * 3; // Max possible score if all answers are the most stressed option
    
    for (const questionId in answers) {
      score += answers[questionId] || 0; // Add the answer index (0-3) to score
    }
    
    // Calculate percentage (0-100)
    return Math.min(Math.round((score / maxScore) * 100), 100);
  };
  
  // Get stress level label
  const getStressLevelLabel = (percentage) => {
    if (percentage < 25) return "Низький";
    if (percentage < 50) return "Середній";
    if (percentage < 75) return "Підвищений";
    return "Високий";
  };
  
  // Generate recommendations based on answers
  const getRecommendations = () => {
    return [
      {
        title: "Дихальні вправи",
        description: "Практикуйте глибоке дихання протягом 5 хвилин кілька разів на день.",
        icon: <AlertCircle className="h-5 w-5 text-white" />
      },
      {
        title: "Ведення щоденника",
        description: "Записуйте свої думки та почуття, щоб краще розуміти свої емоції.",
        icon: <Book className="h-5 w-5 text-white" />
      },
      {
        title: "Соціальна підтримка",
        description: "Не соромтеся звертатися за підтримкою до друзів або сім'ї.",
        icon: <Users className="h-5 w-5 text-white" />
      }
    ];
  };

  // Render intro screen
  if (currentStep === 0) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 flex flex-col">
        {/* Blue header with title */}
        <div className="max-w-md mx-auto w-full rounded-t-xl overflow-hidden">
          <div className="bg-blue-500 p-6 text-center text-white">
            <h1 className="text-3xl font-bold mb-6 leading-tight">
              90% людей не помічають ознаки психологічної кризи. А ви?
            </h1>
            
            {/* Stats row */}
            <div className="flex justify-center gap-8 mt-6 mb-2">
              <div className="flex items-center">
                <div className="bg-blue-400 bg-opacity-30 p-2 rounded-full mr-3">
                  <AlertCircle className="h-5 w-5 text-white" />
                </div>
                <div className="text-left">
                  <div className="font-bold text-xl">14,378</div>
                  <div className="text-xs text-blue-100">Вже пройшли</div>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="bg-blue-400 bg-opacity-30 p-2 rounded-full mr-3">
                  <AlertCircle className="h-5 w-5 text-white" />
                </div>
                <div className="text-left">
                  <div className="font-bold text-xl">58 сек</div>
                  <div className="text-xs text-blue-100">Середній час</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* White content area */}
        <div className="max-w-md mx-auto w-full bg-white rounded-b-xl shadow-lg p-6 flex flex-col">
          {/* Button - MOVED UP */}
          <button 
            onClick={() => setCurrentStep(1)}
            className="w-full py-3 px-6 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg shadow-md transition-colors flex items-center justify-center text-lg uppercase mb-4"
          >
            Почати тест
            <ChevronRight className="ml-2 h-5 w-5" />
          </button>
          
          {/* Time estimate - MOVED UP */}
          <div className="bg-blue-50 py-2 px-3 rounded-md text-center mb-6">
            <p className="font-medium text-blue-700">
              Тест займе не більше 1 хвилини.
            </p>
          </div>
          
          {/* Warning section with border */}
          <div className="border-l-4 border-blue-500 pl-4 py-2 mb-5">
            <p className="text-gray-700">
              <span className="text-red-500 font-bold">⚠️ Увага!</span> Стрес і тривога стали настільки звичними, що ми перестали їх помічати. Але наслідки можуть бути <span className="text-red-500 font-medium">серйозними і незворотними</span>, якщо вчасно не виявити проблему.
            </p>
          </div>
          
          {/* List items with icons */}
          <div className="space-y-4 mb-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 text-gray-500 mr-2 mt-1">⏱️</div>
              <p className="text-gray-700">
                <span className="font-medium">Лише 5 простих запитань</span> допоможуть визначити ваш ризик психологічної кризи та отримати персоналізований план дій для покращення вашого стану.
              </p>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 text-green-500 mr-2 mt-1">✅</div>
              <p className="text-gray-700">
                <span className="font-medium">Тест пройшли вже <span className="text-blue-500">14,378</span></span> українців і отримали рекомендації щодо покращення свого психологічного здоров'я!
              </p>
            </div>
          </div>
          
          {/* Trust indicators */}
          <div className="mt-4 flex justify-center">
            <div className="flex items-center text-xs text-gray-500">
              <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
              <span>Безкоштовно</span>
              <span className="mx-2">•</span>
              <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
              <span>Конфіденційно</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render questions
  const currentQuestion = questions[currentStep - 1];
  
  // Render different question layouts based on visualType
  const renderQuestionContent = () => {
    // For energy level visualization
    if (currentQuestion.visualType === 'energy') {
      return (
        <>
          {/* Alternative interactive UI for energy level question */}
          <div className="mb-6 flex justify-center flex-wrap gap-4">
            {currentQuestion.alternativeOptions.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionSelect(currentQuestion.id, index)}
                className={`relative flex flex-col items-center p-3 rounded-lg border transition-all ${
                  answers[currentQuestion.id] === index
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                }`}
                style={{ width: 'calc(50% - 8px)' }}
              >
                <div className={`p-3 rounded-full mb-2 ${
                  answers[currentQuestion.id] === index 
                    ? 'bg-blue-100 text-blue-600' 
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  <span className="text-2xl">{option.icon}</span>
                </div>
                <span className="text-sm font-medium">{option.label}</span>
                {answers[currentQuestion.id] === index && (
                  <div className="absolute right-2 top-2 h-4 w-4 bg-blue-500 rounded-full"></div>
                )}
              </button>
            ))}
          </div>
          
          <div className="border-t border-gray-200 pt-4 mt-2">
            <p className="text-sm text-gray-500 mb-4">Або оберіть варіант нижче:</p>
          </div>
        </>
      );
    }
    
    // For emotional state visualization
    if (currentQuestion.visualType === 'emotional') {
      const emotionColors = [
        'bg-green-100 text-green-600',
        'bg-blue-100 text-blue-600',
        'bg-yellow-100 text-yellow-600',
        'bg-red-100 text-red-600'
      ];
      
      return (
        <div className="mb-6 grid grid-cols-2 gap-3">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionSelect(currentQuestion.id, index)}
              className={`flex flex-col items-center p-4 rounded-lg border transition-all ${
                answers[currentQuestion.id] === index
                  ? 'border-blue-500 shadow-sm'
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              <div className={`h-12 w-12 flex items-center justify-center rounded-full mb-2 ${
                answers[currentQuestion.id] === index 
                  ? 'bg-blue-500 text-white' 
                  : emotionColors[index]
              }`}>
                <span className="text-2xl">{option.emoji}</span>
              </div>
              <span className="text-xs text-center">{option.text}</span>
            </button>
          ))}
        </div>
      );
    }
    
    // Default standard view
    return (
      <div className="space-y-3 mb-6">
        {currentQuestion.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionSelect(currentQuestion.id, index)}
            className={`w-full py-3 px-4 rounded-lg border text-left transition-all ${
              answers[currentQuestion.id] === index
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
            }`}
          >
            <div className="flex items-center">
              <div className={`h-5 w-5 rounded-full border flex-shrink-0 flex items-center justify-center mr-3 ${
                answers[currentQuestion.id] === index
                  ? 'border-blue-500 bg-white'
                  : 'border-gray-300'
              }`}>
                {answers[currentQuestion.id] === index && (
                  <span className="h-3 w-3 bg-blue-500 rounded-full"></span>
                )}
              </div>
              <div className="flex items-center">
                <span className="mr-2 text-lg">{option.emoji}</span>
                <span>{option.text}</span>
              </div>
            </div>
            {answers[currentQuestion.id] === index && (
              <div className="w-1 h-full bg-blue-500 absolute left-0 top-0 rounded-l-lg"></div>
            )}
          </button>
        ))}
      </div>
    );
  };
  
  // Render form submission screen
  if (currentStep > questions.length) {
    const stressLevel = calculateStressLevel();
    const stressLabel = getStressLevelLabel(stressLevel);
    const recommendations = getRecommendations();
    
    return (
      <div className="min-h-screen bg-gray-50 p-4 flex flex-col">
        <div className="max-w-md mx-auto w-full bg-white rounded-xl shadow-lg p-6 mb-4">
          {/* Stress level section */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-blue-600 text-center mb-3">
              Рівень вашого стресу
            </h2>
            <div className="relative h-3 bg-gray-200 rounded-full mb-2">
              <div 
                className={`absolute left-0 top-0 h-3 rounded-full transition-all duration-500`}
                style={{ 
                  width: `${stressLevel}%`,
                  background: `linear-gradient(to right, rgb(74, 222, 128), rgb(234, 179, 8), rgb(244, 63, 94))`
                }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 mb-4">
              <span>Низький</span>
              <span>Середній</span>
              <span>Підвищений</span>
              <span>Високий</span>
            </div>
            <p className="text-gray-700">
              Ваш рівень стресу <span className="font-medium">{stressLabel.toLowerCase()}</span>. Рекомендуємо почати застосовувати техніки зниження стресу та покращення психологічного здоров'я.
            </p>
          </div>
          
          {/* Recommendations section */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-blue-600 text-center mb-4">
              Рекомендації для вас
            </h2>
            <div className="space-y-3">
              {recommendations.map((rec, index) => (
                <div key={index} className="bg-blue-50 p-4 rounded-lg flex">
                  <div className="bg-blue-500 p-2 rounded-full mr-3 h-8 w-8 flex-shrink-0 flex items-center justify-center">
                    {rec.icon}
                  </div>
                  <div>
                    <h3 className="font-medium text-blue-800">{rec.title}</h3>
                    <p className="text-sm text-gray-600">{rec.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Detailed analysis section */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-blue-600 text-center mb-4">
              Отримайте детальніший аналіз
            </h2>
            
            <div className="mb-4">
              <div className="flex justify-center mb-2">
                {[1, 2, 3, 4, 5].map(star => (
                  <span key={star} className="text-yellow-400 text-xl">★</span>
                ))}
              </div>
              <p className="text-sm text-gray-500 text-center">
                4.85 на основі 422 відгуків
              </p>
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-start">
                <input type="checkbox" checked readOnly className="mt-1 mr-2" />
                <span className="text-sm">Повний психологічний аналіз вашого стану</span>
              </div>
              <div className="flex items-start">
                <input type="checkbox" checked readOnly className="mt-1 mr-2" />
                <span className="text-sm">7 персоналізованих рекомендацій від психолога</span>
              </div>
              <div className="flex items-start">
                <input type="checkbox" checked readOnly className="mt-1 mr-2" />
                <span className="text-sm">PDF-документ з практичними вправами</span>
              </div>
              <div className="flex items-start">
                <input type="checkbox" checked readOnly className="mt-1 mr-2" />
                <span className="text-sm">Бонус: 15-хвилинна аудіо-медитація</span>
              </div>
            </div>
          </div>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="mb-6 text-center">
                <div className="h-16 w-16 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Send className="h-8 w-8 text-blue-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800">
                  Ваш результат майже готовий!
                </h2>
                <p className="text-gray-600 mt-2">
                  Залиште свій e-mail, щоб отримати персональну рекомендацію щодо поліпшення вашого стану від Spokiy AI просто зараз.
                </p>
              </div>
              
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Ваше ім'я
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Введіть ваше ім'я"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Ваш e-mail *
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Введіть ваш email"
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Ваш телефон (за бажанням)
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Введіть ваш телефон"
                />
              </div>
              
              <button
                type="submit"
                className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-md transition-colors flex items-center justify-center"
              >
                Отримати мій результат
                <ChevronRight className="ml-2 h-4 w-4" />
              </button>
              
              {/* Trust indicators */}
              <div className="mt-3 flex justify-center">
                <div className="flex items-center text-xs text-gray-500">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                  <span>Безкоштовно</span>
                  <span className="mx-2">•</span>
                  <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                  <span>Конфіденційно</span>
                </div>
              </div>
            </form>
          ) : (
            <div className="text-center py-8">
              <div className="h-16 w-16 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Дякуємо!</h3>
              <p className="text-gray-600">
                Ваш результат та рекомендації надіслано на вказану електронну пошту.
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 flex flex-col">
      <div className="max-w-md mx-auto w-full bg-white rounded-xl shadow-lg p-6 my-auto">
        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        
        {/* Question container with number badge */}
        <div className="bg-blue-50 rounded-lg p-4 mb-6 relative">
          <div className="absolute -left-1 -top-1 w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
            {currentStep}
          </div>
          <h2 className="text-lg font-medium text-gray-800 pl-6">
            {currentQuestion.text}
          </h2>
        </div>
        
        {/* Render appropriate question layout */}
        {renderQuestionContent()}
        
        {/* Navigation buttons */}
        <div className="flex justify-between">
          <button
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            className="py-2 px-4 border border-gray-300 rounded-lg flex items-center text-gray-600 hover:bg-gray-50"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            НАЗАД
          </button>
          
          <button
            onClick={() => setCurrentStep(currentStep + 1)}
            className="py-2 px-4 bg-blue-500 text-white rounded-lg flex items-center hover:bg-blue-600"
          >
            ДАЛІ
            <ChevronRight className="h-4 w-4 ml-1" />
          </button>
        </div>
        
        {/* Progress indicator dots - FIXED */}
        <div className="mt-8">
          <div className="flex justify-between items-center">
            <p className="text-xs text-blue-600">
              Питання {currentStep} з {questions.length}
            </p>
            <p className="text-xs text-blue-600">
              {Math.round(progressPercentage)}% пройдено
            </p>
          </div>
          
          <div className="mt-2 relative">
            {/* Background progress line */}
            <div className="absolute left-0 right-0 top-1.5 h-0.5 bg-gray-200"></div>
            
            {/* Foreground progress line */}
            <div 
              className="absolute left-0 top-1.5 h-0.5 bg-blue-500 transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            ></div>
            
            {/* Progress dots - now on top of the lines */}
            <div className="relative flex justify-between">
              {[...Array(questions.length)].map((_, i) => (
                <div 
                  key={i} 
                  className={`h-3 w-3 rounded-full z-10 ${i < currentStep ? 'bg-blue-500' : 'bg-gray-300'}`}
                  style={{ 
                    transition: 'background-color 0.3s ease'
                  }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PsychologicalQuiz;
