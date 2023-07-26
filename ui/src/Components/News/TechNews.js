import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TechNews.css';
import SmallNavbar from '../Navbar/SmallNavbar';

const TechNews = () => {
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);

  useEffect(() => {
    const fetchTechNews = async () => {
      try {
        const response = await axios.get(
          'https://gnews.io/api/v4/top-headlines?category=technology&lang=en&apikey=5d93b6043a75f833367c9379e04e9687'
        );
        setArticles(response.data.articles);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTechNews();
  }, []);

  const handleArticleClick = (index) => {
    setSelectedArticle(index);
  };

  return (
    <div className="tech-news-container">
      <SmallNavbar/>
      <h2 className="tech-news-heading">Tech News</h2>
      {articles.map((article, index) => (
        <div
          key={index}
          className={`article ${selectedArticle === index ? 'selected' : ''}`}
          onClick={() => handleArticleClick(index)}
        >
          <h3 className="article-title">{article.title}</h3>
          {selectedArticle === index && (
            <div className="article-details">
              <p className="article-description">{article.description}</p>
              <p className="article-description">{article.content}</p>
              <a className="article-link" href={article.url} target="_blank" rel="noopener noreferrer">
                Read More
              </a>
            </div>
          )}
          {selectedArticle !== index && <img className="article-image" height='300px' width='150px' src={article.image} alt={article.title} />}
        </div>
      ))}
    </div>
  );
};

export default TechNews;
