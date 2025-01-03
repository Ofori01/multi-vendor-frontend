import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Button , Card, Form} from 'react-bootstrap';
import Rating from '../Components/Rating';
import { useDispatch, useSelector } from 'react-redux';
import { listProductDetails } from '../actions/productActions';
import Message from '../Components/Message';
import Loader from '../Components/Loader';
import { addToCart } from '../actions/cartActions'
import { InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';


const ProductScreen = () => {

  const navigate = useNavigate()
  const [quantity, setQty] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const orderListMy = useSelector(state => state.orderListMy);
  const { loading: loadingOrders, error:errorOrders, orders} = orderListMy;

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const { id } = useParams();

  const [errorMessage, setErrorMessage] = useState('');
  
  const productReviewCreate = useSelector(state => state.productReviewCreate)
  const {
    loading: loadingProductReview,
    error: errorProductReview,
    success: successProductReview,
} = productReviewCreate


  useEffect(() => {
    
    dispatch(listProductDetails(id));

  }, [dispatch, id, successProductReview, errorProductReview]);


  const addToCartHandler =  () => {
    navigate(`/cart/${id}?qty=${quantity}`);
  };



  return (
    <div>
      <Link to="/" className="btn btn-light my-3">
        Go Back
      </Link>

        {loading ? 
          <Loader>Loading...</Loader>
         : error 
         ? <Message variant='danger'>{error}</Message>
         :(

          <div>
            <Row>
              <Col md={6}>
                <Image src={`/api/product/image/${product.image_url}`} alt={product.title} fluid />
              </Col>
              <Col md={3}>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h3>{product.title}</h3>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Rating value={product.ratings} color={'#f8e825'} />
                  </ListGroup.Item>
                  <ListGroup.Item><strong>Price:</strong> GHS {product.price}</ListGroup.Item>

                  <ListGroup.Item>
                  Description:
                      <p dangerouslySetInnerHTML={{ __html: product.description }}></p>
                    

                  </ListGroup.Item>
                </ListGroup>
              </Col>
              <Col md={3}>
                <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col><strong>GHS {product.price}</strong></Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>{product.stock_quantity > 0 ? 'In Stock' : 'Out of Stock'}</Col>
                    </Row>
                  </ListGroup.Item>

                  {product.stock_quantity > 0 &&(

                  <ListGroup.Item>
                  <Row>
                      
                      <Col xs="auto" className="my-1">
                      <InputGroup className="my-1">
                      <InputGroup.Text>Qty</InputGroup.Text>
                      
                          <Form.Control
                              as="select"
                              value={quantity}
                              onChange={(e) => setQty(e.target.value)}
                          >
                              {

                                  [...Array(product.stock_quantity).keys()].map((x) => (
                                      <option key={x + 1} value={x + 1}>
                                          {x + 1}
                                      </option>
                                  ))
                              }

                          </Form.Control>
                          <InputGroup.Text style={{ display: 'flex', flexDirection: 'column' }}>
                    <FontAwesomeIcon icon={faChevronUp} onClick={() => setQty(quantity + 1)} style={{ padding: '0.25rem',}} size='sm' />
                    <FontAwesomeIcon icon={faChevronDown} onClick={() => setQty(quantity - 1)} style={{ padding: '0.25rem', }} size='sm' />
                  </InputGroup.Text>
                    </InputGroup>
                          
                      </Col>
                  </Row>
                  </ListGroup.Item>
   
                  )}

                  <ListGroup.Item>
                    <Button
                      onClick={addToCartHandler}
                      className="btn-block"
                      style={{ width: '100%', padding: '0.5rem 1rem', fontSize: '1rem', borderRadius: '0.25rem' }}
                      type="button"
                      disabled={product.stock_quantity === 0}
                    >
                      Add to Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
                </Card>
              </Col>
            </Row>

    
        </div>
         )
     }

     
    </div>
  );
};

export default ProductScreen;