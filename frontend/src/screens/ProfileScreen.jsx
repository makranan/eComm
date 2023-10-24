import { useState, useEffect } from 'react';
import { Table, Form, Button, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Message, Loader, FormContainer } from '../components';
import { useProfileMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { useGetMyOrdersQuery } from '../slices/orderApiSlice';
import { FaTimes, FaCheck } from 'react-icons/fa';

const ProfileScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  const { data: orders, isLoading, error } = useGetMyOrdersQuery();

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [userInfo, userInfo.name, userInfo.email]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo.id,
          name,
          email,
          password,
        }).unwrap();

        dispatch(setCredentials(res));

        toast.success('Profile updated successfully');

        setIsEditing(false);
      } catch (err) {
        toast.error(err?.data?.message || err?.error || err);
      }
    }
  };

  const cancelHandler = () => {
    setIsEditing(false);
  };

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>

        {/* Edit button to enable editing */}
        {!isEditing ? (
          <Button
            variant='primary'
            className='my-2'
            onClick={() => setIsEditing(true)}
          >
            Edit Profile
          </Button>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name' className='my-2'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='email' className='my-2'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='password' className='my-2'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Enter Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='confirmPassword' className='my-2'>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Confirm Password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Row>
              <Button type='submit' variant='primary' className='my-2'>
                Update
              </Button>
            </Row>

            <Row>
              <Button
                type='button'
                variant='primary'
                className='my-2'
                onClick={cancelHandler}
              >
                Cancel
              </Button>
            </Row>

            {loadingUpdateProfile && <Loader />}
          </Form>
        )}
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>

        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>
            {error?.data?.message || error.error}
          </Message>
        ) : (
          <Table responsive striped hover className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} style={{ verticalAlign: 'middle' }}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>${order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      <>
                        <FaCheck style={{ color: 'green' }} /> <br />
                        {/* {order.paidAt.substring(0, 10)} */}
                      </>
                    ) : (
                      <FaTimes style={{ color: 'red', fontSize: '12px' }} />
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      <>
                        <FaCheck style={{ color: 'green' }} />,
                        {/* {order.deliveredAt.substring(0, 10)} */}
                      </>
                    ) : (
                      <FaTimes style={{ color: 'red', fontSize: '12px' }} />
                    )}
                  </td>
                  <td
                    style={{
                      background: '#1e1e1e',
                    }}
                  >
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button className='btn btn-primary btn-sm' variant='dark'>
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

export default ProfileScreen;
