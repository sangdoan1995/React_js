import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from './Header/HomeHeader'
import Specialty from './Section/Specialty';

class HomePage extends Component {

    render() {

        return (
            <div>
                <HomeHeader />
                <Specialty />
                <div stype={{ height: '100px' }}></div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);