import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManager.scss';
import { getAllUsers, createNewUserService, deleteUserService, editUserService } from '../../services/userService';
import ModalUser from './ModalUser';
import { reject } from 'lodash';
import { emitter } from '../../utils/emitter';
import ModalEditUser from './ModalEditUser';
class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModalUser: false,
            isOpenEditUser: false,
            EditUser: {}
        }
    }
    /* */
    async componentDidMount() {
        await this.getAllUserFromReact();
    }
    getAllUserFromReact = async () => {
        let response = await getAllUsers('ALL')
        if (response && response.errcode === 0) {
            this.setState({
                arrUsers: response.users
            })
        }
    }
    handleAddNewUser = () => {
        this.setState({ isOpenModalUser: true })
    }
    toggleUserModal = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser,
        })
    }

    createNewUser = async (data) => {
        try {
            let response = await createNewUserService(data);
            if (response && response.errcode !== 0) {
                alert(response.errMessage)
            } else {
                await this.getAllUserFromReact();
                this.setState({
                    isOpenModalUser: false
                })
                emitter.emit('EVENT_CLEAR_MODAL_DATA')
            }
        } catch (e) {
            console.log(e);
        }

    }
    handleDeleteUser = async (user) => {
        try {

            let response = await deleteUserService(user);
            if (response && response.errcode !== 0) {
                alert(response.errMessage);
            } else {
                await this.getAllUserFromReact();

            }
        } catch (e) {
            console.log(e);
        }

    }
    handleEditUser = (user) => {
        console.log('userEdit', user)
        // let res = await getAllUsers(id);
        this.setState({
            isOpenEditUser: true,
            EditUser: user
        })
    }
    editUser = async (data) => {
        try {
            let response = await editUserService(data);
            if (response && response.errcode !== 0) {
                alert(response.errMessage)
            } else {
                await this.getAllUserFromReact();
                this.setState({
                    isOpenEditUser: false
                })
            }
        } catch (e) {
            console.log(e);
        }

    }

    toggleEditUserModal = () => {
        this.setState({
            isOpenEditUser: !this.state.isOpenEditUser,
        })
    }

    render() {
        console.log('check render', this.state)
        let arrUsers = this.state.arrUsers
        return (
            <div className="user-container">
                <ModalUser
                    isOpen={this.state.isOpenModalUser}
                    toggleFromParent={this.toggleUserModal}
                    createNewUser={this.createNewUser}

                />
                {
                    this.state.isOpenEditUser &&
                    <ModalEditUser
                        isOpen={this.state.isOpenEditUser}
                        toggleFromParent={this.toggleEditUserModal}
                        currentUser={this.state.EditUser}
                        editUser={this.editUser}

                    />

                }
                <div className='title text-center'>Manage with Dusa</div>
                <div className='mx-1'>
                    <button onClick={(event) => { this.handleAddNewUser(event) }}
                        className='btn btn-primary px-3'>
                        <i className="fas fa-plus-circle"></i>
                        Add New User
                    </button>
                </div>
                <div className='user-table mt-3 mx-1'>
                    <table id="customers">
                        <tbody>
                            <tr>
                                <th>Email</th>
                                <th>Fist Name</th>
                                <th>Last Name</th>
                                <th>Address</th>
                                <th>Actions</th>
                            </tr>

                            {
                                arrUsers && arrUsers.map((item, index) => {
                                    console.log('Dusa check map', item, index)
                                    return (
                                        <tr>
                                            <td>{item.email}</td>
                                            <td>{item.firstName}</td>
                                            <td>{item.lastName}</td>
                                            <td>{item.address}</td>
                                            <td>
                                                <button className='btn-edit' onClick={() => { this.handleEditUser(item) }}><i class="fas fa-pencil-alt"></i></button>
                                                <button className='btn-delete' onClick={() => { this.handleDeleteUser(item.id) }}><i class="fas fa-trash-alt"></i></button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>

                    </table>
                </div>
            </div>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
