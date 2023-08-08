import React, { useRef, useEffect, useState } from "react";
import Card from "./components/card";
import "./App.css";
import fetchData from "./functions/fetchData";
const App = () => {
  const targetRef = useRef(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };
    let count = 0;

    const callback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          count = count + 1;
          fetchData(count).then((newData) =>
            setData((prev) => [...prev, ...newData])
          );
        }
      });
    };

    const observer = new IntersectionObserver(callback, options);
    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => {
      if (targetRef.current) {
        observer.unobserve(targetRef.current);
      }
    };
  }, []);
  return (
    <>
      <div className="grid-container">
        {data.map(({ id, title, short_description, thumb }) => (
          <div key={id}>
            <Card
              title={title}
              description={short_description}
              imageUrl={thumb}
            />
          </div>
        ))}
      </div>
      <div ref={targetRef} style={{ height: "20px" }}></div>
    </>
  );
};

export default App;
