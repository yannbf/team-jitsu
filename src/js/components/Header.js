import React from "react";

export default class Header extends React.Component {
    render() {
        return (
            <div id="header" className="topbar">
                <a href="/"><h1>{this.props.title}</h1></a>
                <section>
                    By Yann Braga
                </section>
            </div>
        );
    }
}