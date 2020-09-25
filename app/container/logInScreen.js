import React from 'react';
import {View, Image, TouchableWithoutFeedback} from 'react-native';
import {connect} from 'react-redux';
import {Layout, Card, Text, Icon, Input, Button} from '@ui-kitten/components';
import images from '../assets/images';
import navigationService from '../services/navigationService';
import * as authActions from '../redux/actions/authActions';

const AlertIcon = (props) => <Icon {...props} name="alert-circle-outline" />;

class LogInScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      secureTextEntry: true,
    };
  }

  _validate = () => {
    const emailRegEx = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    const {email, password} = this.state;

    let count = 0;

    if (!email || email === '') {
      this.setState({
        emailError: {
          status: 'danger',
          caption: 'Email is required',
        },
      });

      count += 1;
    } else if (!emailRegEx.test(email)) {
      this.setState({
        emailError: {
          status: 'danger',
          caption: 'Email format is invalid',
        },
      });

      count += 1;
    } else {
      this.setState({
        emailError: {},
      });
    }

    if (!password || password === '') {
      this.setState({
        passwordError: {
          status: 'danger',
          caption: 'Password is required',
        },
      });

      count += 1;
    } else {
      this.setState({
        passwordError: {},
      });
    }

    return count === 0;
  };

  _onLogin = () => {
    const {login} = this.props;
    const {email, password} = this.state;
    if (this._validate()) {
      login({email, password});
    }
  };

  _toggleSecureEntry = () => {
    this.setState((state) => ({secureTextEntry: !state.secureTextEntry}));
  };

  _renderIcon = (props) => {
    const {secureTextEntry} = this.state;
    return (
      <TouchableWithoutFeedback onPress={this._toggleSecureEntry}>
        <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
      </TouchableWithoutFeedback>
    );
  };

  render() {
    const {
      email,
      password,
      secureTextEntry,
      emailError,
      passwordError,
    } = this.state;
    return (
      <Layout
        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
        level="3">
        <Card style={{width: '75%', maxWidth: '75%'}}>
          <Image
            source={images.Logo}
            resizeMode="contain"
            style={{
              width: 150,
              height: 120,
              alignSelf: 'center',
              marginBottom: 20,
            }}
          />
          <Input
            value={email}
            label="Email"
            placeholder="Enter your username"
            onChangeText={(nextValue) => this.setState({email: nextValue})}
            style={{marginTop: 20}}
            {...emailError}
          />
          <Input
            value={password}
            label="Password"
            placeholder="Enter your password"
            accessoryRight={this._renderIcon}
            secureTextEntry={secureTextEntry}
            onChangeText={(nextValue) => this.setState({password: nextValue})}
            style={{marginTop: 20}}
            {...passwordError}
          />
          <Button
            onPress={this._onLogin}
            style={{marginVertical: 40, alignSelf: 'center'}}
            appearance="filled">
            Log In
          </Button>
          <View style={{flex: 0, flexDirection: 'row'}}>
            <Text category="p">Don't have an account?</Text>
            <TouchableWithoutFeedback
              onPress={() => navigationService.reset('SignupScreen')}>
              <Text category="p" style={{color: 'orange'}}>
                {' '}
                Sign Up
              </Text>
            </TouchableWithoutFeedback>
          </View>
        </Card>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => ({
  username: state.auth.username,
});

const mapStateToDispatch = (disptach) => ({
  login: (params) => disptach(authActions.login(params)),
});

export default connect(mapStateToProps, mapStateToDispatch)(LogInScreen);
