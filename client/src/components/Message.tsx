import React from 'react';
import {createStyles, makeStyles} from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import {Theme, CardHeader, CardContent} from '@material-ui/core';
import Container from '@material-ui/core/Container';

type TMessageType = 'success' | 'error' | 'info' | 'warning';

interface IMessageProps {
    messageType: TMessageType;
    message: string;
    header: string;
}

const useMessageStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: ({type}: {type: TMessageType}) => {
            switch (type) {
                case 'success':
                    return {
                        background: 'green',
                    };
                case 'error':
                    return {
                        background: 'red',
                    };
                case 'info':
                    return {
                        background: 'blue',
                    };
                case 'warning':
                    return {
                        background: 'yellow',
                    };
                default:
                    return {
                        background: 'white',
                    };
            }
        },
    }),
);

const Message: React.FC<IMessageProps> = ({messageType, message, header}) => {
    const classes = useMessageStyles({type: messageType});

    return (
        <Card className={classes.root}>
            <CardHeader title={header} />
            <CardContent>
                <Typography variant="body1">{message}</Typography>
            </CardContent>
        </Card>
    );
};


export default Message;