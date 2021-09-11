import "../App.css";
import { Component } from "react";


class Counter extends Component {
    render() {
        let counter = this.props.onChange() || 0
        return (
            <div>
                <div >Completed: {counter} / {this.props.itemCount}</div>
            </div>
        )
    }
}

export default Counter