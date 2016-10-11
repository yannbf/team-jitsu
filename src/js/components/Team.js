import React from 'react';
import Maps from './Maps';
import L from 'leaflet';

export default class Team extends React.Component {

    // Gets gym location and puts a pin in the map with its info.
    handleClick() {
        var gym = this.props.gym;
        if (gym) {
            var latLong = [gym.lat, gym.lng];
            var popupContent = '<h4 class="center"><a href=' + gym.facebook + ">" + gym.title + '</a></h4>' + '<p>' + gym.description + '</p>';
            this.props.addMarker(latLong, popupContent);
            this.scrollTo("header");
        }
    }

    scrollTo(element) {
        var element = document.getElementById(element)
        element.scrollIntoView(true);
    }

    render() {
        let { full_path, name, leader } = this.props.team;
        let { title, address } = this.props.gym;

        return (
            <tr class="pointer" onClick={this.handleClick.bind(this)}>
                <td class="center"><img class="team-logo" src={full_path} /></td>
                <td data-label="Equipe">{name}</td>
                <td data-label="Academia">{title}</td>
                <td data-label="Endereço">{address}</td>
                <td data-label="Instrutor">{leader}</td>
            </tr>
        );
    }
}   