import React from 'react';
import {Field, FieldProps} from 'formik';
import TextField from '@material-ui/core/TextField';
import {Select, MenuItem} from '@material-ui/core';

interface IInput {
    id: string;
    label: string;
    value: string;
    choices?: string[];
}

const Input: React.FC<IInput> = ({id, label, value, choices}) => {
    if (choices && choices.length > 0) {
        return (
            <Field
                id={id}
                render={({field}: FieldProps) => (
                    <Select
                        value={value}
                        onChange={field.onChange}
                        inputProps={{
                            name: field.name,
                            id,
                        }}
                    >
                        {choices.map(choice => <MenuItem value={choice}>{choice}</MenuItem>)}
                    </Select>
                )}
            />
        );
    }
    return (
        <Field
            id={id}
            render={({field}: FieldProps) => (
                <TextField
                    id={id}
                    name={field.name}
                    label={label}
                    margin="normal"
                    variant="standard"
                    value={value}
                    onChange={field.onChange}
                />
            )}
        />
    );
};

export default Input;
