import React, { Component } from 'react';
import './App.css';
import { fetchNotes, addNote, deleteNote, sortNote } from './actions';
import Navigation from './components/navigation';
import NotesList from './components/notesList';
import { connect } from 'react-redux';
import { Switch, Route, withRouter } from'react-router-dom';
import AddNoteForm from './components/addNoteForm';
import EditForm from './components/editForm';
import SingleNote from './components/singleNote';


class App extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      textBody: ''
    }
  };
  componentWillMount() {
    this.props.fetchNotes();
  };

  handleInputChange = event => this.setState({ 
    [event.target.name]: event.target.value 
  });
  clickHandler = event => {
    event.preventDefault();
    this.props.addNote(this.state)
    this.setState({ title: '', textBody: '' });
    window.location.reload();  
    this.props.history.push('/notes');
    
  };
  handleDelete=(event)=> { 
    this.props.deleteNote(event);
    window.location.reload(); 
    this.props.history.push('/notes'); 
  };
  sortNotesAZ = () => {
    this.props.sortNote();  
  };
  
  render() {
    return (
      <div className="App">
        <Navigation className='nav-bar'/>
        <Switch>  
          <Route exact path='/notes' render={()=>
            <NotesList {...this.props} sortNotesAZ={this.sortNotesAZ} delete={this.handleDelete} notes={this.props.notes} />
          } />        
          <Route path='/new-note' render={()=>
            <AddNoteForm 
              {...this.props}
              inputChange={this.handleInputChange} 
              data={this.state}
              clickHandler={this.clickHandler}/>
          } />
          <Route path='/edit-form/:id' component={EditForm} /> 
          <Route path="/notes/:id" render={props => (
              <SingleNote {...props} handleDelete={this.handleDelete}/>
            )}
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    notes: state.notes,
    fetching: state.fetching,
  };
};

export default withRouter(connect(mapStateToProps,{ fetchNotes, addNote, deleteNote, sortNote })(App));
