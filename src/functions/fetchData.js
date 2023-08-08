const fetchData = async (page) => {
  const response = await fetch(
    `https://api.theinnerhour.com/v1/customers/resources/articles/list?page=${page}&limit=15`
  );
  const data = await response.json();
  return data.data;
};
export default fetchData;
