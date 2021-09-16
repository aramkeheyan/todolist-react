import "../App.css";
import { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

class Modal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: this.props.item?.value || ""
        }
    }

    componentDidUpdate(prevProps) {
        let { item: prevItem } = prevProps
        let { item: currentItem } = this.props
        if (prevItem !== currentItem) {
            this.setState({
                value: currentItem?.value || ""
            })
        }
    }

    onChange = (event) => {
        this.setState(prevState => ({
            value: event.target.value
        }))
    }

    render() {
        let { item, handleClose, handleSave } = this.props
        return (
            <Dialog
                open={!!item}
                onClose={handleClose}
                aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Edit</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label=""
                        onChange={this.onChange}
                        value={this.state.value}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => handleSave(this.state.value)} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}

export default Modal;