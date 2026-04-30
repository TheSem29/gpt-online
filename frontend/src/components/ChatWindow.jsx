import React, { useState } from 'react';
import axios from 'axios';

function ChatWindow({ onResponseFlags }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);
    try {
      const res = await axios.post('/api/chat', { prompt: input });
      const assistantMsg = { role: 'assistant', content: res.data.answer };
      setMessages((prev) => [...prev, assistantMsg]);
      // Pass ad flags back to App to display ads
      if (onResponseFlags) {
        onResponseFlags({ adBanner: res.data.adBanner, adPopup: res.data.adPopup });
      }
    } catch (err) {
      console.error(err);
      setMessages((prev) => [...prev, { role: 'assistant', content: 'Error contacting server' }]);
    }
    setLoading(false);
    setInput('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto mb-4 space-y-2">
        {messages.map((msg, idx) => (
          <div key={idx} className={msg.role === 'assistant' ? 'text-left' : 'text-right'}>
            <span className={msg.role === 'assistant' ? 'bg-gray-200 text-black' : 'bg-blue-600 text-white'}
                  className="inline-block p-2 rounded-md max-w-[80%]" >
              {msg.content}
            </span>
          </div>
        ))}
      </div>
      <div className="flex items-center">
        <textarea
          className="flex-1 border rounded p-2" 
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Введите запрос..."
          disabled={loading}
        />
        <button
          className="ml-2 bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
          onClick={sendMessage}
          disabled={loading}
        >
          {loading ? '…' : 'Отправить'}
        </button>
      </div>
    </div>
  );
}

export default ChatWindow;
