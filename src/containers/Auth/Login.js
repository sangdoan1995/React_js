import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions";

import './Login.scss';
import { FormattedMessage } from 'react-intl';

import adminService from '../../services/adminService';
import { every } from 'lodash';
import { handleLoginApi } from '../../services/userService';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state={
            username: '',
            password: '',
            isShowPassword: false,
            errMessage: '',
        }
    }

    
    handleOnchangeInput=(event)=>{
        this.setState({
            username: event.target.value,
            
        })
        
    }
    handleOnchangePassword=(event)=>{
        this.setState({
            password: event.target.value,
        })
        
    }
    handleLogin=async()=>{
        this.setState({
            errMessage:''
        })
        try{
            let data = await handleLoginApi(this.state.username,this.state.password)
            if(data && data.errcode !==0){
                this.setState({
                    errMessage: data.message
                })
            }
            if(data && data.errcode ===0){
                this.props.userLoginSuccess(data.user)
                console.log('login succeeds')
            }
        }catch(error){
            if(error.response){
                if(error.response.data){
                    this.setState({
                    errMessage:error.response.data.message
                })
                }
                
            }
            console.log('websangdoan',error.response)
            

        }
        
    }
    handleShowHidePassword=()=>{
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
    }
    render() {
        //JSX
        return (
            <div className='login-background'>
                <div className='login-container'>
                    <div className='login-content row'>
                        <div className='col-12 text-login'>Login</div>
                        <div className='col-12 form-group'>
                            <label>Username</label>
                            <input type='text'className='form-control' placeholder='Enter your user' value={this.state.username}
                             onChange={(event)=>this.handleOnchangeInput(event)}
                            />
                        </div>
                        <div className='col-12 form-group'>
                            <label>Password</label>
                            <input type={this.state.isShowPassword ? 'text':'password'}
                            className='form-control' placeholder='Enter your password' value={this.state.password} 
                              onChange={(event)=>this.handleOnchangePassword(event)}
                            />
                            <span className='eye-pass' onClick={()=>{this.handleShowHidePassword()}}>
                                <i class={this.state.isShowPassword ? 'fas fa-eye':'fas fa-eye-slash'}></i></span>
                            
                        </div>
                        <div className='col-12' style={{color: 'red'}}>
                            {this.state.errMessage}
                        </div>

                        <div className='col-12'>
                            <button className='btn-login' onClick={()=> {this.handleLogin()}}>Login</button>
                        </div>
                        <div className='col-12'>
                            <span className='forgot-password' >Forgot your password?</span>
                        </div>
                        <div className='col-12 text-center'>
                            <span className='text-center-login' >or Login with:</span>
                        </div>
                        <div className='col-12 social-login'>
                            <i className="fab fa-google-plus-g google"></i>
                            <i className="fab fa-facebook-f facebook"></i>
                        </div>

                        
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        // userLoginFail: () => dispatch(actions.userLoginFail()),
        userLoginSuccess: (userInfo)=>dispatch(actions.userLoginSuccess(userInfo)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
