import {makeStyles, createStyles} from '@material-ui/styles';
import {Theme} from '@material-ui/core';

export const formStyles = makeStyles((theme: Theme) =>
    createStyles({
        formContainer: {
            width: 1000,
            height: 'inherit',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
        },
        form: {
            alignSelf: 'center',
            height: 'fit-content',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
        },
    }),
);
