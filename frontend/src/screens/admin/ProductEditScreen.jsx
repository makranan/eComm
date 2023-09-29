import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button, FormGroup, Row, Col, Image } from 'react-bootstrap';
import { Message, Loader, FormContainer, BtnGoBack } from '../../components';
import { toast } from 'react-toastify';
import {
  useUpdateProductMutation,
  useGetProductDetailsQuery,
  useUploadProductImageMutation,
  useUploadProductImagesMutation,
} from '../../slices/productsApiSlice';

const ProductEditScreen = () => {
  const { id: productId } = useParams();
  const { userInfo: user } = useSelector(state => state.auth);

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [images, setImages] = useState();
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  console.log(product);

  const [updateProduct, { isLoading: loadingUpdate, error: err }] =
    useUpdateProductMutation();

  const [uploadProductImage, { isLoading: loadingUpload }] =
    useUploadProductImageMutation(productId);

  const [uploadProductImages, { isLoading: loadingUploadImages }] =
    useUploadProductImagesMutation(productId);

  const navigate = useNavigate();

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setImages(product.images);
      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
    }
  }, [product]);

  const submitImagesHandler = async e => {
    e.preventDefault();
    const updatedProduct = {
      productId,
      name,
      price,
      image,
      images,
      brand,
      category,
      countInStock,
      description,
    };

    const result = await updateProduct(updatedProduct);

    if (error) {
      toast.error(err?.data?.message || err.error);
    } else {
      toast.success('Product Updated');
      // navigate('/admin/productlist');
    }
  };

  const submitHandler = async e => {
    e.preventDefault();
    // const updatedProduct = {
    //   productId,
    //   name,
    //   price,
    //   image,
    //   images,
    //   brand,
    //   category,
    //   countInStock,
    //   description,
    //   user,
    // };
    try {
      await updateProduct({
        productId,
        name,
        price,
        image,
        images,
        brand,
        category,
        description,
        countInStock,
        user,
      }).unwrap(); // NOTE: here we need to unwrap the Promise to catch any rejection in our catch block
      toast.success('Product updated');
      refetch();
      navigate('/admin/productlist');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const uploadImageHandler = async e => {
    const formData = new FormData();
    formData.append('image', e.target.files[0]);

    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const uploadImagesHandler = async e => {
    const files = e.target.files;
    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append('images', files[i]);
    }

    formData.append('productId', productId);
    formData.append('user', user);
    formData.append('name', name);
    formData.append('price', price);
    formData.append('image', image);
    formData.append('images', images);
    formData.append('brand', brand);
    formData.append('category', category);
    formData.append('countInStock', countInStock);
    formData.append('description', description);

    try {
      const res = await uploadProductImages(formData).unwrap();
      // toast.success(res.message);

      // const imagePaths = res.images;

      // const imagesArray = imagePaths.map(path => ({
      //   original: path,
      //   thumbnail: path,
      // }));

      // setImages(imagesArray);

      setImages(res.images.map(path => ({ original: path, thumbnail: path })));

      // Clear the file input to allow uploading the same images again
      e.target.value = '';
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const priceChangeHandler = e => {
    // Extract the entered value as a number
    const enteredValue = parseFloat(e.target.value);

    // Check if the entered value is a valid non-negative number
    if (!isNaN(enteredValue) && enteredValue >= 0) {
      // If valid, update the state
      setPrice(enteredValue.toString());
    } else if (e.target.value === '') {
      // If the input is empty, set the value to 0
      setPrice('0');
    }
    // If not valid, you can choose to do nothing or show an error message
  };

  return (
    <>
      <FormContainer>
        {/* <Link
          to={'/admin/productlist'}
          className='btn btn-light my-3'
          style={{ transform: 'translateX(-20px)' }}
        >
          Go Back
        </Link> */}

        <BtnGoBack />

        <h1>Edit Product</h1>

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
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Product Name'
                value={name}
                onChange={e => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            {/* <Row>
              <Col xs={9}>
                <Form.Group controlId='imageUpload'>
                  <Form.Label>Pick Thumbnail</Form.Label>
                  <Form.Control
                    type='file'
                    label='Choose file'
                    name='image'
                    onChange={uploadImageHandler}
                  ></Form.Control>
                </Form.Group>
              </Col>

              <Col xs={3}>
                {image && (
                  <Image
                    src={image}
                    alt='Thumbnail'
                    style={{
                      height: '80px',
                    }}
                    fluid
                  />
                )}
              </Col>
            </Row> */}

            <Row className='my-4'>
              {images &&
                images.map((image, index) => (
                  <Col key={index} xs={2}>
                    <Image
                      src={image.original}
                      alt={`Image ${index + 1}`}
                      style={{
                        height: '80px',
                      }}
                      fluid
                    />
                  </Col>
                ))}
            </Row>

            <Row>
              <Col xs={9}>
                <Form.Group controlId='imagesUpload'>
                  <Form.Label>Pick Images</Form.Label>
                  <Form.Control
                    type='file'
                    label='Choose files'
                    name='images'
                    onChange={uploadImagesHandler}
                    multiple
                  ></Form.Control>
                </Form.Group>
              </Col>

              <Col xs={3}>
                <Form.Group controlId='updateImages'>
                  <Form.Label>-</Form.Label>
                  <Form.Group>
                    <Button
                      type='button'
                      className='btn btn-full-w'
                      variant='info'
                      onClick={submitImagesHandler}
                    >
                      Upload
                    </Button>
                  </Form.Group>
                </Form.Group>
              </Col>
            </Row>

            <Row className='my-2'>
              <Col xs={3}>
                <Form.Group controlId='price'>
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type='number'
                    placeholder='Price'
                    value={price}
                    onChange={priceChangeHandler}
                  ></Form.Control>
                </Form.Group>
              </Col>

              <Col xs={3}>
                <Form.Group controlId='countInStock'>
                  <Form.Label>Stock</Form.Label>
                  <Form.Control
                    type='number'
                    placeholder='Stock'
                    value={countInStock}
                    onChange={e => setCountInStock(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>

              <Col xs={3}>
                <Form.Group controlId='clearImages'>
                  <Form.Label>Clear Images</Form.Label>
                  <Form.Group>
                    <Button
                      type='button'
                      className='btn btn-full-w'
                      variant='danger'
                    >
                      Delete
                    </Button>
                  </Form.Group>
                </Form.Group>
              </Col>
              {/* <Col xs={6}>
                <Form.Group controlId='image'>
                  <Form.Label>Thumbnail</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='URL'
                    value={image}
                    onChange={e => setImage}
                  ></Form.Control>
                </Form.Group>
              </Col> */}
            </Row>

            <Row className='my-2'>
              <Col>
                <Form.Group controlId='category'>
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Product Category'
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>

              <Col>
                <Form.Group controlId='brand'>
                  <Form.Label>Brand</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Product Brand'
                    value={brand}
                    onChange={e => setBrand(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as='textarea'
                placeholder='Description'
                value={description}
                style={{ height: '200px' }}
                onChange={e => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

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

export default ProductEditScreen;
