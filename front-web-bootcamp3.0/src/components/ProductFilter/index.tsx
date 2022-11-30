import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Category } from 'types/category';
import Select from 'react-select';
import { requestBackend } from 'util/requests';
import './styles.css';

import { ReactComponent as SearchIcon } from 'assets/images/search-icon.svg';
import { DefaultDeserializer } from 'v8';

type ProductFilterData = {
    name: string,
    category: Category | null,
}

const ProductFilter = () => {

    const { register, handleSubmit, setValue, getValues, control } = useForm<ProductFilterData>();

    const [selectCategories, setSelectCategories] = useState<Category[]>([]);

    const handleFormClear = () => {
        setValue('name', '');
        setValue('category', null);
    };

    const handleChangeCategory = (value: Category) => {
        setValue("category", value);

        const obj : ProductFilterData = {
            name: getValues('name'),
            category: getValues('category'),
        }

        console.log('Enviou: ', obj);
    };

    useEffect(() => {
        requestBackend({ url: `/categories` })
            .then(response => {
                setSelectCategories(response.data.content);
            })
    }, [])

    const onSubmit = (formData: ProductFilterData) => {
        console.log('Enviou: ', formData);
    };

    return (
        <div className='base-card product-filter-container'>
            <form onSubmit={handleSubmit(onSubmit)} className='product-filter-form'>
                <div className='product-filter-name-container'>
                    <input
                        {...register("name")}
                        type="text"
                        className='form-control'
                        placeholder="Nome do produto"
                        name="name"
                    />
                    <button className='product-filter-search-icon'>
                        <SearchIcon />
                    </button>
                </div>
                <div className='product-filter-bottom-container'>
                    <div className='product-filter-category-container'>
                        <Controller
                            name='category'
                            control={control}
                            render={({ field }) => (
                                <Select {...field}
                                    options={selectCategories}
                                    isClearable
                                    onChange={value => handleChangeCategory(value as Category)}
                                    getOptionLabel={(categoy: Category) => categoy.name}
                                    getOptionValue={(categoy: Category) => String(categoy.id)}
                                    placeholder={'Categoria'}
                                    classNamePrefix='product-filter-select'
                                />
                            )}
                        />
                    </div>
                    <button
                        onClick={handleFormClear}
                        className='btn btn-outline-secondary product-filter-btn-clear'
                    >
                        LIMPAR <span className='btn-product-filter-word'>FILTRO</span>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProductFilter;
