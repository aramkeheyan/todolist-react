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
  background-color: #BF2204;
  margin-left: 10px;
  height: 35px;
  text-transform: none;
  min-width: 0;
  padding-right: 13px;
  padding-left: 13px;
`;
let StyledFilterButton = styled(Button)`
  background-color: #BF2204;
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
    overflow: "auto",
    width: 800,
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
    borderRadius: "1%",
    maxHeight: "100vh",
  },
});


function App(props) {
  let [inputValue, setInputValue] = useState("")
  let [inputDateValue, setInputDateValue] = useState(new Date())
  let [items, setItems] = useState([])
  let [showCompleted, setShowCompleted] = useState(false)
  let [showDateFilter, setShowDateFilter] = useState(false)
  let [showFilteredByDate, setShowFilteredByDate] = useState(false)
  let [filteredByDate, setFilteredByDate] = useState([])
  let [editingItem, setEditingItem] = useState(null)

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
    <div className="App">

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
            <Counter onChange={completedCount} itemCount={items.length} />
            {showCompleted ? completedItems : showFilteredByDate ? filteredItems : allItems}
            <EditDialog
              item={editingItem}
              handleClose={closeEdit}
              handleSave={handleSave}
            />

          </div>
        </div>
      </div>
    </div>
  );

}

export default withStyles(styles)(App);
