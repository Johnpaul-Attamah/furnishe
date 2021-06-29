import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { MDBDataTable } from 'mdbreact';
import { getProductReview, clearErrors, deleteProductReview} from '../../actions/productActions';
import Metadata from '../layout/Metadata'
import Sidebar from './Sidebar';
import { DELETE_REVIEW_RESET } from '../../constants/productConstants';

const ProductReviews = () => {

    const [productId, setProductId] = useState('');

    const alert = useAlert();
    const dispatch = useDispatch();
    
    const { error, reviews } = useSelector( state => state.productReviews);
    const { error: deleteError, isDeleted } = useSelector(state => state.productReviews);

    useEffect(() => {
        if(error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if(productId !== '') {
            dispatch(getProductReview(productId));
        }
        if(deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors());
        }
        if(isDeleted) {
            alert.success('Review deleted successfully');
            dispatch({ type: DELETE_REVIEW_RESET });
        }
    },[dispatch, alert, error, productId, deleteError, isDeleted])

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(getProductReview(productId))
    }

    const handleReviewDelete = id => {
        dispatch(deleteProductReview(id, productId))
    }


    const setReviews = () => {
        const data = {
            columns: [
                {
                    label: 'Review ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Rating',
                    field: 'rating',
                    sort: 'asc'
                },
                {
                    label: 'Comment',
                    field: 'comment',
                    sort: 'asc'
                },
                {
                    label: 'User',
                    field: 'user',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions'
                }
            ],
            rows: []
        }

        reviews?.forEach(review => {
            data.rows.push({
                id: review._id,
                rating: review.rating,
                comment: review.comment,
                user: review.user,
                actions: <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => handleReviewDelete(review._id)}><i className="fa fa-trash"></i></button>
            })
        })
        return data;
    }


    return (
        <Fragment>
            <Metadata title={"Product Reviews"}/>
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar/>
                </div>
                <div className="col-12 col-md-10">
                    <Fragment>
                        <div className="row justify-content-center mt-5">
                            <div className="col-5">
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="productId_field">Enter Product ID</label>
                                        <input
                                            type="text"
                                            id="productId_field"
                                            className="form-control"
                                            value={productId}
                                            onChange={e => setProductId(e.target.value)}
                                        />
                                    </div>

                                    <button
                                        id="search_button"
                                        type="submit"
                                        className="btn btn-primary btn-block py-2"
                                    >
                                        SEARCH
                                    </button>
                                </ form>
                            </div>
                            
                        </div>
                        {reviews?.length > 0 ? (
                            <MDBDataTable
                            data={setReviews()}
                            className="px-3"
                            bordered
                            striped
                            hover
                            />
                        ): (<p className="mt-5 text-center">No Reviews</p>)}
                    </Fragment>
                </div>
            </div>
        </Fragment>
    )
}

export default ProductReviews
