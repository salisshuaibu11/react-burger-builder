import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux/Aux';

import './SideDrawer.css'

const sideDrawer = (props) => (
    <Aux>
        <Backdrop show={props.open} clicked={props.closed}/>
        <div className={props.open ? 'SideDrawer Open' : 'SideDrawer Close'}>
            <Logo height="11%"/>
            <nav>
                <NavigationItems />
            </nav>
        </div>
    </Aux>
)

export default sideDrawer;