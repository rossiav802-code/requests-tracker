import { useState } from 'react';
import { supabase } from './supabaseClient';

function getStatusColor(status) {
  if (status === 'draft') return 'bg-gray-200 text-gray-700';
  if (status === 'pending') return 'bg-yellow-200 text-yellow-800';
  if (status === 'approved') return 'bg-green-200 text-green-800';
  if (status === 'rejected') return 'bg-red-200 text-red-800';
}

async function updateStatus(id, newStatus) {
  const { error } = await supabase
    .from('requests')
    .update({ status: newStatus })
    .eq('id', id);

  if (error) {
    console.error('Ошибка при обновлении статуса:', error);
  }
}

function RequestList({ role, requests, onUpdate }) {
  const [filter, setFilter] = useState('all');

  async function handleStatusChange(id, newStatus) {
    await updateStatus(id, newStatus);
    onUpdate();
  }

  const filteredRequests = filter === 'all'
    ? requests
    : requests.filter((request) => request.status === filter);

  return (
    <div className="p-4">
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setFilter('all')}
          className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200"
        >
          Все
        </button>
        <button
          onClick={() => setFilter('draft')}
          className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200"
        >
          Черновики
        </button>
        <button
          onClick={() => setFilter('pending')}
          className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200"
        >
          Ожидающие
        </button>
        <button
          onClick={() => setFilter('approved')}
          className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200"
        >
          Согласованные
        </button>
        <button
          onClick={() => setFilter('rejected')}
          className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200"
        >
          Отклоненные
        </button>
      </div>

      <div className="flex flex-col gap-2">
        {filteredRequests.map((request) => (
          <div
            key={request.id}
            className="flex items-center justify-between p-3 border rounded shadow-sm"
          >
            <div className="flex items-center gap-3">
              <span>{request.title}</span>
              <span className={`px-2 py-1 rounded text-sm ${getStatusColor(request.status)}`}>
                {request.status}
              </span>
            </div>

            {role === 'approver' && (
              <div className="flex gap-2">
                <button
                  onClick={() => handleStatusChange(request.id, 'approved')}
                  className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Согласовать
                </button>
                <button
                  onClick={() => handleStatusChange(request.id, 'rejected')}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Отклонить
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default RequestList;