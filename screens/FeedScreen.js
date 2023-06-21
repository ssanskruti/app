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
import { Feather,Ionicons } from '@expo/vector-icons';
import { Header } from 'react-native-elements';

export default class FeedScreen extends Component {
  constructor() {
    super();
    this.state = {
      email: firebase.auth().currentUser.email,
      allReviews: [],
      bookName: '',
      author: '',
      review: '',
      genre: '',
    };
  }

  getAllReviews = () => {
    db.collection('allReviews').onSnapshot((snapshot) => {
      var allReviews = [];
      snapshot.docs.map((doc) => {
        var reviewId = doc.data();

        console.log(reviewId);
        reviewId['reviewId'] = doc.id;
        if (reviewId['likesId'].includes(this.state.email)) {
          reviewId['isLiked'] = true;
        } else {
          reviewId['isLiked'] = false;
        }
        allReviews.push(reviewId);
      });
      this.setState({
        allReviews: allReviews,
      });
    });
  };

  componentDidMount() {
    this.getAllReviews();
  }

  renderItem = ({ item }) => {
    allReviews = item;
    return (
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('reviewDetails', {
              allReviews: item,
            });
          }}>
          <View
            style={{
              backgroundColor: '#fff',
              margin: 10,
              borderRadius: 10,
              borderWidth: 0.5,
              borderColor: '#565eaf',
            }}>
            <View style={styles.dview}>
              <Text style={styles.bnText}>{allReviews.bookName}</Text>
              <Text style={styles.bnText1}>By {allReviews.reviewAuthor}</Text>
              <Text
                style={[styles.bnText1, { color: '#ff9b83' }]}
                ellipsizeMode="tail"
                numberOfLines={2}>
                {allReviews.review}
              </Text>
            </View>

            <View style={styles.likeButtonContainer}>
              <Text style={styles.iText}>{allReviews.genre}</Text>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Ionicons name={'heart'} size={16} color={'#565eaf'} />
                <Text style={styles.likeText}>{allReviews.likes}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  keyExtractor = (item, index) => index.toString();

  render() {
    if (Object.keys(this.state.allReviews).length === 0) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#565eaf',
          }}>
          <Text style={styles.title}>Loading...</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <SafeAreaView style={styles.droidSafeArea} />

          <Header
            centerComponent={{
              text: 'Reviews',
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
          />
          <ScrollView>
            <View>
              <FlatList
                data={this.state.allReviews}
                renderItem={this.renderItem}
                keyExtractor={this.keyExtractor}
              />
            </View>
          </ScrollView>
          <View style={{ margin: 5, marginLeft: '82%' }}>
            <TouchableOpacity
              style={styles.button1}
              onPress={() => {
                this.props.navigation.navigate('add');
              }}>
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
   container: {
    flex: 1,
    backgroundColor: '#eeeeee',
  },
  droidSafeArea: {
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  title: {
    fontSize: 35,
    fontFamily: 'Alegreya',
    fontWeight: 'bold',
    height: 90,
    padding: 15,
    color: '#fff',
  },

  button1: {
    fontFamily: 'Alegreya',
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#565eaf',
    borderRadius: 30,
  },
  bnText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#565eaf',
    fontFamily: 'Alegreya',
    marginLeft: 10,
  },
  bnText1: {
    fontSize: 14,
    color: '#565eaf',
    fontFamily: 'Alegreya',
    marginLeft: 10,
    marginTop: 10,
  },
  aText: {
    fontSize: 17,
    fontFamily: 'Alegreya',
    marginLeft: 10,
    marginTop: 2,
    color: '#565eaf',
    fontWeight: 'bold',
  },
  iText: {
    width: '35%',
    padding: 5,
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: '#565eaf',
    color: 'white',
    textAlign: 'center',
    fontSize: 15,
    fontFamily: 'Alegreya',
  },
  rText: {
    fontSize: 16,
    fontFamily: 'Alegreya',
    marginLeft: 10,
    marginTop: 2,
    color: '#f1613e',
    fontWeight: 'bold',
  },
  dview: {
    padding: 5,
    margin: 5,
  },
  buttonText: {
    fontFamily: 'Alegreya',
    fontSize: 40,
    color: 'white',
  },
  likeButtonContainer: {
    alignItems: 'center',
    borderColor: '#565eaf',
    flexDirection: 'row',
    margin: 5,
    padding: 5,
    justifyContent: 'space-around',
  },
  likeText: {
    color: '#565eaf',
    fontFamily: 'Alegreya',
    fontSize: 17,
    fontWeight: 'bold',
    paddingLeft: 5,
    marginRight: 10,
  },
});


