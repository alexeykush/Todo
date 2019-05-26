import React, {Component} from 'react';
import {connect} from "react-redux";

import TextFieldGroup from "../common/Form/TextFieldGroup";
import TextAreaFieldGroup from "../common/Form/TextAreaFieldGroup";
import FileUpload from "../common/Form/FileUpload";
import Progress from "../common/Progress";

import {getNote, clearNote, addNote, updateNote, uploadNoteImage, removeNoteImage} from "../../actions/notesActions";

import validateNote from "../../validation/validateNote";

class NoteForm extends Component {
    state = {
        title: "",
        text: "",
        image: {},
        errors: {}
    };

    componentDidMount() {
        const id = this.props.match.params.id;
        if (id) {
            this.props.getNote(id);
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const { title, image, text } = this.props.note;
        if(prevProps.note.title !== title){
            this.setState({ title });
        }
        if(prevProps.note.image !== image){
            this.setState({ image });
        }
        if(prevProps.note.text !== text){
            this.setState({ text });
        }
    }

    componentWillUnmount() {
        this.props.clearNote();
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        const {text, title, image} = this.state;
        const dataToSubmit = {text, title, image};
        const {isValid, errors} = validateNote(dataToSubmit);
        if (!isValid) {
            this.setState({
                errors
            })
        } else {
            const id = this.props.match.params.id;
            if (id) {
                this.props.updateNote(dataToSubmit, id, this.props.history);
            } else {
                this.props.addNote(dataToSubmit, this.props.history);
            }
        }
    };


    render() {
        const id = this.props.match.params.id;

        const {title, text, image, errors} = this.state;
        const { uploadNoteImage, removeNoteImage, imageLoading } = this.props;

        if (this.props.loading) {
            return <Progress/>
        }

        return (
            <section className="mt-5">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center mb-2">{!id ? "Add Note" : "Update Note"}</h1>
                            <form onSubmit={this.handleSubmit}>
                                <FileUpload
                                    image={image}
                                    upload={uploadNoteImage}
                                    remove={removeNoteImage}
                                    loading={imageLoading}
                                />
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
    loading: state.notes.loading,
    imageLoading: state.notes.imageLoading
});

const mapDispatchToProps = {
    getNote,
    clearNote,
    addNote,
    updateNote,
    uploadNoteImage,
    removeNoteImage
};

export default connect(mapStateToProps, mapDispatchToProps)(NoteForm);