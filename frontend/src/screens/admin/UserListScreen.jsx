import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { FaTimes, FaTrash, FaEdit, FaCheck } from 'react-icons/fa';
import { Message, Loader } from '../../components';
import {
  useGetUsersQuery,
  useDeleteUserMutation,
  useGetUserDetailsQuery,
  useUpdateUserMutation,
} from '../../slices/usersApiSlice';
import { toast } from 'react-toastify';

const UserListScreen = () => {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery();

  const [deleteUser, { isLoading: loadingDelete }] = useDeleteUserMutation();

  const deleteHandler = async id => {
    if (window.confirm('Are you sure?')) {
      try {
        await deleteUser(id);
        refetch();
        toast.success('User deleted');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const userEditHandler = async id => {};

  return (
    <>
      <h1>Users</h1>
      {loadingDelete && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <Table striped hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id} style={{ verticalAlign: 'middle' }}>
                <td>{user._id}</td>
                <td>{user.user || user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {user.isAdmin ? (
                    <FaCheck style={{ color: 'green' }} />
                  ) : (
                    <FaTimes style={{ color: 'red' }} />
                  )}
                </td>

                <td
                  style={{
                    background: '#1e1e1e',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      gap: '4px',
                    }}
                  >
                    {/* <LinkContainer to={`admin/user/${user._id}/edit`}>
                    <Button className='btn btn-primary btn-sm' variant='dark'>
                      Details
                    </Button>
                  </LinkContainer> */}
                    <LinkContainer to={`/admin/user/${user._id}/edit`}>
                      <Button
                        variant='light'
                        className='btn btn-sm'
                        onClick={userEditHandler}
                      >
                        <FaEdit />
                      </Button>
                    </LinkContainer>{' '}
                    <Button
                      variant='danger'
                      className='btn btn-sm'
                      onClick={() => deleteHandler(user._id)}
                    >
                      <FaTrash />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default UserListScreen;
