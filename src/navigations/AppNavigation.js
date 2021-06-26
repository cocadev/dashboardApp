import { Animated, Easing, StyleSheet } from 'react-native';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';
import {
  createReactNavigationReduxMiddleware,
  reduxifyNavigator,
} from 'react-navigation-redux-helpers';
import { connect } from 'react-redux';
import AppStyles from '../AppStyles';
import DrawerContainer from '../components/DrawerContainer';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import HomeScreen from '../screens/HomeScreen';
import DashboardScreen from '../screens/DashboardScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import ActivityScreen from '../screens/ActivityScreen';
import OrdersScreen from '../screens/OrdersScreen';
import ListScreen from '../screens/ListScreen';
import DetailScreen from '../screens/DetailScreen';
import AnalyticsScreen from '../screens/AnalyticsScreen';

const noTransitionConfig = () => ({
  transitionSpec: {
    duration: 0,
    timing: Animated.timing,
    easing: Easing.step0,
  },
});

const middleware = createReactNavigationReduxMiddleware('root', state => state.nav);

// login stack
const LoginStack = createStackNavigator(
  {
    Login: { screen: LoginScreen },
    Signup: { screen: SignupScreen },
    Welcome: { screen: WelcomeScreen },
  },
  {
    initialRouteName: 'Welcome',
    headerMode: 'float',
    navigationOptions: () => ({
      headerTintColor: AppStyles.colorSet.mainThemeForegroundColor,
      headerTitleStyle: styles.headerTitleStyle,
    }),
    cardStyle: { backgroundColor: '#FFFFFF' },
  }
);

const HomeStack = createStackNavigator(
  {
    HomeScreen: { screen: HomeScreen },
    ListScreen: { screen: ListScreen },
    DetailScreen: { screen: DetailScreen },
    AnalyticsScreen: { screen: AnalyticsScreen },
  },
  {
    initialRouteName: 'HomeScreen',
    headerMode: 'float',

    headerLayoutPreset: 'center',
    navigationOptions: () => ({
      headerTintColor: AppStyles.colorSet.mainThemeForegroundColor,
      headerTitleStyle: styles.headerTitleStyle,
    }),
    cardStyle: { backgroundColor: '#FFFFFF' },
  }
);

const DashboardStack = createStackNavigator(
  {
    DashboardScreen: { screen: DashboardScreen },
    ListScreen: { screen: ListScreen },
    DetailScreen: { screen: DetailScreen },
    AnalyticsScreen: { screen: AnalyticsScreen },
  },
  {
    initialRouteName: 'DashboardScreen',
    headerMode: 'float',

    headerLayoutPreset: 'center',
    navigationOptions: () => ({
      headerTintColor: AppStyles.colorSet.mainThemeForegroundColor,
      headerTitleStyle: styles.headerTitleStyle,
    }),
    cardStyle: { backgroundColor: '#FFFFFF' },
  }
);

const OrdersStack = createStackNavigator(
  {
    OrdersScreen: { screen: OrdersScreen },
  },
  {
    initialRouteName: 'OrdersScreen',
    headerMode: 'float',

    headerLayoutPreset: 'center',
    navigationOptions: () => ({
      headerTintColor: AppStyles.colorSet.mainThemeForegroundColor,
      headerTitleStyle: styles.headerTitleStyle,
    }),
    cardStyle: { backgroundColor: '#FFFFFF' },
  }
);

const NotificationsStack = createStackNavigator(
  {
    NotificationsScreen: { screen: NotificationsScreen },
  },
  {
    initialRouteName: 'NotificationsScreen',
    headerMode: 'float',

    headerLayoutPreset: 'center',
    navigationOptions: () => ({
      headerTintColor: AppStyles.colorSet.mainThemeForegroundColor,
      headerTitleStyle: styles.headerTitleStyle,
    }),
    cardStyle: { backgroundColor: '#FFFFFF' },
  }
);

const ActivityStack = createStackNavigator(
  {
    ActivityScreen: { screen: ActivityScreen },
  },
  {
    initialRouteName: 'ActivityScreen',
    headerMode: 'float',

    headerLayoutPreset: 'center',
    navigationOptions: () => ({
      headerTintColor: AppStyles.colorSet.mainThemeForegroundColor,
      headerTitleStyle: styles.headerTitleStyle,
    }),
    cardStyle: { backgroundColor: '#FFFFFF' },
  }
);

// /*****
//  *  Hide Tabbar
//  *
// const TabNavigator = createBottomTabNavigator(
//     {
//         Home: { screen: HomeStack },
//         Dashboard: { screen: DashboardStack },
//         Orders: { screen: OrdersStack },
//         Notifications: { screen: NotificationsStack },
//         Activity: { screen: ActivityStack },
//     },
//     {
//         defaultNavigationOptions: ({ navigation }) => ({
//             tabBarIcon: ({ focused, horizontal, tintColor }) => {
//                 const { routeName } = navigation.state;
//                 let iconName;
//                 if (routeName === 'Home') {
//                     iconName = AppStyles.iconSet.home;
//                 } else if (routeName === 'Dashboard') {
//                     iconName = AppStyles.iconSet.bars;
//                 } else if (routeName === 'Orders') {
//                     iconName = AppStyles.iconSet.orders;
//                 } else if (routeName === 'Notifications') {
//                     iconName = AppStyles.iconSet.bell;
//                 } else if (routeName === 'Activity') {
//                     iconName = AppStyles.iconSet.feed;
//                 }

//                 return <Image style={{ tintColor: focused ? AppStyles.colorSet.mainThemeForegroundColor : AppStyles.colorSet.mainTextColor }} source={iconName} />;
//             },
//         }),
//         initialLayout: {
//             height: 300,
//         },
//         tabBarOptions: {
//             activeTintColor: AppStyles.colorSet.mainThemeForegroundColor,
//             inactiveTintColor: AppStyles.colorSet.mainTextColor,
//             style: {
//                 height: 50,
//             }
//         },
//     }
// );

// // drawer stack
// const DrawerStack = createDrawerNavigator({
//     TabNavigator: TabNavigator,
// }, {
//         drawerPosition: 'left',
//         initialRouteName: 'TabNavigator',
//         drawerWidth: 300,
//         contentComponent: DrawerContainer
//     })
// *
// *********/

// drawer stack
const DrawerStack = createDrawerNavigator(
  {
    Home: { screen: HomeStack },
    Dashboard: { screen: DashboardStack },
    Orders: { screen: OrdersStack },
    Notifications: { screen: NotificationsStack },
    Activity: { screen: ActivityStack },
  },
  {
    drawerPosition: 'left',
    initialRouteName: 'Home',
    drawerWidth: 300,
    contentComponent: DrawerContainer,
  }
);

// Manifest of possible screens
const RootNavigator = createStackNavigator(
  {
    LoginStack: { screen: LoginStack },
    DrawerStack: { screen: DrawerStack },
  },
  {
    // Default config for all screens
    headerMode: 'none',
    initialRouteName: 'DrawerStack',
    transitionConfig: noTransitionConfig,
    navigationOptions: () => ({
      color: 'black',
    }),
  }
);

const AppWithNavigationState = reduxifyNavigator(RootNavigator, 'root');

const mapStateToProps = state => ({
  state: state.nav,
});

const AppNavigator = connect(mapStateToProps)(AppWithNavigationState);

const styles = StyleSheet.create({
  headerTitleStyle: {
    fontWeight: 'bold',
    textAlign: 'center',
    alignSelf: 'center',
    color: 'black',
    flex: 1,
  },
});

export { RootNavigator, AppNavigator, middleware };
