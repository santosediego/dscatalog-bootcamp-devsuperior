import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Product } from 'types/product';
import { AxiosRequestConfig } from 'axios';
import { requestBackend } from 'util/requests';
import { useHistory, useParams } from 'react-router-dom';
import Select from 'react-select';
import { Category } from 'types/category';
import CurrencyInput from 'react-currency-input-field';
import { toast } from 'react-toastify';
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
            price: String(formData.price).replace(',','.'),
        }

        const config: AxiosRequestConfig = {
            method: isEditing ? 'PUT' : 'POST',
            url: isEditing ? `/products/${productId}` : `/products`,
            data,
            withCredentials: true,
        }

        requestBackend(config)
            .then((response) => {
                toast.info('Registro salvo com sucesso.');
                handleBack();
            })
            .catch(error => {
                toast.error('Erro ao salvar o registro.');
            });
    };

    const handleBack = () => {
        history.push('/admin/products');
    }

    return (
        <div className='product-crud-bar-container'>
            <div className='base-card product-card-form-card'>
                <h1 className='product-card-form-card-title'>Dados do produto</h1>
                <form onSubmit={handleSubmit(onSubmit)} data-testid='form'>
                    <div className='row product-card-inputs-container'>
                        <div className='col-lg-6 product-card-inputs-left-container'>
                            <div className='margin-botton-30'>
                                <input
                                    {...register("name", {
                                        required: { value: true, message: "Campo obrigatório!"},
                                        minLength: {value: 5, message: 'Entre 5 a 60 caracteres'}
                                    })}
                                    type="text"
                                    className={`form-control base-input ${errors.name ? 'is-invalid' : ''}`}
                                    placeholder="Nome do produto"
                                    name="name"
                                    data-testid='name'
                                />
                                <div className="invalid-feedback d-block">
                                    {errors.name?.message}
                                </div>
                            </div>

                            <div className='margin-botton-30'>
                                <label htmlFor="categories" className='d-none'>Categorias</label>
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
                                            inputId='categories'
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
                                <Controller
                                    name='price'
                                    rules={{ required: 'Campo obrigatório!' }}
                                    control={control}
                                    render={({field}) => (
                                        <CurrencyInput
                                            placeholder='Preço'
                                            className={`form-control base-input ${errors.price ? 'is-invalid' : ''}`}
                                            disableGroupSeparators={true}
                                            value={field.value}
                                            onValueChange={field.onChange}
                                            data-testid='price'
                                        />
                                    )}
                                />
                                <div className="invalid-feedback d-block">
                                    {errors.price?.message}
                                </div>
                            </div>

                            <div className='margin-botton-30'>
                                <input
                                    {...register("imgUrl", {
                                        required: { value: true, message: "Campo obrigatório!" },
                                        pattern: {
                                            value: /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/gm,
                                            message: "Deve ser uma URL válida"
                                        }
                                    })}
                                    type="text"
                                    className={`form-control base-input ${errors.imgUrl ? 'is-invalid' : ''}`}
                                    placeholder="URL da imagem"
                                    name="imgUrl"
                                    data-testid='imgUrl'
                                />
                                <div className="invalid-feedback d-block">
                                    {errors.imgUrl?.message}
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
                                    data-testid='description'
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
