import FourGrid from './fourGrid'
import TwoGrid from './twoGrid'
import React, { PureComponent } from 'react';
import Header from './topHeader';
import './index.scss'
interface Props { }

interface State {
    displayedGrid: 'Four' | 'Two' | string,
    showGraph: string
}

class Grid extends PureComponent<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            displayedGrid: 'Two',
            showGraph: ''
        }
    }

    renderComponent() {
        switch (this.state.displayedGrid) {
            case "Four":
                return <FourGrid />
            case "Two":
                return <TwoGrid />
        }
    }
    toggleGrid = (type: string) => {
        this.setState({ displayedGrid: type })
    }
    render() {
        return (
            <div className="main-wrapper">
                <Header toggleGrid={this.toggleGrid} displayedGrid={this.state.displayedGrid} />
                {this.renderComponent()}
            </div>
        )
    }
}

export default Grid