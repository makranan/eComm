import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Modal, Col, Row, Image } from 'react-bootstrap';
import { addToCart, removeFromCart } from '../../slices/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { StyledNumberInput, BtnCount } from '../';
import { FaPlus, FaMinus } from 'react-icons/fa';

const AddToCartModal = ({ product, showModal, setShowModal }) => {
  const dispatch = useDispatch();
  // const [show, setShow] = useState(false);

  const handleClose = () => setShowModal(false);
  // const handleShow = () => setShow(true);

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const getQuantityForProduct = (product) => {
    const cartItem = cartItems.find((item) => item._id === product._id);
    return cartItem ? cartItem.qty : 1; // Default to 1 if not found in cartItems
  };

  const addToCartHandler = async (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = async (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <>
      <Modal show={showModal} onHide={handleClose} animation={true} centered>
        <Modal.Header closeButton>
          <Modal.Title>Item was added to your cart.</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={4} xs={2}>
              <Image src={product.images[0].original} fluid />
            </Col>
            <Col>
              <Link to={`/product/${product._id}`}>
                <h5 className='mb-3'>{product.name}</h5>
              </Link>
              <Row>
                {cartItems.map((item, index) => (
                  <div
                    key={item._id}
                    className='d-flex align-items-center mt-2'
                  >
                    {item._id === product._id && (
                      <>
                        <StyledNumberInput
                          value={item.qty}
                          onChange={(newValue) => {
                            addToCartHandler(item, newValue);
                          }}
                          min={1}
                          max={item.countInStock}
                        />

                        <BtnCount
                          initialValue={item.qty}
                          maxValue={item.countInStock}
                          onCountChange={(newCount) =>
                            addToCartHandler(item, newCount)
                          }
                          step={1}
                          increaseIcon={<FaPlus />}
                          decreaseIcon={<FaMinus />}
                        />
                      </>
                    )}
                  </div>
                ))}
              </Row>
              <Row className='my-4'>
                <Col className=''>
                  {/* {cartItems
                    .reduce((acc, item) => acc + item.qty * item.price, 0)
                    .toFixed(2)} */}
                  <h3>
                    $
                    {(product.price * getQuantityForProduct(product)).toFixed(
                      2
                    )}
                  </h3>
                </Col>
              </Row>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Link to='/cart'>
            <Button variant='primary' onClick={handleClose}>
              Go To Cart
            </Button>
          </Link>
          <Button variant='light' className='btn' onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddToCartModal;
