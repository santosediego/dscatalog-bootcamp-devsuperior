import React from 'react'
import { render, screen } from '@testing-library/react'
import ProductPrice from '..'

test('should render product ProductPrice', () => {

    // Arrange
    const price = 1500;

    // Act
    render(
        <ProductPrice price={price} />
    );

    // Assert
    const currencyElement = screen.getByText('R$');
    const priceElement = screen.getByText('1.500,00');

    expect(currencyElement).toBeInTheDocument();
    expect(priceElement).toBeInTheDocument();
})

test('should render product ProductPrice with price equals zero', () => {

    // Arrange
    const price = 0;

    // Act
    render(
        <ProductPrice price={price} />
    );

    // Assert
    const currencyElement = screen.getByText('R$');
    const priceElement = screen.getByText('0,00');

    expect(currencyElement).toBeInTheDocument();
    expect(priceElement).toBeInTheDocument();
})

test('should render product ProductPrice without thousand separator', () => {

    // Arrange
    const price = 100;

    // Act
    render(
        <ProductPrice price={price} />
    );

    // Assert
    const currencyElement = screen.getByText('R$');
    const priceElement = screen.getByText('100,00');

    expect(currencyElement).toBeInTheDocument();
    expect(priceElement).toBeInTheDocument();
})