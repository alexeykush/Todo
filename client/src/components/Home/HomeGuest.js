import React from 'react';
import { Link } from "react-router-dom";

const HomeGuest = () => (
    <section className="bg-warning vh-100 d-flex justify-content-center align-items-center p-3">
        <div className="container text-center">
            <h2 className="mb-5">You have to sign in or sign up to make your notes</h2>
            <Link to="/login" className="btn btn-lg btn-primary mr-2">
                Login
            </Link>
            <Link to="/register" className="btn btn-lg btn-primary mr-2">
                Sign Up
            </Link>
        </div>
    </section>
);

export default HomeGuest;