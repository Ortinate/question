import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label: string;
    options: { value: string; label: string }[];
    error?: string;
}

export const Select: React.FC<SelectProps> = ({ label, options, error, className, ...props }) => {
    return (
        <div className="form-group">
            <label className="label" htmlFor={props.id || props.name}>
                {label}
            </label>
            <select
                className={`select ${error ? 'select-error' : ''} ${className || ''}`}
                {...props}
            >
                <option value="">Select an option</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {error && <span className="error-message">{error}</span>}
        </div>
    );
};
