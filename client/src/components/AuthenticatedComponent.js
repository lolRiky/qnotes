import React, { Component } from 'react';

import { getJWT } from '../helpers/jwt';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

class AuthenticatedComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: undefined
        };
    }

    // Before accesing routes check JWT if it's corrupted via server
    async componentDidMount() {
        const jwt = getJWT();

        const jwtValue = jwt.split(' ')[1] === "null" ? null : jwt.split(' ')[1];

        if(!jwtValue)
            return this.props.history.push('/Login');

        try {
            const res = await axios.get('/api/user/getUser', { headers: { Authorization: jwt } });
            
            this.setState({
                user: res.data
            });

        } catch (err) {
            console.error(`errr::::::::::: `, err);
            localStorage.removeItem('jwt');
            this.props.history.push('/Login');
        }
    }

    render() {
        
        if(this.state.user === undefined)
            return (
                <div><h1>Loading...</h1></div>
            );

        return (
            <div>
                {this.props.children}
            </div>
        );
    }

}

export default withRouter(AuthenticatedComponent);