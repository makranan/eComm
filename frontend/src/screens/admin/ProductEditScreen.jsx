import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Button, Row, Col, Image, Badge } from 'react-bootstrap';
import { Message, Loader, FormContainer, BtnGoBack } from '../../components';
import { toast } from 'react-toastify';
import { FaTrash } from 'react-icons/fa';
import {
  useUpdateProductMutation,
  useGetProductDetailsQuery,
  useUploadProductImageMutation,
  useUploadProductImagesMutation,
} from '../../slices/productsApiSlice';

const ProductEditScreen = () => {
  const { id: productId } = useParams();
  const { userInfo: user } = useSelector((state) => state.auth);

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [images, setImages] = useState([]);
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');
  const [details, setDetails] = useState('');

  const [categoryInput, setCategoryInput] = useState('');
  const [categoryArray, setCategoryArray] = useState([]);

  const handleCategoryInputChange = (e) => {
    setCategoryInput(e.target.value);
  };

  const styles = {
    backgroundColor: '#fff',
    border: '1px solid #eaeaea',
    padding: '10px',
    borderRadius: '5px',
    marginBottom: '10px',
  };

  const handleCategoryInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const categories = categoryInput.split(',').map((cat) => cat.trim());
      setCategoryArray([...categoryArray, ...categories]);
      setCategoryInput('');
    }
  };

  const addCategoryToTags = () => {
    if (categoryInput.trim() !== '') {
      setCategoryArray([...categoryArray, categoryInput.trim()]);
      setCategoryInput('');
    }
  };

  const removeCategoryFromTags = (indexToRemove) => {
    const updatedCategoryArray = categoryArray.filter(
      (_, index) => index !== indexToRemove
    );
    setCategoryArray(updatedCategoryArray);
  };

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  // Check if product data is available and contains a category array
  if (!isLoading && !error && product) {
    const categoryArray = product.category; // Assuming 'category' is an array in your product data

    // Now you can use the 'categoryArray' in your component
    // console.log('Category Array:', categoryArray);
  }

  useEffect(() => {
    if (product && product.category) {
      setCategoryArray(product.category);
    }
  }, [product]);

  // console.log(product);

  // Function to delete a single image by its index
  const deleteImageHandler = (indexToDelete) => {
    const updatedImages = images.filter((_, index) => index !== indexToDelete);
    setImages(updatedImages);
  };

  const [updateProduct, { isLoading: loadingUpdate, error: err }] =
    useUpdateProductMutation();
  // eslint-disable-next-line no-unused-vars
  const [uploadProductImage, { isLoading: loadingUpload }] =
    useUploadProductImageMutation(productId);
  // eslint-disable-next-line no-unused-vars
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
      setDetails(product.details);
    }
  }, [product]);

  const submitImagesHandler = async (e) => {
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
    // };

    // const result = await updateProduct(updatedProduct);

    if (error) {
      toast.error(err?.data?.message || err.error);
    } else {
      toast.success('Product Updated');
      // navigate('/admin/productlist');
    }
  };

  const submitHandler = async (e) => {
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
        category: categoryArray,
        description,
        details,
        countInStock,
        user,
      }).unwrap(); // NOTE: here we need to unwrap the Promise to catch any rejection in our catch block
      toast.success('Product updated');
      refetch();
      navigate(`/product/${productId}`);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  // const uploadImageHandler = async (e) => {
  //   const formData = new FormData();
  //   formData.append('image', e.target.files[0]);

  //   try {
  //     const res = await uploadProductImage(formData).unwrap();
  //     toast.success(res.message);
  //     setImage(res.image);
  //   } catch (err) {
  //     toast.error(err?.data?.message || err.error);
  //   }
  // };

  const uploadImagesHandler = async (e) => {
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
    formData.append('details', details);

    try {
      const res = await uploadProductImages(formData).unwrap();
      // toast.success(res.message);

      // const imagePaths = res.images;

      // const imagesArray = imagePaths.map(path => ({
      //   original: path,
      //   thumbnail: path,
      // }));

      // setImages(imagesArray);

      setImages([...images, ...res.images.map((path) => ({ original: path }))]);
      refetch();

      // Clear the file input to allow uploading the same images again
      e.target.value = '';
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const priceChangeHandler = (e) => {
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

  const ScrollToTop = () => {
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

    return null;
  };
  ScrollToTop();

  return (
    <>
      <FormContainer md={10}>
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
            <Form.Group controlId='name' style={styles}>
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Product Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='category' style={styles}>
              <Form.Label className='mt-2'>Categories</Form.Label>
              <Col xs={12}>
                {categoryArray.map((category, index) => (
                  <Badge
                    key={index}
                    bg='light'
                    style={{
                      cursor: 'pointer',
                      marginRight: '4px',
                      marginBottom: '4px',
                    }}
                    onClick={() => removeCategoryFromTags(index)}
                  >
                    {category} <span style={{ color: 'red' }}>&times;</span>
                  </Badge>
                ))}
              </Col>
              <Form.Control
                type='text'
                placeholder='Input categories, separated by comma'
                value={categoryInput}
                onChange={handleCategoryInputChange}
                onKeyDown={handleCategoryInputKeyDown}
              />
            </Form.Group>

            <Row className='my-2'>
              <Col xs={12} sm={6} md={4} className='mb-2'>
                <Form.Group controlId='price' style={styles}>
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type='number'
                    placeholder='Price'
                    value={price}
                    onChange={priceChangeHandler}
                  ></Form.Control>
                </Form.Group>
              </Col>

              <Col xs={12} sm={6} md={4}>
                <Form.Group controlId='countInStock' style={styles}>
                  <Form.Label>Stock</Form.Label>
                  <Form.Control
                    type='number'
                    placeholder='Stock'
                    value={countInStock}
                    onChange={(e) => setCountInStock(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>

              {/* <Col xs={12} sm={6} md={3}>
                <Form.Group controlId='category'>
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Product Category'
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col> */}

              <Col xs={12} sm={12} md={4}>
                <Form.Group controlId='brand' style={styles}>
                  <Form.Label>Brand</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Product Brand'
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>

              {/* <Col xs={3}>
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
              </Col> */}
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
              <Form.Label>Pick Images</Form.Label>
              {images &&
                images.map((image, index) => (
                  <Col
                    key={index}
                    md={2}
                    xs={3}
                    className='d-flex flex-column align-items-center justify-content-center'
                  >
                    <div
                      style={{ position: 'relative', display: 'inline-block' }}
                    >
                      <Image
                        src={image.original}
                        alt={`Image ${index + 1}`}
                        style={{
                          height: '120px',
                          objectFit: 'contain',
                          cursor: 'pointer',
                        }}
                        onClick={() => deleteImageHandler(index)}
                        fluid
                      />
                      <span
                        style={{
                          position: 'absolute',
                          top: 0,
                          right: 0,
                          color: 'red',
                          cursor: 'pointer',
                        }}
                      >
                        {' '}
                        &times;{' '}
                      </span>
                    </div>

                    {/* <Button
                      className='btn-full-w'
                      variant='light'
                      onClick={() => deleteImageHandler(index)}
                    >
                      <FaTrash style={{ color: 'red' }} />
                    </Button> */}
                  </Col>
                ))}
            </Row>

            <Row className='mb-3'>
              <Col xs={7}>
                <Form.Group controlId='imagesUpload'>
                  <Form.Control
                    type='file'
                    label='Choose files'
                    name='images'
                    onChange={uploadImagesHandler}
                    multiple
                  ></Form.Control>
                </Form.Group>
              </Col>

              <Col xs={5}>
                <Form.Group controlId='updateImages'>
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

            {/* <Row className='my-2'>
              <Col>
                <Form.Group controlId='category'>
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Product Category'
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
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
                    onChange={(e) => setBrand(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>
            </Row> */}

            <Form.Group className='mb-3' controlId='description' style={styles}>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as='textarea'
                placeholder='Description'
                value={description}
                style={{ height: '200px' }}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='details' style={styles}>
              <Form.Label>Details</Form.Label>
              <Form.Control
                as='textarea'
                placeholder='Details'
                value={details}
                style={{ height: '200px' }}
                onChange={(e) => setDetails(e.target.value)}
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
