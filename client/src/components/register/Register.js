import React, { Component } from 'react';
import axios from 'axios';

import { TextField, Button } from '@material-ui/core';

import './register.css';

class Register extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: 'Patrik',
            email: 'Pkljfgbdsafkkjsbfgjkldhsfkljsfbgkj@lksadjfhgfklajhg.com',
            password: 'test123',
            passwordAgain: 'test123',
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

        let errors = { ...this.state.errors };

        
        this.setState({
            [name]: value
        });

        console.log(name);
        switch (name) {
            case "name":
                errors.name = (value.trim()).length < 3 ? `Name must be at least 3 characters long` : ``;
                break;

            case "email":
                errors.email = value.length < 6 || this.validEmail(value) == null ? `Email must be at least 6 characters long and must include [@, .]` : ``;
                break;

            case "password":
                errors.password = this.state.password.length <= 6 || this.state.password === this.state.passwordAgain
                    ? `Password must be at least 6 characters long and they must match` : ``;
                break;

            case "passwordAgain":
                errors.password = this.state.password.length <= 6 || this.state.password === this.state.passwordAgain
                    ? `Password must be at least 6 characters long and they must match` : ``;
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
       
        
        axios.post('/api/user/register', {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password  
        }).then(res => {
            console.log(res);
        }).catch( (err) => {
            console.log(err);
        });

        // try {
        //     var result = await axios.post('/api/user/register', {
        //         name: this.state.name,
        //         email: this.state.email,
        //         password: this.state.password
        //     });
        //     console.log(result);
        // } catch (err) {
        //     console.log(`asdadasd`, err );
        // }

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
                        <TextField onChange={e => this.change(e)}
                            name='name' placeholder="Name"
                            value={this.state.name} />
                            <p className='text-warning'>{this.state.errors.name}</p>
                    </div>
                    <div className='register-field'>
                        <TextField onChange={e => this.change(e)}
                            name='email' placeholder="Email"
                            value={this.state.email}/>
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
