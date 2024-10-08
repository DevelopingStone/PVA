import React, { Component } from "react";
import "./App.css";

export default class App extends Component {

  state = {
    todoData: [],
    value: ""
  };

  buttonStyle = {
    color: "#ffff",
    border: "none",
    padding: "5px 9px",
    borderRadius: "50%",
    cursor: "pointer",
    float: "right"
  }

  getStyle = (completed) => {
    return {
      padding: "10px",
      borderBottom: "1px #ccc dotted",
      textDecoration: completed ? "line-through" : "none"
    }
  }

  // getStyle = {
  //   padding: "10px",
  //   borderBottom: "1px #ccc dotted",
  //   texDecoration: 'none'
  // }


  handleClick = (id) => {
    let newTodoData = this.state.todoData.filter(data => data.id !== id)
    console.log('newTodoData', newTodoData);
    this.setState({ todoData: newTodoData });
  }

  handleChange = (e) => {
    this.setState({ value: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault();

    let newTodo = {
      id: Date.now(),
      title: this.state.value,
      completed: false,
    };

    this.setState({ todoData: [...this.state.todoData, newTodo], value: "" });
  };

  handleCompleteChange = (id) =>{
    let newTOdoData = this.state.todoData.map(data => {
      if(data.id ===id){
        data.completed = !data.completed;
      }
        return data;
    })

    this.setState({ todoData: newTOdoData})
  }

  render() {
    return (
      <div className="container">
        <div className="todoBlock">
          <div className="title">
            <h1>PVA Todo-List</h1>
          </div>

          {this.state.todoData.map((data) => (
            <div style={this.getStyle(data.completed)} key={data.id}>
              <input type="checkbox" defaultChecked={false} onChange={()=> this.handleCompleteChange(data.id)}/>
              {data.title}
              <button style={this.buttonStyle} onClick={() => this.handleClick(data.id)}>x</button>
            </div>
          ))}

          <form style={{ display: 'flex' }} onSubmit={this.handleSubmit}>
            <input
              type="text"
              name="value"
              style={{ flex: '10', padding: '5px' }}
              placeholder="해야 할 일 입력하세요."
              value={this.state.value}
              onChange={this.handleChange}
            />
            <input
              type="submit"
              value="입력"
              className="btn"
              style={{ flex: '1' }}
            />
          </form>


        </div>
      </div >
    )
  }
}