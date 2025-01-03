
import React, { useState, useEffect } from 'react'; 
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom'; 
import { Form, Button, Row, Col, Image } from 'react-bootstrap'; 
import { useDispatch, useSelector } from 'react-redux'; 
import Loader from '../Components/Loader'; 
import Message from '../Components/Message'; 
import FormContainer from '../Components/FormContainer'; 
import { listProductDetails, updateProduct } from '../actions/productActions'; 
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'; 
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

function ProductEditScreen() { 
    const { id: product_id } = useParams(); 
    const navigate = useNavigate(); 
 
    const [name, setName] = useState(''); 
    const [price, setPrice] = useState(''); 
    const [image, setImage] = useState(''); 
    const [brand, setBrand] = useState(''); 
    const [category, setCategory] = useState(''); 
    const [rating, setRating] = useState(''); 
    const [countInStock, setCountInStock] = useState(''); 
    const [description, setDescription] = useState(''); 
    const [uploading, setUploading] = useState(false);

    const dispatch = useDispatch(); 
 
    const productDetails = useSelector(state => state.productDetails); 
    const { error: productDetailsError, loading: productDetailsLoading, product } = productDetails; 
 
    const categoryList = useSelector(state => state.categoryList); 
    const { loading: categoriesLoading, error: categoriesError, categories } = categoryList; 
 
    const productUpdate = useSelector(state => state.productUpdate); 
    const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = productUpdate; 
 
    useEffect(() => { 
        // console.log(product.title)
        if (successUpdate) { 
            dispatch({ 
                type: PRODUCT_UPDATE_RESET, 
            }); 
            navigate('/admin/productlist'); 
        } else { 
            if (!product || !product.title || product.product_id !== product_id) { 
                dispatch(listProductDetails(product_id)); 
            } else { 
                setName(product.title); 
                setPrice(product.price); 
                // setBrand(product.brand); 
                setCategory(product.category); 
                setRating(product.rating); 
                setDescription(product.description); 
                setImage(product.image_url); 
                setCountInStock(product.stock_quantity); 
            } 
        } 
    }, [dispatch, product, product_id, navigate, successUpdate]); 
 
    const submitHandler = (e) => { 
        e.preventDefault(); 
        dispatch(updateProduct({ 
            product_id, 
            title: name, 
            price, 
            // image, 
            // brand, 
            ratings: rating,
            category, 
            stock_quantity: countInStock, 
            description, 
        })); 
        navigate('/admin/productlist'); 
    }; 

    // const submitHandler = (e) => {
    //     e.preventDefault();
    //     dispatch(updateProduct(product_id, { 
    //         product_id, 
    //         title: name, 
    //         price, 
    //         category, 
    //         stock_quantity: countInStock, 
    //         description, 
    //     }));
    //     navigate('/admin/productlist');
    // };
    

    // const uploadFileHandler = async (e) => {
    //     const file = e.target.files[0]
    //     const formData = new FormData()

    //     formData.append('image', file)
    //     formData.append('product_id', product_id)

    //     setUploading(true)

    //     try {
    //         const config = {
    //             headers: {
    //                 'Content-Type': 'multipart/form-data'
    //             }
    //         }

    //         const { data } = await axios.post('/api/products/upload/', formData, config)

    //         setImage(data)
    //         setUploading(false)

    //     } catch (error) {
    //         setUploading(false)
    //     }
    // }

    return ( 
        <div> 
            <Link to='/admin/productlist'> 
                Go Back 
            </Link> 
 
            <FormContainer> 
                <h1>Edit Product</h1> 
                {loadingUpdate && <Loader />}  
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>} 
 
                {productDetailsLoading || categoriesLoading ? ( 
                    <Loader /> 
                ) : productDetailsError || categoriesError ? ( 
                    <Message variant='danger'>{productDetailsError || categoriesError}</Message> 
                ) : ( 
                    <Form onSubmit={submitHandler}> 
                        <Form.Group controlId='name'> 
                            <Form.Label>Name</Form.Label> 
                            <Form.Control 
                                type='text' 
                                placeholder='Enter name' 
                                value={name} 
                                onChange={(e) => setName(e.target.value)} 
                            /> 
                        </Form.Group> 
 
                        <Form.Group controlId='price'> 
                            <Form.Label>Price</Form.Label> 
                            <Form.Control 
                                type='number' 
                                placeholder='Enter price' 
                                value={price} 
                                onChange={(e) => setPrice(e.target.value)} 
                            /> 
                        </Form.Group> 
 
                        {/* <Form.Group controlId='formFile'>
                            
                            <Form.Label>Image</Form.Label>
                            
                            <Form.Control
                                type='file'
                                label='Upload image'
                                custom
                                className='image-file'
                                placeholder='Upload Image'
                                onChange={uploadFileHandler}
                            />
                            

                            {uploading && <Loader />}

                        </Form.Group> */}
 
                        {/* <Form.Group controlId='brand'> 
                            <Form.Label>Brand</Form.Label> 
                            <Form.Control 
                                type='text' 
                                placeholder='Enter brand' 
                                value={brand} 
                                onChange={(e) => setBrand(e.target.value)} 
                            /> 
                        </Form.Group>  */}
                    
                        <Form.Group controlId='category'>
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                as='select'
                                value={category} 
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option value="">Select Category</option>
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='countInStock'> 
                            <Form.Label>Count In Stock</Form.Label> 
                            <Form.Control 
                                type='number' 
                                placeholder='Enter Count In Stock' 
                                value={countInStock} 
                                onChange={(e) => setCountInStock(e.target.value)} 
                            /> 
                        </Form.Group> 

                        <Form.Group controlId="rating">
                            <Form.Label>Rating</Form.Label>
                            <Form.Control 
                                as="select" 
                                value={rating} 
                                onChange={(e) => setRating(e.target.value)}
                            >
                                <option value="">Select Rating</option>
                                {[1, 2, 3, 4, 5].map((rate) => (
                                    <option key={rate} value={rate}>
                                        {rate}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>

                            
                        <Form.Group controlId='description'> 
                            <Form.Label>Description</Form.Label> 
                            <CKEditor
                                editor={ ClassicEditor }
                                data={ description }
                                onChange={ ( event, editor ) => {
                                    const data = editor.getData();
                                    setDescription(data);
                                }}
                            />
                        </Form.Group>

                        <Button type='submit' variant='primary' className='my-3'>Update</Button> 
                    </Form> 
                )} 
            </FormContainer> 
        </div> 
    ); 
} 

export default ProductEditScreen;
