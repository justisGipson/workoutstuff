import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { AuthContext } from "./AuthContext";

class Signup extends Component {
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
        fetch("http://localhost:3000/user", {
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
                <h1>Sign Up</h1>
                <h6>Something incredible is waiting to be known ship of the imagination a still more glorious dawn awaits billions upon billions Vangelis dream of the mind's eye. </h6>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="username">Username</Label>
                        <Input id="username" type="text" name="username" placeholder="enter username" onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input id="su_password" type="password" name="password" placeholder="enter password" onChange={this.handleChange} />
                    </FormGroup>
                    <Button type="submit"> Submit </Button>
                </Form>
            </div>
        )
    }
}

export default props => (
    <AuthContext.Consumer>
        {auth => <Signup{...props} auth={auth} />}
    </AuthContext.Consumer>
);