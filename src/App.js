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
        let [baseForms, verbs] = this.state.verbs.reduce((result, verb) => {
            let splitted = verb.split('\t');
            result[0].push(splitted[0]);
            result[1].push(splitted);
            return result;
        }, [[], []] );

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
                <div>Base Form</div>
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
                <input
                    type="text"
                    placeholder="Base Form"
                    onChange={this.handleChange.bind(this)}
                />
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
