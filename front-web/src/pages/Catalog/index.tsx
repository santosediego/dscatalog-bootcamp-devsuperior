import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { makeRequest } from 'core/utils/request';
import ProductCard from './components/ProductCard';
import { ProductsResponse } from 'core/types/Product';
import ProductCardLoader from './components/Loaders/ProductCardLoader';
import Pagination from 'core/components/Pagination';
import './styles.scss'

const Catalog = () => {
    
    const [ productsResponse, setProductsResponse ] = useState<ProductsResponse>();
    const [isLoading, setIsLoading] = useState(false);
    const [ activePage, setActivePage]= useState(0);

    useEffect(() => {

        const params = {
            page: activePage,
            linesPerPage: 12
        }

        // Inicia o loader;
        setIsLoading(true);
        makeRequest({ url: '/products', params })
            .then(response => setProductsResponse(response.data))
            .finally(() => {
                // Finaliza o loader;
                setIsLoading(false);
            })
    }, [activePage]);

    return (
        <div className="catalog-container">
            <h1 className="catalog-title">
                Catálogo de produtos
            </h1>
            <div className="catalog-products">
                {isLoading ? <ProductCardLoader /> : (
                    productsResponse?.content.map(product => (
                        <Link to={`/products/${product.id}`} key={product.id}>
                            <ProductCard product={product} />
                        </Link>
                    ))
                )}
            </div>
            {productsResponse && (
                <Pagination 
                    totalPages={productsResponse.totalPages}
                    activePage={activePage}
                    onChange={page => setActivePage(page)}
                />
            )}
        </div>
    );
}

export default Catalog;

/* Limitações dp fetch*/
        // muito verboso
        // sem suporte nativo para ler progresso de upload de arquivos;
        // não tem suporte nativo para enviar query strings;

        // Ao iniciar buscar a lista de produtos (jeito mais simples, recomandado o axios);
        //fetch('http://localhost:3000/products')
        //.then(response => response.json())
        //.then(response => console.log(response));