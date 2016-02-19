require('normalize.css');
require('styles/App.css');

import React from 'react';

var AppComponent = React.createClass({

  render: function () {
    return (
      <div>
        <Board size={7} width={300}/>
      </div>);
  }

});

var Board = React.createClass({
  getInitialState: function() {
    var board = [];
    var width = this.props.width;
    var size = this.props.size;
    var tileSize = width/size;
    for (var i=0; i<size*size-1; i++) {
      var x = Math.floor(i%size)*tileSize;
      var y = Math.floor(i/size)*tileSize;
      var pos = {x:x, y:y};
      var initialPos = {x:x, y:y};
      board.push({number: i+1, pos: pos, initialPos:initialPos});
    }
    return {
      emptyPos: {
        x: width-tileSize,
        y: width-tileSize
      },
      size:size,
      width:width,
      tileSize:tileSize,
      board: board
    }
  },

  render: function () {
    var tiles = [];
    var size =  this.props.size;
    var boardSize = {width:this.props.width, height:this.props.width};
    for (var i=0; i<size*size-1; i++) {
      var tile = <Tile
      index={i}
      key = {i}
      number={i+1}
      width={this.state.width}
      tileSize={this.state.tileSize}
      position={this.state.board[i].pos}
      onClick={this.onTileClick}
      initialPos={this.state.board[i].initialPos}
    />;
      tiles.push(tile)
    }

    return (
      <div>
      <div className="board" style={boardSize}>
      {tiles}
      </div>
        <button className="shuffleBtn" onClick={this.shuffleTiles}>Shuffle</button>
      </div>);
  },

  onTileClick: function(index) {
    var isValidMove = this.isValidMove( this.state.board[index].pos,this.state.emptyPos);
    if(!isValidMove){
      return alert('No good!Go home!')
    }
    var obj = {};
    obj = this.state.board[index].pos;
    this.state.board[index].pos = this.state.emptyPos;
    this.state.emptyPos = obj;
    this.forceUpdate(this.isWinner);

  },

  isValidMove: function(startPos, targetPos) {
    var diffX = Math.round(Math.abs(targetPos.x - startPos.x));
    var diffY = Math.round(Math.abs(targetPos.y - startPos.y));
    var tileSizeFloored = Math.round(this.state.tileSize);
    var validX = diffX === tileSizeFloored && diffY === 0;
    var validY = diffY === tileSizeFloored && diffX === 0;

    return validX || validY
  },

  shuffleTiles: function() {
    var boardArray = this.state.board;
    var index = boardArray.length;
    var obj, randomIndex;
    while (0 !== index) {
      randomIndex = Math.floor(Math.random() * index);
      index = index-1;
      obj = boardArray[index].pos;
      boardArray[index].pos = boardArray[randomIndex].pos;
      boardArray[randomIndex].pos = obj;
    }
    this.setState({board:boardArray});
  },

  isWinner: function(){
    var board = this.state.board;
    for (var i = 0; i < board.length; i++){
      if ((board[i].pos.x != board[i].initialPos.x) || (board[i].pos.y != board[i].initialPos.y)){
        return false
      }
    }
    alert('Esti bine boss!!');

    return true
  }
});

var Tile = React.createClass({

  onClick: function () {
    this.props.onClick(this.props.index)
  },

  render: function () {

    var pos = this.props.position;
    var initialPos = this.props.initialPos;
    var tileSize = this.props.tileSize;
    var width = this.props.width;
    var style = {
      left: pos.x,
      top: pos.y,
      backgroundPositionX:-initialPos.x,
      backgroundPositionY:-initialPos.y,
      width:tileSize,
      height:tileSize,
      backgroundSize:width
    };
    //var number = this.props.number;
    return (
      <div className="tile" style={style} onClick={this.onClick}>

    </div>);
  }

});

export default AppComponent;
