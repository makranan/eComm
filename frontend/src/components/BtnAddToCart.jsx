import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ListGroup, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addToCart } from '../slices/cartSlice';
import { MdOutlineAddShoppingCart } from 'react-icons/md';

const BtnAddToCart = ({ product, onAddToCart }) => {
  const dispatch = useDispatch();
  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const [qty, setQty] = useState(1);

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    // navigate('/cart');
    onAddToCart();
  };

  return (
    <div>
      <ListGroup.Item>
        <Button
          className='btn btn-sm'
          type='button'
          variant='dark'
          disabled={product.countInStock === 0}
          onClick={addToCartHandler}
        >
          <MdOutlineAddShoppingCart size={20} />
        </Button>
      </ListGroup.Item>
    </div>
  );
};

export default BtnAddToCart;
