import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {Provider} from "react-redux";

import store from "./store";

import Layout from "./hoc/Layout";
import Home from "./components/Home";

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <Layout>
                        <Switch>
                            <Route path="/" component={Home} exact/>
                        </Switch>
                    </Layout>
                </Router>
            </Provider>
        );
    }
}

export default App;
