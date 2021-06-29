import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { getOrderDetails, clearErrors } from '../../actions/orderActions';
import Metadata from '../layout/Metadata'
import Loader from './../layout/Loader';


const OrderDetails = ({ match }) => {
    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, error, order } = useSelector(state => state.orderDetails);

    useEffect(() => {
        dispatch(getOrderDetails(match.params.id));
        if(error) {
            alert.error(error);
            dispatch(clearErrors());
        }
    },[dispatch, alert, error, match.params.id])

    const orderAddress = `${order?.shippingInfo?.address}, ${order?.shippingInfo?.city}, ${order?.shippingInfo?.postalCode}, ${order?.shippingInfo?.country}`;

    const isPaid = order?.paymentInfo?.status === 'succeeded' ? true : false

    return (
        <Fragment>
            <Metadata title={'Order Details'}/>
            {loading ? <Loader/> : (
                <Fragment>
                    <div className="row d-flex justify-content-between">
                        <div className="col-12 col-lg-8 mt-5 order-details">

                            <h1 className="my-5">Order #{order?._id}</h1>

                            <h4 className="mb-4">Shipping Info</h4>
                            <p><b>Name:</b> {order?.user?.name}</p>
                            <p><b>Phone:</b> {order?.shippingInfo?.phoneNo}</p>
                            <p className="mb-4"><b>Address:</b>{orderAddress}</p>
                            <p><b>Amount:</b> ${order?.totalPrice}</p>

                            <hr />

                            <h4 className="my-4">Payment</h4>
                            <p className={isPaid ? "greenColor" : "redColor"} ><b>{isPaid ? "PAID" : "NOT PAID"}</b></p>


                            <h4 className="my-4">Order Status:</h4>
                            <p className={String(order?.orderStatus).includes('Delivered') ? 'greenColor' : 'redColor'} ><b>{order?.orderStatus}</b></p>


                            <h4 className="my-4">Order Items:</h4>
                            {order?.orderItems?.map(item => (
                                <Fragment key={item.product}>
                                    <hr />
                                    <div className="cart-item my-1">
                                        <div className="row my-5">
                                            <div className="col-4 col-lg-2">
                                                <img src={item.image} alt={item.name} height="45" width="65" />
                                            </div>

                                            <div className="col-5 col-lg-5">
                                                <Link to={`/products/${item.product}`}>{item.name}</Link>
                                            </div>


                                            <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                                <p>${item.price}</p>
                                            </div>

                                            <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                                <p>{item.quantity} Piece(s)</p>
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                </Fragment>
                            ))}
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    )
}

export default OrderDetails
