import React, { Component, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

interface CreateUserProps {};

interface CreateUserState {
    username: string;
}

export default class CreateUser extends Component<CreateUserProps, CreateUserState> {
    constructor(props: CreateUserProps) {
        super(props);
        
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        
        this.state = {
            username: ''
        };
    }

    onChangeUsername(e: ChangeEvent<HTMLInputElement>) {
        this.setState({
            username: e.target.value
        });
    }

    onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const user = {
            username: this.state.username
        };

        console.log(user);

        axios.post("http://localhost:5000/users/add", user)
            .then(res => console.log(res.data))
            .catch(console.log);

        this.setState({
            username: ''
        });
    }

    render() {
        return (
            <div>
                <h3>Create new User</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username</label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}/>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create User" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        );
    }
}