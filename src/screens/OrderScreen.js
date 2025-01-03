
import React, { useEffect} from 'react'
import { useDispatch, useSelector,  } from 'react-redux'
import { Link, useParams, useNavigate} from 'react-router-dom'
import { Row, Col, ListGroup, Image, Button, Card } from 'react-bootstrap'

import Message from '../Components/Message'
import Loader from '../Components/Loader'

import { createOrder } from '../actions/orderActions'
import { getOrderDetails, payOrder, cancelOrder } from '../actions/orderActions'
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from '../constants/orderConstants'


const OrderScreen = () => {
    
    // const orderCreate = useSelector(state => state.orderCreate)
    // const {order, error, success} = orderCreate 

    const { id: orderId } = useParams();

    const orderDetails = useSelector(state => state.orderDetails)
    const { order, error, loading } = orderDetails

    const orderPay = useSelector(state => state.orderPay)
    const { loading: loadingPay, success: successPay } = orderPay

    const orderDeliver = useSelector(state => state.orderDeliver)
    const { loading: loadingDeliver, success: successDeliver } = orderDeliver

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const dispatch = useDispatch()  

    const ship = useSelector(state => state.ship)
    const cart = useSelector(state => state.cart)
    const navigate = useNavigate()


    useEffect(() => {
        
        if (!userInfo) {
            navigate('/login');
        } else {
            dispatch(getOrderDetails(orderId));
        }
        if (!order || successPay || order.order_id !== orderId || successDeliver) {
            dispatch({ type: ORDER_PAY_RESET })
            dispatch({ type: ORDER_DELIVER_RESET })

            dispatch(getOrderDetails(orderId))
        }

    }, [dispatch, navigate, orderId, userInfo, successPay, successDeliver]);





    const cancelHandler = () => {
            dispatch(cancelOrder({order_status: 'Cancelled'}, order))
    }

    const paymentHandler = () => {
        const updatedStatus = {
            order_status: 'Processing',
            payment_status: 'Paid',
        };
    
        dispatch(payOrder(updatedStatus, order));
    };
    

    return loading ? (
        <Loader />
    ) : error ? (
        <Message variant='danger'>{error}</Message>
    ) : (


        <div>
            <h1>Order: {order.order_id}</h1>
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            {order.user_id && (
                                <>
                                    <p><strong>Name: </strong>{order.user_name}</p>
                                    <p><strong>Email: </strong><a href={`mailto:${order.user_email}`}>{order.user.email}</a></p>
                                    
                                </>
                            )}
                            <p>
                                <strong>Shipping: </strong>
                                {order.shipping_address.address}, {order.shipping_address.city}
                                {'  '}
                                {order.shipping_address.postal_code}
                                {'  '}
                                {order.shipping_address.country}
                            </p>
                            {order.order_status === 'Delivered' ? (
                                                    <Message variant='success'> Delivered </Message>
                                                ) : (
                                                    <Message variant='warning'> {order.order_status} </Message>
                                                )
                                                
                            }

                        </ListGroup.Item>


                        <ListGroup.Item>
                            <h2>Payment Method</h2>

                            <p>
                                <strong>Method: </strong>
                                {order.payment_method}
                                
                            </p>

                            {order.payment_status === 'Paid' ? (
                                <Message variant='success'> Paid </Message>
                            ) : (
                                <Message variant='warning'> {order.payment_status} </Message>
                            )
                            
                            }
                    
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Order Items</h2>

                            {order.items.length === 0 ? 
                            <h3>Order is empty</h3>
                            :(
                                <ListGroup variant='flush'>
                                    {order.items.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                                <Row>
                                                    <Col md={1}>
                                                    <Image src={`/api/product/image/${item.image_url}`} alt={item.name} fluid rounded/>
                                                    </Col>

                                                    <Col>
                                                    <Link to={`/product/${item.product_id}`}>{item.name}</Link>
                                                    </Col>

                                                    <Col md={6}>
                                                    {item.quantity} X GHS {item.price} = GHS {(item.quantity*item.price).toFixed(2)}
                                                    </Col>
                                                </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                             )}
                            

                        </ListGroup.Item>
                    </ListGroup>
                </Col>

                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Order Summary </h2>                        
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Items:</Col>
                                    <Col>GHS {(order.total_price - order.shipping_price).toFixed(2)}</Col>
                                </Row>    
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping:</Col>
                                    <Col>GHS {order.shipping_price}</Col>
                                </Row>    
                            </ListGroup.Item>


                            <ListGroup.Item>
                                <Row>
                                    <Col>Total:</Col>
                                    <Col>GHS {(order.total_price)}</Col>
                                </Row>    
                            </ListGroup.Item>

                            <ListGroup.Item>
                                {error && <Message variant='danger'>{error}</Message>}
                            </ListGroup.Item>

                        </ListGroup>
                        {loadingDeliver && <Loader />}
                        {userInfo && userInfo.role === 'seller' && order.order_status !== 'Cancelled' && order.payment_status !== 'Paid' &&(
                            <ListGroup.Item>
                                <Button
                                    type='button'
                                    className='btn btn-block'
                                    onClick={cancelHandler}
                                >
                                    Cancel Order
                                </Button>
                            </ListGroup.Item>
                        )}

                    </Card>
                    {loadingPay && <Loader />}
                    {userInfo  && order.payment_status !== 'Paid' && (
                        <div>
                            <Button
                                type='button'
                                className='btn btn-block my-5'
                                onClick={paymentHandler}
                            >
                                Make Payment
                            </Button>
                        </div>
                    )}          
                </Col>
            </Row>
        </div>
    )
    
}

export default OrderScreen