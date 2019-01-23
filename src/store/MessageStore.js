import { observable, action, when, reaction } from 'mobx';
import { loadUserInfo, loadMessage, sendMessages, setTyping } from '../firebase-api/Firebase_Api';

class MessageStore {
  @observable firstUser = {};
  @observable secondUser = {};

  @observable message = {
    store: {}
  };
  @observable isLoadDataSuccess = false;

  constructor() {
    when(
      () => this.isLoadDataSuccess,
      () => {
        loadMessage(this.firstUser.Id, this.secondUser.Id, this.message);
      }
    );
  }

  sendMessage(text) {
    sendMessages(this.firstUser.Id, this.secondUser.Id, text);
  }

  a = reaction(
    () => this.message.store,
    data => {
      //    console.log(data);
    }
  );

  @action.bound
  setFirstUserId(Id) {
    this.firstUser.Id = Id;
  }
  @action.bound
  setSecondUserId(Id) {
    this.secondUser.Id = Id;
  }

  getCurrentChatData() {
    loadUserInfo(this.secondUser.Id).then(result => {
      loadUserInfo(this.firstUser.Id).then(rs => {
        this.secondUser = { ...result };
        this.firstUser = { ...rs };
        this.isLoadDataSuccess = true;
      });
    });
  }

  startTyping() {
    setTyping(this.firstUser.Id, true, this.firstUser.Id, this.secondUser.Id);
  }

  stopTyping() {
    setTyping(this.firstUser.Id, false, this.firstUser.Id, this.secondUser.Id);
  }
}

export default MessageStore;
