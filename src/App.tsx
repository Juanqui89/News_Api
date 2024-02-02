/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";

interface Article {
  id: number;
  source: { id: string; name: string };
  author: string;
  title: string;
  description: string;
  url: string;
  content: string;
}

interface GetNews {
  id: number;
  articles: Article[];
}

const App = () => {
  const [news, setNews] = useState<GetNews[]>([]);
  const api_key = import.meta.env.VITE_REACT_API_KEY;

  const fetchNews = async () => {
    try {
      const resp = await axios.get(
        `https://newsapi.org/v2/top-headlines?country=us&catogory=business&apiKey=${api_key}`
      );
      const articles: Article[] = resp.data.articles;
      setNews([{ id: 1, articles }]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [api_key]);

  return (
    <>
      <Container>
        <Row>
          <Col>
            <h1 className="title">Popular News</h1>
            {news.map((item) => (
              <section key={item.id}>
                {item.articles.map((article) => (
                  <article>
                    <h1 className="author">
                      Author: {article.source.name} {article.id}
                    </h1>
                    <h4>{article.author} </h4>
                    <h1>{article.title}</h1>
                    <p>{article.description}</p>
                    <a
                      href={article.url}
                      className="text-decoration-none article-url"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {article.url}
                    </a>
                    <p>{article.content}</p>
                  </article>
                ))}
              </section>
            ))}
          </Col>
        </Row>
      </Container>
      <footer>
        <p>&copy; 2024</p>
        <button type="button" className="upbtn">
          <a href="#">
            <i className="bi bi-arrow-up-circle-fill fs-4 arrow"></i>
          </a>
        </button>
      </footer>
    </>
  );
};

export default App;
