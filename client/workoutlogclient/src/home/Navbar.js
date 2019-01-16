import React, { Component } from 'react'; 
import {
    Navbar,         //1
    NavbarBrand,
} from 'reactstrap';

class SiteBar extends Component {
    constructor(props) {   //2
        super(props);
        this.state = {};
    }

    //3
    render() {
        return (
            <div>
                <Navbar color="faded"  light expand="md">
                    <NavbarBrand href="/">Workout Log</NavbarBrand>
                </Navbar>
            </div>
        );
    }
}

export default SiteBar;