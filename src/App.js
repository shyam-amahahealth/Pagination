import React, { useRef, useEffect, useState } from "react";

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
          fetch(
            `https://api.theinnerhour.com/v1/customers/resources/articles/list?page=${count}&limit=15`
          )
            .then((res) => res.json())
            .then((resData) => setData((prev) => [...prev, ...resData.data]));
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
console.log(data)
  return (
    <div>
      {data.map((item, index) => {
        return <div key={item.id}>
          <h1>{item.title}</h1>
        </div>;
      })}
      <div ref={targetRef}></div>
    </div>
  );
};

export default App;
