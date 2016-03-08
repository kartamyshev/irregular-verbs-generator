import verbs from './verbs.js';
import 'Css/App.styl';


class App extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            verbs: verbs,
            value: "",
            baseForms: [],
            found: []
        };
    }

    getVerbs() {
        let baseForms = [];
        let verbs = [];
        this.state.verbs.forEach(verb => {
            let splitted = verb.split('\t');

            baseForms.push(splitted[0]);
            verbs.push(splitted);
        });
        return { verbs, baseForms };
    }

    componentDidMount() {
        let { verbs, baseForms } = this.getVerbs();
        this.setState({ verbs, baseForms });
    }

    handleChange(e) {
        let found = this.state.verbs.filter(verb => {
            return verb[0] === e.target.value;
        })[0] || [];

        this.setState({ found });
    }

    renderResult() {
        let cells = this.state.found.map((cell, index) => {
            return <div key={index} className="result-item">{cell}</div>
        });

        return <div className="result">
            <div className="result-section thead">
                <div className="result-item">Base Form</div>
                <div>Past Simple</div>
                <div>Past Participle</div>
            </div>
            <div className="result-section tbody">
                { cells }
            </div>
        </div>;
    }

    render() {
        let result = this.renderResult();
        return (
            <div role="main">
                <input ref="input" type="text" placeholder="Base Form" onChange={this.handleChange.bind(this)} />
                { result }
            </div>
        );
    }
}

App.defaultProps = {

};

ReactDOM.render(
    <App />,
    document.getElementById('application-container')
);
