import { useLocation, Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Components/Loader';
import Message from '../Components/Message';
import FormContainer from '../Components/FormContainer';
import { register } from '../actions/userActions';



function RegisterScreen() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassowrd, setConfirmPassowrd] = useState('');
    const [message, setMessage] = useState('');
    
    const dispatch = useDispatch();
    const location = useLocation();
    const redirect = location.search ? location.search.split('=')[1] : '/';
        
    const userRegister = useSelector(state => state.userRegister);
    const { error, loading, userInfo } = userRegister;
    
    useEffect(() => {
        if (userInfo) {
            window.location.href = redirect; 
            }
        }, [userInfo, redirect]);
    
        const submitHandler = (e) => {
            e.preventDefault();
            if(password !== confirmPassowrd){
                setMessage('Passwords do not match')
            }
            else{
                dispatch(register(name, email, password));
            }
        };
    

    return(
        <FormContainer>
            <h1>Register</h1>
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
                         required
                        type='password'
                        placeholder='Enter Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>


                <Form.Group controlId='PasswordConfirm'>
                    <Form.Label> Confirm Password</Form.Label>
                    <Form.Control
                         required
                        type='password'
                        placeholder='Confirm Password'
                        value={confirmPassowrd}
                        onChange={(e) => setConfirmPassowrd(e.target.value)}
                    />
                </Form.Group>

                <Button type='submit' variant='primary' className='my-3'>
                    Register
                </Button>

            </Form>

            <Row className='py-3'>
                <Col>
                    Already have an account? <Link
                        // to={'/login'}>
                        to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                        Login
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    );
}





export default RegisterScreen