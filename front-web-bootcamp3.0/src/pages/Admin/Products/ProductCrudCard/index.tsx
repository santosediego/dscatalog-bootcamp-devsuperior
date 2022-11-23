import React from 'react';
import ProducPrice from 'components/ProductPrice';
import { Product } from 'types/product';
import './styles.css';
import CategoryBadge from '../CategoryBadge';

type Props = {
    product: Product;
}

const ProductCrudCard = ({ product }: Props) => {
    return (
        <div className='base-card product-crud-card'>
            <div className='product-crud-card-top-container'>
                <img src={product.imgUrl} alt={product.name} />
            </div>
            <div>
                <div className='product-crud-card-botton-container'>
                    <h6>{product.name}</h6>
                    <ProducPrice price={product.price} />
                </div>
                <div className="product-crud-categories-container">
                    {product.categories.map(category => (
                        <CategoryBadge key={category.id} name={category.name} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ProductCrudCard;
