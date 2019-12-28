import React, { Component } from 'react';

class Register extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            password: '',
        };
    }


    render() {
        return(
            <div>
                <h2>Register</h2>
                <form>
                    <div>
                        <label htmlFor='name'>Name</label>
                        <input type='text' name='name' />
                    </div>
                    <div>
                        <label htmlFor='email'>Email</label>
                        <input type='email' name='email' />
                    </div>
                    <div>
                        <label htmlFor='password'>Password</label>
                        <input type='password' name='password' />
                    </div>
                    <div>
                        <label htmlFor='passwordagain'>Password again</label>
                        <input type='password' name='passwordagain' />
                    </div>

                    <button type='submit'>Register</button>
                </form>
            </div>
        );
    }
}

export default Register;
