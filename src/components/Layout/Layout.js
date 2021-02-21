import React, { useState } from 'react';

import Aux from '../../hoc/Aux/Aux';

import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

import './Layout.css';

const Layout = (props) => {
    const [showSideDrawer, setShowSideDrawer] = useState(true)

    const sideDrawerClosedHandler = () => {
        setShowSideDrawer(false);
    }

    const sideDrawerToggleHandler = () => {
        setShowSideDrawer((prevState) => !prevState);
    }

    return (
        <Aux>
            <Toolbar drawerToggleClicked={sideDrawerToggleHandler}/>
            <SideDrawer open={showSideDrawer} closed={sideDrawerClosedHandler} />
            <main className="Content">
                {props.children}
            </main>
        </Aux>
    )
};

export default Layout;