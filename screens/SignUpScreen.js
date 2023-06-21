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
import firebase from 'firebase';
import db from '../config';
import { LinearGradient } from 'expo-linear-gradient';

export default class SignUpScreen extends Component {
  signUp = async () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((userCredential) => {
        alert('User Created!');

        db.collection('users').add({
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          email: this.state.email,
          password: this.state.password,
          noOfReviews:0
        });

        this.props.navigation.navigate('home');

        this.setState({
          email: '',
          password: '',
          confirmPassword: '',
          firstName: '',
          lastName: '',
        });
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
      });
  };

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
    };
  }
  render() {
    const { firstName, lastName, email, password, confirmPassword } =
      this.state;
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.droidSafeArea} />

        <ImageBackground
          style={styles.backgroundImage}
          source={require('../assets/signUp.png')}>
          <ScrollView>
            <View
              style={{
                paddingBottom: 10,
                marginTop: 120,
              }}>
              <Text style={styles.title}>Sign Up</Text>
              <Text style={styles.title1}>
                Register with your valid e-mail address
              </Text>
            </View>

            <View>
              <Text style={styles.gText}>First Name</Text>
              <TextInput
                placeholder={'Enter First Name'}
                style={styles.textInput}
                placeholderTextColor={'#535353'}
                onChangeText={(x) => {
                  this.setState({ firstName: x });
                }}
                value={firstName}
              />

              <Text style={styles.gText}>Last Name</Text>
              <TextInput
                placeholder={'Enter Last Name'}
                style={styles.textInput}
                placeholderTextColor={'#535353'}
                onChangeText={(x) => {
                  this.setState({ lastName: x });
                }}
                value={lastName}
              />

              <Text style={styles.gText}>E-Mail</Text>
              <TextInput
                placeholder={'Enter E-mail'}
                style={styles.textInput}
                placeholderTextColor={'#535353'}
                onChangeText={(x) => {
                  this.setState({ email: x });
                }}
                value={email}
              />

              <Text style={styles.gText}>Password</Text>
              <TextInput
                placeholder={'Enter Password'}
                style={styles.textInput}
                placeholderTextColor={'#535353'}
                onChangeText={(x) => {
                  this.setState({ password: x });
                }}
                value={password}
              />

              <Text style={styles.gText}>Confirm Password</Text>
              <TextInput
                placeholder={'Confirm Password'}
                style={styles.textInput}
                placeholderTextColor={'#535353'}
                onChangeText={(x) => {
                  this.setState({ confirmPassword: x });
                }}
                value={confirmPassword}
              />
            </View>

            <View style={styles.view}>
              <LinearGradient
                // Button Linear Gradient
                colors={['#565eaf', '#565eaf']}
                start={{ x: 0.1, y: 0.5 }}
                end={{ x: 0.9, y: 0.1 }}
                style={styles.button}>
                <TouchableOpacity
                  style={styles.button1}
                  onPress={() => {
                    this.signUp();
                  }}>
                  <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>

            <View>
              <TouchableOpacity
                style={styles.signup}
                onPress={() => {
                  this.props.navigation.navigate('login');
                }}>
                <Text style={styles.sText}>Already a User? Log In here</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title1: {
    marginLeft: 15,
    fontWeight: 'bold',
    fontSize: 15,
    fontFamily: 'Alegreya',
    color: '#565eaf',
  },
  title: {
    marginTop: 27,
    fontSize: 20,
    fontFamily: 'Alegreya',
    fontWeight: 'bold',
    marginLeft: 15,
    color: '#fff',
    marginBottom: 25,
  },
  droidSafeArea: {
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center', // or 'stretch'
  },
  gText: {
    marginLeft: 16,
    fontSize: 17,
    fontFamily: 'Alegreya',
    fontWeight: 'bold',
    marginTop: 10,
    color: '#565eaf',
  },
  textInput: {
    marginLeft: 15,
    outline: 'none',
    borderBottomWidth: 1,
    width: '90%',
    height: 40,
    fontFamily: 'Alegreya',
    fontSize: 15,
  },
  view: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  button1: {
    fontFamily: 'Alegreya',
    width: 120,
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  button: {
    fontFamily: 'Alegreya',
    width: 120,
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginTop: 25,
  },
  buttonText: {
    fontFamily: 'Alegreya',
    fontWeight: 'bold',
    fontSize: 14,
    color: '#fff',
  },
  signup: {
    fontFamily: 'Alegreya',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  sText: {
    fontFamily: 'Alegreya',
    marginTop: 1,
    color: '#565eaf',
  },
});
