import React, { useEffect, useState } from 'react';
import ProductCard from 'components/ProductCard';
import Pagination from 'components/Pagination';
import axios from 'axios';
import { Product } from 'types/product';
import { Link } from 'react-router-dom';
import { SpringPage } from 'types/vendor/spring';
import { BASE_URL } from 'util/requests';
import { AxiosParams } from 'types/vendor/axios';
import CardLoader from './CardLoader';
import './styles.css';

const Catalog = () => {

    const [page, setPage] = useState<SpringPage<Product>>();
    const [isLoading, setIsLoaidng] = useState(false);

    useEffect(() => {
        const params: AxiosParams = {
            method: 'GET',
            url: `${BASE_URL}/products`,
            params: {
                page: 0,
                size: 12
            },
        }

        setIsLoaidng(true);
        axios(params)
            .then(response => {
                setPage(response.data);
            }).catch(error => (
                console.log(error)
            )).finally(() => {
                setIsLoaidng(false);
            });
    }, []);

    return (
        <div className='container my-4 catalog-container'>
            <div className="row catalog-title-container">
                <h1>Catálogo de produtos</h1>
            </div>

            <div className="row">
                {isLoading ? <CardLoader /> : (
                    page?.content.map((product) => (
                    <div className="col-sm-6 col-lg-4 col-xl-3" key={product.id}>
                        <Link to={`/products/${product.id}`}>
                            <ProductCard product={product} />
                        </Link>
                    </div>
                )))}
            </div>

            <div className="row">
                <Pagination />
            </div>
        </div>
    );
}

export default Catalog;
