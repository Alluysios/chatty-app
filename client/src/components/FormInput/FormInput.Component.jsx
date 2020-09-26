import React from 'react';
import './FormInput.styles.scss';

const FormInput = ({ type, placeholder, value, onChange, label, id, name, className }) => {
    return (
        <div className='input__group'>
            {
                label ? <label htmlFor={name} className='input__label'>{label}</label> : null
            }
            <input 
                className={`input ${className}`}
                type={type} 
                id={id}
                name={name}
                placeholder={placeholder} 
                value={value}
                onChange={e => onChange(e.target.value)}
            />
        </div>
    )
}

FormInput.defaultProps = {
    type: 'text',
    placeholder: '',
    value: '',
    className:'',
    onChange: () => {}
}

export default FormInput;