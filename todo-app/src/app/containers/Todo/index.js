import React, { Component } from 'react';
import uuid from 'uuid/v4';
import PropTypes from 'prop-types';
import { SyncLoader } from "react-spinners";
import { connect } from 'react-redux';

import {
  Button,
  TextBox,
  GroupField,
} from '../../components';
import { K_SHOW_ALL,K_SHOW_COMPLETED, K_SHOW_ACTIVE } from '../../constants/constantFilter'
import { addTodo, deleteTodo, changeStatusTodo, getTodo, postTodo } from '../../actions/actionTodo';
import { visibilityFilter } from '../../actions/actionFilter'
import { getFilter, filterTodo } from '../../selectors/selectorFilter';


class LoadingComponent extends Component {
  render() {
    return (
      <div className="sweet-loading">
      <SyncLoader color={"#123abc"} loading="true" />
      </div>
    );
  }
}

class Todo extends Component {
  static propTypes = {
    todos: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    filter: PropTypes.string.isRequired,
    // handleSubmit: PropTypes.func.isRequired,
    // handleChange: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      input_value: '', 
      content: '', 
      cur_fil: '',
      todos:[],
      isLoad:true,
    }
  }

  handleSubmit = (event) => {
    let index = uuid();
    const { addTodo } = this.props;
    const { input_value } = this.state;
    addTodo(index,input_value);
    postTodo(index,input_value);
    this.setState({input_value: ''})

  }

  handleCancel = (event) => {
    this.setState({input_value: ''})
  }

  handleChange = (event) => {
    this.setState({
      input_value: event.target.value,
    })
  }

  handleDelete = (index) => {
    const {deleteTodo} = this.props;

    deleteTodo(index);

  }

  handleChangeStatus = (index,status) => {
    const {changeStatusTodo} = this.props;

    if (status === K_SHOW_ACTIVE) {
      changeStatusTodo(index,K_SHOW_COMPLETED);
    } else {
      changeStatusTodo(index,K_SHOW_ACTIVE);
    }
  }

  handleChangeFilter = (filter) => {
    const {visibilityFilter} = this.props;

    visibilityFilter(filter);
  }

  componentDidMount= () => {
    this.props.getTodo()
    console.log("component did mount")
  }

  rendTodo = (todo) => {
    let showStatus = todo.status === K_SHOW_ACTIVE ? "Active" : "Completed";
    let button_label = todo.status === K_SHOW_ACTIVE ? "Done" : "Undone"
    return (
      <section key={todo.id} className="hero">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">
              {todo.text}
            </h1>
            <h2 className="subtitle">
              {showStatus}
            </h2>
            <GroupField>
              <Button size="small" color="danger" label="Delete" handleClick={() => this.handleDelete(todo.id)}/>
              <Button size="small" color="success" label={button_label} handleClick={() => this.handleChangeStatus(todo.id, todo.status)}/>
            </GroupField>
          </div>
        </div>
      </section>
    )

  }

  checkColor = (status) => (status === this.props.filter ? "info" : "link")

  render() {
    // console.log(this.props);
    const content = this.props.todos.map(this.rendTodo);
    // const content = this.state.todos.map(this.rendTodo);

    if (this.props.todos.length === 0) {
      return (
        <LoadingComponent />
      );
    }

    return (
      <div>
        <section id="todo-form" className="notification">
          <TextBox
            label="Create your todo here"
            placeholder="Todo"
            help="Please input unicode character"
            handleChange={this.handleChange}
            val={this.state.input_value}
          />
          <GroupField>
            <Button label="Submit" size="large" color="primary" handleClick={this.handleSubmit} />
            <Button size="large" type="text" label="Cancel" handleClick={this.handleCancel}/>
          </GroupField>
        </section>

        <section className="notification">
          <h4 className="title is-4">
            Show: 
          </h4>
          <GroupField>
            <Button label="ALL" size="normal" color={this.checkColor(K_SHOW_ALL)} handleClick={() => this.handleChangeFilter(K_SHOW_ALL)}/>
            <Button label="ACTIVE" size="normal" color={this.checkColor(K_SHOW_ACTIVE)} handleClick={() => this.handleChangeFilter(K_SHOW_ACTIVE)}/>
            <Button label="COMPLETE" size="normal" color={this.checkColor(K_SHOW_COMPLETED)} handleClick={() =>this.handleChangeFilter(K_SHOW_COMPLETED)}/>
          </GroupField>
        </section>

        <section id="todo-form" className="notification">
          { content }
        </section>
      </div>
    );
  }
};

const mapStatetoProps = (state) => ({
  todos : filterTodo(state.todos),
  filter : getFilter(state.todos)
})

const mapDispatchToProps = (dispatch) => ({
  postTodo: (index,text) => dispatch(postTodo(index,text)),
  addTodo : (index,text) => dispatch(addTodo(index,text)),
  deleteTodo : index => dispatch(deleteTodo(index)),
  changeStatusTodo : (index,status) => dispatch(changeStatusTodo(index,status)),
  visibilityFilter: filter => dispatch(visibilityFilter(filter)),
  getTodo: () => dispatch(getTodo())
})


export default connect(mapStatetoProps,mapDispatchToProps)(Todo);