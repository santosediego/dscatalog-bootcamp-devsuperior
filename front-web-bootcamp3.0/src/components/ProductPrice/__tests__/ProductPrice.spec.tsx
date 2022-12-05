import { render, screen } from "@testing-library/react";
import ProducPrice from "..";

test('should render ProductPrice', () => {
    const price = 1266.7;

    render(<ProducPrice price={price} />);

    expect(screen.getByText("R$")).toBeInTheDocument();
    expect(screen.getByText("1.266,70")).toBeInTheDocument();
});
