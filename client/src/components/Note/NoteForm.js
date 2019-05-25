import React, {Component} from 'react';
import {connect} from "react-redux";

import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import Progress from "../common/Progress";

import { getNote, clearNote, addNote, updateNote } from "../../actions/notesActions";

import validateNote from "../../validation/validateNote";

class NoteForm extends Component {
    state = {
        title: "",
        text: "",
        errors: {}
    };

    componentDidMount() {
        const id = this.props.match.params.id;
        if(id){
            this.props.getNote(id);
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.note !== this.props.note){
            for(let key in this.props.note){
                if(this.state.hasOwnProperty(key)){
                    this.setState({
                        [key]: this.props.note[key]
                    });
                }
            }
        }
    }

    componentWillUnmount() {
        const id = this.props.match.params.id;
        if(id){
            this.props.clearNote();
        }
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        const { text, title } = this.state;
        const dataToSubmit = { text, title };
        const { isValid, errors } = validateNote(dataToSubmit);
        if(!isValid){
            this.setState({
                errors
            })
        } else {
            const id = this.props.match.params.id;
            if(id){
                this.props.updateNote(dataToSubmit, id, this.props.history);
            } else {
                this.props.addNote(dataToSubmit, this.props.history);
            }
        }
    };

    render() {
        if(this.props.loading){
            return <Progress />
        }

        const {title, text, errors} = this.state;
        const id = this.props.match.params.id;
        return (
           <section className="mt-5">
               <div className="container">
                   <div className="row">
                       <div className="col-md-8 m-auto">
                           <h1 className="display-4 text-center mb-2">{ !id ? "Add Note" : "Update Note" }</h1>
                           <form onSubmit={this.handleSubmit}>
                               <TextFieldGroup
                                   placeholder="Add Title"
                                   name="title"
                                   value={title}
                                   onChange={this.handleChange}
                               />
                               <TextAreaFieldGroup
                                   placeholder="Add Text"
                                   name="text"
                                   value={text}
                                   onChange={this.handleChange}
                                   error={errors.text}
                               />
                               <button type="submit" className="btn btn-primary btn-block">Submit</button>
                           </form>
                       </div>
                   </div>
               </div>
           </section>
        );
    }
}

const mapStateToProps = state => ({
    note: state.notes.note,
    loading: state.notes.loading
});

const mapDispatchToProps = {
    getNote,
    clearNote,
    addNote,
    updateNote
};

export default connect(mapStateToProps, mapDispatchToProps)(NoteForm);