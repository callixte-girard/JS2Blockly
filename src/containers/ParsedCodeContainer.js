import React from 'react';
import ReactDOM from 'react-dom';
import {ParsedCodeLine} from '../components/ParsedCodeLine'

const GUINEAPATHS = [
    'https://s3.amazonaws.com/codecademy-content/courses/React/react_photo-guineapig-1.jpg',
    'https://s3.amazonaws.com/codecademy-content/courses/React/react_photo-guineapig-2.jpg',
    'https://s3.amazonaws.com/codecademy-content/courses/React/react_photo-guineapig-3.jpg',
    'https://s3.amazonaws.com/codecademy-content/courses/React/react_photo-guineapig-4.jpg'
];

export class ParsedCodeContainer extends React.Component {

    constructor(props) {
        super(props);

        this.state = { currentGP: 0 };

        this.interval = null;

        this.nextGP = this.nextGP.bind(this);
    }

    nextGP() {
        let current = this.state.currentGP;
        let next = ++current % GUINEAPATHS.length;
        this.setState({ currentGP: next });
    }

    componentDidMount() {
        this.interval = setInterval(this.nextGP, 5000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        let src = GUINEAPATHS[this.state.currentGP];
        return <ParsedCodeLine src={src} />;
    }
}

ReactDOM.render(
    <ParsedCodeContainer />,
    document.getElementById('app')
);