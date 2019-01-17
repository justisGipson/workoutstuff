import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { AuthContext } from "./AuthContext";

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: ''
        };
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    handleSubmit = (event) => {
        fetch("http://localhost:3000/user/login", {
            method: 'POST',
            body: JSON.stringify({user:this.state}),
            headers: new Headers({
                'Content-Type': 'application/json'
                })
        }).then(
            (res) => res.json()
        ).then((data) => {
            this.props.auth.setToken(data.sessionToken)
        }) 
        event.preventDefault()
    }

    render() {
        return (
            <div>
                <h1>Login</h1>
                <h6>Two ghostly white figures in coveralls and helmets are soflty dancing kindling the energy hidden in matter citizens of distant epochs Tunguska event take root and flourish a mote of dust suspended in a sunbeam. </h6>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="username">Username</Label>
                        <Input id="li_username" type="text" name="username" placeholder="enter username" onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input id="li_password" type="password" name="password" placeholder="enter password" onChange={this.handleChange} />
                    </FormGroup>
                    <Button type="submit">Submit</Button>
                </Form>
            </div>
        )
    }
}
export default props => (
    <AuthContext.Consumer>
        {auth => <Login {...props} auth={auth} />}
    </AuthContext.Consumer>
);