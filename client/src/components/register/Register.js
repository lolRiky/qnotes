import React, { Component } from 'react';
import axios from 'axios';

import { TextField, Button } from '@material-ui/core';

import './register.css';

class Register extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            password: '',
            passwordAgain: '',
            errors: {
                name: '',
                email: '',
                password: ''
            }
        };

        this.change = this.change.bind(this);
        this.submit = this.submit.bind(this);
    }

    change(e) {
        let name = e.target.name;
        let value = e.target.value;

        this.setState({
            [name]: value
        });
        
        let errors = { ...this.state.errors };
        switch (name) {
            case "name":
                errors.name = (value.trim()).length < 3 ? `Name must be at least 3 characters long` : ``;
                break;

            case "email":
                errors.email = value.length < 6 && this.validEmail(value) == null ? `Email must be at least 6 characters long and must include [@, .]` : ``;
                break;

            case "password":
                errors.password = value.length <= 5 || value !== this.state.passwordAgain ? `Passwords must match and be at least 6 characters long` : ``;
                break;

            case "passwordAgain":
                errors.password = value.length <= 5 || value !== this.state.password ? `Passwords must match and be at least 6 characters long` : ``;
                break;

            default:
                console.error(`error unknown field name`);
                break;
        }

        this.setState({
            errors: errors
        });
    }

    async submit(e) {
        e.preventDefault();

        try {
            const result = await axios.post('/api/user/register', {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password
            });

            if(result.data.validation) {
                this.setState({
                    errors: {
                        email: result.data.validation
                    }
                });
                return;
            }

            this.props.history.push('/Login');

        } catch (err) {
            console.log(err);
        }

    }

    validEmail(email) {
        const validEmailRegex =
            RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

        return email.match(validEmailRegex);
    }


    render() {
        return (
            <div className='register'>
                <h2>Register</h2>
                <form onSubmit={e => this.submit(e)}>
                    <div className='register-field'>
                        <TextField autoFocus onChange={e => this.change(e)}
                            name='name' placeholder="Name"
                            value={this.state.name} />
                        <p className='text-warning'>{this.state.errors.name}</p>
                    </div>
                    <div className='register-field'>
                        <TextField onChange={e => this.change(e)}
                            name='email' placeholder="Email"
                            value={this.state.email} />
                        <p className='text-warning'>{this.state.errors.email}</p>
                    </div>
                    <div className='register-field'>
                        <TextField onChange={e => this.change(e)}
                            name='password' placeholder="Password" type='password'
                            value={this.state.password} />
                    </div>
                    <div className='register-field'>
                        <TextField onChange={e => this.change(e)}
                            name='passwordAgain' placeholder="Password Again" type='password'
                            value={this.state.passwordAgain} />
                        <p className='text-warning'>{this.state.errors.password}</p>
                    </div>
                    <Button variant='contained' color='primary' type='submit'>Register</Button>
                </form>
            </div>
        );
    }
}

export default Register;
