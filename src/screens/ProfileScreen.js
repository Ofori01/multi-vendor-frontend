import { useLocation, Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Table } from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import {useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Components/Loader';
import Message from '../Components/Message';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import {USER_UPDATE_PROFILE_RESET} from '../constants/userConstants';
import { listMyOrders } from '../actions/orderActions';
import axios from 'axios';


function ProfileScreen() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassowrd, setConfirmPassowrd] = useState('');
    const [message, setMessage] = useState('');
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
        
    const userDetails = useSelector(state => state.userDetails);
    const { error, loading, user } = userDetails;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo} = userLogin;

    const userUpdateProfile = useSelector(state => state.userUpdateProfile);
    const { success } = userUpdateProfile;

    const orderListMy = useSelector(state => state.orderListMy);
    const { loading: loadingOrders, error:errorOrders, orders} = orderListMy;
    
    
    useEffect(() => {
        
        if (!userInfo) {
            navigate('/login')
            }  else{
                dispatch(listMyOrders())
                if(!user || !user.name || success || userInfo.user_id !== user.user_id){
                    dispatch({type: USER_UPDATE_PROFILE_RESET})
                    dispatch(getUserDetails(userInfo.user_id))
                    dispatch(listMyOrders())

                }else{
                    setName(user.name)
                    setEmail(user.email)
                }
            }
            
        }, [userInfo, dispatch, user, success, navigate])


        

        const deleteAccountHandler = async () => {
            const confirmDelete = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");

            if (confirmDelete) {
                try {
                    const config = {
                        headers: {
                            'Authorization': `Bearer ${userInfo.token}`,
                        },
                    };

                    const { data } = await axios.delete('/api/user/delete/', config);

                    console.log(data);
                    alert("Account deleted successfully.");
                    navigate('/login');

                } catch (error) {
                    console.error(error);
                    alert("An error occurred while deleting your account. Please try again.");
                }
            }
        };

        
        
    
        // const submitHandler = (e) => {
        //     e.preventDefault();
        //     if(password != confirmPassowrd){
        //         setMessage('Passwords do not match')
        //     }
        //     else{
        //         dispatch(updateUserProfile({
        //             // 'user_id': user.user_id,
        //             'name': name,
        //             'email': email,
        //             'password': password,
        //         }))
                
        //         setMessage('')
        //     }
        // };

        const submitHandler = (e) => {
            console.log("Before update", userInfo)
            e.preventDefault();
            if (password !== confirmPassowrd) {
                setMessage('Passwords do not match');
            } else {
                const profileData = {
                    name,
                    email,
                };
        
                if (password) {
                    profileData.password = password; 
                }
                // console.log(profileData)
        
                dispatch(updateUserProfile(profileData));
                setMessage('');
                
            }
        };
        
    return(<Row>
        <Col md ={3}>
            <h2>User Profile</h2>
            {message && <Message variant='danger'>{message}</Message>}  
            {error && <Message variant='danger'>{error}</Message>} 
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>

                <Form.Group controlId='name'>
                    <Form.Label>Your Name</Form.Label>
                    <Form.Control
                         required
                        type='text'
                        placeholder='Enter Your Name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Form.Group>


                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        required
                        type='email'
                        placeholder='Enter Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>


                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                         
                        type='password'
                        placeholder='Enter Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>


                <Form.Group controlId='PasswordConfirm'>
                    <Form.Label> Confirm Password</Form.Label>
                    <Form.Control
                         
                        type='password'
                        placeholder='Confirm Password'
                        value={confirmPassowrd}
                        onChange={(e) => setConfirmPassowrd(e.target.value)}
                    />
                </Form.Group>

                <Button type='submit' variant='primary' className='my-3'>
                    Update
                </Button>

            </Form>
            <Button type='submit' variant='danger' onClick={deleteAccountHandler}>
                Delete Account
            </Button>
        </Col>

        <Col md ={9}>
            <h2>My Orders</h2>
            {loadingOrders ? (<Loader /> 
            ): errorOrders 
            ? (<Message variant='danger'>{errorOrders}</Message>
                        
            ): (
                <Table striped responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Date</th>
                            <th>Total</th>
                            <th>Order Time</th>
                            <th>Delivered</th>
                            <th></th>                                                                       
                        </tr>
                    </thead>

                    <tbody>
                        {orders.map(order => (
                            <tr key={order.order_id}>
                                <td>{order.order_id}</td>
                                <td>{order.timestamp.substring(0, 10)}</td>
                                <td>GHS {order.total_price}</td>
                                <td>{order.timestamp.substring(0, 10)}</td>
                                
                                {/* <td>{order.payment_status === 'Paid' ? order.timestamp.substring(0, 10) : (
                                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                                )}</td> */}
                                <td>
                                    <LinkContainer to={`/order/${order.order_id}`}>
                                        <Button className='btn-sm'>Details</Button>
                                    </LinkContainer>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
             )} 
        </Col>
    </Row>);
}

export default ProfileScreen