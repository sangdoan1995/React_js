import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManager.scss'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../utils/emitter';
class ModalUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      firstname: '',
      lastname: '',
      address: ''

    }
    this.listenToEmitter();
  }

  listenToEmitter() {
    emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
      this.setState({
        email: '',
        password: '',
        firstname: '',
        lastname: '',
        address: ''
      })
    })
  }


  componentDidMount() {
  }
  toggle = () => {
    this.props.toggleFromParent()
  }
  handleOnChangeInput = (event, id) => {
    //bad code
    /**
     * this.state={
     * email:'',
     * }
     * this.state.email==this.state['email']
     */
    // this.state[id] = event.target.value;
    // this.setState({
    //   ...this.state
    // }, () => {
    //   console.log('check bad state', this.state)
    // })
    //good code
    let copyState = { ...this.state };
    copyState[id] = event.target.value;

    this.setState({
      ...copyState
    }, () => {
      console.log('check good state', copyState);
    })
    console.log(event.target.value, id)
  }
  checkValidate = () => {
    let isValid = true;
    let arrInput = ['email', 'password', 'firstname', 'lastname', 'address'];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        alert('missing param ' + arrInput[i]);
        break;
      }
    }
    return isValid;
  }
  handleAddNewUser = () => {
    let isValid = this.checkValidate();
    if (isValid == true) {
      this.props.createNewUser(this.state);

    }

  }


  render() {
    console.log('check child props', this.props);
    console.log('check child open modal', this.props.isOpen)
    return (
      <Modal isOpen={this.props.isOpen}
        toggle={() => { this.toggle() }}
        className={'modal-user-container'}
        size='lg'
        centered
      >
        <ModalHeader toggle={this.toggle}>Create New User</ModalHeader>
        <ModalBody>
          <div className='input-user-body'>
            <div className='input-container'>
              <label>Email</label>
              <input type='text'
                onChange={(event) => { this.handleOnChangeInput(event, 'email') }}
                value={this.state.email}
              />
            </div>

            <div className='input-container'>
              <label>Password</label>
              <input type='password'
                onChange={(event) => { this.handleOnChangeInput(event, 'password') }}
                value={this.state.password}
              />
            </div>

            <div className='input-container'>
              <label>Last Name</label>
              <input type='text'
                onChange={(event) => { this.handleOnChangeInput(event, 'lastname') }}
                value={this.state.lastname}
              />
            </div>

            <div className='input-container'>
              <label>First Name</label>
              <input type='text'
                onChange={(event) => { this.handleOnChangeInput(event, 'firstname') }}
                value={this.state.firstname}
              />
            </div>

            <div className='input-container maxwidth-input'>
              <label>Address</label>
              <input type='text'
                onChange={(event) => { this.handleOnChangeInput(event, 'address') }}
                value={this.state.address}
              />
            </div>
          </div>

        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => { this.handleAddNewUser() }}>Add User</Button>{' '}
          <Button color="secondary" onClick={() => { this.toggle() }}>Close</Button>
        </ModalFooter>
      </Modal>

    )
  }

}

const mapStateToProps = state => {
  return {
  };
};

const mapDispatchToProps = dispatch => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);







