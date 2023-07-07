import React, { useEffect, useState } from 'react';
import axios from 'axios';

const QuoteComponent = () => {
  const [quote, setQuote] = useState('');
  const [backgroundImage, setBackgroundImage] = useState('');

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await axios.get('http://quotes.rest/qod.json?category=management');
        const quoteData = response.data.contents.quotes[0];
        setQuote(quoteData.quote);
        setBackgroundImage(quoteData.background);
      } catch (error) {
        console.error('Error fetching quote:', error);
      }
    };

    fetchQuote();
  }, []);

  return (
    <div className="quote-component" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="quote-content">
        <h2>Quote of the Day</h2>
        <p className="quote-text">{quote}</p>
      
      </div>
    </div>
  );
};

export default QuoteComponent;
