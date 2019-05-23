import React from 'react';

import Header from "../components/Header";
import Footer from "../components/Footer";

const Layout = ({children}) => {
    return (
        <>
            <Header />
            <div className="page-container" style={{paddingTop: "56px"}}>
                {children}
            </div>
            <Footer />
        </>
    );
};

export default Layout;