import { createStackNavigator, createAppContainer } from "react-navigation";
import HomeScreen from "./HomeScreen";
import ChatScreen from "./ChatScreen";
import LoginScreen from './LoginScreen';

const isRegistered = false;
const initialScreen = isRegistered ? "Home" : "LoginScreen";
const Navigator = createStackNavigator(
    {
        LoginScreen:LoginScreen,
        Home: HomeScreen,
        ChatScreen: ChatScreen
    },
    {
        initialRouteName: initialScreen
    }
);
export default AppContainer = createAppContainer(Navigator);
