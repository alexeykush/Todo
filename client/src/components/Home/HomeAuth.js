import React, {Component} from 'react';
import {connect} from "react-redux";

import NoteList from "../NoteList";
import Button from "../common/Button";
import Progress from "../common/Progress";

import { getNotes, getNotesTodo } from "../../actions/notesActions";

class HomeAuth extends Component {
    state = {
        notes: [],
        notesTodo: []
    };

    componentDidMount() {
        this.props.getNotes();
        this.props.getNotesTodo();
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (prevState.notes !== nextProps.notes) {
            return {
                notes: nextProps.notes
            }
        } else if (prevState.notesTodo !== nextProps.notesTodo) {
            return {
                notesTodo: nextProps.notesTodo
            }
        } else return null;
    }

    generateDataToRender = () => {
        const { notes, notesTodo } = this.state;
        if(notes && notesTodo){
            const mappedNotes = notes.map(note => ({...note, type:"note"}));
            const mappedNotesTodo = notesTodo.map(noteTodo => ({...noteTodo, type:"todo"}));
            return [...mappedNotes, ...mappedNotesTodo].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        }
    };

    render() {
        if(this.props.loading) return <Progress />;

        return (
            <section className="mt-5">
                <div className="container p-2">
                    <div className="row text-center">
                        <div className="col-md-6">
                            <Button linkTo="/note" text="Add Note" classes="btn-success"/>
                        </div>
                        <div className="col-md-6">
                            <Button linkTo="/todo" text="Add Todo" classes="btn-primary"/>
                        </div>
                    </div>
                    <NoteList data={this.generateDataToRender()}/>
                </div>
            </section>
        );
    }
}

const mapStateToProps = state => ({
    notes: state.notes.notes,
    notesTodo: state.notes.notesTodo,
    loading: state.notes.loading
});

const mapDispatchToProps = {
    getNotes,
    getNotesTodo
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeAuth);