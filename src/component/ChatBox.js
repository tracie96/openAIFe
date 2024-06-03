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

  const formatResponse = (response) => {
    const lines = response.split('\n\n');
    return lines.map((line, index) => {
      if (line.includes('**')) {
        return <p key={index}>{line.replace(/\*\*/g, '')}</p>;
      } else if (line.includes('Wishing you')) {
        return <p key={index}><strong>{line}</strong></p>;
      } else {
        return <p key={index}>{line}</p>;
      }
    });
  };


  return (
    <div className="chat-container">
      <h1>Shopify Product Advisor</h1>
      <textarea
        value={query}
        required
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Ask for product advice..."
      />
      <select value={pipeline} onChange={(e) => setPipeline(e.target.value)}>
        <option value="approach_x">Approach X</option>
        <option value="approach_y">Approach Y</option>
      </select>
      <button onClick={getAdvice}>Get Recommendation</button>

      {response && (
        <div className="response-container">
          <h2>Fashion Advice:</h2>
          <div className="response">{formatResponse(response)}</div>
        </div>
      )}

      
    </div>
  );
};

export default Chat;
