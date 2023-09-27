import { useParams } from 'react-router-dom';
import { Row, Col, Container } from 'react-bootstrap';
import { Product, Loader, Message, Paginate, BtnGoBack } from '../components';
import { useGetProductsQuery } from '../slices/productsApiSlice';

const HomeScreen = () => {
  const { keyword, pageNumber } = useParams();
  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber,
  });

  return (
    <>
      {isLoading ? (
        <div className='text-center'>
          <Loader />
          <h6>Loading ...</h6>
        </div>
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          {keyword && <BtnGoBack />}
          <h1>Latest Products</h1>
          <Row>
            {data.products.map(product => (
              <Col key={product._id} xs={6} sm={6} md={4} lg={4} xl={2}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={data.pages}
            page={data.page}
            keyword={keyword ? keyword : ''}
          />
        </>
      )}
    </>
  );
};

export default HomeScreen;
