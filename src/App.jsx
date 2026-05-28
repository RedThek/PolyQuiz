import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Accueil from './pages/Accueil';
import QuizEngine from './pages/QuizEngine';
import Resultats from './pages/Resultats';

// App configure les routes de l'application PolyQuiz.
function App() {
  return (
    <BrowserRouter>
        <Routes>
        {/* Route publique accessible sans pseudo */}
        <Route path="/" element={<Accueil />} />

        {/* Routes protégées : ne s'affichent que si l'utilisateur est connecté */}
        <Route element={<ProtectedRoute />}>
          <Route path="/quiz" element={<QuizEngine />} />
          <Route path="/resultats" element={<Resultats />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;