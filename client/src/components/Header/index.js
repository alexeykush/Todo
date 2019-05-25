import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {connect} from "react-redux";

class Header extends Component {
    renderLinks() {
        const gustLinks = (
            <>
                <li className="nav-item">
                    <Link to="/register" className="nav-link">
                        Sign Up
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/login" className="nav-link">
                        Login
                    </Link>
                </li>
            </>
        );

        const authLinks = (
            <li className="nav-item">
                <a href="#" className="nav-link cursor-pointer">
                    Logout
                </a>
            </li>
        );

        return this.props.auth && this.props.auth.isAuth ? authLinks : gustLinks;
    };

    render() {
        return (
            <header className="w-100">
                <nav className="navbar navbar-expand-sm navbar-dark bg-success mb-4">
                    <div className="container">
                        <Link to="/" className="navbar-brand font-weight-bold text-uppercase">Todo</Link>
                        <button className="navbar-toggler" data-toggle="collapse" data-target="#mobile-nav">
                            <span className="navbar-toggler-icon"> </span>
                        </button>

                        <div className="collapse navbar-collapse" id="mobile-nav">
                            <ul className="navbar-nav ml-auto">
                                {this.renderLinks()}
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(Header);