
import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Components/Loader';
import Message from '../Components/Message';
import FormContainer from '../Components/FormContainer';
import { getUserDetails, updateUser } from '../actions/userActions';
import { USER_UPDATE_RESET } from '../constants/userConstants';

function UserEditScreen() {
    const { id: userId } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    const dispatch = useDispatch();

    const userDetails = useSelector(state => state.userDetails);
    const { error: userDetailsError, loading: userDetailsLoading, user } = userDetails;

    const userUpdate = useSelector(state => state.userUpdate);
    const { error: userUpdateError, loading: userUpdateLoading, success: userUpdateSuccess } = userUpdate;

    useEffect(() => {
        if (userUpdateSuccess) {
            dispatch({ type: USER_UPDATE_RESET });
            navigate('/admin/userlist');
        } else {
            if (!user || !user.name || user._id !== Number(userId)) {
                dispatch(getUserDetails(userId));
            } else {
                setName(user.name);
                setEmail(user.email);
                setIsAdmin(user.isAdmin);
            }
        }
    }, [dispatch, user, userId, userUpdateSuccess, navigate]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateUser({ _id: userId, name, email, isAdmin }));
    };

    return (
        <div>
            <Link to='/admin/userlist'>Go Back</Link>

            <FormContainer>
                <h1>Edit User</h1>
                {userUpdateLoading && <Loader />}
                {userUpdateError && <Message variant='danger'>{userUpdateError}</Message>}

                {userDetailsLoading ? <Loader /> : userDetailsError ? <Message variant='danger'>{userDetailsError}</Message>
                    : (
                        <Form onSubmit={submitHandler}>
                            <Form.Group controlId='name'>
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Enter name'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group controlId='email'>
                                <Form.Label>Email Address</Form.Label>
                                <Form.Control
                                    type='email'
                                    placeholder='Enter Email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group controlId='isadmin'>
                                <Form.Check
                                    type='checkbox'
                                    label='Is Admin'
                                    checked={isAdmin}
                                    onChange={(e) => setIsAdmin(e.target.checked)}
                                />
                            </Form.Group>

                            <Button type='submit' variant='primary'>Update</Button>
                        </Form>
                    )}
            </FormContainer>
        </div>
    );
}

export default UserEditScreen;









