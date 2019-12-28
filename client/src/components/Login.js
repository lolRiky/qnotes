import React, { Component } from 'react';
import axios from 'axios';

import { getJWT } from '../helpers/jwt';

class Login extends Component {

	constructor(props) {
		super(props);

		this.state = {
			email: '',
			password: ''
		}
	}

	change = (e) => {
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

	submit = async (e) => {
		e.preventDefault();

		try {
			var res = await axios.post('/api/user/login', {
				email: this.state.email,
				password: this.state.password
			});

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
			<form onSubmit={e => this.submit(e)}>
				<div>
					<label>email</label><input type='text' name='email' onChange={e => this.change(e)} value={this.state.email}/>
				</div>
				<div>		
					<label>password</label><input type='password' name='password' onChange={e => this.change(e)} value={this.state.password}/>
				</div>
				<button type='submit'>Submit</button>
			</form>
		)
	}

}

export default Login;