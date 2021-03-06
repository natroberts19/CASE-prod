// ---------------------------------------------------------------------------------------------------------
// The SearchFrom component allows the user to search for a student by 7-digit student id.
// This componenet also includes the Notes component that allows the user to add a note to a student record.
// ---------------------------------------------------------------------------------------------------------

import React, { Component } from 'react';
import "./style.css";
import StudentResults from "../StudentResults";
import Notes from "../Notes";
import axios from "axios";

class SearchForm extends Component {
    state = {
        search: "",
        note: "",
        notes: []        
    };

// Handle changes to the form input fields:
    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

// Handle the search form submit. Get existing student values. * Need Error handling *
    handleSearchSubmit = (event, searchValues) => {
        console.log("SearchForm, handleSearchSubmit, searchValues.studentId: ", searchValues.studentId);
        event.preventDefault();

        axios.get(`/api/students/search/${searchValues.studentId}`)
            .then((results) => {
                console.log("SearchForm, axios get search, results: ", results);
                console.log("SearchForm, axios get note, results.data.notes: ", results.data.notes);
                this.setState({
                    student: results.data,
                    notes: results.data.notes
                });

            }).catch((err) => {
                console.log(err);
            });

            this.setState({
                studentId: "",
            });
    }

    render() {
        return (
            <div className="container">
                <div className="row panel-row">
                {/* Student id search form input section. */}
                    <div className="container" id="searchForm">
                        <form onSubmit={(event) => this.handleSearchSubmit(event, this.state)}>
                            <fieldset>
                                <div className="form-group">
                                    <legend><i className="fa fa-search"></i> Search</legend>
                                    <hr />
                                    <label htmlFor="search">Enter 7-digit id:</label>
                                    <input className="form-control" id="searchStudId" rows="1" name="studentId" value={this.state.studentId} onChange={this.handleInputChange} />
                                </div>
                                <button type="submit" className="btn btn-primary" id="existingStudent">Search</button>
                            </fieldset>
                        </form>
                    </div>
                </div>
                <p />
                
                {/* Student search results render section. */}
                <div className="row panel-row">
                    <div className="container" id="studentForm">
                        <legend><i className="fa fa-edit"></i> Results</legend>
                        <hr />
                        {
                            this.state.student ? 
                            <StudentResults 
                                student={this.state.student} 
                            /> : 
                            <h3> {this.state.message} </h3>
                        } 
                        {
                            this.state.notes ? 
                            <Notes 
                                notes={this.state.notes}
                            /> : 
                            <h3> {this.state.message} </h3>
                        }
                    </div>
                </div>
            </div>
        )
    }
}


export default SearchForm;