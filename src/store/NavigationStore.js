import { observable, action } from 'mobx';

class Store {
  @observable screenIndex = 0;
  @action.bound
  changeScreenIndex(value) {
    this.screenIndex = value;
  }
}

export default Store;
