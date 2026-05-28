import { createContext } from 'react';

// Crée un contexte React vide qui servira de canal de communication
// entre les composants de l'application et le fournisseur de données.
// Ce contexte est utilisé par useContext() dans les pages et composants.
export const UserContext = createContext();
