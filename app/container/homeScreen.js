import React from 'react';
import {View, StyleSheet, TouchableWithoutFeedback, Image} from 'react-native';
import {connect} from 'react-redux';
import {Card, TabView, Tab, Icon, Text, List} from '@ui-kitten/components';
import images from '../assets/images';
import navigationService from '../services/navigationService';
import * as restaurentsActions from '../redux/actions/restaurentActions';

const AlertIcon = (props) => <Icon {...props} name="alert-circle-outline" />;

const data = new Array(8).fill({
  title: 'Item',
});

const styles = StyleSheet.create({
  container: {},
  contentContainer: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  item: {
    marginVertical: 4,
  },
});

class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedIndex: 0,
      password: '',
      secureTextEntry: true,
    };
  }

  renderItemHeader = (headerProps, info) => (
    <View {...headerProps}>
      <Text category="h6">{info.item.name}</Text>
    </View>
  );

  renderItemFooter = (footerProps, info) => (
    <Text {...footerProps}>{Object.values(info.item.address).join(', ')}</Text>
  );

  _onPress = (infoItem) => {
    navigationService.navigateWithState('DetailsScreen', {
      item: infoItem,
    });
  };

  renderItem = (info) => (
    <Card
      style={styles.item}
      status="basic"
      onPress={() => this._onPress(info.item)}
      header={(headerProps) => this.renderItemHeader(headerProps, info)}
      footer={(headerProps) => this.renderItemFooter(headerProps, info)}>
      <Image
        source={{uri: info.item.mainPhotoSrc}}
        style={{width: '100%', height: 200}}
      />
      <Text style={{marginVertical: 10}}>{info.item.marketingOffer.title}</Text>
    </Card>
  );

  componentDidMount() {
    const {getRestaurents} = this.props;
    getRestaurents();
  }

  render() {
    const {restaurents} = this.props;
    const {selectedIndex, password, secureTextEntry} = this.state;
    return (
      <TabView
        selectedIndex={selectedIndex}
        onSelect={(index) => this.setState({selectedIndex: index})}>
        <Tab title="Hot Deals">
          <List
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
            data={restaurents}
            renderItem={this.renderItem}
          />
        </Tab>
        <Tab title="Top Brands">
          <List
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
            data={restaurents}
            renderItem={this.renderItem}
          />
        </Tab>
        <Tab title="Top Offers">
          <List
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
            data={restaurents.filter(
              (item) => item.bestOffer.tagsIds.length > 0,
            )}
            renderItem={this.renderItem}
          />
        </Tab>
      </TabView>
    );
  }
}

const mapStateToProps = (state) => ({
  restaurents: state.restaurents.restaurents,
});

const mapStateToDispatch = (dispatch) => ({
  getRestaurents: () => dispatch(restaurentsActions.getAllRestaurents()),
});

export default connect(mapStateToProps, mapStateToDispatch)(HomeScreen);
