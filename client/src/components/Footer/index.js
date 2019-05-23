import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-success p-3 text-white">
            <div className="container text-center">
                Copyright &copy; {new Date().getFullYear()} Todo
            </div>
        </footer>
    );
};

export default Footer;