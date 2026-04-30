import React from 'react';

function AdPopup({ onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg max-w-md mx-4">
        <h2 className="text-xl font-semibold mb-4">Реклама</h2>
        <p>Это placeholder модальное окно с рекламой.</p>
        <button
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
          onClick={onClose}
        >
          Закрыть
        </button>
      </div>
    </div>
  );
}

export default AdPopup;
