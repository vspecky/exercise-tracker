import React, { Component, ChangeEvent, FormEvent } from 'react';
import DatePicker from "react-datepicker";
import { RouteComponentProps } from 'react-router-dom';
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";

interface MatchParams {
    id: string;
}

interface EditExerciseProps extends RouteComponentProps<MatchParams> {};

interface EditExerciseState {
    username: string;
    description: string;
    duration: number;
    date: Date;
    users: Array<string>;
};

export default class EditExercise extends Component<EditExerciseProps, EditExerciseState> {
    constructor(props: EditExerciseProps) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: "",
            description: "",
            duration: 0,
            date: new Date(),
            users: []
        }
    }

    componentDidMount() {
        axios.get(`http://localhost:5000/exercises/get/${this.props.match.params.id}`)
            .then(res => {
                this.setState({
                    username: res.data.username,
                    description: res.data.description,
                    duration: res.data.duration,
                    date: new Date(res.data.date)
                });
            })
            .catch(console.error);

        axios.get("http://localhost:5000/users/")
            .then(res => {
                if (res.data.length > 0) {
                    const userArr = res.data.map((user: any) => user.username)
                    this.setState({
                        users: userArr,
                    });
                }
            })
            .catch(console.error);
    }

    onChangeUsername(e: ChangeEvent<HTMLSelectElement>) {
        this.setState({
            username: e.target.value
        });
    }

    onChangeDescription(e: ChangeEvent<HTMLInputElement>) {
        this.setState({
            description: e.target.value
        });
    }

    onChangeDuration(e: ChangeEvent<HTMLInputElement>) {
        this.setState({
            duration: Number(e.target.value)
        });
    }

    onChangeDate(date: any) {
        this.setState({
            date: date
        });
    }

    onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const exercise = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date,
        };

        axios.post(`http://localhost:5000/exercises/update/${this.props.match.params.id}`, exercise)
            .then(res => console.log(res.data))
            .catch(console.log);

        console.log(exercise);

        this.setState({
            username: "",
            description: "",
            duration: 0,
            date: new Date(),
            users: []
        });

        //window.location.href = '/';
    }

    render() {
        return (
            <div>
                <h3>Edit Exercise Log</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username</label>
                        <select ref="userInput"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}>
                            {
                                this.state.users.map(user => {
                                    return <option key={user} value={user}>{user}</option>
                                })
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <input type="text" 
                            required
                            className="form-control"
                            value={this.state.description}
                            onChange={this.onChangeDescription}/>
                    </div>
                    <div className="form-group">
                        <label>Duration (minutes)</label>
                        <input type="text" 
                            required
                            className="form-control"
                            value={this.state.duration}
                            onChange={this.onChangeDuration}/>
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <div>
                            <DatePicker
                                selected={this.state.date}
                                onChange={this.onChangeDate}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Edit Log" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        );
    }
}