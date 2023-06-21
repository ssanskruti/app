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
import { Feather, MaterialCommunityIcons, Entypo,Ionicons } from '@expo/vector-icons';

export default class ReviewDetailsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: firebase.auth().currentUser.email,

      bookName: this.props.route.params.allReviews['bookName'],
      review: this.props.route.params.allReviews['review'],
      genre: this.props.route.params.allReviews['genre'],
      author: this.props.route.params.allReviews['author'],
      likesId: this.props.route.params.allReviews['likesId'],
      isLiked: this.props.route.params.allReviews['isLiked'],
      likes: this.props.route.params.allReviews['likes'],
      reviewAuthor: this.props.route.params.allReviews['reviewAuthor'],

      reviewId: this.props.route.params.allReviews['reviewId'],
      userDocId: '',
    };
  }

  likeAction = async () => {
    this.setState({ isLiked: true, likes: this.state.likes + 1 });
    db.collection('allReviews')
      .doc(this.state.reviewId)
      .update({
        likes: firebase.firestore.FieldValue.increment(1),
        likesId: [...this.state.likesId, this.state.email],
      });
  };
  getUserDetails = () => {
    try {
      db.collection('users')
        .where('email', '==', this.state.email)
        .onSnapshot((snapshot) => {
          snapshot.docs.map((doc) => {
            this.setState({
              userDocId: doc.id,
            });
          });
        });
    } catch (e) {
      console.log(e);
    }
  };
  componentDidMount = () => {
    this.getUserDetails();
  };
  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.droidSafeArea} />
        <ScrollView>
          <Header
            centerComponent={{
              text: 'Review Details',
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
            rightComponent={
              this.state.reviewAuthor === this.state.email ? (
                <TouchableOpacity
                  onPress={() => {
                    db.collection('allReviews')
                      .doc(this.state.reviewId)
                      .delete();
                    db.collection('users')
                      .doc(this.state.userDocId)
                      .update({
                        noOfReviews:
                          firebase.firestore.FieldValue.increment(-1),
                      });
                    alert('Review deleted succesfully');
                    this.props.navigation.goBack();
                  }}
                  style={{
                    width: 60,
                    alignItems: 'center',
                    borderRadius: 40,
                    height: 30,
                    alignSelf: 'center',
                  }}>
                  <Ionicons name={'trash'} size={30} color={'#fff'} />
                </TouchableOpacity>
              ) : null
            }
          />
          <View
            style={{
              backgroundColor: '#fff',
            }}>
            <Text style={styles.gText}>Book Name</Text>
            <Text style={styles.bnText}>{this.state.bookName}</Text>

            <Text style={styles.gText}>Author</Text>
            <Text style={styles.aText}>{this.state.author}</Text>

            <Text
              style={{
                width: '35%',
                padding: 5,
                marginTop: 10,
                borderRadius: 10,
                backgroundColor: '#565eaf',
                color: 'white',
                textAlign: 'center',
                fontSize: 15,
                fontFamily: 'Alegreya',
                marginLeft: 10,
              }}>
              {this.state.genre}
            </Text>

            <View>
              <Text style={styles.gText}>Review</Text>
              <Text style={styles.infoText}>{this.state.review}</Text>

              <View style={styles.likeButtonContainer}>
                <TouchableOpacity
                  onPress={() => {
                    this.state.isLiked ? null : this.likeAction();
                  }}
                  style={{
                    // backgroundColor: this.state.color,
                    width: 80,
                    alignItems: 'center',
                    borderRadius: 40,
                    height: 40,
                    marginTop: 20,
                    alignSelf: 'center',
                  }}>
                  <Ionicons
                    name={'thumbs-up'}
                    size={40}
                    color={this.state.isLiked ? '#f1613e' : '#b2b2b2'}
                  />
                </TouchableOpacity>
                <Text style={styles.likeText}>{this.state.likes}</Text>
              </View>
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
    backgroundColor: '#fff',
  },

  bnText: {
    fontSize: 18,
    fontFamily: 'Alegreya',
    fontWeight: 'bold',
    marginLeft: 15,
    marginTop: 2,
    color: '#565eaf',
  },
  aText: {
    fontSize: 17,
    fontFamily: 'Alegreya',
    fontWeight: 'bold',
    marginLeft: 15,
    marginTop: 2,
    color: '#565eaf',
  },
  infoText: {
    fontSize: 18,
    fontFamily: 'Alegreya',
    fontWeight: 'bold',
    margin: 10,

    borderWidth: 0.5,
    padding: 5,
    color: '#565eaf',
  },
  droidSafeArea: {
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  gText: {
    marginLeft: 15,
    fontSize: 17,
    fontFamily: 'Alegreya',
    fontWeight: 'bold',
    marginTop: 20,
    color: '#f1613e',
  },
  likeButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'column',
  },
  likeText: {
    color: '#565eaf',
    marginRight: 20,
    fontFamily: 'Alegreya',
    fontSize: 17,
    fontWeight: 'bold',
    paddingLeft: 17,
    margin: 10,
  },
});
