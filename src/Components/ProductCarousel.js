// import React, { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { Link } from 'react-router-dom'
// import { Carousel, Image } from 'react-bootstrap'
// import Loader from './Loader'
// import Message from './Message'
// import { listTopProducts } from '../actions/productActions'

// function ProductCarousel() {
//     const dispatch = useDispatch()

//     const productTopRated = useSelector(state => state.productTopRated)
//     const { error, loading, products } = productTopRated

//     useEffect(() => {
//         dispatch(listTopProducts())
//     }, [dispatch])

//     return (loading ? <Loader />
//         : error
//             ? <Message variant='danger'>{error}</Message>
//             : (
//                 <div>
//                     {/* <h1>Top Products</h1> */}
//                 <Carousel pause='hover' className='bg-dark'>
//                     {products.map(product => (
//                         <Carousel.Item key={product._id}>
//                             <Link to={`/product/${product._id}`}>
//                                 <Image src={product.image} alt={product.name} fluid />
//                                 <Carousel.Caption className='carousel.caption'>
//                                     <h4>{product.name} (GHS {product.price})</h4>
//                                 </Carousel.Caption>
//                             </Link>
//                         </Carousel.Item>
//                     ))}
//                 </Carousel>
//                 </div>
//             )

//     )
// }

// export default ProductCarousel

import {Carousel, Image} from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { listTopProducts } from '../actions/productActions'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from './Loader'
import Message from './Message'


function ProductCarousel() {

    const dispatch = useDispatch()

    const productTopRated = useSelector(state => state.productTopRated)
    const { error, loading, products } = productTopRated

    useEffect(() => {
        dispatch(listTopProducts())
    }, [dispatch])

    return (loading ? <Loader />
          : error
              ? <Message variant='danger'>{error}</Message>
              : (
                <div>
                    <Carousel data-bs-theme="dark" pause='hover'>
      
                     {products.map(product => (
                        <Carousel.Item key={product.product_id}>
                            <Link to={`/product/${product.product_id}`}>
                                <Image src={`/api/product/image/${product.image_url}`}  alt={product.title} fluid />
                                <Carousel.Caption className='carousel.caption'>
                                    <h4>{product.title} (GHS {product.price})</h4>
                                </Carousel.Caption>
                            </Link>
                        </Carousel.Item>
                    ))}
                </Carousel>
                </div>
              )
    
  );
}

export default ProductCarousel;
