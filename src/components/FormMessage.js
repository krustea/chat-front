import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css'

class FormMessage extends Component {
    constructor(props) {
        super(props);
        this.state ={ username: '', content:''}
    }
    handleChange(event){
        event.preventDefault();
        this.setState({ [event.target.name]: event.target.value})
    }

    handleSubmit(event){
        event.preventDefault();
        fetch('http://localhost:4000/messages',{
            method: 'POST',
            headers: {
                'Content-type':'application/json'
            },
            body: JSON.stringify(this.state)
        })
            .then(response=>response.json())
            .then(data=>{
                this.props.socket.emit('New message', data);
                this.setState({content: ''});
            })
    }


    render() {
        return (
            <form onSubmit={event=>this.handleSubmit(event)}>
                <div className="form-group">
                    <input type="text" name="username" value={this.state.username} placeholder="Username" onChange={event=>this.handleChange(event)}/>
                </div>

                <div className="form-group">
                    <textarea name= "content" value={this.state.content} onChange={event=>this.handleChange(event)} id="" cols="30" rows="5"/>
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>

            </form>
        );
    }
}

export default FormMessage;