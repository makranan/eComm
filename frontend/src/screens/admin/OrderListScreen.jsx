import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { FaTimes, FaCheck } from 'react-icons/fa';
import { Message, Loader } from '../../components';
import { useGetOrdersQuery } from '../../slices/orderApiSlice';
import { FaTruck } from 'react-icons/fa';

const OrderListScreen = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  const deliverHandler = async id => {};

  return (
    <>
      <h1>Orders</h1>
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
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id} style={{ verticalAlign: 'middle' }}>
                <td>{order._id}</td>
                <td>{order.user && order.user.name}</td>
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
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      gap: '4px',
                    }}
                  >
                    <Button
                      variant='info'
                      className='btn-sm'
                      onClick={() => deliverHandler()}
                    >
                      <FaTruck size={20} />
                    </Button>

                    <LinkContainer to={`/order/${order._id}`}>
                      <Button className='btn btn-primary btn-sm' variant='dark'>
                        Details
                      </Button>
                    </LinkContainer>
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

export default OrderListScreen;
