import React from 'react';

export default () => {
    const style: React.CSSProperties = {
        backgroundColor: '#F3F3F3',
        paddingTop: '10px',
        paddingBottom: '0px',
        position: 'fixed',
        bottom: '0',
        minHeight: '60px',
        width: '100%',
    };
    return (
        <footer className="footer" style={style}>
            <div className="content has-text-centered">
                <p>
                    <strong>Krypton Web Demonstration</strong>. The source code is available under the <a href="https://github.com/krypton-org/krypton-web-demo/blob/master/LICENSE">MIT</a> license.
                </p>
            </div>
        </footer>
    );
};
