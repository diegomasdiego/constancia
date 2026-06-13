import { useState, useEffect, useCallback } from 'react';
import api from '../services/api';

export default function usePatientData() {
  const [loading, setLoading] = useState(true);
  const [foodGroups, setFoodGroups] = useState([]);
  const [plan, setPlan] = useState(null);
  const [logsSummary, setLogsSummary] = useState({});
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [groupsRes, logsRes] = await Promise.all([
        api.get('/food-groups'),
        api.get('/logs/today')
      ]);

      setFoodGroups(groupsRes.data);
      // logsRes.data already includes summary with daily_allowance, name, icon, color
      // but let's keep it consistent
      setPlan({ id: logsRes.data.plan_id });
      
      const summary = {};
      logsRes.data.summary.forEach(item => {
        summary[item.food_group_id] = {
          consumed: item.consumed,
          allowance: item.daily_allowance,
          name: item.name,
          icon: item.icon,
          color: item.color
        };
      });
      setLogsSummary(summary);
      
      setError(null);
    } catch (err) {
      console.error('Error fetching patient data:', err);
      if (err.response?.status === 404) {
        setError('NO_PLAN');
      } else {
        setError('No se pudo cargar la información del plan.');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const addPortion = async (foodGroupId) => {
    if (!plan) return;
    await api.post('/logs', { food_group_id: foodGroupId, plan_id: plan.id });
  };

  const removePortion = async (foodGroupId) => {
    await api.delete(`/logs/last?food_group_id=${foodGroupId}`);
  };

  return { loading, foodGroups, plan, logsSummary, error, fetchData, addPortion, removePortion, setLogsSummary };
}
