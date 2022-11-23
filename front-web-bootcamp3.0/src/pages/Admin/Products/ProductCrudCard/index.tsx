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
            <div className='product-crud-card-description'>
                <div className='product-crud-card-botton-container'>
                    <h6>{product.name}</h6>
                    <ProducPrice price={product.price} />
                </div>
                <div className='product-crud-categories-container'>
                    {product.categories.map(category => (
                        <CategoryBadge key={category.id} name={category.name} />
                    ))}
                </div>
            </div>
            <div className='product-crud-card-buttons-container'>
                <button className='btn btn-outline-danger product-crud-card-button'>EXCLUIR</button>
                <button className='btn btn-outline-secondary product-crud-card-button'>EDITAR</button>
            </div>
        </div>
    );
}

export default ProductCrudCard;
