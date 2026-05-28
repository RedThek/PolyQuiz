import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const ProtectedRoute = () => {
  // Interrogation du UserContext pour vérifier si un pseudo est présent (indiquant que l'utilisateur est connecté)
  const { pseudo } = useContext(UserContext);

  // Si pas de pseudo, blocage du rendu et redirection vers l'accueil via <Navigate> de react-router-dom
  if (!pseudo) {
    return <Navigate to="/" replace />;
  }

  // <Outlet /> permet d'afficher les composants enfants définis dans les routes protégées (ex: /quiz, /resultats) si l'utilisateur est authentifié
  return <Outlet />;
};

export default ProtectedRoute;