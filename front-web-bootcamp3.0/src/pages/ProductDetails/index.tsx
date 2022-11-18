import React from 'react';
import './styles.css';

import { ReactComponent as ArrowIcon } from 'assets/images/arrow.svg';
import ProducPrice from 'components/ProductPrice';

const ProductDetails = () => {
    return(
        <div className="product-details-container">
            <div className="base-card product-details-card">
                <div className="goback-container">
                    <ArrowIcon />
                    <h2>VOLTAR</h2>
                </div>
                <div className="row">
                    <div className='col-xl-6'>
                        <div className="img-container">
                            <img src="https://raw.githubusercontent.com/devsuperior/dscatalog-resources/master/backend/img/4-big.jpg" alt="Nome do produto" />
                        </div>
                        <div className="name-price-container">
                            <h1>Nome do produto</h1>
                            <ProducPrice price={1200} />
                        </div>
                    </div>
                    <div className="col-xl-6">
                        <div className="description-container">
                            <h2>Descrição do produto</h2>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo nihil aliquam consequuntur ducimus vero, sapiente laudantium modi magnam eaque eveniet adipisci soluta inventore officia odit obcaecati suscipit. Officia modi voluptas ullam, atque, ad eveniet vel quos deserunt, esse a quasi eius earum omnis? Nemo, itaque. Officiis praesentium reiciendis eius ducimus?</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;