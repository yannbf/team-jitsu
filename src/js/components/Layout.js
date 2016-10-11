import React from "react";
import Header from "./Header";
import Maps from "./Maps";
import Api from "../util/api";

export default class Layout extends React.Component {
    constructor() {
        super();
        this.state = {
            title: "Team Jitsu",
        };
    }

    componentWillMount() {
        // Fetching data from the API
        new Api().fetchData().then(function (data) {
            this.setState({ teams: data });
        }.bind(this));
    }

    render() {
        return (
            <div>
                <Header title={this.state.title} />
                <Maps class="maps" teams={this.state.teams} />
            </div>
        );
    }
} 