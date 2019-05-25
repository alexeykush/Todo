import React from 'react';

import "./index.css";

import Header from "../components/Header";
import Footer from "../components/Footer";

const Layout = ({children}) => {
    return (
        <>
            <Header />
            <div className="page-container">
                {children}
            </div>
            <Footer />
        </>
    );
};

export default Layout;