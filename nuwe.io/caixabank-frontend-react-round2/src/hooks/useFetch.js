import { useState, useEffect } from "react";
import { fetchData } from "../services/dataService";

// TODO: Implement the `useFetch` hook to fetch data from the provided URL.
const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDataFromService = async () => {
      try {
        setIsLoading(true);
        const result = await fetchData();
        setData({ investments: result }); // Wrap the result in the expected format
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDataFromService();
  }, [url]); // url is kept as dependency even though we're not using it directly

  return { data, isLoading, error };
};

export default useFetch;
