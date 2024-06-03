import React, { useState } from 'react';
import axios from 'axios';
import './ChatBox.css';

const Chat = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');

  const getAdvice = async () => {
    setResponse('Loading...');
    try {
      const res = await axios.post(`${process.env.REACT_APP_LOCAL_SERVER}/chat`, { query });
      setResponse(res.data.response);
    } catch (error) {
      setResponse('Error fetching advice.');
    }
  };

  return (
    <div className="chat-container">
      <h1>Shopify Product Advisor</h1>
      <textarea
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Ask for product advice..."
      />
      <button onClick={getAdvice}>Get Recommendation</button>
      <div className="response" style={{backgroundColor: response?'#e9ecef': '#fff'}}>{response}</div>
    </div>
  );
};

export default Chat;
