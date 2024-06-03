import React, { useState } from 'react';
import axios from 'axios';
import './ChatBox.css';

const Chat = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [pipeline, setPipeline] = useState('approach_x');
  const getAdvice = async () => {
    setResponse('Loading...');
    try {
      const res = await axios.post(`${process.env.REACT_APP_DEV_SERVER}/chat`, { query, pipeline });
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
      <select value={pipeline} onChange={(e) => setPipeline(e.target.value)}>
        <option value="approach_x">Approach X</option>
        <option value="approach_y">Approach Y</option>
      </select>
      <button onClick={getAdvice}>Get Recommendation</button>
      <div className="response" style={{backgroundColor: response?'#e9ecef': '#fff'}}>{response}</div>
    </div>
  );
};

export default Chat;
