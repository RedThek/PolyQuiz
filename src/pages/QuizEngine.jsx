import { useReducer, useEffect, useMemo, useContext, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { quizReducer, initialState } from '../reducers/quizReducer';
import { useFetch } from '../hooks/useFetch';
import { useTimer } from '../hooks/useTimer';
import { UserContext } from '../context/UserContext';
import '../styles/quiz.css';

// QuizEngine est le composant principal de la page de quiz.
// Il rassemble le reducer d'état, le timer, les questions et le contexte utilisateur.
const QuizEngine = () => {
  const [state, dispatch] = useReducer(quizReducer, initialState); // état du quiz (question, score, statut)
  const { pseudo, setBestScore, setLastScore, setLastDuration, setLastQuestionCount } = useContext(UserContext); // contexte utilisateur
  const { data: questions, loading, error } = useFetch('/questions.json'); // récupération des questions
  const { secondsLeft, isActive, start, pause, reset } = useTimer(60); // timer de 60s
  const navigate = useNavigate(); // navigation entre pages

  const totalQuestions = questions ? questions.length : 0; // nombre total de questions chargées

  const currentQuestion = useMemo(
    () => (questions && questions[state.currentIndex] ? questions[state.currentIndex] : null),
    [questions, state.currentIndex]
  ); // question en cours, memoisée pour éviter les recalculs inutiles

  const progressLabel = useMemo(
    () => `${Math.min(state.currentIndex + 1, totalQuestions)} / ${totalQuestions}`,
    [state.currentIndex, totalQuestions]
  ); // texte de progression du quiz

  const scoreLabel = useMemo(
    () => `${state.scoreTemporaire} bonne${state.scoreTemporaire > 1 ? 's' : ''}`,
    [state.scoreTemporaire]
  ); // label de score avec pluriel

  const finishQuiz = useCallback(
    (finalScore) => {
      setLastScore(finalScore); // enregistre le score du dernier quiz
      setLastDuration(60 - secondsLeft); // enregistre le temps utilisé
      setLastQuestionCount(totalQuestions); // enregistre le nombre de questions du quiz
      setBestScore((previous) => Math.max(previous, finalScore)); // met à jour le meilleur score si nécessaire
      dispatch({ type: 'FINISH_QUIZ' }); // passe le quiz en statut terminé
      navigate('/resultats'); // redirige vers la page des résultats
    },
    [dispatch, navigate, secondsLeft, setBestScore, setLastDuration, setLastQuestionCount, setLastScore, totalQuestions]
  );

  useEffect(() => {
    if (state.status === 'playing' && !isActive) {
      start(); // démarre le timer au début du quiz
    }

    if (state.status === 'finished') {
      pause(); // arrête le timer quand le quiz est terminé
    }
  }, [state.status, isActive, start, pause]);

  useEffect(() => {
    if (state.status === 'finished') {
      setLastDuration(60 - secondsLeft); // calcule la durée finale si le quiz est terminé
    }
  }, [state.status, secondsLeft, setLastDuration]);

  useEffect(() => {
    if (state.status === 'playing' && secondsLeft === 0) {
      pause();
      finishQuiz(state.scoreTemporaire); // termine le quiz automatiquement quand le timer arrive à zéro
    }
  }, [secondsLeft, state.status, state.scoreTemporaire, pause, finishQuiz]);

  const handleStartQuiz = () => {
    reset(60); // remet le timer à 60 secondes
    dispatch({ type: 'START_QUIZ' }); // change le statut du quiz en 'playing'
  };

  const handleAnswer = (reponse) => {
    if (!currentQuestion || state.status !== 'playing') return;

    const isLastQuestion = state.currentIndex === totalQuestions - 1;
    const isCorrect = reponse === currentQuestion.bonne_reponse;
    const nextScore = isCorrect ? state.scoreTemporaire + 1 : state.scoreTemporaire;

    dispatch({
      type: 'ANSWER_QUESTION',
      payload: {
        reponseUtilisateur: reponse,
        bonneReponse: currentQuestion.bonne_reponse
      }
    }); // enregistre la réponse de l'utilisateur

    if (isLastQuestion) {
      finishQuiz(nextScore); // termine le quiz si c'était la dernière question
    }
  };

  if (loading) {
    return (
      <main className="quiz-engine">
        <h1>Quiz en cours de chargement</h1>
        <p>Récupération des questions…</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="quiz-engine">
        <h1>Erreur</h1>
        <p>{error}</p>
      </main>
    );
  }

  return (
    <main className="quiz-engine">
      <section>
        <header>
          <h1>PolyQuiz</h1>
          <p>Bonjour {pseudo}, prépare-toi pour un quiz chronométré expert.</p>
        </header>

        {state.status === 'idle' && (
          <div>
            <p>Le quiz couvre la F1, le NBA, le Football, les Mangas/Anime et le MotoGP.</p>
            <button type="button" onClick={handleStartQuiz}>
              Commencer le quiz
            </button>
          </div>
        )}

        {state.status === 'playing' && currentQuestion && (
          <div>
            <div className="quiz-status-bar">
              <strong>Question {progressLabel}</strong>
              <span>Score : {scoreLabel}</span>
              <span className={secondsLeft <= 10 ? 'timer warning' : 'timer'}>Temps restant : {secondsLeft}s</span>
            </div>
            <h2>{currentQuestion.libelle}</h2>
            <div>
              {currentQuestion.options.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => handleAnswer(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}

        {state.status === 'finished' && (
          <div>
            <h2>Quiz terminé</h2>
            <p>Ton score : {state.scoreTemporaire} / {totalQuestions}</p>
            <p>Durée : {60 - secondsLeft}s</p>
            <button type="button" onClick={() => navigate('/resultats')}>
              Voir les résultats complets
            </button>
          </div>
        )}
      </section>
    </main>
  );
};

export default QuizEngine;