import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {connect} from "react-redux";

import Layout from "./hoc/Layout";

import PrivateRoute from "./components/common/PrivateRoute";

import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import NoteForm from "./components/Note/NoteForm";

import {setCurrentUser} from "./actions/authActions";

class Routes extends Component {
    componentDidMount() {
        if (window.localStorage.getItem("token")) {
            this.props.setCurrentUser(window.localStorage.getItem("token"));
        }
    }

    render() {
        return (
            <Router>
                <Layout>
                    <Switch>
                        <Route path="/" component={Home} exact/>
                        <Route path="/login" component={Login}/>
                        <Route path="/register" component={Register}/>
                        <PrivateRoute path="/note" exact component={NoteForm}/>
                        <PrivateRoute path="/note/:id" exact component={NoteForm}/>
                    </Switch>
                </Layout>
            </Router>
        );
    }
}


const mapDispatchToProps = {
    setCurrentUser
};

export default connect(null, mapDispatchToProps)(Routes);
