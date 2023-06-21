import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
  Platform,
  StatusBar,
  Button,
} from 'react-native';
import {
  AntDesign,
  FontAwesome,
  MaterialCommunityIcons,
  Feather,
} from '@expo/vector-icons';
import firebase from 'firebase';
import db from '../config';
import { LinearGradient } from 'expo-linear-gradient';

export default class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: firebase.auth().currentUser.email,
      firstName: '',
      lastName: '',
      user: {},
      noOfReviews: 0,
      title: '',
      gender: '',
    };
    (this.girl =
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQCUecve2ZMT__2xNmpUEkGB2ZduvbxF3Z2g&usqp=CAU'),
      (this.boy =
        'https://img.freepik.com/premium-vector/man-avatar-profile-round-icon_24640-14044.jpg?w=2000');
  }

  logoutUser = () => {
    try {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.props.navigation.replace('main');
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (e) {
      console.log(e);
      alert('An error occured. Please try again later.');
    }
  };

  getUserDetails = () => {
    try {
      db.collection('users')
        .where('email', '==', this.state.userId)
        .onSnapshot((snapshot) => {
          snapshot.docs.map((doc) => {
            var range = 'Beginner';
            if (doc.data().noOfReviews < 5) {
              range = 'Beginner';
            } else if (
              doc.data().noOfReviews >= 5 &&
              doc.data().noOfReviews < 10
            ) {
              range = 'Ameatur';
            } else if (
              doc.data().noOfReviews >= 10 &&
              doc.data().noOfReviews < 50
            ) {
              range = 'Avid';
            } else if (
              doc.data().noOfReviews >= 50 &&
              doc.data().noOfReviews < 100
            ) {
              range = 'Veteran';
            } else if (doc.data().noOfReviews >= 100) {
              range = 'Elite';
            }

            this.setState({
              firstName: doc.data().firstName,
              lastName: doc.data().lastName,
              gender: doc.data().gender,
              noOfReviews: doc.data().noOfReviews,
              title: range,
              user: {
                firstName: doc.data().firstName,
                lastName: doc.data().lastName,
                docId: doc.id,
                email: doc.data().email,
                gender: doc.data().gender,
              },
            });
          });
        });
    } catch (e) {
      console.log(e);
    }
  };
  componentDidMount() {
    this.getUserDetails();
  }
  render() {
    let size = {
      Beginner: '5%',
      Ameatur: '25%',
      Avid: '50%',
      Veteran: '75%',
      Elite: '95%',
    };
    return (
      <View style={{ flex: 1, backgroundColor: '#565eaf' }}>
        <LinearGradient
          colors={['#565eaf', '#565eaf']}
          start={{ x: 0.01, y: 0.01 }}
          end={{ x: 0.99, y: 0.99 }}
          style={{
            height: 300,
            padding: 10,
            justifyContent: 'center',
          }}>
          <View
            style={{
              marginTop: 10,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              style={{
                width: 100,
                height: 100,
                marginLeft: 20,
                borderRadius: 50,
              }}
              source={
                this.state.gender == 'female' || this.state.gender == 'Female'
                  ? { uri: this.girl }
                  : { uri: this.boy }
              }
            />

            <View
              style={{
                alignItems: 'flex-start',
                marginLeft: 10,
                flex: 1,
              }}>
              <Text style={{ fontSize: 17, fontWeight: 'bold', color: '#fff' }}>
                {this.state.firstName + ' ' + this.state.lastName}
              </Text>

              <Text style={{ marginTop: 10, color: '#fff' }}>
                {this.state.userId}
              </Text>
              <View
                style={{
                  padding: 10,
                  marginTop: 10,
                  backgroundColor: '#fff',
                  borderRadius: 10,
                }}>
                <Text style={{ color: '#565eaf' }}>{this.state.title}</Text>
              </View>
            </View>
          </View>

          <View
            style={{
              width: '95%',
              height: 10,
              backgroundColor: '#fff',
              position: 'absolute',
              bottom: 30,
              left: '5%',
              borderRadius: 5,
            }}></View>
          <View
            style={{
              width: size[this.state.title],
              backgroundColor: '#f1613e',
              height: 10,
              position: 'absolute',
              bottom: 30,
              left: '5%',
              borderRadius: 5,
            }}></View>

          <View
            style={{
              width: '95%',
              padding: 5,
              position: 'absolute',
              bottom: 15,
            }}>
            <Text
              style={{
                position: 'absolute',
                left: '1%',
                color: '#fff',
                fontSize: 12,
              }}>
              Beginner
            </Text>
            <Text
              style={{
                position: 'absolute',
                left: '25%',
                color: '#fff',
                fontSize: 12,
              }}>
              Ameatur
            </Text>
            <Text
              style={{
                position: 'absolute',
                left: '50%',
                color: '#fff',
                fontSize: 12,
              }}>
              Avid
            </Text>
            <Text
              style={{
                position: 'absolute',
                left: '70%',
                color: '#fff',
                fontSize: 12,
              }}>
              Veteran
            </Text>
            <Text
              style={{
                position: 'absolute',
                left: '95%',
                color: '#fff',
                fontSize: 12,
              }}>
              Elite
            </Text>
          </View>
        </LinearGradient>

        <View
          style={{
            flex: 1,
            marginTop: 10,
            backgroundColor: '#fff',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            padding: 10,
          }}>
          <View style={styles.ss}>
            <FontAwesome name={'user-circle-o'} size={24} color="#000" />
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('editProfile', {
                  info: this.state.user,
                });
              }}
              style={styles.sss}>
              <Text style={{ color: '#000', fontSize: 16 }}>Edit Profile</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.ss}>
            <AntDesign name={'mobile1'} size={24} color="#000" />
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('AboutApp');
              }}
              style={styles.sss}>
              <Text style={{ color: '#000', fontSize: 16 }}>About App</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.ss}>
            <MaterialCommunityIcons
              name="logout"
              size={27}
              color="#000"></MaterialCommunityIcons>
            <TouchableOpacity
              onPress={() => {
                Alert.alert(
                  'Alert!',
                  'Are you sure you want to Logout?',
                  [
                    {
                      text: 'Yes',
                      onPress: () => this.logoutUser(),
                    },
                    {
                      text: 'Cancel',
                      onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel',
                    },
                  ],
                  { cancelable: false }
                );
              }}
              style={styles.sss}>
              <Text style={{ color: '#000', fontSize: 16 }}>Sign Out</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  ss: {
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  sss: {
    height: 50,
    width: '100%',
    borderBottomWidth: 1.5,
    justifyContent: 'center',
    borderBottomColor: 'black',
    marginHorizontal: 10,
  },
});
