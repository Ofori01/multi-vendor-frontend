import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Link, useParams } from 'react-router-dom'; 
import { Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Components/Loader';
import { listCategoryProducts } from '../actions/categoryActions';
import Product from '../Components/Product'

function CategoryProductsScreen() {

    const dispatch = useDispatch() 

    const { name } = useParams();

    const categoryProducts = useSelector(state => state.categoryProducts)
    const { error, loading, catproducts } = categoryProducts

    useEffect(() => {
        dispatch(listCategoryProducts(name))
        console.log(catproducts)
    }, [dispatch])


    return (
        
        <div>
            <Link to="/" className="btn btn-light my-3">
                Go Back
            </Link>
            {catproducts.length!==0? <h1>{catproducts[0].category}</h1>:<h1>No Products Found</h1>}
            
            {loading ? <Loader/> 
            : error ? <h2>{error}</h2> 
                : 
                <div>
                    <Row>
                    {catproducts.map((product) => (
                        <Col key={product} sm={12} md={6} lg={4} xl={3} >
                        <Product product={product}/>
                        </Col>
                    ))}
                    </Row>
                    
                </div>
            }
        </div> 
    )
}

export default CategoryProductsScreen;

