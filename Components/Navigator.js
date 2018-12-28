import { createStackNavigator, createAppContainer } from "react-navigation";
import HomeScreen from "./HomeScreen";
import ChatScreen from "./ChatScreen";


const Navigator = createStackNavigator(
    {
        Home: HomeScreen,
        Details: ChatScreen
    },
    {
        initialRouteName: "Home"
    }
);
export default AppContainer = createAppContainer(Navigator);
