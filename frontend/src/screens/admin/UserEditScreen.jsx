import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { Message, Loader, FormContainer } from '../../components';
import { toast } from 'react-toastify';
import {
  useGetUserDetailsQuery,
  useUpdateUserMutation,
} from '../../slices/usersApiSlice';

const UserEditScreen = () => {
  const { id: userId } = useParams();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const {
    data: user,
    isLoading,
    refetch,
    error,
  } = useGetUserDetailsQuery(userId);

  const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation();

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await updateUser({ userId, name, email, isAdmin });
      toast.success('User Updated');
      refetch();
      navigate('/admin/userlist');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [user]);

  return (
    <>
      <FormContainer>
        <Link
          to={'/admin/userlist'}
          className='btn btn-light my-3'
          style={{ transform: 'translateX(-20px)' }}
        >
          Go Back
        </Link>

        <h1>Edit User</h1>

        {loadingUpdate && <Loader />}

        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>
            {' '}
            {error?.data?.message || error.error}
          </Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>User Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Product Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Row className='my-2'>
              <Col>
                <Form.Group controlId='email'>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>
            </Row>

            <Row className='my-2'>
              <Col>
                <Form.Group controlId='isAdmin'>
                  <Form.Label>Admin</Form.Label>
                  <Form.Check
                    type='checkbox'
                    label={isAdmin ? 'True' : 'False'}
                    checked={isAdmin}
                    onChange={(e) => setIsAdmin(e.target.checked)}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Button
              type='submit'
              variant='primary'
              className='btn btn-block mt-4'
            >
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default UserEditScreen;
