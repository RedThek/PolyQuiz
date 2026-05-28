import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

// ProtectedRoute empêche l'accès aux routes protégées si l'utilisateur n'est pas connecté.
const ProtectedRoute = () => {
  const { pseudo } = useContext(UserContext); // lecture du contexte utilisateur

  if (!pseudo) {
    // Redirige vers l'accueil si aucun pseudo n'est trouvé.
    return <Navigate to="/" replace />;
  }

  // Si l'utilisateur a un pseudo, on affiche la route enfant.
  return <Outlet />;
};

export default ProtectedRoute;