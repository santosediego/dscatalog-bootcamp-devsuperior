import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCrudCard from 'pages/Admin/Products/ProductCrudCard';
import { SpringPage } from 'types/vendor/spring';
import { Product } from 'types/product';
import { AxiosRequestConfig } from 'axios';
import { requestBackend } from 'util/requests';
import Pagination from 'components/Pagination';
import './styles.css';

const List = () => {

    const [page, setPage] = useState<SpringPage<Product>>();

    useEffect(() => {
        getProducts(0);
    }, []);

    const getProducts = (pageNumber: number) => {
        const config: AxiosRequestConfig = {
            method: 'GET',
            url: `/products`,
            params: {
                page: pageNumber,
                size: 3
            },
        }

        requestBackend(config)
            .then(response => {
                setPage(response.data);
            }).catch(error => (
                console.log(error)
            )).finally(() => {
            });
    }

    return (
        <div className='product-crud-container'>
            <div className='product-crud-bar-container'>
                <Link to='/admin/products/create'>
                    <button className='btn btn-primary text-white btn-crud-add'>ADICIONAR</button>
                </Link>
                <div className='base-card product-filter-container'>Search bar</div>
            </div>
            <div className="row">
                {page?.content.map(product => (
                    <div key={product.id} className="col-sm-6 col-md-12">
                        <ProductCrudCard product={product} onDelete={() => getProducts(page.number)} />
                    </div>
                ))}
            </div>

            <Pagination
                pageCount={(page) ? page?.totalPages : 0}
                range={3}
                onChange={getProducts}
            />
        </div>
    );
};

export default List;
