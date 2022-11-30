import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Category } from 'types/category';
import Select from 'react-select';
import { requestBackend } from 'util/requests';
import './styles.css';

import { ReactComponent as SearchIcon } from 'assets/images/search-icon.svg';

type ProductFilterData = {
    name: string,
    category: Category,
}

const ProductFilter = () => {

    const { register, handleSubmit, control } = useForm<ProductFilterData>();

    const [selectCategories, setSelectCategories] = useState<Category[]>([]);

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
                                    getOptionLabel={(categoy: Category) => categoy.name}
                                    getOptionValue={(categoy: Category) => String(categoy.id)}
                                    placeholder={'Categoria'}
                                    classNamePrefix='product-filter-select'
                                />
                            )}
                        />
                    </div>
                    <button className='btn btn-outline-secondary product-filter-btn-clear' >
                        LIMPAR <span className='btn-product-filter-word'>FILTRO</span>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProductFilter;
