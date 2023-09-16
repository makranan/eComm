import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { FaTimes, FaCheck, FaEdit, FaTrash } from 'react-icons/fa';
import { Message, Loader } from '../../components';
import { toast } from 'react-toastify';
import {
  useGetProductsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
} from '../../slices/productsApiSlice';
import { useGetOrderDetailsQuery } from '../../slices/orderApiSlice';

const ProductListScreen = () => {
  const { data: products, isLoading, error, refetch } = useGetProductsQuery();

  const [createProduct, { isLoading: loadingCreate }] =
    useCreateProductMutation();

  const [deleteProduct, { isLoading: loadingDelete }] =
    useDeleteProductMutation();

  const createProductHandler = async () => {
    if (window.confirm('Are you sure you want to create a new product?')) {
      try {
        await createProduct();
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const deleteHandler = async id => {
    if (window.confirm(`Your gonna delete ${id}. Are you sure?`)) {
      try {
        await deleteProduct(id);
        refetch();
        toast.success('Product deleted');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1 className='mt-2'>Products</h1>
        </Col>
        <Col className='d-flex justify-content-end '>
          <Button
            className='d-flex align-items-center btn btn-sm'
            onClick={createProductHandler}
          >
            <FaEdit /> &nbsp;&nbsp;Create Product
          </Button>
        </Col>
      </Row>

      {loadingCreate && <Loader />}
      {loadingDelete && <Loader />}

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error.error}</Message>
      ) : (
        <>
          <Table striped hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product._id} style={{ verticalAlign: 'middle' }}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td
                    style={{
                      background: '#1e1e1e',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '4px',
                      }}
                    >
                      <LinkContainer to={`/admin/product/${product._id}/edit`}>
                        <Button variant='light' className='btn-sm'>
                          <FaEdit />
                        </Button>
                      </LinkContainer>

                      <Button
                        variant='danger'
                        className='btn-sm'
                        onClick={() => deleteHandler(product._id)}
                      >
                        <FaTrash />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  );
};

export default ProductListScreen;
