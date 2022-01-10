import * as React from 'react';
import { StyleSheet } from 'react-native';

import { Text, View } from '../components/Themed';
import Feed from '../components/Feed';
import NewTweetButton from "../components/NewTweetButton";
import Tweet from '../components/Tweet';
import tweets from '../data/tweets'

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Tweet tweet={tweets[0]}/> 
      <Feed />
      <NewTweetButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
