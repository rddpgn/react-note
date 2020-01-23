import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Notebook.scss';

export class Notebook extends Component {
    constructor() {
        super();
        this.state = {
            isEditingTitle: true,
            isOpen: false,
        }
        this.inputRef = React.createRef();
    }
    setTitle(value) {
        let title = value || 'Notebook';
        this.props.setTitle(this.props.notebook.id, title);
        this.setState({
            isEditingTitle: false,
        })
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
    handleOpening() {
        this.setState({
            isOpen: !this.state.isOpen,
        })
    }
    componentDidMount() {
        this.focusOnInput();
    }
    addNote() {
        this.props.addNote(this.props.notebook.id);
    }
    removeSelf(e) {
        this.props.removeSelf(this.props.notebook.id);
        e.stopPropagation();
    }
    editTitle(e) {
        this.setState({
            isEditingTitle: true,
        }, this.focusOnInput);
        
        e.stopPropagation();
    }
    focusOnInput() {
        this.inputRef.current.focus();
    }
    render() {
        return (
            <div className='notebook'>
                <div onClick={this.handleOpening.bind(this)}>
                    <div style={{'display' : this.state.isEditingTitle? 'none' : 'flex' }}
                         className='notebook__title'
                    >
                        <h2>{this.props.notebook.title}</h2>
                        <button onClick={this.editTitle.bind(this)}>Edit</button>
                        <button onClick={this.removeSelf.bind(this)}>X</button>
                    </div>
                    <input type='text' 
                           style={{'display' : this.state.isEditingTitle? 'flex' : 'none' }}
                           onKeyDown={this.handleSubmit.bind(this)}
                           onBlur={this.handleOnBlur.bind(this)}
                           ref={this.inputRef}
                           className='notebook__title'
                    >       
                    </input>
                </div>
                <div className='notebook__notes'
                     style={{'display' : this.state.isOpen? 'flex' : 'none'}}
                >
                    <button onClick={this.addNote.bind(this)}>Add note</button>
                    {this.props.notes}
                </div>
            </div>
        )
    }
}

Notebook.propTypes = {
    notebook: PropTypes.object,
    notes: PropTypes.array,
}

export default Notebook;