import React, { Component } from 'react';
import './App.css';
//ボードの定数
const EMPTY = 0;
const CIRCLE = 1;
const CROSS = -1;
class Board extends Component {
  constructor(props){
    super(props);
    this.divStyle={
      "padding": "0px",
      "margin": "0px",
      "display": "flex"
    }
    this.state = {
      boardInfo: [
        [EMPTY, EMPTY, EMPTY],
        [EMPTY, EMPTY, EMPTY],
        [EMPTY, EMPTY, EMPTY]
      ],
      turn: CIRCLE
    }
  }

  cellClickHandler = e => {
    let point = e.target.props.xy.split(",");    
    point[0] = parseInt(point[0]);
    point[1] = parseInt(point[1]);

    if(this.canPut(point[0], point[1])){
      this.put(point[0], point[1]);
    }else{
      window.alert("置けません");
    }
  }

  canPut = (y, x) => {
    if(this.state.boardInfo[y][x] === EMPTY){
      return true;
    }
    return false
  }

  put = (y, x) => {
    let b = [];
    for(let i=0;i<3;i++){
      b[i] = [];
      for(let j=0;j<3;j++){
        b[i][j]=this.state.boardInfo[i][j];
      } 
    }
    b[y][x] = this.state.turn;
    const t = this.changeTurn();
    this.setState({
      boardInfo: b,
      turn: t
    });
  }

  changeTurn(){
    if(this.state.turn === CIRCLE){
      return CROSS;
    }
    return CIRCLE;
  }

  judge = () => {
    let count;
    for (let i = 0; i < 3; i++) {
      count = 0;
      for (let j = 0; j < 3; j++) {
        count += this.state.boardInfo[i][j]
      }
      this.isFinish(count);
    }
    for (let i = 0; i < 3; i++) {
      count = 0;
      for (let j = 0; j < 3; j++) {
        count += this.state.boardInfo[j][i]
      }
      this.isFinish(count);
    }
    let i = 0;
    let j = 0;
    count = 0;
    while(i<3){
      count += this.state.boardInfo[i][j];
      i++;
      j++;
    }
    this.isFinish(count);
    i = 2;
    j = 0;
    count = 0;
    while (j < 3) {
      count += this.state.boardInfo[i][j];
      i--;
      j++;
    }
    this.isFinish(count);
  }

  isFinish = c => {//終了するかしないか判定
    console.log("isFinish" + c);
    
    if(c === 3){
      this.finish("〇");
    }else if(c === -3){
      this.finish("×");
    }
  }

  finish = player => {
    window.alert(player + "の勝ちです");
  }
  componentDidUpdate(){
    this.judge();
  }
  render() {
    let b = [];  
    for(let i = 0;i < 3;i++){
      let cells = []; 
      for(let j = 0;j < 3;j++){
        cells.push(
          <Cell now={this.state.boardInfo[i][j]} onClick={this.cellClickHandler} xy={i+","+j} key={""+i+j}/>                  
        )
      }
      b.push(
        <div style={this.divStyle} key={i}>
          {cells}
        </div>
      );
    }
    return (
      <div className="App">
        {b}
      </div>
    );
  }
}

class Cell extends Component{
  constructor(props){
    super(props);
    this.style = {
      width: "40px",
      height: "40px",
      border: "solid",
      margin: "0px",
      padding: "0px"
    }
  }
  getImageUrl = () => {
    if(this.props.now === EMPTY){
      return "empty.png";
    }
    if (this.props.now === CIRCLE) {
      return "circle.png";
    }
    if (this.props.now === CROSS) {
      return "cross.png";
    }
  }
  clickHandler = e => {//boardのcellClickHandlerを実行する
    if(this.props.onClick){
      this.props.onClick({//渡す値を設定
        target: this
      });
    }
  }
  render(){
    const imgUrl = this.getImageUrl();
    return(
        <img src={imgUrl} style={this.style} onClick={this.clickHandler}/>
    )
  }
}

export default Board;

