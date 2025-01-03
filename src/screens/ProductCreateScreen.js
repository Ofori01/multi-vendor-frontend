
import React, { useState, useEffect } from 'react'; 
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom'; 
import { Form, Button, Row, Col, Image } from 'react-bootstrap'; 
import { useDispatch, useSelector } from 'react-redux'; 
import Loader from '../Components/Loader'; 
import Message from '../Components/Message'; 
import FormContainer from '../Components/FormContainer'; 
import { createProduct } from '../actions/productActions'; 
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { listCategories } from '../actions/categoryActions';
import {PRODUCT_CREATE_RESET} from '../constants/productConstants';

function ProductCreateScreen() { 
    const { id: productId } = useParams(); 
    const navigate = useNavigate(); 
 
    const [name, setName] = useState(''); 
    const [price, setPrice] = useState(''); 
    const [image, setImage] = useState(''); 
    const [brand, setBrand] = useState(''); 
    const [category, setCategory] = useState(''); 
    const [countInStock, setCountInStock] = useState(''); 
    const [description, setDescription] = useState(''); 
    const [uploading, setUploading] = useState(false);

    const dispatch = useDispatch(); 

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

 
    const categoryList = useSelector(state => state.categoryList); 
    const { loading: categoriesLoading, error: categoriesError, categories } = categoryList; 
 
    const productCreate = useSelector(state => state.productCreate);
    const { loading: loadingCreate, error: errorCreate, success: successCreate, product: createdProduct  } = productCreate
 
    useEffect(() => { 
        dispatch({type:PRODUCT_CREATE_RESET} )

        if (successCreate){
            navigate('/admin/productlist'); 
        } 
        dispatch(listCategories())
    
        
    }, [dispatch, productId, navigate]); 
 

    const submitHandler = (e) => {
        e.preventDefault();
    
        const product = {
            seller_id: userInfo.user_id,
            title: name,
            description: description,
            price: price,
            stock_quantity: countInStock,
            category: category,
            image: image, // Include the file
        };
    
        dispatch(createProduct(product,navigate));  // Call the action with the product data
    };
    
      

    const uploadFileHandler = (e) => {
        const file = e.target.files[0];
        setImage(file); // Update the image state
    };
    
      

    return ( 
        <div> 
            <Link to='/admin/productlist'> 
                Go Back 
            </Link> 
 
            <FormContainer> 
                <h1>Create Product</h1> 
                {loadingCreate && <Loader />}  
                {errorCreate&& <Message variant='danger'>{errorCreate}</Message>} 
 
                {loadingCreate || categoriesLoading ? ( 
                    <Loader /> 
                ) : errorCreate || categoriesError ? ( 
                    <Message variant='danger'>{errorCreate || categoriesError}</Message> 
                ) : ( 
                    <Form onSubmit={submitHandler}> 
                        <Form.Group controlId='name'> 
                            <Form.Label>Name</Form.Label> 
                            <Form.Control 
                                required
                                type='text' 
                                placeholder='Enter name' 
                                value={name} 
                                onChange={(e) => setName(e.target.value)} 
                            /> 
                        </Form.Group> 
 
                        <Form.Group controlId='price'> 
                            <Form.Label>Price</Form.Label> 
                            <Form.Control 
                                required
                                type='number' 
                                placeholder='Enter price' 
                                value={price} 
                                onChange={(e) => setPrice(e.target.value)} 
                            /> 
                        </Form.Group> 

                        <Form.Group controlId="formFile">
                            <Form.Label>Image</Form.Label>
                            <Form.Control
                                type="file"
                                onChange={uploadFileHandler} // Handle file selection
                            />
                        </Form.Group>


                        <Form.Group controlId="category">
                        <Form.Label>Category</Form.Label>
                        <Form.Control
                            required
                            as="select"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="">Select Category</option>
                            {categories.map((cat) => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
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

                        <Button type='submit' variant='primary' className='my-3'>Create</Button> 
                    </Form> 
                )}
            </FormContainer> 
        </div> 
    ); 
} 

export default ProductCreateScreen;
