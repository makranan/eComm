import React, { useEffect, useState } from 'react';
import { useGetProductsQuery } from '../slices/productsApiSlice';

const SearchResult = ({ keyword }) => {
  const {
    data: products,
    isLoading,
    isError,
  } = useGetProductsQuery({
    keyword,
    pageNumber: 1, // You may need to update the page number as needed.
  });

  useEffect(() => {
    // Fetch data based on the keyword when it changes.
    // You can add additional logic here if needed.
  }, [keyword]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  return (
    <div>
      {/* Render the search results here */}
      {products &&
        products.map((product) => <div key={product._id}>{product.name}</div>)}
    </div>
  );
};

export default SearchResult;
