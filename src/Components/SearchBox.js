import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';

function SearchBox() {
    const [keyword, setKeyword] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const submitHandler = (e) => {
        e.preventDefault();
        if (keyword) {
            navigate(`/?keyword=${keyword}&page=1`);
            setKeyword('')
            
        } else {
            navigate(location.pathname);
        }
        
    };


    return (
        <Form onSubmit={submitHandler} inline>
            <div className="d-flex"> 
                <Form.Control
                    type='text'
                    name='q'
                    onChange={(e) => setKeyword(e.target.value)}
                    value={keyword}
                    className='mr-sm-2 ml-sm-5'
                />

                <Button
                    type='submit'
                    variant='outline-success'
                    className='p-2 mx-3'
                >
                    Submit
                </Button>
            </div>
        </Form>
    );
}

export default SearchBox;

