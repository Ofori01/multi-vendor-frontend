import React, { useState, useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom'; // Import useNavigate
import { Form, Button, Table, Row, Col, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Components/Loader';
import Message from '../Components/Message';
import Paginate from '../Components/Paginate';
import { sellerListProducts, deleteProduct,createProduct } from '../actions/productActions';
import {PRODUCT_CREATE_RESET} from '../constants/productConstants';

function ProductListScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const location = useLocation(); 

  const productList = useSelector(state => state.productList);
  const { loading, error, products, pages, page} = productList;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const productDelete = useSelector(state => state.productDelete);
  const { loading: loadingDelete, error: errorDelete, success: successDelete  } = productDelete


  let keyword = location.search
  useEffect(() => {

    if (!userInfo) {
     navigate('/login');
    } 

    if (userInfo && userInfo.role === 'seller') {
      dispatch(sellerListProducts())
     }

   
  }, [dispatch, navigate, userInfo, successDelete, keyword]);

  const deleteHandler = (product_id) => {
  if(window.confirm('Confirm deletion of product?'))
    {
        dispatch(deleteProduct(product_id))
    }   
  };


  const createProductHandler = () =>{
        navigate(`/admin/product/create`)
  }

  return (
    <div>
      <Row className='aligh-items-center'>
        <Col>
            <Button className='my-3' onClick={createProductHandler}>
                <i className='fas fa-plus' style={{'text-Decoration': 'underline'}}> </i>
                Create Products
            </Button>
        </Col>

        <Col className='text-right'>
            <h1> Products</h1>
        </Col>
      </Row>

      {loadingDelete && <Loader/>}
      {/* {errorDelete && <Message variant='danger'>{errorDelete}</Message>} */}



      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <div>
        <Table striped border hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              {/* <th>BRAND</th> */}
              <th></th>
            </tr>
          </thead>
 
          <tbody>
            {products.map(product => (
              <tr key={product.product_id}>
                <td>{product.product_id}</td>
                <td>{product.title}</td>
                <td>GHC{product.price}</td>
                <td>{product.category}</td>
                {/* <td>{product.brand}</td> */}
                <td><Image className='admin' src={`/api/product/image/${product.image_url}`} alt={product.title} fluid /></td>
           

                <td>
                  <LinkContainer to={`/admin/product/${product.product_id}/edit`}>
                    <Button variant='light' className='btn-sm'>
                      <i className='fas fa-edit'></i>
                    </Button>
                  </LinkContainer>

                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => deleteHandler(product.product_id)}
                  >
                    <i className='fas fa-trash'></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        {/* <Paginate page={page} pages={pages} isAdmin={true} /> */}
        </div>
      )}
    </div>
  );
}

export default ProductListScreen;

