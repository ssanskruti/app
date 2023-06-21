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
import { LinearGradient } from 'expo-linear-gradient';
import firebase from 'firebase';
import db from '../config';

let customFonts = {
  Alegreya: require('../assets/fonts/Alegreya-SemiBoldItalic.ttf'),
};

export default class HomeScreen extends Component {
  constructor() {
    super();
    this.state = {
      email: firebase.auth().currentUser.email,
      firstName: '',
    };
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
  }

  getUserInfo = () => {
    var email = this.state.email;
    db.collection('users')
      .where('email', '==', email)
      .onSnapshot((snapshot) => {
        snapshot.forEach((doc) => {
          var data = doc.data();
          this.setState({
            firstName: data.firstName,
          });
        });
      });
  };

  componentDidMount() {
    this.getUserInfo();
    this._loadFontsAsync();
  }

  goToBookList = (selectedGenre) => {
    this.props.navigation.navigate('bookList', { genre: selectedGenre });
  };
  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.droidSafeArea} />

        <ScrollView>
          <Text style={styles.title}>Hello {this.state.firstName} !</Text>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              marginTop: 10,
              backgroundColor: '#fff',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: 10,
              }}>
              <TouchableOpacity
                onPress={() => {
                  this.goToBookList('action');
                }}>
                <ImageBackground
                  style={styles.backgroundImageButton}
                  source={require('../assets/action1.png')}>
                  <Text style={styles.buttonText}>Action</Text>
                </ImageBackground>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  this.goToBookList('adventure');
                }}>
                <ImageBackground
                  style={styles.backgroundImageButton}
                  source={require('../assets/adventure.png')}>
                  <Text style={styles.buttonText}>Adventure</Text>
                </ImageBackground>
              </TouchableOpacity>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: 10,
              }}>
              <TouchableOpacity
              onPress={() => {
                  this.goToBookList('DandM');
                }}>
                <ImageBackground
                  style={styles.backgroundImageButton}
                  source={require('../assets/DandM.png')}>
                  <Text style={styles.buttonText}>Detective And Mystery</Text>
                </ImageBackground>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  this.goToBookList('fantasy');
                }}>
                <ImageBackground
                  style={styles.backgroundImageButton}
                  source={require('../assets/fantasy.png')}>
                  <Text style={styles.buttonText}>Fantasy</Text>
                </ImageBackground>
              </TouchableOpacity>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: 10,
              }}>
              <TouchableOpacity
                onPress={() => {
                  this.goToBookList('horror');
                }}>
                <ImageBackground
                  style={styles.backgroundImageButton}
                  source={require('../assets/horror.png')}>
                  <Text style={styles.buttonText}>Horror</Text>
                </ImageBackground>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  this.goToBookList('romance');
                }}>
                <ImageBackground
                  style={styles.backgroundImageButton}
                  source={require('../assets/romance.png')}>
                  <Text style={styles.buttonText}>Romance</Text>
                </ImageBackground>
              </TouchableOpacity>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: 10,
              }}>
              <TouchableOpacity
                onPress={() => {
                  this.goToBookList('SF');
                }}>
                <ImageBackground
                  style={styles.backgroundImageButton}
                  source={require('../assets/SF.png')}>
                  <Text style={styles.buttonText}>Science Fiction</Text>
                </ImageBackground>
              </TouchableOpacity>

              <TouchableOpacity
               onPress={() => {
                  this.goToBookList('thriller');
                }}>
                <ImageBackground
                  style={styles.backgroundImageButton}
                  source={require('../assets/thriller.png')}>
                  <Text style={styles.buttonText}>Thriller</Text>
                </ImageBackground>
              </TouchableOpacity>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: 10,
              }}>
              <TouchableOpacity
                onPress={() => {
                  this.goToBookList('education');
                }}>
                <ImageBackground
                  style={styles.backgroundImageButton}
                  source={require('../assets/education.png')}>
                  <Text style={styles.buttonText}>Education</Text>
                </ImageBackground>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  this.goToBookList('religion');
                }}>
                <ImageBackground
                  style={styles.backgroundImageButton}
                  source={require('../assets/religion.png')}>
                  <Text style={styles.buttonText}>Religion</Text>
                </ImageBackground>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#565eaf',
  },
  droidSafeArea: {
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  title: {
    fontSize: 30,
    fontFamily: 'Alegreya',
    fontWeight: 'bold',
    height: 90,
    padding: 10,
    color: '#fff',
    borderColor: 'white',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontFamily: 'Alegreya',
    fontWeight: 'bold',
    alignSelf: 'center',
    justifyContent: 'center',
    fontSize: 22,
    color: '#fff',
  },
  backgroundImageButton: {
    flex: 0.5,
    margin: 20,
    borderRadius: 10,
    overflow: 'hidden',
    resizeMode: 'cover',
    justifyContent: 'center',
    height: 100,
    width: 160,
  },
});
