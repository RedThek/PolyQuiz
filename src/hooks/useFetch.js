import { useState, useEffect } from 'react';

// useFetch est un hook personnalisé qui récupère des données depuis une URL.
// Il renvoie les données, l'état de chargement et une erreur éventuelle.
export const useFetch = (url) => {
  const [data, setData] = useState(null); // stockage des données reçues
  const [loading, setLoading] = useState(true); // vrai pendant le chargement
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url); // appel réseau via fetch

        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des données');
        }

        const result = await response.json(); // conversion en JSON
        setData(result); // on stocke les données
      } catch (err) {
        setError(err.message); // on stocke l'erreur si elle survient
      } finally {
        setLoading(false); // le chargement est terminé, succès ou échec
      }
    };

    fetchData();
  }, [url]); // relancer la requête si l'URL change

  // Retourne les trois valeurs sous forme d'objet
  return { data, loading, error };
};