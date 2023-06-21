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
import { Header, Icon } from 'react-native-elements';
import { RFValue } from 'react-native-responsive-fontsize';
import db from '../config';
import DropDownPicker from 'react-native-dropdown-picker';

export default class AddScreen extends Component {
  constructor() {
    super();
    this.state = {
      bookName: '',
      author: '',
      review: '',
      genre: '',
      dropdownHeight: 50,
      email: firebase.auth().currentUser.email,
    };
  }

  share = async () => {
    if (!this.state.bookName || !this.state.author || !this.state.review || !this.state.genre ) {
      alert('Incomplete Information');
    } else {
      db.collection('allReviews').add({
        bookName: this.state.bookName,
        author: this.state.author,
        review: this.state.review,
        genre: this.state.genre,
        likes: 0,
        reviewAuthor: this.state.email,
        likesId: [],
      });
      db.collection('users')
        .where('email', '==', this.state.email)
        .get()
        .then((snapshot) => {
          snapshot.docs.map((doc) => {
            db.collection('users')
              .doc(doc.id)
              .update({
                noOfReviews: firebase.firestore.FieldValue.increment(1),
              });
          });
        });
      this.setState({
        bookName: '',
        author: '',
        review: '',
        genre: '',
      });
      alert('Your Review has been recorded !');
      this.props.navigation.navigate('feed');
    }
  };

  render() {
    
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.droidSafeArea} />

        <ScrollView>
          <Header
            centerComponent={{
              text: 'Share Your Review',
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

          <View>
            <Text style={styles.gText}>Book Name</Text>
            <TextInput
              placeholder={'Enter Book Name'}
              style={styles.textInput}
              onChangeText={(text) => this.setState({ bookName: text })}
              placeholderTextColor={'#535353'}
              value={this.state.bookName}
            />
            <Text style={styles.gText}>Author</Text>
            <TextInput
              placeholder={'Enter Author Name'}
              style={styles.textInput}
              onChangeText={(text) => this.setState({ author: text })}
              placeholderTextColor={'#535353'}
              value={this.state.author}
            />

            <Text style={styles.gText}>Review</Text>
            <TextInput
              placeholder={'Enter Your Review'}
              style={styles.textInput1}
              onChangeText={(text) => this.setState({ review: text })}
              placeholderTextColor={'#535353'}
              value={this.state.review}
              multiline={true}
              maxLength={250}
            />
          </View>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: 'row',
              marginTop: 10,
            }}>
            <Text style={styles.gText}>Genre</Text>
            <View
              style={{
                flex: 0.7,
                marginRight: 10,
                height: this.state.dropdownHeight,
                width: '70%',
              }}>
              <DropDownPicker
                items={[
                  { label: 'Action', value: 'Action' },
                  { label: 'Adventure', value: 'Adventure' },
                  {
                    label: 'Detective and Mystery',
                    value: 'Detective and Mystery',
                  },
                  { label: 'Fantasy', value: 'Fantasy' },
                  { label: 'Horror', value: 'Horror' },
                  { label: 'Romance', value: 'Romance' },
                  { label: 'Science Fiction', value: 'Science Fiction' },
                  { label: 'Thriller', value: 'Thriller' },
                  { label: 'Education', value: 'Education' },
                  { label: 'Religious', value: 'Religious' },
                ]}
                onOpen={() => {
                  this.setState({ dropdownHeight: 170 });
                }}
                onClose={() => {
                  this.setState({ dropdownHeight: 40 });
                }}
                defaultIndex={0}
                containerStyle={{ height: 40 }}
                onChangeItem={(val) => {
                  this.setState({ genre: val.value });
                }}
                value={this.state.genre}
              />
            </View>
          </View>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <LinearGradient
              // Button Linear Gradient
              colors={['#565eaf', '#565eaf']}
              start={{ x: 0.1, y: 0.5 }}
              end={{ x: 0.9, y: 0.1 }}
              style={styles.button}>
              <TouchableOpacity
                style={styles.button1}
                onPress={() => {
                  this.share();
                }}>
                <Text style={styles.buttonText}>Share</Text>
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
  gText: {
    marginLeft: 16,
    fontSize: 17,
    fontFamily: 'Alegreya',
    fontWeight: 'bold',
    marginTop: 20,
    color: '#565eaf',
  },
  textInput: {
    marginLeft: 15,
    outline: 'none',
    borderWidth: 0.5,
    width: '90%',
    height: 40,
    fontFamily: 'Alegreya',
    fontSize: 15,
    padding: 5,
    margin: 5,
    borderRadius: 5,
  },
  textInput1: {
    marginLeft: 16,
    outline: 'none',
    borderWidth: 0.5,
    padding: 5,
    width: '90%',
    height: 100,
    fontFamily: 'Alegreya',
    fontSize: 15,

    margin: 5,
    borderRadius: 5,
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
    marginTop: 35,
  },
  buttonText: {
    fontFamily: 'Alegreya',
    fontWeight: 'bold',
    fontSize: 16,
    color: 'white',
  },
});
