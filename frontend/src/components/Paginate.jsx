import React, { useMemo } from 'react';
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
    window.scrollTo({
      top: 0,
      behavior: 'instant',
    });
  };

  const generateSearchURL = (pageNumber) => {
    if (!isAdmin) {
      return keyword
        ? `/search/${keyword}/page/${pageNumber}`
        : category && brand
        ? `/search/category/${category}/brand/${brand}/page/${pageNumber}`
        : category
        ? `/search/category/${category}/page/${pageNumber}`
        : brand
        ? `/search/brand/${brand}/page/${pageNumber}`
        : `/page/${pageNumber}`;
    } else {
      return category && brand
        ? `/admin/productlist/category/${category}/brand/${brand}/page/${pageNumber}`
        : category
        ? `/admin/productlist/category/${category}/page/${pageNumber}`
        : brand
        ? `/admin/productlist/brand/${brand}/page/${pageNumber}`
        : `/admin/productlist/page/${pageNumber}`;
    }
  };

  const generateFirstPageURL = () => (page > 1 ? generateSearchURL(1) : null);
  const generateLastPageURL = () =>
    page < pages ? generateSearchURL(pages) : null;

  const generatePrevPageURL = () =>
    page > 1 ? generateSearchURL(page - 1) : null;

  const generateNextPageURL = () =>
    page < pages ? generateSearchURL(page + 1) : null;

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
          {generateFirstPageURL() ? (
            <LinkContainer to={generateFirstPageURL()}>
              <Pagination.First />
            </LinkContainer>
          ) : (
            <Pagination.First disabled />
          )}
          {generatePrevPageURL() ? (
            <LinkContainer to={generatePrevPageURL()}>
              <Pagination.Prev />
            </LinkContainer>
          ) : (
            <Pagination.Prev disabled />
          )}
          {pageNumbers.map((pageNumber) => (
            <LinkContainer
              key={pageNumber + 1}
              to={generateSearchURL(pageNumber + 1)}
            >
              <Pagination.Item
                onClick={scrollToTop}
                active={pageNumber + 1 === (page || 1)}
                bg='info'
              >
                {pageNumber + 1}
              </Pagination.Item>
            </LinkContainer>
          ))}
          {generateNextPageURL() ? (
            <LinkContainer to={generateNextPageURL()}>
              <Pagination.Next />
            </LinkContainer>
          ) : (
            <Pagination.Next disabled />
          )}
          {generateLastPageURL() ? (
            <LinkContainer to={generateLastPageURL()}>
              <Pagination.Last />
            </LinkContainer>
          ) : (
            <Pagination.Last disabled />
          )}
          <PageSizeDropdown pageSize={pageSize} setPageSize={setPageSize} />
        </Pagination>
      </div>
    )
  );
};

export default Paginate;
