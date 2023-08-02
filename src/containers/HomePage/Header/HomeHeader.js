import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';

class HomeHeader extends Component {

    render() {

        return (
            <React.Fragment>
                <div className='home-header-container'>
                    <div className='home-header-content'>
                        <div className='left-content'>
                            <i className="fas fa-bars"></i>
                            <div className='logo-header'>

                            </div>
                        </div>
                        <div className='center-content'>
                            <div className='child-content'>
                                <div><b>Specialist</b></div>
                                <div className='subtitle'>Find doctor specialist</div>
                            </div>
                            <div className='child-content'>
                                <div><b>Health facilities</b></div>
                                <div className='subtitle'>Choose facilities hopital</div>
                            </div>
                            <div className='child-content'>
                                <div><b>Doctor</b></div>
                                <div className='subtitle'>Choose good doctor</div>
                            </div>
                            <div className='child-content'>
                                <div><b>Package examination</b></div>
                                <div className='subtitle'>General health examination</div>
                            </div>
                        </div>
                        <div className='right-content'>
                            <div className='support'><i className="fas fa-question-circle"></i>Support</div>
                            <div className='flag'>ENG</div>
                        </div>
                    </div>
                </div>
                <div className='home-header-banner'>
                    <div className='content-up'>
                        <div className='title1'>NỀN TẢNG Y TẾ</div>
                        <div className='title2'>CHĂM SÓC SỨC KHỎE TOÀN DIỆN</div>
                        <div className='search' >
                            <i className="fas fa-search"></i>
                            <input type='text' placeholder='find doctor' />
                        </div>
                    </div>
                    <div className='content-down'>
                        <div className='option'>
                            <div className='option-child'>
                                <div className='icon-child'><i className="fas fa-hospital"></i></div>
                                <div className='text-child'>Specialist examination</div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child'><i className="fas fa-mobile-alt"></i></div>
                                <div className='text-child'>Remote examination</div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child'><i className="fas fa-procedures"></i></div>
                                <div className='text-child'>General examination</div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child'><i className="fas fa-vial"></i></div>
                                <div className='text-child'>Medical test</div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child'><i className="fas fa-code-branch"></i></div>
                                <div className='text-child'>Mental health</div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child'><i class="fas fa-user-md"></i></div>
                                <div className='text-child'>Dental examination</div>
                            </div>
                        </div>
                    </div>


                </div>

            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);