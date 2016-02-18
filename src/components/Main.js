require('normalize.css');
require('styles/App.css');

import React from 'react';

var AppComponent = React.createClass({

  render: function () {
    return (
      <div>
        <Board size={5} width={500}/>
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
        x: width-100,
        y: width-100
      },
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
      //number={i+1}
        width=
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
    this.forceUpdate();
//      alert("it is clicked " + index) ;
  },

  isValidMove: function(startPos, targetPos){
    var diffX = Math.abs(targetPos.x - startPos.x);
    var diffY = Math.abs(targetPos.y - startPos.y);
    var validX = diffX === 100 && diffY === 0;
    var validY = diffY === 100 && diffX === 0;

    if (validX || validY){
      return true;
    }

    return false
  }


});

var Tile = React.createClass({

  onClick: function () {
    this.props.onClick(this.props.index)
  },

  render: function () {

    var pos = this.props.position;
    var initialPos = this.props.initialPos;
    var style = {
      left: pos.x,
      top: pos.y,
      backgroundPositionX:-initialPos.x,
      backgroundPositionY:-initialPos.y
    };
    var number = this.props.number;
    return (
      <div className="tile" style={style} onClick={this.onClick}>
    <span>{ number }</span>
    </div>);
  }

});

export default AppComponent;
