import "./App.css";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import styled from "styled-components";
import React from "react";
import ToDoItems from "./components/todoitems";
import DateFilter from "./components/datefilter";
import Counter from './components/counter';
import EditDialog from "./components/modal";


let StyledInput = styled(TextField)`
  width: 455px;
  
`;
let StyledAddButton = styled(Button)`
  background-color: #bd2842;
  margin-left: 10px;
  height: 35px;
  text-transform: none;
  min-width: 0;
  padding-right: 13px;
  padding-left: 13px;
`;
let StyledFilterButton = styled(Button)`
  background-color: #bd2842;
  margin: 8px;
  height: 35px;
  text-transform: none;
  min-width: 0;
  padding: 10px;
`;

let styles = () => ({
  container: {
    display: "flex",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#04A1BF",
  },
  inputAndButtonContainer: {
    padding: 10,
    height: 100,
  },
  inputAndButton: {
    display: "flex",
    alignItems: "center",
  },
  listContainer: {
    paddingTop: 10,
    paddingBottom: 10,
    display: "block",
    justifyContent: "center",
    alignItems: "center",
    maxWidth: "100%",
    borderRadius: "1%"
  },
});

// class App extends Component {
//   state = {
//     inputValue: "",
//     inputDateValue: new Date(),
//     items: [],
//     showCompleted: false,
//     showDateFilter: false,
//     showFilteredByDate: false,
//     filteredByDate: [],
//     editingItem: null,
//   };

//   handleInput = (event) => {
//     this.setState({
//       inputValue: event.target.value,

//     });
//   };

//   handleDateInput = (event) => {
//     this.setState(prevState => ({
//       inputDateValue: event.target.value
//     }))
//   }

//   addItem = () => {
//     let date = `${new Date().getFullYear()}-0${new Date().getMonth() + 1}-${new Date().getDate()}`
//     let { items, inputValue, inputDateValue } = this.state;

//     if (
//       items.some(
//         (item) =>
//           item.value.toLowerCase().trim() === inputValue.toLowerCase().trim()
//       )
//     ) {
//       alert("Item is already added");
//     } else if (inputValue.trim()) {
//       let item = {
//         id: uuidv4(),
//         value: inputValue.trim(),
//         completed: false,
//         date: inputDateValue
//       };
//       this.setState({
//         items: [item, ...items],
//         inputValue: "",
//         inputDateValue: date,
//         showFilteredByDate: true,
//       });
//     }
//     this.showAll()
//     this.completedCount()
//   };

//   onKeyDown = (event) => {
//     if (event.keyCode === 13) this.addItem()
//   }

//   delItem = (item) => {
//     this.setState((state) => ({
//       items: state.items.filter((elem) => elem.id !== item.id),
//       filteredByDate: state.filteredByDate.filter((elem) => elem.id !== item.id),
//     }));
//     this.completedCount()
//   };

//   renderList = (item) => {
//     return (
//       <ToDoItems
//         item={item}
//         key={item.id}
//         onDelete={this.delItem}
//         onCheck={this.checkItem}
//         onEdit={this.onEdit}>
//         {item.value}
//       </ToDoItems>
//     );
//   };

//   completedCount = () => {
//     let { items } = this.state
//     if (items.length) {
//       return items.reduce((acc, elem) => acc + elem.completed, 0)
//     }
//   }

//   checkItem = (item) => {
//     let checkedItem = this.state.items.map(elem => {
//       if (elem.id === item.id) {
//         elem.completed = !elem.completed
//       }
//       return elem
//     })
//     this.setState(state => ({
//       items: checkedItem
//     }))
//   }

//   showCompleted = () => {
//     this.setState(prevState => ({
//       showCompleted: true,
//       showFilteredByDate: false,
//     }))
//   }
//   showAll = () => {
//     this.setState(prevState => ({
//       showCompleted: false,
//       showFilteredByDate: false,
//     }))
//   }

//   deleteAll = () => {
//     this.setState(prevState => ({
//       items: [],
//       filteredByDate: [],
//       showFilteredByDate: false
//     }))
//   }

//   deleteCompleted = () => {
//     let filtered = this.state.items.filter(elem => elem.completed === false)

//     this.setState(prevState => ({
//       items: filtered,
//     }))
//   }

//   dateFilter = () => {
//     this.setState(prevState => ({
//       showDateFilter: !prevState.showDateFilter
//     }))
//   }

//   filterByDate = (event) => {
//     let filtered = this.state.items.filter(elem => elem.date === event.target.value)
//     this.setState(prevState => ({
//       filteredByDate: filtered,
//       showFilteredByDate: true
//     }))
//   }

//   renderDateFilter = () => {
//     return (
//       <DateFilter onChange={this.filterByDate} />
//     )
//   }

//   onEdit = (item) => {
//     this.setState(prevState => ({
//       editingItem: item,
//     }))
//   }

//   closeEdit = () => {
//     this.setState({
//       editingItem: null
//     })
//   }

//   handleSave = (editedValue) => {
//     let { editingItem, items } = this.state
//     let updatetItems = items.map(item => {
//       if (item.id === editingItem.id) {
//         return {
//           ...item,
//           value: editedValue
//         }
//       }
//       return item
//     })
//     this.setState(prevState => ({
//       items: updatetItems,
//       editingItem: null,
//     }))
//   }

//   render() {
//     let date = `${new Date().getFullYear()}-0${new Date().getMonth() + 1}-${new Date().getDate()}`
//     let { classes } = this.props;
//     let { items, inputValue, filteredByDate, editingItem } = this.state;
//     let completedItems = items.filter(item => item.completed === true).map((item) => this.renderList(item))
//     let allItems = items.map((item) => this.renderList(item))
//     let filteredItems = filteredByDate.map((item) => this.renderList(item))
//     return (
//       <div className={classes.container}>
//         <div className={classes.inputAndButtonContainer}>
//           <div className={classes.inputAndButton}>
//             <StyledInput
//               label="Type..."
//               value={inputValue}
//               onChange={this.handleInput}
//               inputProps={{ onKeyDown: this.onKeyDown }}
//             />
//             <TextField
//               id="date"
//               label="Date"
//               type="date"
//               // defaultValue={date}
//               value={this.state.inputDateValue}
//               onChange={this.handleDateInput}
//               className={classes.textField}
//               InputLabelProps={{ shrink: true }}
//             />
//             <StyledAddButton onClick={this.addItem}>
//               Add
//             </StyledAddButton>
//             <StyledAddButton >
//               Search
//             </StyledAddButton>
//           </div>
//           <div className={classes.listContainer}>

//             <StyledFilterButton onClick={this.showAll}>Show All</StyledFilterButton>
//             <StyledFilterButton onClick={this.showCompleted}>Show Completed</StyledFilterButton>
//             <StyledFilterButton onClick={this.deleteAll}>Del All</StyledFilterButton>
//             <StyledFilterButton onClick={this.deleteCompleted}>Del Completed</StyledFilterButton>
//             <StyledFilterButton onClick={this.dateFilter}>Filter By Date</StyledFilterButton>
//             {this.state.showDateFilter ? this.renderDateFilter() : null}
//             {this.state.showCompleted ? completedItems : this.state.showFilteredByDate ? filteredItems : allItems}
//             <EditDialog
//               item={editingItem}
//               handleClose={this.closeEdit}
//               handleSave={this.handleSave}
//             />

//           </div>
//           <Counter onChange={this.completedCount} itemCount={items.length} />
//         </div>
//       </div>
//     );
//   }
// }

function App(props) {
  let [inputValue, setInputValue] = useState("")
  let [inputDateValue, setInputDateValue] = useState(new Date())
  let [items, setItems] = useState([])
  let [showCompleted, setShowCompleted] = useState(false)
  let [showDateFilter, setShowDateFilter] = useState(false)
  let [showFilteredByDate, setShowFilteredByDate] = useState(false)
  let [filteredByDate, setFilteredByDate] = useState([])
  let [editingItem, setEditingItem] = useState(null)
  // state = {
  //   inputValue: "",
  //   inputDateValue: new Date(),
  //   items: [],
  //   showCompleted: false,
  //   showDateFilter: false,
  //   showFilteredByDate: false,
  //   filteredByDate: [],
  //   editingItem: null,
  // };

  let handleInput = (event) => {
    setInputValue(event.target.value)
  }

  let handleDateInput = (event) => {
    setInputDateValue(event.target.value)
  }

  let addItem = () => {
    debugger;
    let date = `${new Date().getFullYear()}-0${new Date().getMonth() + 1}-${new Date().getDate()}`
    if (
      items.some(
        (item) =>
          item.value.toLowerCase() === inputValue.toLowerCase().trim()
      )
    ) {
      alert("Item is already added");
    } else if (inputValue.trim()) {
      let item = {
        id: uuidv4(),
        value: inputValue.trim(),
        completed: false,
        date: inputDateValue
      }

      setItems([item, ...items])
      setInputValue("")
      setInputDateValue(date)
      setShowFilteredByDate(true)

    }
    showAll()
    completedCount()
  };

  let onKeyDown = (event) => {
    if (event.keyCode === 13) addItem()
  }

  let delItem = (item) => {

    setItems(items.filter((elem) => elem.id !== item.id))
    setFilteredByDate(filteredByDate.filter((elem) => elem.id !== item.id))

    completedCount()
  };

  let renderList = (item) => {

    return (
      <ToDoItems
        item={item}
        key={item.id}
        onDelete={delItem}
        onCheck={checkItem}
        onEdit={onEdit}>
        {item.value}
      </ToDoItems>
    );
  };

  let completedCount = () => {
    if (items.length) {
      return items.reduce((acc, elem) => acc + elem.completed, 0)
    }
  }

  let checkItem = (item) => {
    let checkedItem = items.map(elem => {
      if (elem.id === item.id) {
        elem.completed = !elem.completed
      }
      return elem
    })

    setItems(checkedItem)

  }

  let showAll = () => {
    setShowCompleted(false)
    setShowFilteredByDate(false)
  }

  let deleteAll = () => {
    setItems([])
    setFilteredByDate([])
    setShowFilteredByDate(false)
  }

  let deleteCompleted = () => {
    let filtered = items.filter(elem => elem.completed === false)
    setItems(filtered)
  }

  let dateFilter = () => {
    setShowDateFilter(!showDateFilter)
  }

  let filterByDate = (event) => {
    let filtered = items.filter(elem => elem.date === event.target.value)
    setFilteredByDate(filtered)
    setShowFilteredByDate(true)
  }

  let renderDateFilter = () => {
    return (
      <DateFilter onChange={filterByDate} />
    )
  }

  let onEdit = (item) => setEditingItem(item)

  let closeEdit = () => setEditingItem(null)

  let handleSave = (editedValue) => {
    let updatetItems = items.map(item => {
      if (item.id === editingItem.id) {
        return {
          ...item,
          value: editedValue
        }
      }
      return item
    })

    setItems(updatetItems)
    setEditingItem(null)

  }


  // let date = `${new Date().getFullYear()}-0${new Date().getMonth() + 1}-${new Date().getDate()}`
  let { classes } = props
  let completedItems = items.filter(item => item.completed === true).map((item) => renderList(item))
  let allItems = items.map((item) => renderList(item))
  let filteredItems = filteredByDate.map((item) => renderList(item))
  return (
    <div className={classes.container}>
      <div className={classes.inputAndButtonContainer}>
        <div className={classes.inputAndButton}>
          <StyledInput
            label="Type..."
            value={inputValue}
            onChange={handleInput}
            inputProps={{ onKeyDown }}
          />
          <TextField
            id="date"
            label="Date"
            type="date"
            // defaultValue={date}
            value={inputDateValue}
            onChange={handleDateInput}
            className={classes.textField}
            InputLabelProps={{ shrink: true }}
          />
          <StyledAddButton onClick={addItem}>
            Add
          </StyledAddButton>
          <StyledAddButton >
            Search
          </StyledAddButton>
        </div>
        <div className={classes.listContainer}>

          <StyledFilterButton onClick={showAll}>Show All</StyledFilterButton>
          <StyledFilterButton onClick={() => setShowCompleted(true)}>Show Completed</StyledFilterButton>
          <StyledFilterButton onClick={deleteAll}>Del All</StyledFilterButton>
          <StyledFilterButton onClick={deleteCompleted}>Del Completed</StyledFilterButton>
          <StyledFilterButton onClick={dateFilter}>Filter By Date</StyledFilterButton>
          {showDateFilter ? renderDateFilter() : null}
          {showCompleted ? completedItems : showFilteredByDate ? filteredItems : allItems}
          <EditDialog
            item={editingItem}
            handleClose={closeEdit}
            handleSave={handleSave}
          />

        </div>
        <Counter onChange={completedCount} itemCount={items.length} />
      </div>
    </div>
  );

}

export default withStyles(styles)(App);
