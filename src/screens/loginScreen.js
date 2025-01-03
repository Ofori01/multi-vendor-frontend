import { useLocation, Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Components/Loader';
import Message from '../Components/Message';
import FormContainer from '../Components/FormContainer';
import { login } from '../actions/userActions';

function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const location = useLocation();
    const redirect = location.search ? location.search.split('=')[1] : '/';
    
    const userLogin = useSelector(state => state.userLogin);
    const { error, loading, userInfo } = userLogin;

    useEffect(() => {
        if (userInfo) {
            window.location.href = redirect; // Redirect using window.location.href
        }
    }, [userInfo, redirect]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password));
    };

    return (
        <FormContainer>
            <h1>Sign In</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>


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


                <Button type='submit' variant='primary' className='my-3'>
                    Sign In
                </Button>

            </Form>
            
            <Row className='py-3'>
                <Col>
                    New Customer? <Link
                        to={redirect ? `/register?redirect=${redirect}` : '/register'}>
                        Register
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    );
}

export default LoginScreen;

