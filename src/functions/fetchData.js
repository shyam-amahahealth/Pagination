const fetchData = async (page) => {
  try {
    const response = await fetch(
      `https://api.theinnerhour.com/v1/customers/resources/articles/list?page=${page}&limit=15`
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    alert("An error occurred while fetching data. Please try again later.");
    return [];
  }
};

export default fetchData;
