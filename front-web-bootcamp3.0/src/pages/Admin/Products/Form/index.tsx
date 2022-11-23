import React from 'react';
import './styles.css';

const Form = () => {
    return (
        <div className='product-crud-bar-container'>
            <div className='base-card product-card-form-card'>
                <h1 className='product-card-form-card-title'>Dados do produto</h1>
                <form>
                    <div className='row product-card-inputs-container'>
                        <div className='col-lg-6 product-card-inputs-left-container'>
                            <div className='margin-botton-30'>
                                <input
                                    type='text'
                                    className='form-control base-input'
                                />
                            </div>
                            <div className='margin-botton-30'>
                                <input
                                    type='text'
                                    className='form-control base-input'
                                />
                            </div>
                            <div>
                                <input
                                    type='text'
                                    className='form-control base-input'
                                />
                            </div>
                        </div>
                        <div className='col-lg-6'>
                            <div>
                                <textarea
                                    name=''
                                    className='form-control base-input h-auto'
                                    rows={10}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="product-crud-buttons-container">
                        <button
                            type='button'
                            className='btn btn-outline-danger product-crud-button'
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
