import React from 'react';
import { connect } from "react-redux";

import HomeGuest from "./HomeGuest";
import HomeAuth from "./HomeAuth";

const Home = ({ auth }) => {
    return auth && auth.isAuth ? <HomeAuth /> : <HomeGuest />
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(Home);