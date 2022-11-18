import React from 'react';
import './styles.css';

const Navbar = () => {
    return (
        <nav className='admin-nav-container'>
            <ul>
                <li>
                    <a href="/admin/products" className='admin-nav-item active'>
                        <p>Produtos</p>
                    </a>
                </li>
                <li>
                    <a href="/admin/products" className='admin-nav-item'>
                        <p>Categorias</p>
                    </a>
                </li>
                <li>
                    <a href="/admin/products" className='admin-nav-item'>
                        <p>Usuários</p>
                    </a>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
