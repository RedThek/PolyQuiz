import { useState, useEffect } from 'react';

// Le hook prend l'URL en paramètre comme demandé 
export const useFetch = (url) => {

  // Définition des 3 états internes requis
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(
        () => {
            // Fonction asynchrone pour gérer l'appel réseau
            const fetchData = async () => {
                try {
                    const response = await fetch(url);

                    if (!response.ok) throw new Error("Erreur lors de la récupération des données");

                    const result = await response.json();

                    setData(result);
                } catch (err) {
                    setError(err.message);
                } finally {
                    setLoading(false); // Le chargement est terminé, succès ou échec
                }
            };

            fetchData();
        }, 
        [url]
    ); // Le hook se ré-exécute si l'URL change

  // Retourne les trois valeurs sous forme d'objet
  return { data, loading, error };
};