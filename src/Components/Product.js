import React from 'react'
import {Card} from 'react-bootstrap'
import Rating from './Rating' 
import {Link} from 'react-router-dom'


const Product = ({product}) => {
  return (
    <Card className='my-3 p-3 rounded'>
        <Link to={`/product/${product.product_id}`}>
            <Card.Img src={`/api/product/image/${product.image_url}`} />
        </Link>
        <Card.Body>
             <Link to={`/product/${product.product_id}`} style={{ textDecoration: 'none' }}>
                
                 <Card.Title as="div" >
                    <strong>{product.title}</strong>
                 </Card.Title>
             </Link>

            <Card.Text as ="div">
                <div className="my-3">
                    
                     <Rating value={product.ratings} color={'#f8e825'} />
                </div>
            </Card.Text>

            <Card.Text as="h3">
                GHS {product.price}
            </Card.Text>

        </Card.Body>

    </Card>
  )
}

export default Product
