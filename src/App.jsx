import { useState, useEffect } from 'react';
import RequestList from './RequestList';
import RequestForm from './RequestForm';
import Login from './Login';
import { supabase } from './supabaseClient';
import { getRequests } from './requestsApi';

function App() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [requests, setRequests] = useState([]);

  async function loadRequests() {
    const data = await getRequests();
    setRequests(data);
  }

  useEffect(() => {
    loadRequests();
  }, []);

  useEffect(() => {
    async function loadRole() {
      if (!user) return;

      const { data, error } = await supabase
        .from('users')
        .select('role')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Ошибка при получении роли:', error);
        return;
      }

      setRole(data.role);
    }

    loadRole();
  }, [user]);

  if (!user) {
    return <Login onLogin={setUser} />;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold p-4">Трекер заявок</h1>
      <p className="px-4">Вы вошли как: {user.email} ({role})</p>
      <RequestForm onCreated={loadRequests} />
      <RequestList role={role} requests={requests} onUpdate={loadRequests} />
    </div>
  );
}

export default App;