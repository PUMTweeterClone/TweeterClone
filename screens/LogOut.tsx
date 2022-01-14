import React from 'react';
import { StyleSheet, Text, View, Pressable, Dimensions } from 'react-native';
import { Auth } from 'aws-amplify';
import { FontAwesome } from '@expo/vector-icons';
const { width } = Dimensions.get('window');
const LogOut = () => {
  const signOut = async () => {
    try {
      await Auth.signOut({ global: true });
    } catch (error) {
      console.log('error signing out: ', error);
    }
  };
  return (
    <FontAwesome.Button name="twitter" backgroundColor="#1da1f2" onPress={() => signOut()}>
        LogOut
    </FontAwesome.Button>
  );
};

export default LogOut;