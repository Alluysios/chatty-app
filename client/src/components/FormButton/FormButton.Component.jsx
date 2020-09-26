import React from 'react';
import './FormButton.styles.scss';

const FormButton = ({ btnType, size, title }) => {
    return <input type='submit' className={`btn btn--${btnType} btn--${size}`} value={title} />
}

FormButton.defaultProps = {
    btnType: 'primary',
    size: 'sm'
}

export default FormButton
