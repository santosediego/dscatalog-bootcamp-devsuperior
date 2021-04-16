import React from 'react';
import { render, screen } from '@testing-library/react';
import ProductCard from '../ProductCard';
import { Product } from 'core/types/Product';

test('Should reder ProductCard', () => {

    const product ={
        name: 'computador',
        imgUrl: 'image.jpg',
        price: 28
    } as Product;
    // Para o tipo se comportar como o tipo inteiro, fazer o casting 'as Product'

    render(
        <ProductCard product={product} />
    );

    expect(screen.getByText('computador')).toBeInTheDocument();
    expect(screen.getByAltText('computador')).toBeInTheDocument();
    expect(screen.getByText('R$')).toBeInTheDocument();
    expect(screen.getByText('28,00')).toBeInTheDocument();
});