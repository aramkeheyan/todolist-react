import "../App.css";
import { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import styled from "styled-components";
import Checkbox from "@material-ui/core/Checkbox";
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';

let StyledDelBtn = styled(Button)`
background-color: #bd2842;
margin-left: 10px;
height: 32px;
text-transform: none;
min-width: 0;import Checkbox from '@material-ui/core/Checkbox';
padding-right: 10px;
padding-left: 10px;
`;
let StyledEditBtn = styled(Button)`
background-color: #bd2842;
margin-left: 10px;
height: 32px;
text-transform: none;
min-width: 0;
padding-right: 10px;
padding-left: 10px;
`;

let styles = () => ({
  item: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#117283",
    margin: 5,
    borderRadius: 5,
    textAlign: "left",
    justifyContent: "space-evenly"
  },
  text: {
    width: "34vw",
    overflowWrap: "break-word",
  },
  delBtn: {
    fontSize: 13,
    margin: 4,
    float: "right",
    backgroundColor: "#bd2842",
    display: "block",
  },
  delIcon: {
    position: "relative",
    left: "6px",
  },
});

class ToDoItems extends Component {

  render() {
    let { classes } = this.props;
    let { item } = this.props
    return (
      <div className={classes.item}>
        <div className={classes.text}>
          {this.props.children}
        </div>
        <StyledDelBtn
          variant="text"
          className={classes.delBtn}
          onClick={() => this.props.onDelete(item)}
          startIcon={<DeleteOutlinedIcon className={classes.delIcon} />}
        ></StyledDelBtn>
        <span>|</span>
        <StyledEditBtn
          variant="text"
          className={classes.delBtn}
          onClick={() => this.props.onEdit(item)}
          startIcon={<EditOutlinedIcon className={classes.delIcon} />}
        ></StyledEditBtn>
        <span>|</span>
        <Checkbox
          onChange={() => this.props.onCheck(item)}
          inputProps={{ "aria-label": "primary checkbox" }}
        />
      </div>
    );
  }
}

export default withStyles(styles)(ToDoItems);
export { Checkbox }
