import React from 'react';

interface Option {
    label: string;
    value: string;
}

interface RadioGroupProps {
    label: string;
    name: string;
    options: Option[];
    value: string;
    onChange: (value: string) => void;
    error?: string;
    className?: string;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({ label, name, options, value, onChange, error, className }) => {
    return (
        <div className={`form-group ${className || ''}`}>
            <label className="label">{label}</label>
            <div className="radio-group-container">
                {options.map((option) => (
                    <label key={option.value} className="radio-label">
                        <input
                            type="radio"
                            name={name}
                            value={option.value}
                            checked={value === option.value}
                            onChange={(e) => onChange(e.target.value)}
                            className="radio-input"
                        />
                        <span className="radio-text">{option.label}</span>
                    </label>
                ))}
            </div>
            {error && <span className="error-message">{error}</span>}
        </div>
    );
};
