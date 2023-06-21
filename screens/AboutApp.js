import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  Platform,
  ScrollView,
  TextInput,
  Button,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import firebase from 'firebase';
import { Header, Icon } from 'react-native-elements';


export default class AboutApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
    };
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <SafeAreaView style={styles.droidSafeArea} />
        <ScrollView>
          <Header
            centerComponent={{
              text: 'About App',
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
          <Image source={require('../assets/icon1.png')} style={styles.image} />
          <View
            style={{
              padding: 15,
            }}>
            <Text
              style={{
                alignSelf: 'center',
                fontSize: 18,
                color: '#565eaf',
                fontWeight: 'bold',
              }}>
              Love to read books but don't know what to read? You are at the
              right place. This app can be your perfect guide through your
              journey. Explore books from various genres. You can find multiple
              books that you would want to read within a few minutes. View
              others' reviews as well as see if you agree with them. Share
              yourreviews and level up till you become an elite book reviewer.
            </Text>
            <Text
              style={{
                fontSize: 18,
                color: '#565eaf',
                fontWeight: 'bold',
                marginTop: 10,
              }}>
              With this app, you will not only find your favorite book but also
              help others find theirs.
            </Text>
            <Text
              style={{
                alignSelf: 'center',
                fontSize: 17,
                color: '#f1613e',
                fontWeight: 'bold',
                marginTop: 20,
              }}>
              Hope you love this app! Thank you!
            </Text>
            <Text
              style={{
                alignSelf: 'center',
                fontSize: 17,
                color: '#f1613e',
                fontWeight: 'bold',
              }}>
              -Sanskruti Shende
            </Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  droidSafeArea: {
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  image: {
    margin: 20,
    overflow: 'hidden',
    resizeMode: 'cover',
    justifyContent: 'center',
    height: 150,
    width: 180,
    alignSelf:"center"
  },
});
