import React from 'react';
import {Repeat} from "../../types";

interface RepeatSelectProps {
    selectedValue?: Repeat | 'none';
    onChange: (value?: Repeat) => void;  // Update the type to allow undefined
}

const RepeatSelect: React.FC<RepeatSelectProps> = ({ selectedValue, onChange }) => {
    const repeatOptions: Repeat[] = ['daily', 'weekly', 'monthly', 'yearly'];

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        onChange(value === 'none' ? undefined : value as Repeat);
    };

    return (
        <select value={selectedValue || 'none'} onChange={handleChange}>
            <option value="none">None</option>
            {repeatOptions.map(option => (
                <option key={option} value={option}>{option}</option>
            ))}
        </select>
    );
};

export default RepeatSelect;
