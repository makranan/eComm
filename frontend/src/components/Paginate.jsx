import React, { useEffect, useMemo } from 'react';
import { Pagination } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Paginate = ({
  pages,
  page,
  isAdmin = false,
  keyword = '',
  category = '',
  brand = '',
}) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'instant',
    });
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [page]);

  // Memoize the array of page numbers
  const pageNumbers = useMemo(() => [...Array(pages).keys()], [pages]);

  return (
    pages > 1 && (
      <Pagination>
        {pageNumbers.map((x) => (
          <LinkContainer
            key={x + 1}
            to={
              !isAdmin
                ? keyword
                  ? `/search/${keyword}/page/${x + 1}`
                  : category && brand
                  ? `/search/${category}/${brand}/page/${x + 1}`
                  : category
                  ? `/search/${category}/page/${x + 1}`
                  : brand
                  ? `/search/brand/${brand}/page/${x + 1}`
                  : `/page/${x + 1}`
                : category && brand
                ? `/admin/productlist/category/${category}/brand/${brand}/page/${
                    x + 1
                  }`
                : category
                ? `/admin/productlist/category/${category}/page/${x + 1}`
                : brand
                ? `/admin/productlist/brand/${brand}/page/${x + 1}`
                : `/admin/productlist/page/${x + 1}`
            }
          >
            <Pagination.Item onClick={scrollToTop} active={x + 1 === page}>
              {x + 1}
            </Pagination.Item>
          </LinkContainer>
        ))}
      </Pagination>
    )
  );
};

export default Paginate;
