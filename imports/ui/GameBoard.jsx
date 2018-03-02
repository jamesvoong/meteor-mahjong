import React, { Component } from 'react';
import GameHeader from './GameHeader.jsx';
import {Game, GameStatuses} from '../api/models/game.js';
import {userMarkGame} from '../api/methods/games.js';
import renderHTML from 'react-render-html';


export default class GameBoard extends Component {
  handleTileClick(row, col) {
    let game = this.props.game;
    if (game.currentPlayerIndex() !== game.userIndex(this.props.user)) return;
    userMarkGame.call({gameId: game._id, row: row, col: col});
  }

  handleBackToGameList() {
    this.props.backToGameListHandler();
  }

  renderTile(tileToRender) {
    var sprintf = require('sprintf-js').sprintf,
    vsprintf = require('sprintf-js').vsprintf

    let game = this.props.game;
    for (i=0; i<4; i++) {
      if (game.players[i].username == this.props.user.username) {
        login_player = i;
      }
    }

    var hand_render = '';
    i=0;
    while(i<14 && game.hand_tiles[login_player][i] != null) {
      console.log(i);
      hand_render += sprintf('<img border=\"0\" height=\"50\" hspace=\"0\" src=\"/images/%d.jpg\" width=\"35\" />\n', game.hand_tiles[login_player][i]);
      i++;
    }


    //if (value === null) return (
    // <td onClick={this.handleTileClick.bind(this)}></td>
    //);

    console.log(hand_render);
    return (
      renderHTML(hand_render)
       //<img src={source}/
    )
  }

  

  renderStatus() {
    let game = this.props.game;
    let status = "";
    if (game.status === GameStatuses.STARTED) {
      let playerIndex = game.currentPlayerIndex();
      status = `Current player: ${game.players[playerIndex].username}`;
    } else if (game.status === GameStatuses.FINISHED) {
      let playerIndex = game.winner();
      if (playerIndex === null) {
        status = "Finished: tie";
      } else {
        status = `Finished: winner: ${game.players[playerIndex].username}`;
      }
    }

    return (
      <div>{status}</div>
    )
  }

  render() {
    return (
      <div className="ui container">
        <GameHeader user={this.props.user}/>

        <button className="ui button blue" onClick={this.handleBackToGameList.bind(this)}>Back to Lobby</button>

        <div className="ui top attached header">
          <div className="ui grid">
            <div className="ui three column center aligned row">
              <div className="ui column">
                {this.props.game.players[0].username} <br/>O
              </div>
              <div className="ui column">
                v.s.
              </div>
              <div className="ui column">
                {this.props.game.players[1].username} <br/>X
              </div>
            </div>
          </div>
        </div>
        <div className="ui attached center aligned segment">
          {this.renderStatus()}
        </div>

        <div className="ui attached segment">
          {this.renderTile()}
        </div>
      </div>
    )
  }
}

