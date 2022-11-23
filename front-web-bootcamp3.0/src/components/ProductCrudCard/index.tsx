import React from 'react';
import ProducPrice from 'components/ProductPrice';
import { Product } from 'types/product';
import './styles.css';

type Props = {
    product: Product;
}

const ProductCrudCard = ({ product }: Props) => {
    return (
        <div className='base-card product-card'>
            <div className='card-top-container'>
                <img src={product.imgUrl} alt={product.name} />
            </div>
            <div className='card-botton-container'>
                <h6>{product.name}</h6>
                <ProducPrice price={product.price} />
            </div>
        </div>
    );
}

export default ProductCrudCard;
