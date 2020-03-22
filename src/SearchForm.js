import React from 'react';

class SearchForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = { value: '' };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {
        return <form className="form-inline mr-auto p-2">
            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" value={this.state.value} onChange={this.handleChange} />
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={this.handleSubmit}>Search</button>
        </form>
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        const searchValue = this.state.value;
        this.props.searchHandler(searchValue);
        event.preventDefault();
        this.setState({ value: '' });
    }
}

export default SearchForm;