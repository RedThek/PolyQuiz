import { useMemo, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import '../styles/resultats.css';

// Page des résultats qui lit les données globales depuis UserContext.
const Resultats = () => {
  const { pseudo, bestScore, lastScore, lastDuration, lastQuestionCount } = useContext(UserContext);
  const navigate = useNavigate();

  // useMemo évite de recalculer le ratio à chaque rendu si les valeurs n'ont pas changé.
  const ratio = useMemo(() => {
    if (!lastQuestionCount) return 0;
    return Number(((lastScore / lastQuestionCount) * 100).toFixed(1));
  }, [lastScore, lastQuestionCount]);

  return (
    <main className="resultats-page">
      <section>
        <header>
          <h1>Résultats</h1>
          <p>Bravo {pseudo}, voici ton dernier score.</p>
        </header>

        <div className="resultats-summary">
          <p>
            Score du dernier quiz : <strong>{lastScore}</strong> / <strong>{lastQuestionCount}</strong>
          </p>
          <p>Meilleur score global : <strong>{bestScore}</strong></p>
          <p>Durée du dernier quiz : <strong>{lastDuration}s</strong></p>
          <div className="ratio-meter">
            <span>Ratio de réussite : </span>
            <strong>{ratio}%</strong>
            <div className="ratio-bar-background">
              <div className="ratio-bar-fill" style={{ width: `${ratio}%` }} />
            </div>
          </div>
        </div>

        <div className="resultats-actions">
          <button type="button" onClick={() => navigate('/quiz')}>
            Recommencer un quiz
          </button>
          <button type="button" onClick={() => navigate('/')}> 
            Retour à l'accueil
          </button>
        </div>
      </section>
    </main>
  );
};

export default Resultats;
