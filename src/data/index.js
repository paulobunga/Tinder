const userData = {
  user: {
    topImg: [
      require('../img/topImg_1.jpg'),
      require('../img/topImg_1.jpg'),
      require('../img/topImg_1.jpg'),
      require('../img/topImg_1.jpg')
    ],
    name: 'Truong',
    age: 20,
    workStatus: 'Software Engineering at KMS Technology'
  }
};

const sloganData = [
  {
    icon: {
      name: 'fire',
      type: 'material-community',
      size: 24,
      color: 'orange'
    },
    slogan: 'Get Tinder Gold',
    description: 'See who like you and more'
  },
  {
    icon: {
      name: 'flash',
      type: 'entypo',
      size: 24,
      color: '#6a1b9a'
    },
    slogan: 'Get match faster',
    description: ''
  },
  {
    icon: {
      name: 'star',
      type: 'font-awesome',
      size: 24,
      color: '#ffd740'
    },
    slogan: 'Stand out with Super Likes',
    description: "You're three times more likely to get match"
  },
  {
    icon: {
      name: 'location-on',
      color: '#536dfe',
      size: 24
    },
    slogan: 'Swipe around the world!',
    description: 'Password everywhere with Tinder plus'
  },
  {
    icon: {
      name: 'key-variant',
      type: 'material-community',
      color: 'orange',
      size: 24
    },
    slogan: 'Control your profile',
    description: 'Limit others see your profile'
  }
];

const cardData = [
  {
    name: 'Kate',
    age: 22,
    img: [require('../img/topImg_1.jpg'), require('../img/topImg_2.jpg')],
    bio: 'Hello my name is Truong, I love you all'
  },
  {
    name: 'Truong Pham',
    age: 20,
    img: [require('../img/topImg_2.jpg'), require('../img/topImg_3.jpg')],
    bio: 'Hello my name is Truong, I love you all :v'
  },
  {
    name: 'Nguyen Thi Ngoc Phuong',
    age: 20,
    img: [require('../img/topImg_1.jpg'), require('../img/topImg_3.jpg')],
    bio: 'I love you <3'
  }
];

const messageData = {
  'Truong Pham to Nguyen Thi Ngoc Phuong': [
    {
      isSent: true,
      message: 'Hello, my name is Truong, nice to meet you'
    },
    {
      isSent: false,
      message: 'Hello, Truong, nice to meet you :D'
    },
    {
      isSent: true,
      message: 'Have you watched Avengers movie yet?'
    },
    {
      isSent: true,
      message: 'If not, I want to go to the theater to watch this movie with you :D'
    },
    {
      isSent: false,
      message: "Ok, let's go "
    }
  ]
};

const topPick = [0, 1, 2];

export { userData, sloganData, cardData, topPick, messageData };
