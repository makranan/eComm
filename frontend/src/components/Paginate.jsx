import React, { useEffect, useMemo } from 'react';
import { Pagination } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Paginate = ({ pages, page, isAdmin = false, keyword = '' }) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
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
                  : `/page/${x + 1}`
                : `/admin/productlist/${x + 1}`
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
