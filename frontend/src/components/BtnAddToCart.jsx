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
} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Rating, BtnGoBack, Loader, Message } from '../components';
import { useGetProductDetailsQuery } from '../slices/productsApiSlice';
import { addToCart } from '../slices/cartSlice';

const BtnAddToCart = () => {
  const { id: productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);

  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsQuery(productId);

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate('/cart');
  };

  return (
    <div>
      <ListGroup.Item>
        <Button
          className='btn-block'
          type='button'
          //   disabled={product.countInStock === 0}
          onClick={addToCartHandler}
        >
          Add To Cart
        </Button>
      </ListGroup.Item>
    </div>
  );
};

export default BtnAddToCart;
