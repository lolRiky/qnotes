import React from 'react';

import { Button } from '@material-ui/core';

import { logOut } from '../../helpers/jwt';

const LogOut = (props) => {
    return <Button onClick={logOut} className={props.style}>Logout</Button>
};

export default LogOut;