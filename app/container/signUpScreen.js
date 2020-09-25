import React from 'react';
import {View, Image, TouchableWithoutFeedback} from 'react-native';
import {Layout, Card, Text, Icon, Input, Button} from '@ui-kitten/components';
import images from '../assets/images';
import navigationService from '../services/navigationService';
import * as authActions from '../redux/actions/authActions';
import { connect } from 'react-redux';

const AlertIcon = (props) => <Icon {...props} name="alert-circle-outline" />;

class SignupScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      secureTextEntry: true,
      firstNameError: {},
    };
  }

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

  _validate = () => {
    const emailRegEx = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const passwordRegEx = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i;

    const {
      email,
      password,
      confirmPassword,
      firstName,
      lastName,
      mobileNumber,
    } = this.state;

    let count = 0;

    if (!firstName || firstName === '') {
      this.setState({
        firstNameError: {
          status: 'danger',
          caption: 'First Name is required',
        },
      });

      count += 1;
    } else {
      this.setState({
        firstNameError: {},
      });
    }

    if (!lastName || lastName === '') {
      this.setState({
        lastNameError: {
          status: 'danger',
          caption: 'Last Name is required',
        },
      });

      count += 1;
    } else {
      this.setState({
        lastNameError: {},
      });
    }

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

    if (!mobileNumber || mobileNumber === '') {
      this.setState({
        mobileNumberError: {
          status: 'danger',
          caption: 'Mobile Number is required',
        },
      });

      count += 1;
    } else if (`${mobileNumber}`.split('').length !== 12) {
      this.setState({
        mobileNumberError: {
          status: 'danger',
          caption: 'Invalid mobile number',
        },
      });

      count += 1;
    } else if (`${mobileNumber}`.indexOf('94') !== 0) {
      this.setState({
        mobileNumberError: {
          status: 'danger',
          caption:
            'Currently accepts Sri Lankan mobile numbers only (94xxxxxxx)',
        },
      });

      count += 1;
    } else {
      this.setState({
        mobileNumberError: {},
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
    } else if (!passwordRegEx.test(password)) {
      this.setState({
        passwordError: {
          status: 'danger',
          caption:
            'Password must have minimum eight characters with at least one letter and one number',
        },
      });

      count += 1;
    } else {
      this.setState({
        passwordError: {},
      });
    }

    if (!confirmPassword || confirmPassword === '') {
      this.setState({
        confirmPasswordError: {
          status: 'danger',
          caption: 'Confirm Password is required',
        },
      });

      count += 1;
    } else if (confirmPassword !== password) {
      this.setState({
        confirmPasswordError: {
          status: 'danger',
          caption: 'Password doesnt match',
        },
      });

      count += 1;
    } else {
      this.setState({
        confirmPasswordError: {},
      });
    }

    return count === 0;
  };

  _onRegister = () => {
    const {
      email,
      password,
      confirmPassword,
      firstName,
      lastName,
      mobileNumber,
    } = this.state;
    const {registerUser} = this.props;

    if (this._validate()) {
      registerUser({
        email,
        password,
        confirmPassword,
        firstName,
        lastName,
        mobileNumber,
      });
    }
  };

  render() {
    const {
      email,
      password,
      confirmPassword,
      secureTextEntry,
      firstName,
      lastName,
      mobileNumber,
      firstNameError,
      lastNameError,
      emailError,
      mobileNumberError,
      passwordError,
      confirmPasswordError,
    } = this.state;
    return (
      <Layout
        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
        level="3">
        <Card
          style={{
            width: '100%',
            maxWidth: '100%',
            minHeight: '80%',
          }}>
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
            value={firstName}
            label="First Name"
            placeholder="Enter your first name"
            onChangeText={(nextValue) => this.setState({firstName: nextValue})}
            style={{marginTop: 20}}
            {...firstNameError}
          />
          <Input
            value={lastName}
            label="Last Name"
            placeholder="Enter your last name"
            onChangeText={(nextValue) => this.setState({lastName: nextValue})}
            style={{marginTop: 20}}
            {...lastNameError}
          />
          <Input
            value={email}
            label="Email"
            keyboardType="email-address"
            placeholder="Enter your email address"
            onChangeText={(nextValue) => this.setState({email: nextValue})}
            style={{marginTop: 20}}
            {...emailError}
          />
          <Input
            value={mobileNumber}
            label="Mobile Number"
            keyboardType="phone-pad"
            placeholder="Enter your mobile number"
            maxLength={12}
            onChangeText={(nextValue) =>
              this.setState({mobileNumber: nextValue})
            }
            style={{marginTop: 20}}
            {...mobileNumberError}
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
          <Input
            value={confirmPassword}
            label="Confirm Password"
            placeholder="Enter your password again"
            accessoryRight={this._renderIcon}
            secureTextEntry={secureTextEntry}
            onChangeText={(nextValue) =>
              this.setState({confirmPassword: nextValue})
            }
            style={{marginTop: 20}}
            {...confirmPasswordError}
          />
          <Button
            onPress={this._onRegister}
            style={{marginVertical: 40, alignSelf: 'center'}}
            appearance="filled">
            Register
          </Button>
          <View style={{flex: 0, flexDirection: 'row'}}>
            <Text category="p">Already have an account?</Text>
            <TouchableWithoutFeedback
              onPress={() => navigationService.reset('LogInScreen')}>
              <Text category="p" style={{color: 'orange'}}>
                {' '}
                Sign In
              </Text>
            </TouchableWithoutFeedback>
          </View>
        </Card>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.users,
});

const mapStateToDispatch = (disptach) => ({
  registerUser: (params) => disptach(authActions.registerUser(params)),
});

export default connect(mapStateToProps, mapStateToDispatch)(SignupScreen);
