import React from 'react';
import { formatPrice } from 'util/formatters';
import './styles.css';

type Props = {
    price: number;
}

const ProducPrice = ({ price }: Props) => {
    return (
        <div className='product-price-container'>
            <span>R$</span>
            <h3>{formatPrice(price)}</h3>
        </div>
    );
}

export default ProducPrice;
