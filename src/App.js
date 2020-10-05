import React, { Component } from 'react';
import './App.css';
import shortid from 'shortid';
import Progress from './Components/Progress';
import Done from './Components/Done';
import New from './Components/New';
class App extends Component {
  state = {
    listArr: [],
    progressArr: [],
    DoneArr: []
  };
  inputHandler = (event) => {
    if (event.key === 'Enter') {
      const value = event.target.value;
      if (value.length <= 32) {
        if (!this.state.listArr.includes(value)) {
          const listArr = [...this.state.listArr];
          listArr.push(value);
          this.setState({
            listArr: listArr
          })
          event.target.value = "";
        } else {
          alert('item already exists');
          return;
        }
      } else {
        alert('input is too long');
        return;
      }


    }
  }
  removeHandler = (listItem) => {
    const listArr = [...this.state.listArr];
    const index = listArr.indexOf(listItem);
    listArr.splice(index, 1);
    this.setState({
      listArr: listArr
    });
  }
  nextItemHandler = (listItem) => {
    const listArr = [...this.state.listArr];
    const progressArr = [...this.state.progressArr];
    const index = listArr.indexOf(listItem);
    listArr.splice(index, 1);
    progressArr.push(listItem);
    this.setState({
      listArr: listArr,
      progressArr: progressArr
    })

  }
  removeFromProgressHandler = (listItem) => {
    const progressArr = [...this.state.progressArr];
    const index = progressArr.indexOf(listItem);
    progressArr.splice(index, 1);
    this.setState({
      progressArr: progressArr
    });
  }
  backClickHandler = (listItem) => {
    const listArr = [...this.state.listArr];
    const progressArr = [...this.state.progressArr];
    const index = progressArr.indexOf(listItem);
    progressArr.splice(index, 1);
    listArr.push(listItem);
    this.setState({
      listArr: listArr,
      progressArr: progressArr
    })
  }
  moveToDoneHandler = (listItem) => {
    const DoneArr = [...this.state.DoneArr];
    const progressArr = [...this.state.progressArr];
    const index = progressArr.indexOf(listItem);
    progressArr.splice(index, 1);
    DoneArr.push(listItem);
    this.setState({
      DoneArr: DoneArr,
      progressArr: progressArr
    })

  }
  backFromDoneHandler = (listItem) => {
    const DoneArr = [...this.state.DoneArr];
    const progressArr = [...this.state.progressArr];
    const index = DoneArr.indexOf(listItem);
    DoneArr.splice(index, 1);
    progressArr.push(listItem);
    this.setState({
      DoneArr: DoneArr,
      progressArr: progressArr
    })
  }
  removeFromDoneHandler = (listItem) => {
    const DoneArr = [...this.state.DoneArr];
    const index = DoneArr.indexOf(listItem);
    DoneArr.splice(index, 1);
    this.setState({
      DoneArr: DoneArr
    });
  }
  render() {
    const container1 = (
      <div className="container-1">
        <h1>To-Do App</h1>
        <input type="text" placeholder="Add item to list" onKeyPress={(event) => this.inputHandler(event)} />
      </div>
    );
    const container2 = (
      <div className="container-2">
        <div className="cards card-1">
          <h2>New</h2>
          <div className="list list-1">
            {
              this.state.listArr.map(listItem => {
                const id = shortid.generate();
                return (
                  <New key={id} listItem={listItem} next={() => this.nextItemHandler(listItem)} close ={() => this.removeHandler(listItem)}/>
                )
              })
            }

          </div>
        </div>
        <div className="cards card-2">
          <h2>In progress</h2>
          <div className="list list-2">
            {
              this.state.progressArr.map(listItem => {
                const id = shortid.generate();
                return (
                  <Progress key={id} listItem={listItem} back={() => this.backClickHandler(listItem)} next={() => this.moveToDoneHandler(listItem)} close ={() => this.removeFromProgressHandler(listItem)} />
                )
              })
            }
          </div>
        </div>
        <div className="cards card-3">
          <h2>Done</h2>
          <div className="list list-3">
          {
              this.state.DoneArr.map(listItem => {
                const id = shortid.generate();
                return (
                  <Done key={id} listItem={listItem} back={() => this.backFromDoneHandler(listItem)}  close ={() => this.removeFromDoneHandler(listItem)} />
                )
              })
            }
          </div>
        </div>
      </div>
    );
    return (
      <div className="App">
        {container1}
        {container2}
      </div>
    );
  }
}

export default App;
