import React from 'react';

interface LikertScaleProps {
    label: string;
    name: string;
    value: string;
    onChange: (value: string) => void;
    minLabel?: string;
    maxLabel?: string;
    options?: { value: string; label: string }[]; // Optional custom labels/values
    error?: string;
}

// Default options if none provided: 1 to 5
const defaultOptions = [
    { value: '1', label: '1 - Poor' },
    { value: '2', label: '2 - Fair' },
    { value: '3', label: '3 - Neutral' },
    { value: '4', label: '4 - Good' },
    { value: '5', label: '5 - Excellent' },
];

export const LikertScale: React.FC<LikertScaleProps> = ({
    label,
    name,
    value,
    onChange,
    options = defaultOptions,
    error
}) => {
    return (
        <div className="likert-container">
            <label className="label likert-label">{label}</label>
            <div className="likert-options">
                {options.map((option) => (
                    <label
                        key={option.value}
                        className={`
              likert-option
              ${value === option.value ? 'selected' : ''}
              ${error ? 'border-red-500' : ''}
            `}
                    >
                        <input
                            type="radio"
                            name={name}
                            value={option.value}
                            checked={value === option.value}
                            onChange={(e) => onChange(e.target.value)}
                            className="sr-only"
                        />
                        <span className="likert-value">{option.value}</span>
                        <span className="likert-text">{option.label.split(' - ')[1] || option.label}</span>
                    </label>
                ))}
            </div>
            {error && <span className="error-message mt-2 block">{error}</span>}
        </div>
    );
};
