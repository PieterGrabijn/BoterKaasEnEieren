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
} from 'react-native';

import { MonoText } from '../components/StyledText';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super();
    this.state = {
      gameStarted: false
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

  renderGame() {
    return(
      <View style={styles.grid}>
        <View style={styles.row}>
          <View style={styles.column}></View>
          <View style={styles.column}></View>
          <View style={styles.column}></View>
        </View>
        <View style={styles.row}>
          <View style={styles.column}></View>
          <View style={styles.column}></View>
          <View style={styles.column}></View>
        </View>
        <View style={styles.row}>
          <View style={styles.column}></View>
          <View style={styles.column}></View>
          <View style={styles.column}></View>
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
            this.state.gameStarted && this.renderGame.bind(this)()
          }

          {
            !this.state.gameStarted && <View style={styles.welcomeContainer}>
              <Text style={styles.getStartedText} onPress={this.WelkomAlert.bind(this)}>
                  Start game.
              </Text>
            </View>
          }
        </ScrollView>

      </View>
    );
  }
}

const styles = StyleSheet.create({
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
