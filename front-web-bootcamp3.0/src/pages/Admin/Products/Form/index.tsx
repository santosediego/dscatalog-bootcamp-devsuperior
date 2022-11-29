import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Product } from 'types/product';
import { AxiosRequestConfig } from 'axios';
import { requestBackend } from 'util/requests';
import { useHistory, useParams } from 'react-router-dom';
import Select from 'react-select';
import { Category } from 'types/category';
import './styles.css';

type UrlParams = {
    productId: string;
}

const Form = () => {

    const { productId } = useParams<UrlParams>();
    const isEditing = productId !== 'create';

    const { register, handleSubmit, formState: { errors }, setValue, control } = useForm<Product>();

    const history = useHistory();

    const [selectCategories, setSelectCategories] = useState<Category[]>([]);

    useEffect(() => {
        if (isEditing) {
            requestBackend({ url: `/products/${productId}` })
                .then((response) => {

                    const product = response.data as Product;

                    setValue('name', product.name);
                    setValue('price', product.price);
                    setValue('description', product.description);
                    setValue('imgUrl', product.imgUrl);
                    setValue('categories', product.categories);
                });
        }
    }, [isEditing, productId, setValue]);

    useEffect(() => {
        requestBackend({ url: `/categories` })
            .then(response => {
                setSelectCategories(response.data.content);
            })
    }, [])

    const onSubmit = (formData: Product) => {

        const data = {
            ...formData,
            imgUrl: isEditing ? formData.imgUrl : "https://raw.githubusercontent.com/devsuperior/dscatalog-resources/master/backend/img/22-big.jpg"
        }

        const config: AxiosRequestConfig = {
            method: isEditing ? 'PUT' : 'POST',
            url: isEditing ? `/products/${productId}` : `/products`,
            data,
            withCredentials: true,
        }

        requestBackend(config)
            .then((response) => {
                handleBack();
            })
            .catch(error => {
                console.log(error)
            });
    };

    const handleBack = () => {
        history.push('/admin/products');
    }

    return (
        <div className='product-crud-bar-container'>
            <div className='base-card product-card-form-card'>
                <h1 className='product-card-form-card-title'>Dados do produto</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='row product-card-inputs-container'>
                        <div className='col-lg-6 product-card-inputs-left-container'>
                            <div className='margin-botton-30'>
                                <input
                                    {...register("name", {
                                        required: { value: true, message: "Campo obrigatório!" }
                                    })}
                                    type="text"
                                    className={`form-control base-input ${errors.name ? 'is-invalid' : ''}`}
                                    placeholder="Nome do produto"
                                    name="name"
                                />
                                <div className="invalid-feedback d-block">
                                    {errors.name?.message}
                                </div>
                            </div>

                            <div className='margin-botton-30'>
                                <Controller
                                    name='categories'
                                    rules={{ required: true }}
                                    control={control}
                                    render={({ field }) => (
                                        <Select {...field}
                                            options={selectCategories}
                                            classNamePrefix="product-crud-select"
                                            isMulti
                                            getOptionLabel={(categoy: Category) => categoy.name}
                                            getOptionValue={(categoy: Category) => String(categoy.id)}
                                            placeholder={"Categorias"}
                                        />
                                    )}
                                />
                                {errors.categories && (
                                    <div className="invalid-feedback d-block">
                                        Campo obrigatório!
                                    </div>
                                )}
                            </div>

                            <div className='margin-botton-30'>
                                <input
                                    {...register("price", {
                                        required: { value: true, message: "Campo obrigatório!" }
                                    })}
                                    type="number"
                                    className={`form-control base-input ${errors.price ? 'is-invalid' : ''}`}
                                    placeholder="Preço"
                                    step={"0.01"}
                                    name="price"
                                />
                                <div className="invalid-feedback d-block">
                                    {errors.price?.message}
                                </div>
                            </div>
                        </div>

                        <div className='col-lg-6'>
                            <div>
                                <textarea
                                    {...register("description", {
                                        required: { value: true, message: "Campo obrigatório!" }
                                    })}
                                    className='form-control base-input h-auto'
                                    placeholder="Descrição"
                                    name="description"
                                    rows={10}
                                />
                                <div className="invalid-feedback d-block">
                                    {errors.description?.message}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="product-crud-buttons-container">
                        <button
                            className='btn btn-outline-danger product-crud-button'
                            onClick={handleBack}
                        >
                            CANCELAR
                        </button>
                        <button
                            type='submit'
                            className='btn btn-primary product-crud-button text-white'
                        >
                            SALVAR
                        </button>
                    </div>
                </form>
            </div>
        </div>

    );
}

export default Form;
