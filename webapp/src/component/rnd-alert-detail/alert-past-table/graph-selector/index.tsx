import './index.scss';
import { Layout } from "antd";
import React, { PureComponent } from 'react';
import { ReactComponent  as PastAlertGraph} from "../../../../assets/past_alert_graph_icon.svg"
import { ReactComponent as ClosePastAlertGraph } from "../../../../assets/close_past_alert_graph.svg"

// webapp\src\assets\past_alert_graph_icon.svg
//webapp\src\assets\close_past_alert_graph.svg
interface GraphSelectorProps {
    text: any,
    record: any,
    index: any,
    selected?: boolean
}

interface GraphSelectorStates { 
    selected: boolean;
}

class GraphSelector extends PureComponent<GraphSelectorProps, GraphSelectorStates> {
    constructor(props : GraphSelectorProps){
        super(props);
        this.state = {
            selected : false
        }
    }
    render() {
        { console.log(this.props.text, this.props.record, this.props.index) }
        return (
            <span style={{ textAlign: 'center', paddingLeft: '10px' }}>
                {this.props.text ? <ClosePastAlertGraph height="15" width="15" /> : <PastAlertGraph height="15" width="15"/>}
            </span>
        )
    }
}

export default GraphSelector;