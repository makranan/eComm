import { useState, useEffect, useRef } from 'react';
import { Card, Row, Col, Button, Spinner } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
// eslint-disable-next-line no-unused-vars
import { Link, useParams } from 'react-router-dom';
import { useDeleteProductMutation } from '../slices/productsApiSlice';
import { addToCart } from '../slices/cartSlice';

// eslint-disable-next-line no-unused-vars
import { Rating, Loader, BtnAddToCart, BtnGoBack } from './';
// import { AddToCartModal, DeleteModal } from './modals';
import {
  FaEdit,
  FaTrash,
  FaPlus,
  FaMinus,
  FaTimes,
  FaCheckSquare,
} from 'react-icons/fa';
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
  const [showSuccessCard, setShowSuccessCard] = useState(false);
  const [showAdditionalContent, setShowAdditionalContent] = useState(false);

  const yesButtonRef = useRef(null);

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

  const toggleSuccessCard = () => {
    setShowSuccessCard(!showSuccessCard);
    setTimeout(() => {
      const successCard = document.getElementsByClassName('success-content')[0];
      successCard.classList.add('hide'); // Add the 'hide' class
      setTimeout(() => {
        // successCard.classList.remove('hide'); // Remove the 'hide' class after a short delay
        setShowSuccessCard(false); // Close the card
      }, 150); // Adjust the delay as needed
    }, 3000);
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
    toggleSuccessCard();
    // toast.success(qty === 1 ? 'Item added to cart' : "Item's added to cart");
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
        setShowDeleteCard(false); // Close the delete card
      }
    };

    // Attach the event listener when the component mounts
    window.addEventListener('keydown', handleEscKey);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('keydown', handleEscKey);
    };
  }, []); // The empty dependency array means this effect runs once when the component mounts

  useEffect(() => {
    const handleEnterKey = (event) => {
      if (event.key === 'Enter' && showDeleteCard) {
        yesButtonRef.current.click(); // Trigger a click on the "Yes" button
      }
    };

    // Attach the event listener when the component mounts
    document.addEventListener('keydown', handleEnterKey);

    // Remove the event listener when the component unmounts
    return () => {
      document.removeEventListener('keydown', handleEnterKey);
    };
  }, [showDeleteCard]); // The empty dependency array means this effect runs once when the component mounts

  return (
    <>
      <Card className='my-3 card-shadow'>
        {loadingDelete && <Spinner style={{ zIndex: '9999' }} />}
        {userInfo && userInfo.isAdmin && (
          <Col
            className='text-end'
            style={
              showDeleteCard || showAddToCart || showSuccessCard
                ? { opacity: '0' }
                : { opacity: '1' }
            }
          >
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
            className={`delete-content ${
              showAdditionalContent ? 'show-additional-content' : ''
            }`}
          >
            <FaTimes
              style={{ color: '#ffffff', cursor: 'pointer' }}
              className='fatimes-position'
              onClick={() => setShowDeleteCard(false)}
            />
            <h5
              style={{
                // backgroundColor: 'white',
                color: '#ffffff',
                padding: '10px',
                borderRadius: '5px',
              }}
            >
              Delete?
            </h5>
            <h6
              className='text-center px-4'
              style={{
                backgroundColor: 'black',
                color: 'red',
                padding: '10px 0 10px 0',
                // borderRadius: '5px',
              }}
            >
              Item will be deleted from database
            </h6>
            <Button
              variant='danger'
              style={{ color: 'white' }}
              className='my-4'
              onClick={() => deleteHandler()}
              ref={yesButtonRef}
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
            <FaTimes
              style={{ backgroundColor: 'transparent', color: '#ffffff' }}
              className='fatimes-position'
              onClick={() => setShowAddToCart(false)}
            />

            <MdOutlineAddShoppingCart size={40} color='white' />

            <h5 className='text-center px-5 my-4' style={{ color: 'white' }}>
              {qty === 1 ? 'Add item to cart' : "Add item's to cart"}
            </h5>

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

            {/* <BtnCount
              variant='dark'
              initialValue={qty}
              maxValue={product.countInStock}
              onCountChange={(newCount) => {
                setQty(newCount); // Update local state
              }}
              step={1}
              increaseIcon={<FaPlus />}
              decreaseIcon={<FaMinus />}
            /> */}
            <Button
              className='my-3'
              bg='info'
              variant='info'
              onClick={addToCartHandler}
            >
              Add
            </Button>
          </div>
        )}

        {showSuccessCard && (
          <div
            className={`success-content ${
              showAdditionalContent ? 'show-additional-content' : ''
            }`}
          >
            <FaTimes
              style={{ color: '#ffffff', cursor: 'pointer' }}
              className='fatimes-position'
              onClick={() => setShowSuccessCard(false)}
            />
            <FaCheckSquare size={52} color='lightgreen' />
            {/* {successImageLoaded && (
            <img src={successSvg} alt='Success' className='svg-success' />
          )} */}

            <h5 className='text-center px-5 my-4' style={{ color: '#ffffff' }}>
              {qty === 1
                ? 'Item added successfully'
                : "Item's added successfully"}
            </h5>

            <Link to='/cart'>
              <Button type='button' variant='info' bg='info'>
                Go to Cart
              </Button>
            </Link>
          </div>
        )}

        {/* Modal */}

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
              src={product.images[0]?.original || 'N/A'}
              variant='top'
              onLoad={handleImageLoad}
              style={{
                display: loading ? 'none' : 'flex',
                marginTop: '20px',
                height: '100%',
                objectFit: 'cover',
                padding: '10px',
              }}
            />
          </div>
        </Link>
        <Card.Body>
          <Link to={`/product/${product._id}`}>
            <Card.Title as='div' className='product-title mb-2'>
              <h6 style={{ lineHeight: '2' }}>{product.name}</h6>
            </Card.Title>
          </Link>
          <Card.Text as='div' className='reviews-position'>
            <Rating
              value={product.rating}
              style={{
                display: userInfo && userInfo.isAdmin ? 'none' : 'block',
                margin: '10px 0 10px 10px',
                userSelect: 'none',
                backgroundColor: '#ffffff',
                borderRadius: '10px',
              }}
            />
          </Card.Text>
          <Row className='d-flex align-items-center'>
            <Col lg={6} md={7} sm={7} xs={6}>
              <Card.Text as='h4' style={{ marginTop: '10px' }}>
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
                  <strong
                    style={{
                      fontWeight: '600',
                      textAlign: 'center',
                      verticalAlign: 'center',
                    }}
                  >
                    ${product.price}
                  </strong>
                </div>
              </Card.Text>
            </Col>
            <Col>
              <div
                className='text-end'
                style={{ transform: 'translateX(2px)' }}
              >
                {/* <BtnAddToCart
                product={product}
                onAddToCart={() => toggleAddToCard()}
              /> */}
                <Button
                  type='button'
                  className='btn-sm'
                  style={
                    showAddToCart || showDeleteCard || showSuccessCard
                      ? { display: 'none' }
                      : { display: 'inline' }
                  }
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
    </>
  );
};

export default Product;
