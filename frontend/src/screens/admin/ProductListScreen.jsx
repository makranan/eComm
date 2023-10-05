import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col, FormCheck } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Message, Loader, Paginate } from '../../components';
import { DeleteModal, CreateProductModal } from '../../components/modals';
import { toast } from 'react-toastify';
import {
  useGetProductsQuery,
  useGetProductDetailsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
} from '../../slices/productsApiSlice';

const ProductListScreen = () => {
  const { pageNumber } = useParams();
  const { data, isLoading, error, refetch } = useGetProductsQuery({
    pageNumber,
  });

  // const { data: product, isLoading: productLoading } =
  //   useGetProductDetailsQuery(productId);

  const [showModal, setShowModal] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState(null);

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

  // const deleteHandler = async (id) => {
  //   if (window.confirm(`Your gonna delete ${id}. Are you sure?`)) {
  //     try {
  //       await deleteProduct(id);
  //       refetch();
  //       toast.success('Product deleted');
  //     } catch (err) {
  //       toast.error(err?.data?.message || err.error);
  //     }
  //   }
  // };

  const openModal = (productId) => {
    setProductIdToDelete(productId);
    setShowModal(true);
  };

  const deleteHandler = async (productId) => {
    try {
      await deleteProduct(productIdToDelete);
      refetch();
      toast.success('Product deleted');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
    setShowModal(false);
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
              {data.products.map((product) => (
                <tr key={product._id} style={{ verticalAlign: 'middle' }}>
                  <td>
                    <FormCheck type='switch' id='custom-switch'></FormCheck>
                  </td>
                  <td>{product._id}</td>
                  <td>
                    <Link
                      to={`/product/${product._id}`}
                      style={{ textDecoration: 'none', color: 'blue' }}
                    >
                      {product.name}
                    </Link>
                  </td>
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
                        justifyContent: 'center',
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
                        // onClick={() => deleteHandler(product._id)}
                        onClick={() => openModal(product._id)}
                      >
                        <FaTrash />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={data.pages} page={data.page} isAdmin={true} />
        </>
      )}
      {showModal && (
        <DeleteModal
          product={productIdToDelete}
          showModal={showModal}
          setShowModal={setShowModal}
          onDelete={deleteHandler}
        />
      )}
    </>
  );
};

export default ProductListScreen;
