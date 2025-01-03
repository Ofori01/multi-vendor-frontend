import React, {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import { useSelector } from 'react-redux'
import {  useNavigate } from 'react-router-dom'
import { Col, Row, Button } from 'react-bootstrap'
import Loader from './Loader'
import Message from './Message'
import { listAvailableCategories } from '../actions/categoryActions';


function CategoryCarousel() {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const categoryList = useSelector(state => state.categoryList)
    const {error, loading, categories} = categoryList

    const productHandler = (category) => {
        // console.log(`Filtering by category: ${category}`);
        const lowercaseCategoryName = category.toLowerCase();
        // `/cart/${id}?qty=${quantity}`
        navigate(`/category/${category}`);
    };

    // const sellerHandler = () => {
    //     navigate(`/seller/register`);
    // };

    useEffect(() => {
        dispatch(listAvailableCategories());
      }, [dispatch]);


    // return (
    //     <div>
            
    //         <h5>Filter By Categories</h5>
            
    //         {loading  ? <Loader/> 
    //           : error  ? <h2>{error}</h2> 
    //             : 
    
    //             <div>
    //                 <Row>
    //                     <Col>
    //                 {categories.map((category) => (
    //                     <Button 
    //                     key={category._id} 
    //                     onClick={() => productHandler(category._id, category.name)}
    //                     className='btn btn-circle my-3 '>
    //                     {category.name}
    //                     </Button>
    //                 ))}
    //                 </Col>
    //                 </Row>
    //             </div>
    //         }
    //     </div>      
    //   )

    return (
        <div>
          <h5>Filter By Categories</h5>
          {loading ? (
            <Loader />
          ) : error ? (
            <h2>{error}</h2>
          ) : (
            <div>
              <Row>
                <Col>
                  {categories.map((category) => (
                    <Button
                      key={category} // Use category as the key since it's a string
                      onClick={() => productHandler(category)}
                      className="btn btn-circle my-3"
                    >
                      {category} {/* Display the category string */}
                    </Button>
                  ))}
                </Col>
              </Row>
            </div>
          )}
        </div>
      );
      
}

export default CategoryCarousel