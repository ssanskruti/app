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
import firebase from 'firebase';
import db from '../config';


export default class BookListScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookName: '',
      author: '',
      genre: this.props.route.params.genre,
      url: '',
      info: '',
      allBooks: [],

      Max_Rating: 5,
    };
    this.Star =
      'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_filled.png';

    this.Star_With_Border =
      'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_corner.png';
  }

  getBookDetails = async () => {
    console.log(this.state.genre);

    await db
      .collection('allBooks')
      .where('genre', '==', this.state.genre)
      .onSnapshot((snapshot) => {
        var allBooks = [];

        snapshot.docs.map((doc) => {
          var book = doc.data();
          console.log(book);
          book['bookId'] = doc.id;

          allBooks.push(book);
        });
        this.setState({
          allBooks: allBooks,
        });
      });
  };

  componentDidMount() {
    this.getBookDetails();
  }

  renderItem = ({ item }) => {
    let React_Native_Rating_Bar = [];
    //Array to hold the filled or empty Stars
    for (var i = 1; i <= this.state.Max_Rating; i++) {
      React_Native_Rating_Bar.push(
        <Image
          key={i}
          style={styles.StarImage}
          source={
            i <= item.rating
              ? { uri: this.Star }
              : { uri: this.Star_With_Border }
          }
        />
      );
    }
    allBooks = item;
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#fff',
          borderBottomWidth: 0.5,
          borderColor: 'gray',
        }}>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('bookDetails', { allBooks: item });
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              //alignItems: 'center',
              padding: 10,
              backgroundColor: '#fff',
            }}>
            <Image
              style={{ width: 80, height: 130, borderRadius: 5 }}
              source={{ uri: allBooks.url }}
            />
            <View style={styles.dview}>
              <Text style={styles.bnText}>{allBooks.bookName}</Text>
              <Text style={styles.aText}>By : {allBooks.author}</Text>
              <View style={styles.childView}>{React_Native_Rating_Bar}</View>
              <Text
                style={{
                  width: '40%',
                  padding: 5,
                  marginTop: 10,
                  borderRadius: 10,
                  backgroundColor: '#565eaf',
                  color: 'white',
                  textAlign: 'center',
                }}>
                {item.genre}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  keyExtractor = (item, index) => index.toString();

  render() {
    if (Object.keys(this.state.allBooks).length === 0) {
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
              text: 'Books List',
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

          <View
            style={{
              flex: 1,
              backgroundColor: '#fff',
            }}>
            <FlatList
              data={this.state.allBooks}
              renderItem={this.renderItem}
              keyExtractor={this.keyExtractor}
            />
          </View>
        </View>
      );
    }
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
    fontSize: 20,
    fontFamily: 'Alegreya',
    fontWeight: 'bold',
    color: '#fff',
  },
  bnText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#565eaf',
    fontFamily: 'Alegreya',
    marginLeft: 10,
  },
  aText: {
    fontSize: 15,
    fontFamily: 'Alegreya',
    marginLeft: 10,
    marginTop: 2,
    color: '#f1613e',
  },
  dview: {
    flex: 1,
    padding: 10,
    margin: 5,
  },
  childView: {
    flexDirection: 'row',
    marginTop: 10,
    marginLeft: 10,
  },
  StarImage: {
    width: 15,
    height: 15,
    resizeMode: 'cover',
  },
});
