import './index.scss';
import React, { PureComponent } from 'react';

interface Props { }

interface State { }

class Header extends PureComponent<Props, State> {
    render() {
        return (
            <>

                <div className='analyser-header' >
                    <div className='header customer'>
                        aa
                    </div>
                    <div className='header vehicle-dropdown'>
                        aaaaa
                    </div>
                    <div className='header customer-dropdown'>
                        aa
                    </div>
                    <div className='header start-time'>
                        aaaa
                    </div>
                    <div className='header end-time'>
                        aaa
                    </div>
                    <div className='header grid-selector'>
                        aaaa
                    </div>
                </div>

            </>
        )
    }
}

export default Header