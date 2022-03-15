import React, { Component } from "react";

import "./Search.css";

import SearchIcon from "react-icons/lib/md/search";

//////////////////////////////////////////////////////// THIS COMPONENT IS BEING RENDERED IN THE *HEADER* COMPONENT

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    let word = e.target.value;
    this.setState({ searchTerm: word });
  }
  render() {
    const { filterPost } = this.props;
    return (
      <section className="Search__parent">
        <div className="Search__content">
          <input placeholder="Search Your Feed" onChange={this.handleSubmit} />

          <SearchIcon
            id="Search__icon"
            onClick={() => filterPost(this.state.searchTerm)}
          />
        </div>
      </section>
    );
  }
}
