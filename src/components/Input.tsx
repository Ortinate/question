import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, className, ...props }) => {
    return (
        <div className="form-group">
            <label className="label" htmlFor={props.id || props.name}>
                {label}
            </label>
            <input
                className={`input ${error ? 'input-error' : ''} ${className || ''}`}
                {...props}
            />
            {error && <span className="error-message">{error}</span>}
        </div>
    );
};
