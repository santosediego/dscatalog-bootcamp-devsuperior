import Pagination from 'core/components/Pagination';
import { ProductsResponse } from 'core/types/Product';
import { makePrivateRequest, makeRequest } from 'core/utils/request';
import React, { useEffect, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import Card from '../Card';
import { toast } from 'react-toastify';
import CardLoader from '../Loaders/ProductCardLoader';

const List = () => {

    const [productsResponse, setProductsResponse] = useState<ProductsResponse>();
    const [isLoading, setIsLoading] = useState(false);
    const [activePage, setActivePage] = useState(0);
    const history = useHistory();

    const getProducts = useCallback(() => { //vai explicar sobre o useCallabck
        const params = {
            page: activePage,
            size: 4,
            sort: 'id,DESC'
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

    useEffect(() => {
        getProducts();
    }, [getProducts]);

    const handleCreate = () => {
        history.push('/admin/products/create');
    }

    const onRemove = (productId: number) => {
        const confirm = window.confirm('Deseja realmente excluir esse produto?');
        if (confirm) {
            makePrivateRequest({ url: `/products/${productId}`, method: 'DELETE' })
                .then(() => {
                    toast.info('Produto removido com sucesso!');
                    getProducts();
                })
                .catch(() => {
                    toast.error('Erro ao remover produto!');
                })
        }
    }

    return (
        <div className="admin-products-list">
            <button className="btn btn-primary brn-lg" onClick={handleCreate}>
                ADICIONAR
            </button>
            <div className="admin-list-container">
                {isLoading ? <CardLoader /> : (
                    productsResponse?.content.map(product => (
                        <Card product={product} key={product.id} onRemove={onRemove} />
                    ))
                )}
                {productsResponse && (
                    <Pagination
                        totalPages={productsResponse.totalPages}
                        onChange={page => setActivePage(page)}
                    />
                )}
            </div>
        </div>
    );
}

export default List;