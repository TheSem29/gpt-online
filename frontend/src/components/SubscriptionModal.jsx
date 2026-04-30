import React from 'react';

function SubscriptionModal({ onClose }) {
  // Placeholder – in a real implementation you would list plans and redirect to Stripe checkout.
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg max-w-lg mx-4">
        <h2 className="text-2xl font-bold mb-4">Подписки</h2>
        <p>Здесь будет список тарифов (без рекламы, PRO, MAX и т.д.).</p>
        <button
          className="mt-4 bg-gray-600 text-white px-4 py-2 rounded"
          onClick={onClose}
        >
          Закрыть
        </button>
      </div>
    </div>
  );
}

export default SubscriptionModal;
