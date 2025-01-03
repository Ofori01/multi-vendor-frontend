import axios from 'axios'
import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,

    
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,

    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,

    
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_FAIL,
    PRODUCT_CREATE_RESET,


    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_FAIL,

    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_SUCCESS,
    PRODUCT_CREATE_REVIEW_FAIL,


    PRODUCT_TOP_REQUEST,
    PRODUCT_TOP_SUCCESS,
    PRODUCT_TOP_FAIL,
} from  '../constants/productConstants'


export const listProducts = () => async (dispatch) => {
    try{
        dispatch({type: PRODUCT_LIST_REQUEST})
        const { data } = await axios.get('/api/product/getAll/');

        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data
        })

    }

    catch(error){
        dispatch({
           type: PRODUCT_LIST_FAIL,
           payload:error.response  && error.response.data.detail 
           ? error.response.data.detail 
           : error.message
        })
    }
} 

export const sellerListProducts = () => async (dispatch, getState) => {
    try{
        dispatch({type: PRODUCT_LIST_REQUEST})

        const {
            userLogin: {userInfo},
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get('/api/product/seller/', config);

        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data
        })

    }

    catch(error){
        dispatch({
           type: PRODUCT_LIST_FAIL,
           payload:error.response  && error.response.data.detail 
           ? error.response.data.detail 
           : error.message
        })
    }
}

export const listTopProducts = () => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_TOP_REQUEST })

        const { data } = await axios.get(`/api/product/top/`)

        dispatch({
            type: PRODUCT_TOP_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_TOP_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const listProductDetails = (id) => async (dispatch) => {
    try{
        dispatch({type: PRODUCT_DETAILS_REQUEST})
        const { data } = await axios.get(`/api/product/get/${id}`);

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data
        })

    }

    catch(error){
        dispatch({
           type: PRODUCT_DETAILS_FAIL,
           payload:error.response  && error.response.data.message 
           ? error.response.data.message 
           : error.message
        })
    }
}




export const deleteProduct = (product_id) => async (dispatch, getState) => {
    try{
        dispatch({
            type: PRODUCT_DELETE_REQUEST,
        })

        const {
            userLogin: {userInfo},
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.delete(
            `/api/product/delete/${product_id}`,
            config
        )

        dispatch({
            type: PRODUCT_DELETE_SUCCESS,
            
        })

    } catch(error){
        dispatch({
           type: PRODUCT_DELETE_FAIL,
           payload:error.response  && error.response.data.detail 
                ? error.response.data.detail 
                : error.message,
        })
    }
}


export const createProduct = (product, navigate) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_CREATE_REQUEST,
        });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                "Content-Type": "multipart/form-data", // Set for FormData
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        // Use FormData for the product
        const formData = new FormData();
        formData.append("seller_id", product.seller_id);
        formData.append("title", product.title);
        formData.append("description", product.description);
        formData.append("price", product.price);
        formData.append("stock_quantity", product.stock_quantity);
        formData.append("category", product.category);
        formData.append("image", product.image); // Include the image file

        const { data } = await axios.post(`/api/product/add`, formData, config);

        dispatch({
            type: PRODUCT_CREATE_SUCCESS,
            payload: data,
        });
        navigate('/admin/productlist');
    } catch (error) {
        dispatch({
            type: PRODUCT_CREATE_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });
    }
};



export const updateProduct = (product) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_UPDATE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(
            `/api/product/update/${product.product_id}/`,
            product,
            config
        )
        dispatch({
            type: PRODUCT_UPDATE_SUCCESS,
            payload: data,
        })


        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: PRODUCT_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}



