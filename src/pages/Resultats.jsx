import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const Resultats = () => {
  const { pseudo, bestScore, lastScore, lastDuration } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <main className="resultats-page">
      <section>
        <header>
          <h1>Résultats</h1>
          <p>Bravo {pseudo}, voici ton dernier score.</p>
        </header>

        <div className="resultats-summary">
          <p>Score du dernier quiz : <strong>{lastScore}</strong></p>
          <p>Meilleur score global : <strong>{bestScore}</strong></p>
          <p>Durée du dernier quiz : <strong>{lastDuration}s</strong></p>
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
