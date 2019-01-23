import { observable, action, reaction, when } from 'mobx';
import {
  loadUserInfo,
  loadRandomUser,
  setLikePeople,
  isMatch,
  setMatch,
  loadMatch,
  getImgURI
} from '../firebase-api/Firebase_Api';

class CardStore {
  @observable imageIndex = 0;
  @observable cardIndex = 0;
  @observable cardLength = 3;
  @observable isCardOpen = true;

  @observable isEnded = false;

  @observable cardData = {};

  @observable cardBelowData = {};

  @observable isLoaded = false;

  @observable savedData = []; //using for many purpose!! temporary data

  @observable userData = {
    Id: 'U01',
    Name: 'Truong Pham',
    Age: 21,
    Like: ['U02'],
    Avatar: ['A'],
    Match: {
      a: 'U01'
    }
  };

  @observable modalVisible = false;

  @observable ImageMatch = [];

  @observable isLoadDataSuccess = false;

  constructor() {
    when(
      () => this.isLoaded,
      () => {
        loadMatch(this.userData);
      }
    );
  }

  a = reaction(
    () => this.userData.Match,
    data => {
      // console.log(data);
    }
  );

  loadImageMatch() {
    Object.values(this.userData.Match).map(item => {
      getImgURI(item).then(result => {
        this.ImageMatch.push(result);
      });
    });
  }

  @action.bound
  setModalVisible(visible) {
    this.modalVisible = visible;
  }

  @action.bound
  setUserData(value) {
    this.userData = { ...value };
  }

  @action.bound
  loadCardData(isLoaded) {
    this.savedData = { ...this.cardData };
    if (isLoaded) {
      this.cardData = { ...this.cardBelowData };
      loadRandomUser(this.cardIndex + 1)
        .then(resolve => {
          this.cardBelowData = { ...resolve };
        })
        .catch(() => {
          this.isEnded = true;
        });
    } else {
      loadRandomUser(this.cardIndex).then(resolve => {
        this.setCardData(resolve);
        loadRandomUser(this.cardIndex + 1).then(res => {
          this.cardBelowData = res;
          this.setLoaded(true);
        });
      });
    }
  }

  @action.bound
  setLoaded(value) {
    this.isLoaded = value;
  }

  @action.bound
  setCardData(data) {
    this.cardData = { ...data };
  }

  @action.bound
  setCardOpen(value) {
    this.isCardOpen = value;
  }

  @action.bound
  setLength(length) {
    this.cardLength = length;
  }

  @action.bound
  moveCard(isLike) {
    // first check if this is the end, so not load
    if (this.isEnded) {
      this.isLoaded = false;
      return;
    }

    // check if this person like another person or not
    if (isLike) {
      setLikePeople(this.userData.Id, this.cardData.Id);

      // check whether it's a match

      isMatch(this.userData.Id, this.cardData.Id)
        .then(data => {
          if (data === 'match') {
            console.log('match');
            this.modalVisible = true;
            setMatch(this.userData.Id, this.savedData.Id);
          } else {
            console.log('not match');
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
    // turn card to next people
    this.cardIndex++;
    this.imageIndex = 0;
    this.loadCardData(true);
  }

  @action.bound
  moveImageRight() {
    if (this.imageIndex + 1 < Object.values(this.cardData.Avatar).length) {
      this.imageIndex++;
    }
  }
  @action.bound
  moveImageLeft() {
    if (this.imageIndex - 1 >= 0) {
      this.imageIndex--;
    }
  }
}

export default CardStore;
