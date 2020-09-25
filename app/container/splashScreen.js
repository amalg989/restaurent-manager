import React from 'react';
import {connect} from 'react-redux';
import {Layout, Text} from '@ui-kitten/components';
import {Image} from 'react-native';

import images from '../assets/images';
import navigationService from '../services/navigationService';

class SplashScreen extends React.Component {
  componentDidMount() {
    const {accessToken} = this.props;
    setTimeout(() => {
      if (accessToken && accessToken !== '') {
        navigationService.reset('HomeScreen');
      } else {
        navigationService.reset('LogInScreen');
      }
    }, 3000);
  }

  render() {
    return (
      <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Image
          source={images.Logo}
          resizeMode="contain"
          style={{width: '50%'}}
        />
      </Layout>
    );
  }
}

const mapStateToProps = (state) => ({
  accessToken: state.auth.accessToken,
});

export default connect(mapStateToProps)(SplashScreen);
