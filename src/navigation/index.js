import { createStackNavigator, createAppContainer, createSwitchNavigator } from 'react-navigation';
import TabNavigator from './TabNavigator';
import Message from '../messages';
import Login from '../login-screen';
import Loading from '../loading-screen';

const Navigation = createSwitchNavigator({
  Loading,
  Login,
  Main: createStackNavigator({
    TabNavigator: {
      screen: TabNavigator,
      navigationOptions: {
        header: null
      }
    },
    MessageDetail: {
      screen: Message,
      navigationOptions: {
        header: null
      }
    }
  })
});
export default createAppContainer(Navigation);
