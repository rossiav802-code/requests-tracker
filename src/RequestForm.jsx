import { useState } from 'react';
import { supabase } from './supabaseClient';

function RequestForm({ onCreated }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  async function handleSubmit(status) {
    if (!title.trim()) {
      alert('Введите название заявки');
      return;
    }

    await supabase.from('requests').insert({
      title: title,
      description: description,
      status: status,
      author_id: '07a538e0-9945-4001-8818-b3b77fd163b6'
    });

    setTitle('');
    setDescription('');
    onCreated();
  }

 return (
    <div className="p-4 mb-4 border rounded flex flex-col gap-2 max-w-md">
      <input
        type="text"
        placeholder="Название заявки"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border rounded px-3 py-2"
      />
      <textarea
        placeholder="Описание (необязательно)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border rounded px-3 py-2"
      />
      <div className="flex gap-2">
        <button
          onClick={() => handleSubmit('draft')}
          className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
        >
          Сохранить черновик
        </button>
        <button
          onClick={() => handleSubmit('pending')}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Отправить на согласование
        </button>
      </div>
    </div>
  );
}

export default RequestForm;