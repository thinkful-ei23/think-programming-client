import React, { Component } from 'react';
import { connect } from 'react-redux';

class Projects extends React {
    constructor(props) {
        super(props);
        this.state = {
            myTyping: '',
            challengerTyping: ''
        }
    }
render() {
        return (
            <div className="projects-header">
                <h1>Projects</h1>
            </div>
        );
}
}

const mapStateToProps = state => ({

});

export default (connect(mapStateToProps)(Projects));
