import React, { Component } from 'react';
import {hostname} from '../utils/global';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            eventList: null
        };
    }
    async componentDidMount() {
        // https://github.com/MdSamsuzzohaShayon/mern-graphql-events-booking/blob/8_optamize_bugfix_chart/frontend/src/pages/Events.jsx
        try {
            const response = await fetch(`${hostname}/api/home`);
            const result = await response.text();
            this.setState({
                eventList: result
            });
            console.log(result);
        } catch (error) {
            console.log(error);
        }

    }

    render() {
        return (
            <div>
                Home
                {this.state.eventList}
            </div>
        )
    }
}

export default Home;
