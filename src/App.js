import verbs from './verbs.js';
import 'Css/App.styl';


class App extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            verbs: verbs,
            value: "",
            baseForms: [],
            found: [],
            initialLoad: true
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
        this.setState({
            value: e.target.value
        });
    }

    handleSubmit() {
        this.setState({ initialLoad: false });
        let found = this.state.verbs.filter(verb => {
            return verb[0] === this.state.value;
        })[0];
        this.setState({ found });
    }

    renderResult() {
        let result, cells;

        if (this.state.initialLoad) return;
        if (_.isUndefined(this.state.found)) {
            result = "Wrong. Try another one.";
        } else {
            cells = this.state.found.map((cell, index) => {
                return <div key={index} className="result-item">{cell}</div>
            });
            result = <div>
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

        return <div className="result">
            
            { result }
        </div>;
    }

    renderForm() {
        let disabled = this.state.value.length === 0;
        return <form action="#">
            <input ref="input" type="text" placeholder="Base Form" onChange={this.handleChange.bind(this)} />
            <button disabled={disabled} type="submit" onClick={this.handleSubmit.bind(this)}>Get Forms</button>
        </form>
    }

    render() {
        let form = this.renderForm();
        let result = this.renderResult();
        return (
            <div role="main">
                { form }
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
