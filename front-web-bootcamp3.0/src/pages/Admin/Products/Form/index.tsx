import React from 'react';
import './styles.css';

const Form = () => {
    return (
        <div className='product-crud-bar-container'>
            <div className='base-card product-card-form-card'>
                <h1 className='product-card-form-card-title'>Dados do produto</h1>
                <form action="">
                    <div className="row">
                        <div className="col-lg-6">
                            <input type="text" className='form-control base-input' />
                            <input type="text" className='form-control base-input' />
                            <input type="text" className='form-control base-input' />
                        </div>
                        <div className="col-lg-6">
                            <textarea
                                name=""
                                className='form-control base-input'
                                rows={10}
                            />
                        </div>
                    </div>
                    <div>
                        <button className='btn btn-outline-danger'>CANCELAR</button>
                        <button className='btn btn-primary'>SALVAR</button>
                    </div>
                </form>
            </div>
        </div>

    );
}

export default Form;
