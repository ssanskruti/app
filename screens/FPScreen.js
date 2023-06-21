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

export default class ForgotPasswordScreen extends Component {
  sendPResetLink = async () => {
    firebase
      .auth()
      .sendPasswordResetEmail(this.state.email)
      .then(() => {
        alert('Password Resent Link Sent.');
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
      });
  };

  constructor() {
    super();
    this.state = {
      email: '',
    };
  }
  render() {
    const { email } = this.state;
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.droidSafeArea} />
        <ImageBackground
          style={styles.backgroundImage}
          source={require('../assets/loginbg.png')}>
          <ScrollView>
            <View style={{ marginTop: '55%' }}>
              <Text style={styles.title}>Reset Password</Text>
            </View>

            <Text style={styles.gText}>E-Mail</Text>
            <TextInput
              placeholder={'Enter Registered E-mail'}
              style={styles.textInput}
              placeholderTextColor={'#535353'}
              onChangeText={(x) => {
                this.setState({ email: x });
              }}
              value={email}
            />

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
                    this.sendPResetLink();
                  }}>
                  <Text style={styles.buttonText}>Send</Text>
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
    marginTop: 45,
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
    color:'#565eaf',
  },
  view: {
    alignItems: 'center',
    justifyContent: 'center',
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
  title: {
    fontSize: 20,
    fontFamily: 'Alegreya',
    fontWeight: 'bold',
    marginLeft: 15,
    color: '#fff',
    marginBottom: 20,
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
    marginTop: 50,
    color: '#565eaf',
  },
});
