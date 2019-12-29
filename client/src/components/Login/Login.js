import React, { Component } from 'react';
import axios from 'axios';

import { TextField, Button }  from '@material-ui/core';

import { getJWT } from '../../helpers/jwt';
import './login.css';

class Login extends Component {

	constructor(props) {
		super(props);

		this.state = {
			email: '',
			password: '',
			error: ''
		}

		this.change = this.change.bind(this);
		this.submit = this.submit.bind(this);
	}

	change(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}
	
	componentDidMount() {
        const jwt = getJWT();

        const token = jwt.split(' ')[1] === "null" ? null : jwt.split(' ')[1];

		if(token)
			return this.props.history.push('/Home');
	}

	async submit (e) {
		e.preventDefault();

		try {
			const res = await axios.post('/api/user/login', {
				email: this.state.email,
				password: this.state.password
			});

			if(res.data.validation) {
				this.setState({
					error: res.data.validation
				});
				return;
			}
			
			if(res.data.crendentials) {
				this.setState({
					error: res.data.crendentials
				});
				return;			
			}
			
			localStorage.setItem('jwt', res.data);
			this.props.history.push('/Home');
			
		}
		 catch(err) {
			localStorage.removeItem('jwt');
			return this.props.history.push('/Login');
		}
	}

	render() {
		return (
			<div className='login'>
				<h2>Login</h2>
				<form onSubmit={e => this.submit(e)}>
					<p className='text-warning'>{this.state.error}</p>
					<div className='register-field'>
						<TextField name='email' placeholder='email'
							onChange={e => this.change(e)}
							value={this.state.email}/>
					</div>
					<div className='register-field'>
						<TextField name='password' placeholder='password'
							type='password'
							onChange={e => this.change(e)}
							value={this.state.password}/>
					</div>
					<Button className='login-submit' variant='contained' color='primary' type='submit'>Login</Button>
				</form>
			</div>
		)
	}
}

export default Login;