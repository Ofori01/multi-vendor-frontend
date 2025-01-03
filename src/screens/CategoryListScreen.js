import React, { useState, useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from 'react-router-dom'; 
import { Form, Button, Table, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Components/Loader';
import Message from '../Components/Message';
import { listCategories, deleteCategory,createCategory } from '../actions/categoryActions';
// import products from '../products';
import {CATEGORY_CREATE_RESET} from '../constants/categoryConstants';

function CategoryListScreen() {
    const dispatch = useDispatch();
    const navigate = useNavigate(); 

    const categoryList = useSelector(state => state.categoryList);
    const { loading, error, categories } = categoryList;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const categoryDelete = useSelector(state => state.categoryDelete);
    const { loading: loadingDelete, error: errorDelete, success: successDelete  } = categoryDelete

    const categoryCreate = useSelector(state => state.categoryCreate);
    const { loading: loadingCreate, error: errorCreate, success: successCreate, category: createdCategory  } = categoryCreate



    useEffect(() => {
        dispatch({type: CATEGORY_CREATE_RESET });
    
        if (!userInfo.isAdmin) {
            navigate('/login');
        } 
    
        if (successCreate) {
            navigate(`/admin/category/${createdCategory._id}/edit`); // Use createdCategory here
        } else {
            dispatch(listCategories());
        }
    }, [dispatch, navigate, userInfo, successDelete, successCreate, createdCategory]);
    


    const deleteHandler = (id) => {
    if(window.confirm('Confirm deletion of category?'))
        {
            dispatch(deleteCategory(id))
        }   
    };


    const createCategoryHandler = (category) =>{
            dispatch(createCategory())
    }


  return (
    <div>
      <Row className='aligh-items-center'>
        <Col>
            <Button className='my-3' onClick={createCategoryHandler}>
                <i className='fas fa-plus' style={{'text-Decoration': 'underline'}}> </i>
                Create Category
            </Button>
        </Col>

        <Col className='text-right'>
            <h1> Categories</h1>
        </Col>
      </Row>

      {loadingDelete && <Loader/>}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}

      {loadingCreate && <Loader/>}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}



      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped border hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th></th>
            </tr>
          </thead>
 
          <tbody>
            {categories.map(category => (
              
              <tr key={category._id}>
                <td>{category._id}</td>
                <td>{category.name}</td>
           

                <td>
                  <LinkContainer to={`/admin/category/${category._id}/edit`}>
                    <Button variant='light' className='btn-sm'>
                      <i className='fas fa-edit'></i>
                    </Button>
                  </LinkContainer>

                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => deleteHandler(category._id)}
                  >
                    <i className='fas fa-trash'></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default CategoryListScreen;