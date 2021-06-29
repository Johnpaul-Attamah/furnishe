import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { updateProduct, getProductDetails, clearErrors } from '../../actions/productActions';
import Metadata from '../layout/Metadata'
import Sidebar from './Sidebar';
import { UPDATE_PRODUCT_RESET } from '../../constants/productConstants';


const UpdateProduct = ({ history, match }) => {

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [stock, setStock] = useState(0);
    const [seller, setSeller] = useState('');
    const [style, setStyle] = useState('');
    const [newFeature, setNewFeature] = useState('');
    const [features, setFeatures] = useState([]);
    const [productLength, setProductLength] = useState(0);
    const [productBredth, setProductBredth] = useState(0);
    const [productHeight, setProductHeight] = useState(0);
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);
    const [oldImages, setOldImages] = useState([]);

    const alert = useAlert();
    const dispatch = useDispatch();

    const categories = [
        'chairs',
        'storage',
        'accessories',
        'tables',
        'office',
        'kitchen',
        'sofas',
        'cushion',
        'bedroom',
        'dinning',
        'bathroom'
    ];

    const { error, product } = useSelector(state => state.productDetails);
    const { loading, error: updateError, isUpdated } = useSelector(state => state.product);

    const productId = match.params.id;

     useEffect(() => {
        if(product && product._id !== productId) {
            dispatch(getProductDetails(productId));
        } else {
            setName(product.name);
            setPrice(product.price);
            setDescription(product.description);
            setCategory(product.category);
            setStock(product.stock);
            setSeller(product.seller);
            setStyle(product.style);
            setFeatures(product.features);
            setProductLength(product.productLength);
            setProductBredth(product.productBredth);
            setProductHeight(product.productHeight);
            setOldImages(product.images);
        }
        if(error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if(updateError) {
            alert.error(updateError);
            dispatch(clearErrors());
        }
        if(isUpdated) {
            history.push('/admin/products');
            alert.success('Product Updated Successfully');
            dispatch({ type: UPDATE_PRODUCT_RESET});
        }
    },[dispatch, alert, error, updateError, isUpdated, history, product, product._id, productId])

    const handleSubmit = e => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.set('name', name);
        formData.set('price', price);
        formData.set('description', description);
        formData.set('category', category);
        formData.set('stock', stock);
        formData.set('seller', seller);
        formData.set('style', style);
        formData.set('productLength', productLength);
        formData.set('productBredth', productBredth);
        formData.set('productHeight', productHeight);

        features.forEach(feature => {
            formData.append('features', feature);
        })
        
        images.forEach(image => {
            formData.append('images', image);
        })

        dispatch(updateProduct(product._id, formData));
    }

    const handleChange = e => {

        const files = Array.from(e.target.files);

        setImagesPreview([]);
        setImages([]);
        setOldImages([])
        files.forEach(file => {

            const reader = new FileReader();

            reader.onload = () => {
                if(reader.readyState === 2) {
                    setImagesPreview(oldArray => [...oldArray, reader.result]);
                    setImages(oldArray => [...oldArray, reader.result]);
                }
            }
            
            reader.readAsDataURL(file);
        })
    }

    const handleAddFeature = e => {
        e.preventDefault();
        if(newFeature) {
            setFeatures(features => [...features, newFeature])
            setNewFeature('');
        }
    }

    const handleRemoveFeature = (index) => {
        const filteredFeatures = features.filter((feature, idx) => idx !== index);
        setFeatures(filteredFeatures);
    }

    return (
        <Fragment>
            <Metadata title={"Update Product"}/>
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar/>
                </div>
                <div className="col-12 col-md-10">
                    <Fragment>
                       <div className="wrapper my-5"> 
                            <form className="shadow-lg" onSubmit={handleSubmit} encType='multipart/form-data'>
                                <h1 className="mb-4">Update Product</h1>

                                <div className="form-group">
                                <label htmlFor="name_field">Name</label>
                                <input
                                    type="text"
                                    id="name_field"
                                    className="form-control"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="price_field">Price</label>
                                    <input
                                    type="text"
                                    id="price_field"
                                    className="form-control"
                                    value={price}
                                    onChange={e => setPrice(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="description_field">Description</label>
                                    <textarea className="form-control" id="description_field" rows="8" 
                                    value={description}
                                    onChange={e => setDescription(e.target.value)}
                                    ></textarea>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="category_field">Category</label>
                                    <select className="form-control" id="category_field" value={category}
                                    onChange={e => setCategory(e.target.value)}>
                                        {categories.map(category => (
                                            <option key={category} value={category}>{category}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="stock_field">Stock</label>
                                    <input
                                    type="number"
                                    id="stock_field"
                                    className="form-control"
                                    value={stock}
                                    onChange={e => setStock(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="seller_field">Seller Name</label>
                                    <input
                                    type="text"
                                    id="seller_field"
                                    className="form-control"
                                    value={seller}
                                    onChange={e => setSeller(e.target.value)}
                                    />
                                </div>
                                
                                <div className="form-group">
                                    <label htmlFor="style_field">Styles</label>
                                    <input
                                    type="text"
                                    id="style_field"
                                    className="form-control"
                                    value={style}
                                    onChange={e => setStyle(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="lenght_fiel">Product length in meters</label>
                                    <input
                                    type="text"
                                    id="lenght_field"
                                    className="form-control"
                                    value={productLength}
                                    onChange={e => setProductLength(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="width_field">Product bredth in meters</label>
                                    <input
                                    type="text"
                                    id="width_field"
                                    className="form-control"
                                    value={productBredth}
                                    onChange={e => setProductBredth(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="height_field">Product height in meters</label>
                                    <input
                                    type="text"
                                    id="height_field"
                                    className="form-control"
                                    value={productHeight}
                                    onChange={e => setProductHeight(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Features</label>
                                        <div className="features-input">
                                            <label htmlFor="features_field">Add Product Features</label>
                                            <button
                                            style={{
                                                fontSize: "12px"
                                            }}
                                            className="btn btn-link p-1 mt-1 ml-5"
                                            onClick={handleAddFeature}
                                            >
                                            ADD
                                            </button>
                                            <input
                                            type="text"
                                            id="features_field"
                                            className="form-control"
                                            value={newFeature}
                                            onChange={e => setNewFeature(e.target.value)}
                                            />

                                            <ul className="list-group my-2" style={{
                                                fontSize: "12px"
                                            }}>
                                                {features.map((feature, idx) => (
                                                    <li className="list-group-item d-flex justify-content-between align-items-center"
                                                    key={feature}
                                                    >
                                                    {feature}
                                                    <span role="button" onClick={() => handleRemoveFeature(idx)} className="badge badge-danger badge-pill"><i className="fa fa-minus"></i></span>
                                                </li>
                                                ))}
                                            </ul>

                                        </div>
                                </div>
                                
                                <div className='form-group'>
                                    <label>Images</label>
                                    
                                        <div className='custom-file'>
                                            <input
                                                type='file'
                                                name='product_images'
                                                className='custom-file-input'
                                                id='customFile'
                                                onChange={handleChange}
                                                multiple
                                            />
                                            <label className='custom-file-label' htmlFor='customFile'>
                                                Choose Images
                                            </label>

                                            {oldImages.map(img => (
                                                <img src={img.url} alt={img.url} key={img.url} className="mt-3 mr-2" width="55" height="52"/>
                                            ))}

                                            {imagesPreview.map(img => (
                                                <img src={img} key={img} alt="images preview" className="mt-3 mr-2" width="55" height="52"/>
                                            ))}
                                        </div>
                                </div>

                    
                                <button
                                id="login_button"
                                type="submit"
                                className="btn btn-block py-3"
                                disabled={loading ? true : false}
                                >
                                UPDATE
                                </button>

                            </form>
                        </div> 
                    </Fragment>
                </div>
            </div>
        </Fragment>
    )
}

export default UpdateProduct
