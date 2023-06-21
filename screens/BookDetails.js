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
import { Header, Icon } from 'react-native-elements';

import { RFValue } from 'react-native-responsive-fontsize';
import * as Speech from 'expo-speech';
import { Feather, MaterialCommunityIcons, Entypo,Ionicons } from '@expo/vector-icons';

export default class BookDetailsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookName: this.props.route.params.allBooks['bookName'],
      author: this.props.route.params.allBooks['author'],
      info: this.props.route.params.allBooks['info'],
      genre: this.props.route.params.allBooks['genre'],
      url: this.props.route.params.allBooks['url'],
      speakerColor: 'gray',
      speakerIcon: 'volume-high-outline',
      rating: this.props.route.params.allBooks['rating'],
      Max_Rating: 5,
      React_Native_Rating_Bar: [],
    };
    this.Star =
      'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_filled.png';

    this.Star_With_Border =
      'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_corner.png';
  }

  async initiateTTS(title, author, info) {
    try {
      const current_color = this.state.speakerColor;
      this.setState({
        speakerColor: current_color === 'gray' ? '#ee8249' : 'gray',
      });
      if (current_color === 'gray') {
        console.log(title + author + info);
        try {
          Speech.speak(`${title} by ${author}`);
          Speech.speak(info);
        } catch (e) {
          console.log(e);
        }
      } else {
        Speech.stop();
      }
    } catch (e) {
      console.log(e);
    }
  }

  componentDidMount = () => {
    if (this.state.genre == 'DandM') {
      this.setState({ genre: 'Detective and Mystery' });
    } else if (this.state.genre == 'SF') {
      this.setState({ genre: 'Science Fiction' });
    } else if (this.state.genre == 'action') {
      this.setState({ genre: 'Action' });
    } else if (this.state.genre == 'adventure') {
      this.setState({ genre: 'Adventure' });
    } else if (this.state.genre == 'fantasy') {
      this.setState({ genre: 'Fantasy' });
    } else if (this.state.genre == 'horror') {
      this.setState({ genre: 'Horror' });
    } else if (this.state.genre == 'romance') {
      this.setState({ genre: 'Romance' });
    } else if (this.state.genre == 'thriller') {
      this.setState({ genre: 'Thriller' });
    } else if (this.state.genre == 'education') {
      this.setState({ genre: 'Education' });
    } else if (this.state.genre == 'religion') {
      this.setState({ genre: 'Religion' });
    }

    const { React_Native_Rating_Bar } = this.state;
    //Array to hold the filled or empty Stars
    for (var i = 1; i <= this.state.Max_Rating; i++) {
      React_Native_Rating_Bar.push(
        <Image
          key={i}
          style={styles.StarImage}
          source={
            i <= this.state.rating
              ? { uri: this.Star }
              : { uri: this.Star_With_Border }
          }
        />
      );
    }
  };

  render() {
    if (Object.keys(this.state.bookName).length === 0) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#fff',
          }}>
          <Text style={styles.title}>Loading...</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <SafeAreaView style={styles.droidSafeArea} />
          <ScrollView>
            <Header
              centerComponent={{
                text: 'Book Details',
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
            <View style={{ backgroundColor: '#7B83BB', padding: 15 }}>
              <Image
                style={styles.bookImage}
                source={{ uri: this.state.url }}
              />
            </View>
            <View
              style={{
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,
                backgroundColor: '#fff',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View style={{ flex: 0.8 }}>
                  <Text style={styles.gText}>Book Name</Text>
                  <Text style={styles.bnText}>{this.state.bookName}</Text>

                  <Text style={styles.gText}>Author</Text>
                  <Text style={styles.aText}>{this.state.author}</Text>

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text style={styles.gText}>Rating</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: 20,
                      justifyContent: 'space-between',
                    }}>
                    <Text style={styles.bnText}>
                      {this.state.React_Native_Rating_Bar}
                    </Text>

                    <Text
                      style={{
                        width: '40%',
                        padding: 5,
                        borderRadius: 10,
                        backgroundColor: '#565eaf',
                        color: 'white',
                        textAlign: 'center',
                      }}>
                      {this.state.genre}
                    </Text>
                  </View>
                </View>

                <View style={styles.iconContainer}>
                  <TouchableOpacity
                    onPress={() =>
                      this.initiateTTS(
                        this.state.bookName,
                        this.state.author,
                        this.state.info
                      )
                    }>
                    <Ionicons
                      name={this.state.speakerIcon}
                      size={RFValue(30)}
                      color={this.state.speakerColor}
                      style={{ margin: RFValue(15) }}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <Text style={styles.gText}>Summary</Text>
              <Text style={styles.infoText}>{this.state.info}</Text>
            </View>
          </ScrollView>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontFamily: 'Alegreya',
    fontWeight: 'bold',
    marginLeft: 15,
    marginTop: 2,
    color: '#565eaf',
  },
  bnText: {
    fontSize: 22,
    fontFamily: 'Alegreya',
    fontWeight: 'bold',
    marginLeft: 15,
    marginTop: 2,
    color: '#565eaf',
  },
  aText: {
    fontSize: 20,
    fontFamily: 'Alegreya',
    fontWeight: 'bold',
    marginLeft: 15,
    marginTop: 2,
    color: '#565eaf',
  },
  infoText: {
    fontSize: 16,
    fontFamily: 'Alegreya',
    marginLeft: 15,
    marginTop: 2,
    color: '#565eaf',
  },
  childView: {
    flexDirection: 'row',
    marginTop: 10,
    marginLeft: 10,
  },
  StarImage: {
    width: 20,
    height: 20,
    resizeMode: 'cover',
  },
  droidSafeArea: {
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  iconContainer: {
    flex: 0.2,
  },
  gText: {
    marginLeft: 15,
    fontSize: 17,
    fontFamily: 'Alegreya',
    fontWeight: 'bold',
    marginTop: 20,
    color: '#f1613e',
  },
  gText1: {
    marginLeft: 15,
    fontSize: 17,
    fontFamily: 'Alegreya',
    fontWeight: 'bold',
    marginTop: 20,
    color: '#f1613e',
    marginRight: 45,
  },
  bookImage: {
    width: 140,
    height: 220,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderColor: '#fff',
    borderWidth: 1,
  },
});

