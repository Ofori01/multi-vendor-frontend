import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Components/Loader';
import Message from '../Components/Message';
import FormContainer from '../Components/FormContainer';
import { listCategoryDetails, updateCategory } from '../actions/categoryActions';
import { CATEGORY_UPDATE_RESET } from '../constants/categoryConstants';

function CategoryEditScreen() {
    const { id } = useParams();

    const [name, setName] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const categoryDetails = useSelector(state => state.categoryDetails);
    const { error: errorDetails, loading: loadingDetails, category: categoryObj } = categoryDetails;

    const categoryUpdate = useSelector(state => state.categoryUpdate);
    const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = categoryUpdate;

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: CATEGORY_UPDATE_RESET });
            navigate('/admin/categorylist');
        } else {
            if (!categoryObj || categoryObj._id !== Number(id)) {
                dispatch(listCategoryDetails(id));
            } else {
                setName(categoryObj.name);
            }
        }
    }, [dispatch, categoryObj, id, successUpdate, navigate]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateCategory({
            _id: id,
            name,
        }));
    };

    return (
        <div>
            <Link to='/admin/categorylist'>Go Back</Link>

            <FormContainer>
                <h1>Edit Category</h1>
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}

                {loadingDetails ? <Loader /> : errorDetails ? <Message variant='danger'>{errorDetails}</Message>
                    : (
                        <Form onSubmit={submitHandler}>

                            <Form.Group controlId='name'>
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type='name'
                                    placeholder='Enter name'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Form.Group>

                            <Button type='submit' variant='primary'>Update</Button>

                        </Form>
                    )}

            </FormContainer>
        </div>
    );
}

export default CategoryEditScreen;
