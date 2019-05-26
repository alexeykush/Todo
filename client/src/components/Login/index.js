import React, {Component} from 'react';
import { connect } from "react-redux";

import TextFieldGroup from "../common/Form/TextFieldGroup";
import validateLogin from "../../validation/validateLogin";

import { loginUser } from "../../actions/authActions";

class Login extends Component {
    state = {
        email: "",
        password: "",
        errors: {}
    };

    componentDidMount() {
        if(this.props.auth.isAuth){
            this.props.history.push("/");
        }
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.auth.isAuth){
            this.props.history.push("/");
        }
        if(prevProps.errors !== this.props.errors){
            this.setState({
                errors: this.props.errors
            });
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        const { email, password } = this.state;
        const dataToSubmit = {
            email,
            password
        };
        const { isValid, errors } = validateLogin(dataToSubmit);
        if(!isValid){
            this.setState({
                errors
            });
        } else {
            this.props.loginUser(dataToSubmit, this.props.history);
        }
    };

    handleChange = e => {
        this.setState({
            [e.target.name] : e.target.value
        });
    };

    render() {
        const { email, password, errors } = this.state;

        return (
            <section className="login mb-4">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Log In</h1>
                            <p className="lead text-center">Sign in to your Notes</p>
                            <form onSubmit={this.handleSubmit}>
                                <TextFieldGroup
                                    type="email"
                                    placeholder="Email Address"
                                    name="email"
                                    value={email}
                                    onChange={this.handleChange}
                                    error={errors.email}
                                />

                                <TextFieldGroup
                                    type="password"
                                    placeholder="Password"
                                    name="password"
                                    value={password}
                                    onChange={this.handleChange}
                                    error={errors.password}
                                />

                                <input
                                    type="submit"
                                    className="btn btn-success btn-block mt-4"
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

const mapDispatchToProps = {
    loginUser
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);