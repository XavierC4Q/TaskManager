import React from 'react';
import {Field, FieldProps} from 'formik';
import TextField from '@material-ui/core/TextField';

interface IInput {
    id: string;
    label: string;
    value: string;
}

const Input: React.FC<IInput> = ({id, label, value}) => {
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
