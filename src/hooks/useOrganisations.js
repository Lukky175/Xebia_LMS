/* @ author : Gurnoor Singh
@email: gsingh13_be23@thapar.edu
mobile : +91- 7814205303
Thapar institute of engineering and technology, Patiala
*/

/*
 * Hook: useOrganisations
 * Purpose: This custom hook manages the organisations data state for the UI.
 * It interacts with the api service to fetch and add organisations.
 * It encapsulates loading states so the UI components only need
 * to call the hook without worrying about the underlying async logic.
 * Returns: { organisations, setOrganisations, loading, addOrganisation }
 */
import { useState, useEffect } from 'react';
import { api } from '@/services/api.js';

export function useOrganisations() {
  const [organisations, setOrganisations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrganisations = async () => {
      try {
        const data = await api.getOrganisations();
        setOrganisations(data);
      } catch (err) {
        console.error("Failed to load organisations:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrganisations();
  }, []);

  const addOrganisation = async (orgData) => {
    try {
      const updated = await api.addOrganisation(orgData);
      setOrganisations(updated);
      return { success: true };
    } catch (err) {
      console.error("Failed to add organisation:", err);
      return { success: false, error: err };
    }
  };

  return { organisations, setOrganisations, loading, addOrganisation };
}
