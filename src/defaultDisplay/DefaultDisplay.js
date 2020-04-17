import React from 'react';

class DefaultDisplay extends React.Component {
    render() {
        return <div className="jumbotron jumbotron-fluid text-white">
            <div className="container fixed-bottom">
                <h1 className="display-1">ML Stock Site</h1>
                <p className="h1">Inovating machine learning based stock prediction trends</p>
                <p className="h1 mb-5 pb-5">Sign up now!</p>
            </div>
        </div>
    }
}

export default DefaultDisplay;