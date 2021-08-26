import "../App.css";
import { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

let styles = () => ({

});

class DateFilter extends Component {

  render() {
    let date = `${new Date().getFullYear()}-0${new Date().getMonth() + 1}-${new Date().getDate()}`

    return (
      <TextField
        id="date"
        label="Date"
        type="date"
        defaultValue={date}
        // value={inputDateValue}
        onChange={this.props.onChange}
        InputLabelProps={{
          shrink: true,
        }}

      />
    );
  }
}

export default withStyles(styles)(DateFilter);

