import React from 'react';
import {
  Image,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TouchableHighlight
} from 'react-native';

import { MonoText } from '../components/StyledText';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super();
    this.state = {
      gameStarted: false,
      player1: 'X',
      player2: 'O',
      currentPlayer: 'X',
      grid: [
        [null, null, null],
        [null, null, null],
        [null, null, null]
      ],
      winnaar: null,
    };
  }

  static route = {
    navigationBar: {
      visible: false,
    },
  }

  WelkomAlert(){
    this.setState({gameStarted: true})
  }

  updateGrid(row, column){
    var grid = this.state.grid;
    if (!grid[row][column]){
      grid[row][column] = this.state.currentPlayer
    }else{
      alert('Dit vakje is al bezet. Dus je beurt is over.')
    }
    this.setState({
      grid: grid,
    })
  }

  switchPlayer(row, column){
    if(this.state.currentPlayer == this.state.player1){
      var currentPlayer = this.state.player2;
    }else{
      var currentPlayer = this.state.player1;
    }
    this.setState({
      currentPlayer: currentPlayer,
    })
  }


  stateReset(){
    this.setState({
      gameStarted: true,
      player1: 'X',
      player2: 'O',
      currentPlayer: 'X',
      grid: [
        [null, null, null],
        [null, null, null],
        [null, null, null]
      ],
      winnaar: null,
    })
  }

  endGame(){
    var grid = this.state.grid
    var currentPlayer = this.state.currentPlayer
    var winnaar = this.state.winnaar
    if(grid[0][0] == currentPlayer && grid[0][1] == currentPlayer && grid[0][2] == currentPlayer){
      winnaar = currentPlayer;
    }else if (grid[1][0] == currentPlayer && grid[1][1] == currentPlayer && grid[1][2] == currentPlayer) {
      winnaar = currentPlayer
    }else if (grid[2][0] == currentPlayer && grid[2][1] == currentPlayer && grid[2][2] == currentPlayer) {
      winnaar = currentPlayer
    }else if (grid[0][0] == currentPlayer && grid[1][0] == currentPlayer && grid[2][0] == currentPlayer) {
      winnaar = currentPlayer
    }else if (grid[0][1] == currentPlayer && grid[1][1] == currentPlayer && grid[2][1] == currentPlayer) {
      winnaar = currentPlayer
    }else if (grid[0][2] == currentPlayer && grid[1][2] == currentPlayer && grid[2][2] == currentPlayer) {
      winnaar = currentPlayer
    }else if (grid[0][0] == currentPlayer && grid[1][1] == currentPlayer && grid[2][2] == currentPlayer) {
      winnaar = currentPlayer
    }else if (grid[0][2] == currentPlayer && grid[1][1] == currentPlayer && grid[2][0] == currentPlayer) {
      winnaar = currentPlayer
    }else{

    }
    this.setState({winnaar: winnaar})
  }

  fill = (row, column) => {
    this.updateGrid.bind(this)(row, column);
    this.endGame.bind(this)(row, column);
    this.switchPlayer.bind(this)(row, column);
  }

  gewonnen(winnaar){
    return (
      <View>
        <Text style={styles.WinnaarText}>
          {'De winnaar is ' + winnaar}
        </Text>
        <TouchableHighlight style={styles.playAgain} onPress={this.stateReset.bind(this)}><Text style={styles.playAgainText}>Play again</Text></TouchableHighlight>
      </View>
    )
  }

  renderGame() {
    return(
      <View style={styles.grid}>
        <View style={styles.row}>
          <TouchableHighlight style={styles.column} onPress={() => this.fill.bind(this)(0, 0)}><Text style={styles.fillText}>{this.state.grid[0][0]}</Text></TouchableHighlight>
          <TouchableHighlight style={styles.column} onPress={() => this.fill.bind(this)(0, 1)}><Text style={styles.fillText}>{this.state.grid[0][1]}</Text></TouchableHighlight>
          <TouchableHighlight style={styles.column} onPress={() => this.fill.bind(this)(0, 2)}><Text style={styles.fillText}>{this.state.grid[0][2]}</Text></TouchableHighlight>
        </View>
        <View style={styles.row}>
          <TouchableHighlight style={styles.column} onPress={() => this.fill.bind(this)(1, 0)}><Text style={styles.fillText}>{this.state.grid[1][0]}</Text></TouchableHighlight>
          <TouchableHighlight style={styles.column} onPress={() => this.fill.bind(this)(1, 1)}><Text style={styles.fillText}>{this.state.grid[1][1]}</Text></TouchableHighlight>
          <TouchableHighlight style={styles.column} onPress={() => this.fill.bind(this)(1, 2)}><Text style={styles.fillText}>{this.state.grid[1][2]}</Text></TouchableHighlight>
        </View>
        <View style={styles.row}>
          <TouchableHighlight style={styles.column} onPress={() => this.fill.bind(this)(2, 0)}><Text style={styles.fillText}>{this.state.grid[2][0]}</Text></TouchableHighlight>
          <TouchableHighlight style={styles.column} onPress={() => this.fill.bind(this)(2, 1)}><Text style={styles.fillText}>{this.state.grid[2][1]}</Text></TouchableHighlight>
          <TouchableHighlight style={styles.column} onPress={() => this.fill.bind(this)(2, 2)}><Text style={styles.fillText}>{this.state.grid[2][2]}</Text></TouchableHighlight>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}>
          {
            this.state.gameStarted && !this.state.winnaar && this.renderGame.bind(this)()
          }

          {
            !this.state.gameStarted && <View style={styles.welcomeContainer}>
              <Text style={styles.getStartedText} onPress={this.WelkomAlert.bind(this)}>
                  Start game.
              </Text>
            </View>
          }

          {
            !!this.state.winnaar && this.gewonnen(this.state.winnaar)
          }
        </ScrollView>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  WinnaarText: {
    fontSize: 50,
  },
  playAgainText: {
    fontSize: 60,
  },
  playAgain: {
    padding: 50,
    alignItems: 'center',
  },
  fillText: {
    fontSize: 60,
  },
  grid: {
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  column: {
    borderWidth: 1,
    borderColor: '#000',
    height: 100,
    width: 100,
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 15,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 20,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 60,
    color: 'rgba(136,136,136, 255)',
    lineHeight: 60,
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
