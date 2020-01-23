import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Note.scss'

export class Note extends Component {
    constructor() {
        super();
        this.state = {
            isEditingTitle: true,
        }
        this.inputRef = React.createRef();
    }
    focusOnInput() {
        this.inputRef.current.focus();
    }
    componentDidMount() {
        this.focusOnInput();
    }
    setTitle(value) {
        let title = value || 'Note';
        this.props.setTitle(this.props.note.id, title);
        this.setState({
            isEditingTitle: false,
        })
        this.setCurrentNote();
    }
    handleOnBlur(e) {
        this.setTitle(e.target.value);
        e.stopPropagation();
    }
    handleSubmit(e) {
        if (e.key === 'Enter') {
            this.setTitle(e.target.value);
        }
        e.stopPropagation();
    }
    removeSelf(e) {
        this.props.removeSelf(this.props.note.id);
        e.stopPropagation();
    }
    editTitle(e) {
        this.setState({
            isEditingTitle: true,
        }, this.focusOnInput);
        
        e.stopPropagation();
    }
    setCurrentNote() {
        this.props.setCurrentNote(this.props.note.id);
    }
    render() {
        return (
            <div className='note' onClick={this.setCurrentNote.bind(this)}>
                <input ref={this.inputRef}
                       style={{'display' : this.state.isEditingTitle? 'block' : 'none'}}
                       onKeyDown={this.handleSubmit.bind(this)}
                       onBlur={this.handleOnBlur.bind(this)} 
                >
                </input>
                <div className={`note__title ${this.props.note.id === this.props.currentNote? 'note__title_active':''}`} 
                     style={{'display' : this.state.isEditingTitle? 'none' : 'flex'}}>
                    <h3> {this.props.note.title} </h3>
                    <button onClick={this.editTitle.bind(this)}>Edit</button>
                    <button onClick={this.removeSelf.bind(this)}>X</button>
                </div>
            </div>
        )
    }
}

Note.propTypes = {
    note: PropTypes.object,
}

export default Note
