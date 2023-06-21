import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Alert,
  ScrollView,
  FlatList,
  Image,
  ImageBackground,
  Dimensions,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import firebase from 'firebase';
import db from '../config';
import * as Font from 'expo-font';

import { LinearGradient } from 'expo-linear-gradient';

export default class LogInScreen extends Component {
  constructor() {
    super();
    this.state = {
      fontsLoaded: false,
      email:"",
      password:""
    };
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  logIn = async () => {
    if (!this.state.email || !this.state.password) {
      alert('Please Complete the Information');
    } else {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then((userCredential) => {
          // Signed in
          var user = userCredential.user;
          this.props.navigation.navigate('home');
          this.setState({
            email: '',
            password: '',
          });
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          alert(errorMessage);
        });
    }
  };

  render() {
    const { email, password } = this.state;
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.droidSafeArea} />
        <ImageBackground
          style={styles.backgroundImage}
          source={require('../assets/loginbg.png')}>
          <KeyboardAvoidingView style={{ marginTop: 20, alignItems: 'center' }}>
            <ScrollView>
              <View style={{ marginTop: 220 }}>
                <View
                  style={{
                    paddingBottom: 10,
                  }}>
                  <Text style={styles.title}>Log In</Text>
                  <Text style={styles.title1}>Log in into your account</Text>
                </View>

                <View>
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
                    secureTextEntry={true}
                  />
                </View>

                <View>
                  <TouchableOpacity
                    style={styles.fp}
                    onPress={() => {
                      this.props.navigation.navigate('fp');
                    }}>
                    <Text style={styles.fpText}>Forgot Password?</Text>
                  </TouchableOpacity>
                </View>

                <View
                  style={{ flexDirection: 'row', justifyContent: 'center' }}>
                  <LinearGradient
                    // Button Linear Gradient
                    colors={['#565eaf', '#565eaf']}
                    start={{ x: 0.1, y: 0.5 }}
                    end={{ x: 0.9, y: 0.1 }}
                    style={styles.button}>
                    <TouchableOpacity
                      style={styles.button1}
                      onPress={() => {
                        this.logIn();
                      }}>
                      <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                  </LinearGradient>
                </View>
                <View>
                  <TouchableOpacity
                    style={styles.signup}
                    onPress={() => {
                      this.props.navigation.navigate('signUp');
                    }}>
                    <Text style={styles.sText}>Not a User? Sign Up here</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
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
    fontSize: 20,
    fontFamily: 'Alegreya',
    fontWeight: 'bold',
    marginLeft: 15,
    marginBottom: 20,
    color: '#fff',
  },
  title1: {
    marginLeft: 15,
    marginBottom: 10,
    fontWeight: 'bold',
    fontSize: 15,
    fontFamily: 'Alegreya',
    color: '#565eaf',
  },
  droidSafeArea: {
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    //justifyContent: 'center', // or 'stretch'
  },
  gText: {
    marginLeft: 16,
    fontSize: 17,
    fontFamily: 'Alegreya',
    fontWeight: 'bold',
    marginTop: 10,
    color: '#565eaf',
  },
 // #565eaf ,#ff9b83,#f1613e
  textInput: {
    marginLeft: 15,
    outline: 'none',
    borderBottomWidth: 1,
    width: '90%',
    height: 40,
    fontFamily: 'Alegreya',
    fontSize: 15,
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
    color:"#fff"
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
  fpText: {
    color:'#565eaf',
    fontSize: 15,
    fontFamily: 'Alegreya',
  },
  fp: {
    marginTop: 18,
    marginLeft: '65%',
  },
});
