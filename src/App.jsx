import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Accueil from './pages/Accueil';
import QuizEngine from './pages/QuizEngine';
import Resultats from './pages/Resultats';

function App() {
  return (
    <BrowserRouter>
        <Routes>
            {/* Route publique  */}
            <Route path="/" element={<Accueil />} />

            {/* Routes enveloppées par la ProtectedRoute */}
            <Route element={<ProtectedRoute />}>
            <Route path="/quiz" element={<QuizEngine />} />
            <Route path="/resultats" element={<Resultats />} />
            </Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App;