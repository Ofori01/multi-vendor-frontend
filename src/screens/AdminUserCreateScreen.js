import { useLocation, Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loader from '../Components/Loader';
import Message from '../Components/Message';
import FormContainer from '../Components/FormContainer';
import { createUser } from '../actions/userActions';


function AdminUserCreateScreen() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const redirect = location.search ? location.search.split('=')[1] : '/';
        
    const userCreate = useSelector(state => state.userCreate);
    const { error, loading, userInfo } = userCreate;


        useEffect(() => {
            if (userInfo) {
                navigate('/admin/userlist');
            }
        }, [userInfo, navigate]);
        
        
    
    const submitHandler = (e) => {
        e.preventDefault();
        if(password !== confirmPassword){
            setMessage('Passwords do not match')
        }
        else{
                dispatch(createUser(name, email, password));
            }
    };
    

    return(
        <div>
            <Link to='/admin/userlist'>
                Go Back
            </Link>
            <FormContainer>
                <h1>Create User</h1>
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
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </Form.Group>

                    <Button type='submit' variant='primary' className='my-3'>
                        Create User
                    </Button>

                </Form>

               
            </FormContainer>
        </div>
    );
}





export default AdminUserCreateScreen