import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import WorkoutCreate from './WorkoutCreate';
import WorkoutsTable from './WorkoutTable';
import WorkoutEdit from './WorkoutEdit';
import { AuthContext } from '../auth/AuthContext';


class WorkoutIndex extends Component{
    constructor(props) {
        super(props)
        this.state = {
          workouts: [],
          updatePressed: false,
          workoutToUpdate: {}
        }
      }

    componentDidMount() {
        this.fetchWorkouts()
    }

    fetchWorkouts = () => {
        fetch("http://localhost:3000/log", {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.auth.token
            })
        })
        .then((res) => res.json())
        .then((logData) => {
            return this.setState({ workouts: logData })
        })
    }

    workoutDelete = (event) => {
        fetch(`http://localhost:3000/log/${event.target.id}`, {
          method: 'DELETE',
          body: JSON.stringify({ log: { id: event.target.id } }),
          headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': this.props.auth.token
          })
        })
        .then((res) => this.fetchWorkouts())
      }

    workoutUpdate = (event, workout) => {
        fetch(`http://localhost:3000/log/${workout.id}`, {
            method: 'PUT',
            body: JSON.stringify({log: workout}),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.auth.token
            })
        })
        .then((res) => {
            this.setState({updatePressed: false})
            this.fetchWorkouts();
        })
    }

    setUpdatedWorkout = (event, workout) => {
        this.setState({
            workoutToUpdate: workout,
            updatePressed: true
        })
    }

    render(){
        const workouts = this.state.workouts.length >= 1 ?
            <WorkoutsTable workouts={this.state.workouts} delete={this.workoutDelete} update={this.setUpdatedWorkout} /> :
            <h2>Log a workout to see table</h2>
        return (
            <Container>
                <Row>
                    <Col md="3">
                        <WorkoutCreate token={this.props.token} updateWorkoutsArray={this.fetchWorkouts}/>
                    </Col>
                    <Col md="9">
                        {workouts}
                    </Col>
                </Row>
                <Col md='12'>
                    {
                        this.state.updatePressed ? <WorkoutEdit t={this.state.updatePressed} update={this.workoutUpdate} workout={this.state.workoutToUpdate} />
                        : <div></div>
                    }
                </Col>
            </Container>
        )
    }
}

export default props => (
    <AuthContext.Consumer>
        {auth => <WorkoutIndex{...props} auth={auth} />}
    </AuthContext.Consumer>
);