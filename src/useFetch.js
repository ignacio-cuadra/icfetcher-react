const { useState } = require("react");

const useFetch = ({ fetcher, isLoading: isLoadingDefault = false }) => {
  const [isLoading, setIsLoading] = useState(isLoadingDefault);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(undefined);
  const fetcherWrapper = (data) => {
    setResponse(null);
    setError(null);
    setIsLoading(true);
    return fetcher(data)
      .then((response) => {
        setResponse(response);
        return response;
      })
      .catch((error) => {
        setError(error);
        throw error;
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return { isLoading, error, response, fetcher: fetcherWrapper };
};

export default useFetch;
