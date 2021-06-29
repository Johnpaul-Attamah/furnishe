import axios from 'axios';

import { 
    CREATE_ORDER_REQUEST, 
    CREATE_ORDER_SUCCESS, 
    CREATE_ORDER_FAIL,
    USER_ORDERS_REQUEST,
    USER_ORDERS_SUCCESS,
    USER_ORDERS_FAIL,
    ALL_ORDERS_REQUEST,
    ALL_ORDERS_SUCCESS,
    ALL_ORDERS_FAIL,
    UPDATE_ORDER_REQUEST,
    UPDATE_ORDER_SUCCESS,
    UPDATE_ORDER_FAIL,
    DELETE_ORDER_REQUEST,
    DELETE_ORDER_SUCCESS,
    DELETE_ORDER_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    CLEAR_ERRORS 
} from './../constants/orderConstants';

export const createOrder = (order) => async(dispatch) => {
    try {
        dispatch({ type: CREATE_ORDER_REQUEST });
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post('/api/v1/orders/new', order, config);

        dispatch({
            type: CREATE_ORDER_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: CREATE_ORDER_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getLogInUserOrder = () => async(dispatch) => {
    
    try {
        dispatch({ type: USER_ORDERS_REQUEST})

        const { data } = await axios.get('/api/v1/orders/me');
        
        dispatch({ 
            type: USER_ORDERS_SUCCESS,
            payload: data.orders
        })
    } catch (error) {
        dispatch({ 
            type: USER_ORDERS_FAIL,
            payload: error.response.data.message
        })
    }
}


export const getAllOrders = () => async(dispatch) => {
    
    try {
        dispatch({ type: ALL_ORDERS_REQUEST})

        const { data } = await axios.get('/api/v1/admin/orders');
        
        dispatch({ 
            type: ALL_ORDERS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({ 
            type: ALL_ORDERS_FAIL,
            payload: error.response.data.message
        })
    }
}


export const getOrderDetails = (id) => async(dispatch) => {
    
    try {
        dispatch({ type: ORDER_DETAILS_REQUEST })

        const { data } = await axios.get(`/api/v1/order/${id}`);
        
        dispatch({ 
            type: ORDER_DETAILS_SUCCESS,
            payload: data.order
        })
    } catch (error) {
        dispatch({ 
            type: ORDER_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const updateOrder = (id, orderData) => async(dispatch) => {
    try {
        dispatch({ type: UPDATE_ORDER_REQUEST })

         const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(`/api/v1/order/${id}`, orderData, config);

        dispatch({
            type: UPDATE_ORDER_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: UPDATE_ORDER_FAIL,
            payload: error.response.data.message
        })
    }
}


export const deleteOrder = (id) => async(dispatch) => {
    try {
        dispatch({ type: DELETE_ORDER_REQUEST })

        const { data } = await axios.delete(`/api/v1/order/${id}`);

        dispatch({
            type: DELETE_ORDER_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: DELETE_ORDER_FAIL,
            payload: error.response.data.message
        })
    }
}

export const clearErrors = () => (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}