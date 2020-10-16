import './index.scss';
import React, { PureComponent } from 'react';
import { ReactComponent  as PastAlertGraph} from "../../../../assets/past_alert_graph_icon.svg"
import { ReactComponent as ClosePastAlertGraph } from "../../../../assets/close_past_alert_graph.svg"
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
        return (
            <span style={{ textAlign: 'center', paddingLeft: '10%' }} >
                {this.props.text ? <ClosePastAlertGraph height="20" width="20" /> : <PastAlertGraph height="20" width="20"/>}
            </span>
        )
    }
}

export default GraphSelector;