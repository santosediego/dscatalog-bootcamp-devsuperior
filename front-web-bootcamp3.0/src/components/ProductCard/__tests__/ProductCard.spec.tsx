import { render, screen } from "@testing-library/react";
import { Product } from "types/product";
import ProductCard from "..";

test('should render ProductCard', () => {
    const product : Product = {
        name: 'Test product',
        price: 1266.79,
        imgUrl: 'https://www.pexels.com/pt-br/foto/aniversario-de-casamento-lindo-bonito-atraente-4397903/',
    } as Product; //Cast

    render(<ProductCard product={product} />);

    expect(screen.getByText(product.name)).toBeInTheDocument();
    expect(screen.getByAltText(product.name)).toBeInTheDocument();
    expect(screen.getByText("R$")).toBeInTheDocument();
    expect(screen.getByText("1.266,79")).toBeInTheDocument();
});
