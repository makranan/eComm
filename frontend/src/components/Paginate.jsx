import React, { useEffect, useMemo } from 'react';
import { Pagination } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import PageSizeDropdown from './PageSizeDropdown';

const Paginate = ({
  pageSize,
  setPageSize,
  pages,
  page,
  isAdmin = false,
  keyword = '',
  category = '',
  brand = '',
}) => {
  const scrollToTop = () => {
    // window.scrollTo({
    //   top: 0,
    //   behavior: 'instant',
    // });
  };

  // useEffect(() => {
  //   window.scrollTo({ top: 0, behavior: 'instant' });
  // }, [page]);

  // Memoize the array of page numbers
  const pageNumbers = useMemo(() => [...Array(pages).keys()], [pages]);

  return (
    pages > 1 && (
      <div
        className='d-flex justify-content-center align-items-center'
        style={{
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          borderTop: '1px solid #eaeaea',
          paddingTop: '20px',
        }}
      >
        <Pagination>
          <Pagination.First />
          <Pagination.Prev />
          <Pagination.Ellipsis />
          {pageNumbers.map((x) => (
            <LinkContainer
              key={x + 1}
              to={
                !isAdmin
                  ? keyword
                    ? `/search/${keyword}/page/${x + 1}`
                    : category && brand
                    ? `/search/category/${category}/brand/${brand}/page/${
                        x + 1
                      }`
                    : category
                    ? `/search/category/${category}/page/${x + 1}`
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
              <Pagination.Item
                onClick={scrollToTop}
                active={x + 1 === (page || 1)}
                bg='info'
              >
                {x + 1}
              </Pagination.Item>
            </LinkContainer>
          ))}
          <Pagination.Ellipsis />
          <Pagination.Next />
          <Pagination.Last />
          <PageSizeDropdown pageSize={pageSize} setPageSize={setPageSize} />
        </Pagination>
      </div>
    )
  );
};

export default Paginate;
