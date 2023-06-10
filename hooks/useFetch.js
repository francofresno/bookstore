import { useState } from "react";

const useFetch = () => {
  const [data, setData] = useState();
  const [isFetching, setIsFetching] = useState(false);

  const fetchJsonData = (url, dataMapper) => {
    setIsFetching(true);
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setIsFetching(false);
        if (dataMapper.shouldReturn(data)) return;
        setData(dataMapper.mapValue(data));
      })
      .catch((error) => {
        setIsFetching(false);
        console.error("Error:", error);
      });
  };

  const fetchBlobData = (url, dataMapper) => {
    setIsFetching(true);
    fetch(url)
      .then((response) => response.blob())
      .then((data) => {
        setIsFetching(false);
        if (dataMapper.shouldReturn(data)) return;
        const reader = new FileReader();
        reader.onloadend = () => {
          const dataURL = reader.result;
          setData(dataURL);
        };
        reader.readAsDataURL(dataMapper.mapValue(data));
      })
      .catch((error) => {
        setIsFetching(false);
        console.error("Error:", error);
      });
  };

  const clearData = () => {
    setData(null);
  };

  return [data, isFetching, fetchJsonData, fetchBlobData, clearData];
};

export default useFetch;
