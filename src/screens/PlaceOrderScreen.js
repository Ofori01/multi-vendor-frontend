import React, { useEffect } from 'react'
import { useDispatch, useSelector,  } from 'react-redux'
import {  useNavigate } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Button, Card } from 'react-bootstrap'
import { removeFromCart, saveShippingAddress } from '../actions/cartActions'
import CheckoutSteps from '../Components/CheckoutSteps'
import {Link}  from 'react-router-dom'
import { createOrder } from '../actions/orderActions'
import Message from '../Components/Message'



const PlaceOrderScreen = () => {

    const orderCreate = useSelector(state => state.orderCreate)
    const {order, error, success} = orderCreate   

    const dispatch = useDispatch  ()  

    const ship = useSelector(state => state.ship)
    const cart = useSelector(state => state.cart)
    const navigate = useNavigate()


    const newCart = { ...cart };
    newCart.itemPrice = newCart.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
    newCart.shippingPrice = (newCart.itemPrice > 150000 ? 0 : 20).toFixed(2);
    newCart.totalPrice = Number(newCart.shippingPrice) + Number(newCart.itemPrice);




    useEffect(() => {
        
        if (success) {
            
            navigate(`/order/${order.order_id}`);
        }
        
    }, [success, order, navigate]);




    const placeOrder = () => {
        dispatch(createOrder({
            seller_id: cart.cartItems.seller_id,
            items: cart.cartItems,
            shipping_address: ship.shippingAddress,
            payment_method: ship.paymentMethod,
            items_price: newCart.itemPrice,
            shipping_price: newCart.shippingPrice,
            total_price: newCart.totalPrice,
        }, navigate));
        
        
        cart.cartItems.forEach(item => {
            dispatch(removeFromCart(item.product_id));
        });
        
        dispatch(saveShippingAddress({}))
    };

    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4/>
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Shipping</h2>

                            <p>
                                <strong>Shipping: </strong>
                                {ship.shippingAddress.address}, {ship.shippingAddress.city}
                                {'  '}
                                {ship.shippingAddress.postalCode}
                                {'  '}
                                {ship.shippingAddress.country}
                            </p>
                    
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Payment Method</h2>

                            <p>
                                <strong>Method: </strong>
                                {ship.paymentMethod}
                                
                            </p>
                    
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Order Items</h2>

                            {ship.cartItems.length === 0 ? 
                            <h3>Your cart is empty</h3>
                            :(
                            <ListGroup variant='flush'>
                                {ship.cartItems.map((item, index) => (
                                    <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}>
                                                <Image src={`/api/product/image/${item.image}`} alt={item.name} fluid rounded/>
                                                </Col>

                                                <Col>
                                                <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                </Col>

                                                <Col md={6}>
                                                {item.quantity} X GHS {item.price} = GHS {(item.quantity*item.price).toFixed(2)}
                                                </Col>
                                            </Row>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                            )
                        }

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
                                    <Col>GHS {newCart.itemPrice}</Col>
                                </Row>    
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping:</Col>
                                    <Col>GHS {newCart.shippingPrice}</Col>
                                </Row>    
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Total:</Col>
                                    <Col>GHS {newCart.totalPrice}</Col>
                                </Row>    
                            </ListGroup.Item>

                            <ListGroup.Item>
                                {error && <Message variant='danger'>{error}</Message>}
                            </ListGroup.Item>


                            <ListGroup.Item>
                                <Button
                                    type='button'
                                    className='btn-block'
                                    disabled={cart.cartItems === 0}
                                    onClick={placeOrder}
                                >
                                    Place Order
                                </Button>
                            </ListGroup.Item>


                            </ListGroup>
                    </Card>        
                </Col>
            </Row>
        </div>
    )
}

export default PlaceOrderScreen