import React from 'react';
import axios from 'axios';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import './index.css'



export default class App extends React.Component {
  state = {
    text: '',
    todos: []
    }

  componentDidMount() {
    axios.get(`http://localhost:3333/todos`)
      .then(res => {
        const todos = res.data;
        this.setState({ todos });
      })
  }

  handleChange = event => {
    this.setState({ text: event.target.value });
    
  }

  limparForm = e => {
    this.setState({
		   text: '',
      erros: ''
    });
  }

  handleSubmit = event => {
    this.limparForm() 
    event.preventDefault();
    axios.post(`http://localhost:3333/todos`,{ text: this.state.text})
      .then(res => {
        console.log(res);
        console.log(res.data);
        this.limparForm()
       this.setState({ todos: [...this.state.todos, res.data]});
      })

  }

  render() {
    return (
      <div className="App">
        <h1>TO DO LIST WEEK 1 OMINISTACK</h1>
        <form onSubmit={this.handleSubmit}>
          <label>
            <TextField type="text" name="text"  className="Input"
            helperText="insert new todolist ."
            variant="filled"
            onChange={this.handleChange} />
          </label>
          <Button type="submit" variant="contained" id="button">Adicionar</Button>
        </form>
        <Card id="Card">
        { this.state.todos.map(todos => <li>{todos.text}</li>)}
      </Card>
      </div>
    )
  }
}