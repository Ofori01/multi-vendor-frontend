import React , {useEffect}from 'react'
import {Row, Col} from 'react-bootstrap'
import { useLocation } from 'react-router-dom'
import Product from '../Components/Product'
import Loader from '../Components/Loader'
import Message from '../Components/Message'
import Paginate from '../Components/Paginate'; 
import ProductCarousel from '../Components/ProductCarousel';
import CategoryCarousel from '../Components/CategoryCarousel';
import {useDispatch, useSelector} from 'react-redux'
import { listProducts } from '../actions/productActions'
import { listMyOrders } from '../actions/orderActions'


const HomeScreen = () => {
    const dispatch =useDispatch()
    const location = useLocation();

    const productList = useSelector(state => state.productList)
    const {error, loading, products} = productList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin


    let keyword = location.search

    useEffect(() => {
      // dispatch(listMyOrders())
        // dispatch(listProducts(keyword))
        console.log(userInfo)
        dispatch(listProducts())
        
    }, [dispatch, keyword])


  return (
    <div>
      <CategoryCarousel/>
      {/* {!keyword && <ProductCarousel/>} */}
      <ProductCarousel/>
        
        <h1>Latest Products</h1>
        {loading ? <Loader/> 
          : error ? <h2>{error}</h2> 
            : 

              <div>
                {/* <Row>
                  {products.map((product) => (
                     <Col key={product.product_id} sm={12} md={6} lg={4} xl={3} >
                       <Product product={product}/>
                      </Col>
                  ))}
                </Row> */}

                <Row>
                  {(products || []).map((product) => ( // Default to an empty array if products is undefined
                    <Col key={product.product_id} sm={12} md={6} lg={4} xl={3}>
                      <Product product={product} />
                    </Col>
                  ))}
                </Row>

                
                {/* <Paginate page={page} pages={pages} keyword={keyword} /> */}
              </div>
        }
    </div>    
  )
}

export default HomeScreen


