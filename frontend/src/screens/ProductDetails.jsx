import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Form,
  Row,
  Col,
  ListGroup,
  Card,
  Button,
  Tab,
  Tabs,
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
  FormContainer,
  Meta,
  DeleteModal,
} from '../components';
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
  useDeleteProductMutation,
} from '../slices/productsApiSlice';
import { addToCart } from '../slices/cartSlice';
import { FaPlus, FaMinus, FaEdit, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { addDecimals } from '../utils/cartUtils';

const ProductDetails = () => {
  const { id: productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [activeTab, setActiveTab] = useState('description');

  const [showModal, setShowModal] = useState(false);

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const [createReview, { isLoading: loadingReview }] =
    useCreateReviewMutation();

  const [deleteProduct, { isLoading: loadingDelete }] =
    useDeleteProductMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate('/cart');
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (rating >= 1 && rating <= 5) {
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
        setActiveTab('reviews');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    } else {
      toast.error('Please select a rating between 1 and 5.');
    }
  };

  const calculateTaxPrice = (productPrice) => {
    return addDecimals(Number((0.23 * productPrice).toFixed(2)));
  };

  const ScrollToTop = () => {
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

    return null;
  };
  ScrollToTop();

  const tabs = document.getElementById('product-tabs');

  const openModal = () => {
    setShowModal(true);
  };

  useEffect(() => {
    if (tabs) {
      tabs.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const navigateToProductList = () => {
    navigate('/admin/productlist');
  };

  return (
    <>
      {product && (
        <DeleteModal
          product={product}
          showModal={showModal}
          setShowModal={setShowModal}
          onDelete={deleteProduct}
        />
      )}

      <div className='d-flex justify-content-between align-items-center'>
        <BtnGoBack className='btn btn-primary my-3' to='/' />

        {userInfo && userInfo.isAdmin && (
          <Col md={4} className='text-end'>
            <Link to={`/admin/product/${productId}/edit`}>
              <Button variant='light' className='btn-sm'>
                <FaEdit /> Edit Product
              </Button>
            </Link>
            {/* <Link to={`/admin/productlist`}> */}
            <Button
              variant='danger'
              className='btn-sm'
              onClick={() => openModal()}
            >
              <FaTrash />
            </Button>
            {/* </Link> */}
          </Col>
        )}
      </div>

      {loadingDelete && <Loader />}

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Meta title={product.name} description={product.description} />
          <Row style={{ marginBottom: '30px' }}>
            <Col md={5}>
              {/* <Image src={product.image} alt={product.name} fluid /> */}

              <ProductImageGallery
                images={product.images}
                showPlayButton={false}
                infinite={true}
              />
            </Col>
            <Col md={4}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      setActiveTab('reviews');

                      const tab = document.getElementById('product-tabs');

                      if (tab) {
                        tab.scrollIntoView({
                          behavior: 'smooth',
                          block: 'start',
                        });
                      }
                    }}
                  >
                    <Rating
                      value={product.rating}
                      text={`${product.numReviews} reviews`}
                    />
                  </div>
                </ListGroup.Item>
                <ListGroup.Item>Price: $ {product.price}</ListGroup.Item>
                <ListGroup.Item>
                  Tax: $ {calculateTaxPrice(product.price)}
                </ListGroup.Item>
                {/* <ListGroup.Item>
                  {product.description.substring(0, 200)}...
                </ListGroup.Item> */}
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
                              onChange={(newValue) => {
                                setQty(newValue); // Update local state
                              }}
                              min={1}
                              max={product.countInStock}
                            />

                            <div style={{ marginTop: '5px' }}>
                              <BtnCount
                                initialValue={qty}
                                maxValue={product.countInStock}
                                onCountChange={(newCount) => {
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

          <Row>
            <div id='product-tabs'>
              <Tabs
                defaultActiveKey='description'
                activeKey={activeTab}
                onSelect={(k) => setActiveTab(k)}
                className='my-3'
                justify
              >
                <Tab
                  eventKey='description'
                  title='DESCRIPTION'
                  tabClassName='tab-text-center'
                >
                  <FormContainer>{product.description}</FormContainer>
                </Tab>
                <Tab
                  eventKey='reviews'
                  title='REVIEWS'
                  tabClassName='tab-text-center'
                >
                  <FormContainer>
                    {loadingReview && <Loader />}

                    {userInfo ? (
                      <Form onSubmit={submitHandler}>
                        <Form.Group controlId='rating'>
                          <Form.Label>Rating</Form.Label>
                          <Form.Control
                            as='select'
                            value={rating}
                            onChange={(e) => setRating(Number(e.target.value))}
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
                            onChange={(e) => setComment(e.target.value)}
                          ></Form.Control>
                        </Form.Group>

                        <Button
                          disabled={loadingReview}
                          type='submit'
                          variant='primary'
                          className='mb-4'
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
                  </FormContainer>
                  <FormContainer>
                    <ListGroup variant='flush'>
                      {product.reviews.length === 0 && (
                        <Message>No reviews</Message>
                      )}

                      {product.reviews.map((review) => (
                        <ListGroup.Item key={review._id}>
                          <Row>
                            <Col xs={12} sm={4}>
                              <strong>{review.name}</strong>
                              <Rating value={review.rating} />
                              <p>{review.createdAt.substring(0, 10)}</p>
                            </Col>
                            <Col
                              xs={12}
                              sm={8}
                              className='d-flex align-items-center'
                            >
                              <p>{review.comment}</p>
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </FormContainer>
                </Tab>

                <Tab
                  eventKey='details'
                  title='DETAILS'
                  tabClassName='tab-text-center'
                >
                  <p>{product.details}</p>
                  {/* <FormContainer>
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
                  </FormContainer> */}
                </Tab>
              </Tabs>
            </div>
          </Row>

          {/* <Row className='review'>
            <Col md={5}>
              <Accordion defaultActiveKey='0' flush>
                <Accordion.Item eventKey='0'>
                  <Accordion.Header style={{ padding: '0' }}>
                    Reviews
                  </Accordion.Header>
                  <Accordion.Body></Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey='1'>
                  <Accordion.Header style={{ padding: '0' }}>
                    Write a review
                  </Accordion.Header>
                  <Accordion.Body></Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Col>
          </Row> */}
        </>
      )}
    </>
  );
};

export default ProductDetails;
