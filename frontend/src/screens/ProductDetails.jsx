import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Form,
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Accordion,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  Rating,
  BtnGoBack,
  BtnCount,
  Loader,
  Message,
  ProductImageGallery,
  StyledNumberInput,
} from '../components';
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from '../slices/productsApiSlice';
import { addToCart } from '../slices/cartSlice';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { addDecimals } from '../utils/cartUtils';

// import '../assets/styles/custom.css';

const ProductDetails = () => {
  const { id: productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const [createReview, { isLoading: loadingReview }] =
    useCreateReviewMutation();

  const { userInfo } = useSelector(state => state.auth);

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate('/cart');
  };

  const submitHandler = async e => {
    e.preventDefault();

    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success('Review submitted');
      setRating(0);
      setComment('');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const calculateTaxPrice = productPrice => {
    return addDecimals(Number((0.23 * productPrice).toFixed(2)));
  };

  function ScrollToTop() {
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

    return null;
  }
  ScrollToTop();

  return (
    <>
      <BtnGoBack className='btn-primary btn my-3' to='/' />

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Row>
            <Col md={5}>
              {/* <Image src={product.image} alt={product.name} fluid /> */}
              <ProductImageGallery
                images={product.images}
                showPlayButton={false}
              />
            </Col>
            <Col md={4}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>Price: $ {product.price}</ListGroup.Item>
                <ListGroup.Item>
                  Tax: $ {calculateTaxPrice(product.price)}
                </ListGroup.Item>
                <ListGroup.Item>{product.description}</ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong style={{ fontWeight: '600' }}>
                          ${product.price}{' '}
                        </strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item
                    variant={product.countInStock === 0 ? 'danger' : ''}
                  >
                    <Row>
                      <Col style={{ textAlign: 'center' }}>
                        <strong
                          style={{
                            color: product.countInStock > 0 ? 'green' : 'red',
                          }}
                        >
                          {`${
                            product.countInStock > 0
                              ? `${product.countInStock} items in stock`
                              : 'Out Of Stock'
                          }`}
                        </strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row className='d-flex align-items-center'>
                        {/* <Col>Qty:</Col> */}
                        <Col>
                          <div className='d-flex flex-column align-items-center'>
                            <StyledNumberInput
                              value={qty}
                              onChange={newValue => {
                                setQty(newValue); // Update local state
                              }}
                              min={1}
                              max={product.countInStock}
                            />

                            <div style={{ marginTop: '5px' }}>
                              <BtnCount
                                initialValue={qty}
                                maxValue={product.countInStock}
                                onCountChange={newCount => {
                                  setQty(newCount); // Update local state
                                }}
                                step={1}
                                increaseIcon={<FaPlus />}
                                decreaseIcon={<FaMinus />}
                              />
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item className='no-pd-mr'>
                    <Button
                      className='btn-block btn-full-w'
                      type='button'
                      disabled={product.countInStock === 0}
                      onClick={addToCartHandler}
                    >
                      Add To Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>

          <Row className='review'>
            <Col md={5}>
              <Accordion defaultActiveKey='0' flush>
                <Accordion.Item eventKey='0'>
                  <Accordion.Header style={{ padding: '0' }}>
                    Reviews
                  </Accordion.Header>
                  <Accordion.Body>
                    {product.reviews.length === 0 && (
                      <Message>No reviews</Message>
                    )}

                    {product.reviews.map(review => (
                      <ListGroup.Item key={product._id}>
                        <strong>{review.name}</strong>
                        <Rating value={review.rating} />
                        <p>{review.createdAt.substring(0, 10)}</p>
                        <p>{review.comment}</p>
                      </ListGroup.Item>
                    ))}
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey='1'>
                  <Accordion.Header style={{ padding: '0' }}>
                    Write a review
                  </Accordion.Header>
                  <Accordion.Body>
                    {loadingReview && <Loader />}

                    {userInfo ? (
                      <Form onSubmit={submitHandler}>
                        <Form.Group controlId='rating' className='my-2'>
                          <Form.Label>Rating</Form.Label>
                          <Form.Control
                            as='select'
                            value={rating}
                            onChange={e => setRating(Number(e.target.value))}
                          >
                            <option value=''>Select...</option>
                            <option value='1'>1 - Poor</option>
                            <option value='2'>2 - Fair</option>
                            <option value='3'>3 - Good</option>
                            <option value='4'>4 - Very Good</option>
                            <option value='5'>5 - Excellent</option>
                          </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='comment' className='my-2'>
                          <Form.Label>Review Message</Form.Label>
                          <Form.Control
                            as='textarea'
                            rows={3}
                            value={comment}
                            placeholder='Write a review'
                            onChange={e => setComment(e.target.value)}
                          ></Form.Control>
                        </Form.Group>

                        <Button
                          disabled={loadingReview}
                          type='submit'
                          variant='primary'
                        >
                          Submit
                        </Button>
                      </Form>
                    ) : (
                      <Message>
                        Please <Link to='/login'>sign in</Link> to write a
                        review
                      </Message>
                    )}
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductDetails;
