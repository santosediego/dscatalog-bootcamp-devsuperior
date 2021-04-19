import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import Catalog from '..';
import { Router } from 'react-router-dom';
import history from 'core/utils/history';
import { productsResponse } from './fixtures';

const server = setupServer(
  // Função Mock que interceptará as requisições e simulará o ambiente;
    rest.get('http://localhost:8080/products', (req, res, ctx) => {
      return res(ctx.json(productsResponse))
    })
  );
  
  beforeAll(() => server.listen()); // Antes dos teste;
  afterEach(() => server.resetHandlers()); // Depois de cada teste;
  afterAll(() => server.close()); // Depois de todos os testes;

test('Should render Catalog', async () => {
    render(
        <Router history={history}>
            <Catalog />
        </Router>
    );

    expect(screen.getByText('Catálogo de produtos')).toBeInTheDocument();
    expect(screen.getAllByTitle('Loading...')).toHaveLength(8);

    // para utilizar o await é necessário inserir async para informar que é asicrono o teste;
    await waitFor(() => expect(screen.getByText('Macbook Pro')).toBeInTheDocument());
    expect(screen.getByText('PC Gamer')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();

    //para realizar a conferência de um elemento que quepode ou não estar na tela, usar a query;
    expect(screen.queryAllByTitle('Loading...')).toHaveLength(0);
});