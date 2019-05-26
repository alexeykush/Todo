import React, {Component} from 'react';
import { connect } from "react-redux";

import TextFieldGroup from "../common/Form/TextFieldGroup";
import validateRegister from "../../validation/validateRegister";

import { registerUser } from "../../actions/authActions";

class Register extends Component {
    state = {
        name:"",
        lastname: "",
        email: "",
        password: "",
        confirmPassword: "",
        errors: {}
    };

    componentDidUpdate(prevProps, prevState) {
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
        const { name, lastname, email, password, confirmPassword} = this.state;
        const dataToSubmit = {
            name,
            lastname,
            email,
            password
        };
        const { isValid, errors } = validateRegister({...dataToSubmit, confirmPassword});
        if(!isValid){
            this.setState({
                errors
            });
        } else {
            this.props.registerUser(dataToSubmit, this.props.history);
        }
    };

    handleChange = e => {
        this.setState({
            [e.target.name] : e.target.value
        });
    };

    render() {
        const { name, lastname, email, password, confirmPassword, errors } = this.state;

        return (
            <section className="login mb-4">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Register</h1>
                            <p className="lead text-center">Sign up your account in Todo</p>
                            <form onSubmit={this.handleSubmit}>
                                <TextFieldGroup
                                    placeholder="Name"
                                    name="name"
                                    value={name}
                                    onChange={this.handleChange}
                                    error={errors.name}
                                />

                                <TextFieldGroup
                                    placeholder="Last name"
                                    name="lastname"
                                    value={lastname}
                                    onChange={this.handleChange}
                                    error={errors.lastname}
                                />
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
                                 <TextFieldGroup
                                    type="password"
                                    placeholder="Confirm Password"
                                    name="confirmPassword"
                                    value={confirmPassword}
                                    onChange={this.handleChange}
                                    error={errors.confirmPassword}
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
    registerUser
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);