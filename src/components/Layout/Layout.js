import React, {Component} from 'react';

import Aux from '../../hoc/Auxi';
import classes from './Layout.css';
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

class Layout extends Component {
    state = {
      showSideDrawer: true
    };

    sideDrawerCloseedHandler = () => {
        this.setState({showSideDrawer: false});
    };

    render() {
        return (
            <Aux>
                <Toolbar/>
                <SideDrawer closed={this.sideDrawerCloseedHandler} open={this.state.showSideDrawer}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
}

export default Layout;