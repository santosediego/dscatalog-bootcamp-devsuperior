import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

export const categoriesResponse = {
    "content": [
        {
            "id": 3,
            "name": "Computadores"
        },
        {
            "id": 2,
            "name": "Eletrônicos"
        },
        {
            "id": 1,
            "name": "Livros"
        }
    ]
}

export const productResponse = {
    "id": 3,
    "name": "Macbook Pro",
    "description": "=)",
    "price": 1250.0,
    "imgUrl": "image.jpg",
    "date": "2020-07-14T10:00:00Z",
    "categories": [
        {
            "id": 3,
            "name": "Computadores"
        },
        {
            "id": 2,
            "name": "Eletrônicos"
        }
    ]
};

export const fillFormData = () => {
    const nameImput = screen.getByTestId('name');
    const priceImput = screen.getByTestId('price');
    const imgUrlInput = screen.getByTestId('imgUrl');
    const descriptionInput = screen.getByTestId('description');

    userEvent.type(nameImput, 'Computador');
    userEvent.type(priceImput, '5000');
    userEvent.type(imgUrlInput, 'image.jpg');
    userEvent.type(descriptionInput, 'ótimo computador');
}