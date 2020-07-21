import React, {Component} from 'react';

class App extends Component{

    constructor(){
        super();
        this.state = {
            title: '',
            description: '',
            tasks: [],
            _id: ''
        };
        this.addTask = this.addTask.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.cancelUpdate = this.cancelUpdate.bind(this);
    }

    componentDidMount(){
        this.fetchTasks();
    }

    fetchTasks(){
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
          
        fetch("/api/tasks", requestOptions)
            .then(response => response.json())
            .then(data => {
                const {tasks} = data;
                this.setState({tasks});
                console.log(this.state);
            })
            .catch(error => console.log('error', error));
    }

    handleChange(e){
        const {name, value} = e.target;
        this.setState({
            [name]: value
        });
    }

    addTask(e){
        e.preventDefault();
        if(this.state._id){
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({"title":this.state.title,"description":this.state.description});

            var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
            };

            fetch("/api/tasks/" + this.state._id, requestOptions)
            .then(response => response.json())
            .then(data => {
                M.toast({html: data.status});
                this.setState({title: '', description: '', _id: ''});
            })
            .catch(error => console.log('error', error));
        }else{
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
    
            var raw = JSON.stringify({"title":this.state.title,"description":this.state.description});
    
            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };
    
            fetch("/api/tasks", requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                M.toast({html: data.status});
                this.setState({title: '', description: ''});
                this.fetchTasks();
            })
            .catch(error => console.log('error', error));
        }
    }

    updateTask(id){
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("/api/tasks/" + id, requestOptions)
        .then(response => response.json())
        .then(data => {
            this.setState({
                _id: data._id,
                title: data.title,
                description: data.description
            });
            console.log(data);
        })
        .catch(error => console.log('error', error));
    }

    cancelUpdate(){
        this.setState({title: '', description: '', _id: ''});
    }

    deleteTask(id){
        if(confirm('Are you sure you want to delete it?')){
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
    
            var raw = "";
    
            var requestOptions = {
                method: 'DELETE',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };
    
            fetch("/api/tasks/" + id, requestOptions)
            .then(response => response.json())
            .then(data => {
                M.toast({html: data.status});
                this.fetchTasks();
            })
            .catch(error => console.log('error', error));
        }
    }

    render(){
        return(
            <div>
                {/* {NAVIGATION} */}
                <nav className="light-blue darken-4">
                    <div className="container">
                        <a className="brand-logo" href="/">MERN Stack</a>
                    </div>
                </nav>

                <div className="container">
                    <div className="row">
                        <div className="col s5">
                            <div className="card">
                                <div className="card-content">
                                    <form onSubmit={this.addTask}>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input 
                                                    name="title" 
                                                    onChange={this.handleChange}
                                                    placeholder="Task Title" 
                                                    type="text" 
                                                    value={this.state.title}
                                                />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <textarea 
                                                    className="materialize-textarea"
                                                    name="description" 
                                                    onChange={this.handleChange}
                                                    placeholder="Task Description" 
                                                    value={this.state.description}
                                                >

                                                </textarea>
                                            </div>
                                        </div>
                                        <button type="submit" className="btn light-blue darken-4">Send</button>
                                        {this.state._id 
                                            ? <button type="button" className="btn red darken-4" style={{marginLeft: '4px'}} onClick={this.cancelUpdate}>Cancel</button>
                                            : ''
                                        }
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col s7">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Description</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.tasks.map(task => {
                                        return(
                                            <tr key={task._id}>
                                                <td>{task.title}</td>
                                                <td>{task.description}</td>
                                                <td>
                                                    <button className="btn light-blue darken-4" onClick={() => this.updateTask(task._id)}><i className="material-icons">edit</i></button>
                                                    <button className="btn light-blue darken-4" style={{marginLeft: '4px'}} onClick={() => this.deleteTask(task._id)}><i className="material-icons">delete</i></button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;