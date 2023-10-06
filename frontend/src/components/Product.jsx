import { useState, useEffect } from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
// eslint-disable-next-line no-unused-vars
import { Link, useParams } from 'react-router-dom';
import { useDeleteProductMutation } from '../slices/productsApiSlice';
import { addToCart } from '../slices/cartSlice';
import { Rating, Loader, BtnAddToCart, BtnGoBack } from './';
import { AddToCartModal, DeleteModal } from './modals';
import { FaEdit, FaTrash, FaPlus, FaMinus, FaTimes } from 'react-icons/fa';
import { MdOutlineAddShoppingCart } from 'react-icons/md';
import { StyledNumberInput, BtnCount } from './';
import { toast } from 'react-toastify';

const Product = ({ product, value, text }) => {
  // const { id: productId } = useParams();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddToCartModal, setShowAddToCartModal] = useState(false);
  const [showDeleteCard, setShowDeleteCard] = useState(false);
  const [showAddToCart, setShowAddToCart] = useState(false);
  const [showAdditionalContent, setShowAdditionalContent] = useState(false);

  const { userInfo } = useSelector((state) => state.auth);

  const [deleteProduct, { isLoading: loadingDelete }] =
    useDeleteProductMutation();

  const handleImageLoad = () => {
    setLoading(false);
  };

  const toggleAdditionalContent = () => {
    setShowAdditionalContent(!showAdditionalContent);
  };

  const toggleDeleteCard = () => {
    setShowDeleteCard(!showDeleteCard);
  };

  const toggleAddToCard = () => {
    setShowAddToCart(!showAddToCart);
  };

  const openDeleteModal = () => {
    setShowDeleteModal(true);
  };

  const openAddToCartModal = () => {
    setShowAddToCartModal(true);
  };

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    setShowAddToCart(false);
    toast.success(qty === 1 ? 'Item added to cart' : "Item's added to cart");
  };

  const deleteHandler = async () => {
    try {
      if (product && product._id) {
        await deleteProduct(product._id);
        toast.success('Product deleted');
        // navigate('/admin/productlist');
      } else {
        toast.error('Invalid product data.');
      }
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape') {
        setShowAddToCart(false); // Close the additional content
      }
    };

    // Attach the event listener when the component mounts
    window.addEventListener('keydown', handleEscKey);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('keydown', handleEscKey);
    };
  }, []); // The empty dependency array means this effect runs once when the component mounts

  return (
    <Card className='my-3 card-shadow'>
      {userInfo && userInfo.isAdmin && (
        <Col className='text-end'>
          <Link to={`/admin/product/${product._id}/edit`}>
            <Button variant='light' className='btn-sm'>
              <FaEdit />
            </Button>
          </Link>
          <Button
            variant='light'
            className='btn-sm'
            // onClick={() => openDeleteModal()}
            onClick={() => toggleDeleteCard()}
          >
            <FaTrash style={{ color: 'red' }} />
          </Button>
        </Col>
      )}

      {showDeleteCard && userInfo && userInfo.isAdmin && (
        <div
          className={`additional-content ${
            showAdditionalContent ? 'show-additional-content' : ''
          }`}
        >
          <FaTimes
            className='fatimes-position'
            onClick={() => setShowDeleteCard(false)}
          />
          <h5>Delete?</h5>
          <p className='text-center px-4'>Item will be deleted from database</p>
          <Button
            variant='danger'
            className='my-4'
            onClick={() => deleteHandler()}
          >
            Yes
          </Button>
          <Button onClick={() => setShowDeleteCard(false)}>No</Button>
        </div>
      )}

      {showAddToCart && (
        <div
          className={`additional-content ${
            showAdditionalContent ? 'show-additional-content' : ''
          }`}
        >
          <MdOutlineAddShoppingCart size={40} />
          <h5 className='text-center px-5 my-4'>Add item to cart</h5>
          <FaTimes
            className='fatimes-position'
            onClick={() => setShowAddToCart(false)}
          />
          <Row className='d-flex justify-content-center mb-3'>
            <StyledNumberInput
              value={qty}
              onChange={(newValue) => {
                setQty(newValue); // Update local state
              }}
              min={1}
              max={product.countInStock}
            />
          </Row>
          <BtnCount
            variant='dark'
            initialValue={qty}
            maxValue={product.countInStock}
            onCountChange={(newCount) => {
              setQty(newCount); // Update local state
            }}
            step={1}
            increaseIcon={<FaPlus />}
            decreaseIcon={<FaMinus />}
          />
          <Button className='my-3' variant='dark' onClick={addToCartHandler}>
            Add
          </Button>
          {/* <Button onClick={() => setShowAddToCart(false)}>Close</Button> */}
        </div>
      )}

      {/* {product && (
        <AddToCartModal
          product={product}
          showModal={showAddToCartModal}
          setShowModal={setShowAddToCartModal}
        />
      )}

      {product && (
        <DeleteModal
          product={product}
          showModal={showDeleteModal}
          setShowModal={setShowDeleteModal}
          onDelete={deleteProduct}
        />
      )} */}

      <Link to={`/product/${product._id}`}>
        <div>
          {loading && (
            <div
              style={{
                // position: 'relative',
                // top: '50%',
                // left: '50%',
                // transform: 'translate(-50%, -50%)',
                padding: '70px',
              }}
            >
              <Loader />
            </div>
          )}
          <Card.Img
            src={product.images[0].original}
            variant='top'
            onLoad={handleImageLoad}
            style={{
              display: loading ? 'none' : 'flex',
              marginTop: '0px',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </div>
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as='div' className='product-title'>
            <strong>
              <h6>{product.name}</h6>
            </strong>
          </Card.Title>
        </Link>
        <Card.Text as='div'>
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>
        <Row className='d-flex align-items-center'>
          <Col lg={6} md={7} sm={7} xs={6}>
            <Card.Text as='h5' style={{ marginTop: '10px' }}>
              <div
                style={{
                  whiteSpace: 'nowrap',
                  backgroundColor: '#ffffff',
                  zIndex: '1',
                  display: 'inline-block',
                  position: 'relative',
                  pointerEvents: 'none',
                  borderRadius: '5px',
                  marginBottom: '5px',
                }}
              >
                <strong>${product.price}</strong>
              </div>
            </Card.Text>
          </Col>
          <Col>
            <div className='text-end' style={{ transform: 'translateX(2px)' }}>
              {/* <BtnAddToCart
                product={product}
                onAddToCart={() => toggleAddToCard()}
              /> */}
              <Button
                type='button'
                className='btn-sm'
                onClick={() => toggleAddToCard()}
                disabled={product.countInStock === 0}
              >
                <MdOutlineAddShoppingCart size={20} />
              </Button>
            </div>
          </Col>
        </Row>
      </Card.Body>
      {/* Render the MyModal component with product information */}
      {/* {showModal && (
        <MyModal product={product} handleClose={() => setShowModal(false)} />
      )} */}
    </Card>
  );
};

export default Product;
