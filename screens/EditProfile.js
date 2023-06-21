import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Alert,
  ScrollView,
  TextInput,
  Button,
  StatusBar,
  KeyboardAvoidingView,
  TouchableOpacity,
  ImageBackground,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { RFValue } from 'react-native-responsive-fontsize';
import firebase from 'firebase';
import db from '../config';
import { Feather } from '@expo/vector-icons';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Header, Icon } from 'react-native-elements';

export default class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: firebase.auth().currentUser.email,
      firstName: this.props.route.params.info['firstName'],
      lastName: this.props.route.params.info['lastName'],
      gender: this.props.route.params.info['gender'],
      docID: this.props.route.params.info['docId'],
    };
    (this.girl =
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQCUecve2ZMT__2xNmpUEkGB2ZduvbxF3Z2g&usqp=CAU'),
      (this.boy =
        'https://img.freepik.com/premium-vector/man-avatar-profile-round-icon_24640-14044.jpg?w=2000');
  }

  updateDetails = async () => {
    try {
      db.collection('users').doc(this.state.docID).update({
        firstName: this.state.firstName,
        lastName: this.state.lastName,
      });
      Alert.alert('Profile Updated');
    } catch (e) {
      console.log(e);
      Alert.alert(e);
    }
  };

  se() {
    this.props.navigation.replace('Settings');
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ backgroundColor: '#565eaf' }}>
          <SafeAreaView style={styles.droidSafeArea} />

          <Header
            centerComponent={{
              text: 'Edit Profile',
              style: {
                margin: 2,
                padding: 2,
                fontWeight: 'bold',
                fontSize: 21,
                color: 'white',
                fontFamily: 'Alegreya',
              },
            }}
            backgroundColor={'#565eaf'}
            leftComponent={
              <Icon
                name="arrow-left"
                type="feather"
                color="#ffffff"
                onPress={() => this.props.navigation.goBack()}></Icon>
            }
          />
        </View>
        <ScrollView>
          <Image
            source={
              this.state.gender == 'female' || this.state.gender == 'Female'
                ? { uri: this.girl }
                : { uri: this.boy }
            }
            style={{
              width: 150,
              height: 150,
              marginTop: 10,
              alignSelf: 'center',
              justifyContent: 'center',
              borderRadius: 100,
            }}
          />

          <Text
            style={{
              marginTop: 15,
              color: '#f1613e',
              alignSelf: 'center',
              fontWeight: 'bold',
              fontSize: 17,
            }}>
            {this.state.email}
          </Text>

          <Text style={styles.gText}>First Name</Text>
          <TextInput
            style={styles.textInput}
            placeholder={'First Name'}
            onChangeText={(text) => {
              this.setState({
                firstName: text,
              });
            }}
            value={this.state.firstName}
          />

          <Text style={styles.gText}>Last Name</Text>
          <TextInput
            style={styles.textInput}
            placeholder={'Last name'}
            onChangeText={(text) => {
              this.setState({
                lastName: text,
              });
            }}
            value={this.state.lastName}
          />

          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 20,
            }}>
            <LinearGradient
              colors={['#565eaf', '#565eaf']}
              start={{ x: 0.1, y: 0.5 }}
              end={{ x: 0.9, y: 0.1 }}
              style={styles.button}>
              <TouchableOpacity
                style={styles.button1}
                onPress={() => {
                  this.updateDetails();
                }}>
                <Text style={styles.buttonText}>Update</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  droidSafeArea: {
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  buttonText: {
    fontFamily: 'Alegreya',
    fontWeight: 'bold',
    alignSelf: 'center',
    color: '#fff',
    fontSize: 15,
  },
  gText: {
    marginLeft: 16,
    fontSize: 17,
    fontFamily: 'Alegreya',
    fontWeight: 'bold',
    marginTop: 10,
    color: '#565eaf',
  },
  button1: {
    fontFamily: 'Alegreya',
    width: 120,
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
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
  button: {
    fontFamily: 'Alegreya',
    width: '35%',
    margin: 20,
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
});
