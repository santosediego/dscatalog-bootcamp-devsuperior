import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import selectEvent from 'react-select-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { Router } from 'react-router-dom';
import { ToastContainer} from 'react-toastify';
import history from 'core/utils/history';
import Form from '../Form';
import { categoriesResponse} from './fixtures';

jest.mock('react-router-dom', () => ({
    //manter a implementação original do react-router-dom
    ...jest.requireActual('react-router-dom'),
    useParams: () => ({
        productId: 'create'
    })
}));

const server = setupServer(
    // Função Mock que interceptará as requisições e simulará o ambiente;
    rest.get('http://localhost:8080/categories', (req, res, ctx) => {
        return res(ctx.json(categoriesResponse))
    }),

    rest.post('http://localhost:8080/products', (req, res, ctx) => {
        return res(ctx.status(201))
    })
);

beforeAll(() => server.listen()); // Antes dos teste;
afterEach(() => server.resetHandlers()); // Depois de cada teste;
afterAll(() => server.close()); // Depois de todos os testes;

test('Should reder Form', async () => {
    render(
        <Router history={history}>
            <ToastContainer/>
            <Form />
        </Router>
    );

    const submitButton = screen.getByRole('button', {name: /salvar/i});
    const nameImput = screen.getByTestId('name');
    const priceImput = screen.getByTestId('price');
    const imgUrlInput = screen.getByTestId('imgUrl');
    const descriptionInput = screen.getByTestId('description');
    const categoriesInput = screen.getByLabelText('Categorias');

    expect(screen.getByText(/CADASTRAR UM PRODUTO/i)).toBeInTheDocument();
    userEvent.type(nameImput, 'Computador');
    await selectEvent.select(categoriesInput, ['Computadores', 'Eletrônicos']);
    userEvent.type(priceImput, '5000');
    userEvent.type(imgUrlInput, 'image.jpg');
    userEvent.type(descriptionInput, 'ótimo computador');

    userEvent.click(submitButton);

    await waitFor(() => expect(screen.getByText('Produto salvo com sucesso!')).toBeInTheDocument());
    expect(history.location.pathname).toBe('/admin/products');
});

test('Should reder Form', async () => {
    render(
        <Router history={history}>
            <Form />
        </Router>
    );

    const submitButton = screen.getByRole('button', {name: /salvar/i});
    userEvent.click(submitButton);

    await waitFor(() => expect(screen.getAllByText('Campo obrigatório')).toHaveLength(5));

    const nameImput = screen.getByTestId('name');
    const priceImput = screen.getByTestId('price');
    const imgUrlInput = screen.getByTestId('imgUrl');
    const descriptionInput = screen.getByTestId('description');
    const categoriesInput = screen.getByLabelText('Categorias');

    userEvent.type(nameImput, 'Computador');
    await selectEvent.select(categoriesInput, ['Computadores', 'Eletrônicos']);
    userEvent.type(priceImput, '5000');
    userEvent.type(imgUrlInput, 'image.jpg');
    userEvent.type(descriptionInput, 'ótimo computador');

    await waitFor(() => expect(screen.queryAllByText('Campo obrigatório')).toHaveLength(0));
});