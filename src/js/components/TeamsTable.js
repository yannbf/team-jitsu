import React from "react";
import Team from "./Team";

export default class TeamsTable extends React.Component {

    getTeamsTable() {
        var items = [];
        this.props.teams.map((team) => {
            if (team.gyms.length > 0) {
                team.gyms.map((gym) => {
                    items.push(<Team team={team} gym={gym} addMarker={this.props.addMarker} />);
                });
            }
        });

        return items;
    }

    render() {
        var teams = this.getTeamsTable();
        return (
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>Equipe</th>
                        <th>Academia</th>
                        <th>Endereço</th>
                        <th>Instrutor</th>
                    </tr>
                </thead>
                <tbody>
                    {teams}
                </tbody>
            </table>
        );
    }
}   