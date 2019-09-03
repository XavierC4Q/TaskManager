import React from 'react';
import {Link as RouterLink} from 'react-router-dom'
import {AuthContext} from '../context/AuthContext';
import {Container, Typography, Paper, Link} from '@material-ui/core';


const Feed = () => {
    const {currentUser} = React.useContext(AuthContext);

    return (
        <div>
            <h3>Feed Here</h3>
        </div>
    );
};

export default Feed;
