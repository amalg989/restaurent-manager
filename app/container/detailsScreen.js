import React from 'react';
import {View, StyleSheet, TouchableWithoutFeedback, Image} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {connect} from 'react-redux';
import {Card, TabView, Tab, Icon, Text, List} from '@ui-kitten/components';
import {SliderBox} from 'react-native-image-slider-box';

import images from '../assets/images';
import navigationService from '../services/navigationService';
import * as restaurentsActions from '../redux/actions/restaurentActions';

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  item: {
    marginVertical: 4,
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

class DetailsScreen extends React.Component {
  constructor(props) {
    super();
    this.state = {
      region: {
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      marker: {
        latlng: {
          longitude: 0,
          latitude: 0,
        },
      },
      params: {...props.route.params},
      mapPadding: {
        top: 400,
        bottom: 0,
        left: 0,
        right: 0,
      },
    };
  }

  componentDidMount() {
    const {region, params} = this.state;
    if (params && params.item && params.item.geo) {
      this.setState({
        region: {
          ...region,
          longitude: parseFloat(params.item.geo.longitude),
          latitude: parseFloat(params.item.geo.latitude),
        },
        marker: {
          latlng: {
            longitude: parseFloat(params.item.geo.longitude),
            latitude: parseFloat(params.item.geo.latitude),
          },
        },
      });
    }
  }

  onLayout = (e) => {
    this.setState({
      width: e.nativeEvent.layout.width,
    });
  };

  render() {
    const {region, marker, params, mapPadding} = this.state;
    return (
      <View style={styles.container}>
        <MapView
          pointerEvents="none"
          region={region}
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          mapPadding={mapPadding}>
          <Marker
            coordinate={marker.latlng}
            image={images.LocationMarker}
            onDragEnd={(e) => this._updateCoords(e.nativeEvent.coordinate)}
          />
        </MapView>
        <Card
          style={{
            position: 'absolute',
            top: 10,
            minWidth: '99%',
            maxWidth: '99%',
          }}>
          <Text category="h4">{params.item.name}</Text>
          <View
            style={{maxWidth: '100%', marginVertical: 10}}
            onLayout={this.onLayout}>
            <SliderBox
              sliderBoxHeight={200}
              images={[
                params.item.mainPhoto.source,
                params.item.mainPhoto.source,
              ]}
              parentWidth={this.state.width}
            />
            <Text
              style={{marginVertical: 10}}
              category="h6">{`${params.item.marketingOffer.title}`}</Text>
            <Text
              style={{marginVertical: 10}}
              category="p">{`Address:\n${Object.values(
              params.item.address,
            ).join(', ')}`}</Text>
            <Text
              style={{marginVertical: 10}}
              category="p">{`Price Range: ${params.item.priceRange} ${params.item.currenciesAccepted}`}</Text>
            <Text
              style={{marginVertical: 10}}
              category="p">{`Ratings (TripAdvisor): ${params.item.aggregateRatings.tripadvisor.ratingValue}/10`}</Text>
          </View>
        </Card>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  restaurents: state.restaurents.restaurents,
});

const mapStateToDispatch = (dispatch) => ({
  getRestaurents: () => dispatch(restaurentsActions.getAllRestaurents()),
});

export default connect(mapStateToProps, mapStateToDispatch)(DetailsScreen);
