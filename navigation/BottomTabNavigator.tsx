import {useEffect, useState} from 'react';
import { FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import {API, Auth, graphqlOperation} from 'aws-amplify';


import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import HomeScreen from '../screens/HomeScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import TabThreeScreen from '../screens/TabThreeScreen';
import TabFourScreen from '../screens/TabFourScreen';
import { BottomTabParamList, HomeNavigatorParamList, TabTwoParamList, TabThreeParamList, TabFourParamList } from '../types';
import ProfilePicture from '../components/ProfilePicture';
import { getUser } from '../src/graphql/queries';
import LogOut from "../screens/LogOut"
import { Button } from 'react-native';


const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: Colors[colorScheme].tint,
        showLabel: false,
      }}>
      <BottomTab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="md-home" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Search"
        component={TabTwoNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-search" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Notifications"
        component={TabThreeNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-notifications-outline" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Messages"
        component={TabFourNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-mail" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator<HomeNavigatorParamList>();

function HomeNavigator() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    // get the current user
    const fetchUser = async () => {
      const userInfo = await Auth.currentAuthenticatedUser({ bypassCache: true });
      if (!userInfo) {
        return;
      }

      try {
        const userData = await API.graphql(graphqlOperation(getUser, { id: userInfo.attributes.sub }))
        if (userData) {
          setUser(userData.data.getUser);
        }
      } catch (e) {
        console.log(e);
      }
    }
    fetchUser();
  }, [])

  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerTitleAlign: "center",
          headerRightContainerStyle: {
            marginRight: 15,
          },
          headerLeftContainerStyle: {
            marginLeft: 15,
          },
          headerTitle: () => (
            <Ionicons  name={"logo-twitter"} size={30} color={Colors.light.tint}/>
          ),
      
          headerRight: () => (
            <LogOut/>
            //<MaterialCommunityIcons name={"star-four-points-outline"} size={30} color={Colors.light.tint}/>
            //<FontAwesome.Button name="twitter" backgroundColor="#1da1f2" onPress={() => LogOut()}>
           // LogOut
           // </FontAwesome.Button>
          ),
          headerLeft: () => (
            //<ProfilePicture size={40} image={'https://cms.qz.com/wp-content/uploads/2017/03/twitter_egg_blue.png?quality=75&strip=all&w=1100&h=619'} />
            <ProfilePicture  size={40} image={user?.image} />
          )
        }}
      />
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator<TabTwoParamList>();

function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="TabTwoScreen"
        component={TabTwoScreen}
        options={{ headerTitle: 'Tab Two Title' }}
      />
    </TabTwoStack.Navigator>
  );
}

const TabThreeStack = createStackNavigator<TabThreeParamList>();

function TabThreeNavigator() {
  return (
    <TabThreeStack.Navigator>
      <TabThreeStack.Screen
        name="TabThreeScreen"
        component={TabThreeScreen}
        options={{ headerTitle: 'Tab Three Title' }}
      />
    </TabThreeStack.Navigator>
  );
}

const TabFourStack = createStackNavigator<TabFourParamList>();

function TabFourNavigator() {
  return (
    <TabFourStack.Navigator>
      <TabFourStack.Screen
        name="TabFourScreen"
        component={TabFourScreen}
        options={{ headerTitle: 'Tab Four Title' }}
      />
    </TabFourStack.Navigator>
  );
}
function SignOut(): void {
  throw new Error('Function not implemented.');
}

