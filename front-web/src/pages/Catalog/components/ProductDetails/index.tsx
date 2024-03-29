import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ReactComponent as ArrowIcon } from 'core/assets/images/arrow.svg';
import ProductPrice from 'core/components/ProductPrice';
import { Product } from 'core/types/Product';
import { makeRequest } from 'core/utils/request';
import ProductInfoLoader from '../Loaders/ProductInfoLoader';
import ProductDescriptionLoader from '../Loaders/ProductDescriptionLoader';
import { EditorState } from 'draft-js';
import { Editor } from "react-draft-wysiwyg";
import { stateFromHTML } from 'draft-js-import-html';
import './styles.scss';

type ParamsType = {
    productId: string;
}

const ProductDetails = () => {
    const { productId } = useParams<ParamsType>();
    const [product, setProduct] = useState<Product>();
    const [isLoading, setIsLoading] = useState(false);
    const contentState = stateFromHTML(product?.description || '');
    const descriptionAsEditorState = EditorState.createWithContent(contentState);

    useEffect(() => {
        setIsLoading(true);
        makeRequest({ url: `/products/${productId}` })
            .then(response => setProduct(response.data))
            .finally(() => setIsLoading(false));
    }, [productId]); // Tudo que for variavel deve ir aqui dentro também;

    return (
        <div className="product-details-container">
            <div className="border-radius-20 card-base product-details">
                <Link to="/products" className="product-details-goback">
                    <ArrowIcon className="icon-goback" />
                    <h1 className="text-goback">Voltar</h1>
                </Link>
                <div className="row product-details-info">
                    {isLoading ? <ProductInfoLoader /> : (
                            <div className="col-xl-6">
                                <div className="product-details-card text-center">

                                    <img src={product?.imgUrl} alt={product?.name} className="product-details-image" />
                                </div>
                                <div className="product-info-fields">
                                    <h1 className="product-details-name">
                                        {product?.name}
                                    </h1>
                                    {product?.price && <ProductPrice price={product?.price} />}
                                </div>
                            </div>
                    )}

                    <div className="product-details-card col-xl-6">
                        {isLoading ? <ProductDescriptionLoader /> : (
                            <>
                                <h1 className="product-description-title">Descrição do produto</h1>
                                <Editor
                                    editorClassName="product-description-text"
                                    editorState={descriptionAsEditorState}
                                    toolbarHidden
                                    readOnly
                                />
                            </>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;