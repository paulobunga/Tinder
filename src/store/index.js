import NavigationStore from './NavigationStore';
import CardStore from './CardStore';
import MessageStore from './MessageStore';

export default {
  navigationStore: new NavigationStore(),
  cardStore: new CardStore(),
  messageStore: new MessageStore()
};
