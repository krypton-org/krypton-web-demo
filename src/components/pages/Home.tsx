import React from 'react';

export default () => {
    return (
        <div>
            <section className="hero is-primary">
                <div className="hero-body">
                    <div className="container">
                        <h1 className="title">Welcome to this todo list app made with React and Krypton for authentication.</h1>
                        <h2 className="subtitle">Register to add your todos!</h2>
                    </div>
                </div>
            </section>
            <div className="container">
                <p>
                    This is just a demo, the database is purged each night. It aims to show how easy it is to use
                    Krypton for website authentication.
                </p>
                <p>Check source on <a href="https://github.com/krypton-org/krypton-web-demo" target="_blank" rel="noopener noreferrer">GitHub</a></p>
            </div>
        </div>
    );
};
