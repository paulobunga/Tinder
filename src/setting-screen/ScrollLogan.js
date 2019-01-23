import React, { Component } from 'react';
import { View, Text, FlatList, Dimensions } from 'react-native';
import { Icon } from 'react-native-elements';
import DotBar from './DotBar';

const SCREEN_WIDTH = Dimensions.get('window').width;

type Props = {
  data: [
    {
      icon: {
        name: string,
        color: string,
        type?: string,
        size?: number
      },
      slogan: string,
      description: string
    }
  ]
};

class ScrollLogan extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      index: 0
    };

    this.viewabilityConfig = {
      waitForInteraction: true,
      viewAreaCoveragePercentThreshold: 40
    };
    this.indexItem = 0;
  }
  componentDidMount() {
    this.setTimer();
  }

  setTimer() {
    this.timer = setInterval(this.moveToIndex, 3000);
  }

  getColors = () => this.props.data[this.state.index].icon.color;

  moveToIndex = index => {
    let state;
    if (index > -1) {
      state = index;
    } else {
      state = (this.state.index + 1) % this.props.data.length;
    }
    this.flatListRef.scrollToIndex({ index: state });
    this.setState({ index: state });
  };
  handleItemChanged = ({ changed }) => {
    if (changed[0].isViewable) {
      this.indexItem = changed[0].index;
    }
  };

  keyExtractor = item => item.slogan;

  componentWillUnMount() {}

  renderItem = ({ item }) => {
    const { moveContainerStyle, textStyle } = styles;
    const { icon, slogan, description } = item;
    return (
      <View style={moveContainerStyle}>
        <View style={{ flexDirection: 'row' }}>
          <Icon {...icon} />
          <Text style={textStyle}>{slogan}</Text>
        </View>
        <Text style={{ fontSize: 16, color: '#000000' }}>{description}</Text>
      </View>
    );
  };

  render() {
    const { containerStyle } = styles;
    return (
      <View style={containerStyle}>
        <FlatList
          horizontal
          data={this.props.data}
          extraData={this.state}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
          ref={ref => {
            this.flatListRef = ref;
          }}
          getItemLayout={(data, index) => ({
            length: SCREEN_WIDTH,
            offset: SCREEN_WIDTH * index,
            index
          })}
          showsHorizontalScrollIndicator={false}
          onViewableItemsChanged={this.handleItemChanged}
          viewabilityConfig={this.viewabilityConfig}
          onScrollEndDrag={() => {
            this.moveToIndex(this.indexItem);
            this.setTimer();
          }}
          onScrollBeginDrag={() => {
            clearInterval(this.timer);
          }}
        />
        <DotBar index={this.state.index} color={this.getColors()} length={this.props.data.length} />
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  moveContainerStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: SCREEN_WIDTH,
    backgroundColor: '#fafafa'
  },
  textStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    marginStart: 10
  }
};

export default ScrollLogan;
