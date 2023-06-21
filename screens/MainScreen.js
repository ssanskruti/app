import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Alert,
  FlatList,
  Image,
  ImageBackground,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';

export default class MainScreen extends Component {
  constructor() {
    super();
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.droidSafeArea} />
        <ImageBackground
          style={styles.backgroundImage}
          source={require('../assets/bg.png')}>
          <Image source={require('../assets/icon1.png')} style={styles.image} />
          <Text style={styles.title}>Insight</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 20,
            }}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: '#565eaf' }]}
              onPress={() => {
                this.props.navigation.navigate('login');
              }}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, { backgroundColor: '#ff9b83' }]}
              onPress={() => {
                this.props.navigation.navigate('signUp');
              }}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 30,
    fontFamily: 'Alegreya',
    fontWeight: 'bold',
    alignSelf: 'center',
    color: '#f1613e',
  },
  droidSafeArea: {
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    alignItems: 'center',
    justifyContent: 'center', // or 'stretch'
  },
  button: {
    fontFamily: 'Alegreya',
    width: '35%',
    margin: 20,
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  image: {
    margin: 20,
    overflow: 'hidden',
    resizeMode: 'cover',
    justifyContent: 'center',
    height: 240,
    width: 270,
  },
  buttonText: {
    fontFamily: 'Alegreya',
    fontWeight: 'bold',
    alignSelf: 'center',
    color: '#fff',
    fontSize: 15,
  },
});
