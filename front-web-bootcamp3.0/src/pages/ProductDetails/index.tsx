import React, { useEffect, useState } from 'react';
import ProducPrice from 'components/ProductPrice';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { Product } from 'types/product';
import { BASE_URL } from 'util/requests';
import './styles.css';

import { ReactComponent as ArrowIcon } from 'assets/images/arrow.svg';

type UrlParams = {
    productId: string;
}

const ProductDetails = () => {

    const { productId } = useParams<UrlParams>();

    const [product, setProduct] = useState<Product>();

    useEffect(() => {
        axios.get(`${BASE_URL}/products/${productId}`)
            .then(response => {
                setProduct(response.data)
            }).catch(() => {
                console.log('Error')
            })
    }, [productId]);

    return (
        <div className="product-details-container">
            <div className="base-card product-details-card">
                <Link to='/products'>
                    <div className="goback-container">
                        <ArrowIcon />
                        <h2>VOLTAR</h2>
                    </div>
                </Link>
                <div className="row">
                    <div className='col-xl-6'>
                        <div className="img-container">
                            <img src={product?.imgUrl} alt={product?.name} />
                        </div>
                        <div className="name-price-container">
                            <h1>{product?.name}</h1>
                            {product && <ProducPrice price={product?.price} />}
                        </div>
                    </div>
                    <div className="col-xl-6">
                        <div className="description-container">
                            <h2>Descrição do produto</h2>
                            <p>{product?.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;