import React from 'react';
import { render, screen } from '@testing-library/react';
import ButtonIcon from '..';

test('Should reder ButtonIcon', () => {

    const text = 'logar';
    render(
        <ButtonIcon text={text} />
    );

    const textElement = screen.getByText(text);
    const iconElement = screen.getByTestId('arrow-icon');

    expect(textElement).toBeInTheDocument();
    expect(iconElement).toBeInTheDocument();
});

/* Se quiser rodar apenas um teste, junto ao comando test inserir .only;
Para pular o teste usar o .skip, existe outros também;
É possível agrupar os testes pela palavra chave describe() */