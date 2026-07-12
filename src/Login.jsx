import { useState } from 'react';
import { supabase } from './supabaseClient';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setError('');

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError('Неверный email или пароль');
      return;
    }

    onLogin(data.user);
  }

  async function handleRegister(e) {
    e.preventDefault();
    setError('');

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setError('Ошибка регистрации: ' + error.message);
      return;
    }

    // создаём запись в таблице users с ролью по умолчанию
    const { error: insertError } = await supabase.from('users').insert({
      id: data.user.id,
      full_name: email,
      role: 'employee',
    });

    if (insertError) {
      console.error('Ошибка создания профиля:', insertError);
    }

    onLogin(data.user);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={isRegistering ? handleRegister : handleLogin}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm flex flex-col gap-4"
      >
        <h1 className="text-2xl font-bold text-center mb-2">Трекер заявок</h1>
        <p className="text-gray-500 text-center mb-4">
          {isRegistering ? 'Создайте аккаунт' : 'Войдите в систему'}
        </p>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border rounded px-3 py-2"
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border rounded px-3 py-2"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {isRegistering ? 'Зарегистрироваться' : 'Войти'}
        </button>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <p className="text-center text-sm text-gray-500">
          {isRegistering ? 'Уже есть аккаунт?' : 'Нет аккаунта?'}{' '}
          <button
            type="button"
            onClick={() => setIsRegistering(!isRegistering)}
            className="text-blue-500 hover:underline"
          >
            {isRegistering ? 'Войти' : 'Зарегистрироваться'}
          </button>
        </p>
      </form>
    </div>
  );
}

export default Login;