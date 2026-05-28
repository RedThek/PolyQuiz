import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const Accueil = () => {
  const { pseudo, setPseudo } = useContext(UserContext);
  const [username, setUsername] = useState(pseudo || '');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const cleaned = username.trim();
    if (!cleaned) return;

    setPseudo(cleaned);
    navigate('/quiz');
  };

  return (
    <main className="accueil-page">
      <section>
        <header>
          <h1>PolyQuiz</h1>
          <p>
            Plateforme de quiz expert sur la F1, le MotoGP, la NBA, le Football et la culture Manga/Anime.
          </p>
        </header>

        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Pseudo</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            placeholder="Entrez votre pseudo"
          />
          <button type="submit">Se connecter</button>
        </form>

        <div className="accueil-info">
          <h2>Comment ça marche ?</h2>
          <ul>
            <li>Vous devez démarrer le quiz depuis la page quiz.</li>
            <li>Le chronomètre démarre dès la première question.</li>
            <li>Le score est calculé automatiquement à chaque réponse.</li>
            <li>Les pages /quiz et /resultats sont sécurisées par authentification.</li>
          </ul>
        </div>
      </section>
    </main>
  );
};

export default Accueil;
