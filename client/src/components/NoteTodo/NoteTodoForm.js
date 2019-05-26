import React, {Component} from 'react';
import {connect} from "react-redux";

import TextFieldGroup from "../common/Form/TextFieldGroup";
import TodoGroup from "../common/Form/TodoGroup";
import AddItemBtn from "../common/Buttons/AddItemBtn";

import {addTodo, updateTodo, getTodo, clearTodo, uploadTodoImage, removeTodoImage} from "../../actions/notesActions";
import Progress from "../common/Progress";
import FileUpload from "../common/Form/FileUpload";

class NoteTodoForm extends Component {
    state = {
        title: "",
        list: [
            {
                text: "",
                completed: false
            }
        ],
        image: {}
    };

    componentDidMount() {
        const id = this.props.match.params.id;
        if (id) {
            this.props.getTodo(id);
        }
    }

    componentWillUnmount() {
        this.props.clearTodo();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const { title, image, lists } = this.props.todo;
        if(prevProps.todo.title !== title){
            this.setState({ title });
        }
        if(prevProps.todo.image !== image){
            this.setState({ image });
        }
        if(prevProps.todo.lists !== lists){
            this.setState({ list: lists });
        }
    }


    handleChange = (e, index) => {
        if (index === undefined) {
            this.setState({
                [e.target.name]: e.target.value
            });
        } else {
            const newList = [...this.state.list];
            newList[index].text = e.target.value;
            this.setState({
                list: newList
            });
        }
    };

    handleSubmit = e => {
        e.preventDefault();
        const id = this.props.match.params.id;
        const {title, list, image} = this.state;
        const filteredList = list.filter(item => item.text !== "");
        if (filteredList.length) {
            const dataToSubmit = {items: filteredList, title, image};
            if (id) {
                this.props.updateTodo(dataToSubmit, id, this.props.history);
            } else {
                this.props.addTodo(dataToSubmit, this.props.history);
            }
        } else {
            this.props.history.push("/");
        }
    };

    handleCheckboxChange = index => {
        const newList = [...this.state.list];
        newList[index].completed = !newList[index].completed;
        this.setState({
            list: newList
        });
    };

    addItem = () => {
        const newItem = {
            text: "",
            completed: false
        };
        this.setState({
            list: [...this.state.list, newItem]
        });
    };

    deleteItem = index => {
        if (this.state.list.length > 1) {
            const newList = [...this.state.list];
            newList.splice(index, 1);
            this.setState({
                list: newList
            });
        }
    };

    renderTodoGroups = () => (
        this.state.list.map((item, i) => (
            <TodoGroup
                key={i}
                text={item.text}
                placeholder="List Item"
                completed={item.completed}
                onChange={(e) => this.handleChange(e, i)}
                onCheckboxChange={() => this.handleCheckboxChange(i)}
                onDelete={() => this.deleteItem(i)}
            />
        ))
    );

    render() {
        const id = this.props.match.params.id;

        const {title, image} = this.state;
        const { uploadTodoImage, removeTodoImage, imageLoading, loading } = this.props;

        if (loading) {
            return <Progress/>
        }
        return (
            <section className="mt-5 mb-3">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center mb-2">{!id ? "Add Todo" : "Update Todo"}</h1>
                            <form onSubmit={this.handleSubmit}>
                                <FileUpload
                                    image={image}
                                    upload={uploadTodoImage}
                                    remove={removeTodoImage}
                                    loading={imageLoading}
                                />
                                <TextFieldGroup
                                    placeholder="Add Title"
                                    name="title"
                                    value={title}
                                    onChange={this.handleChange}
                                />
                                {this.renderTodoGroups()}
                                <AddItemBtn onClick={this.addItem}/>
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
    todo: state.notes.todo,
    loading: state.notes.loading,
    imageLoading: state.notes.imageLoading
});

const mapDispatchToProps = {
    addTodo,
    updateTodo,
    getTodo,
    clearTodo,
    uploadTodoImage,
    removeTodoImage
};

export default connect(mapStateToProps, mapDispatchToProps)(NoteTodoForm);