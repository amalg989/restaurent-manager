import React from 'react';
import {
  Icon,
  Layout,
  MenuItem,
  OverflowMenu,
  TopNavigation,
  TopNavigationAction,
  Avatar,
} from '@ui-kitten/components';
import {View, StyleSheet, Text} from 'react-native';
import {useDispatch} from 'react-redux';
import * as authActions from '../redux/actions/authActions';

const styles = StyleSheet.create({
  container: {
    minHeight: 50,
    maxHeight: 50,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    marginHorizontal: 16,
  },
});

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;

const MenuIcon = (props) => <Icon {...props} name="more-vertical" />;

const LogoutIcon = (props) => <Icon {...props} name="log-out" />;

const NavigationHeader = (props) => {
  const [menuVisible, setMenuVisible] = React.useState(false);
  const dispatch = useDispatch();

  const onLogoutPressed = () => {
    dispatch(authActions.logout());
  };

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const renderMenuAction = () => (
    <TopNavigationAction icon={MenuIcon} onPress={toggleMenu} />
  );

  const renderRightActions = () =>
    props.hideBackBtn ? (
      <React.Fragment>
        <OverflowMenu
          anchor={renderMenuAction}
          visible={menuVisible}
          onBackdropPress={toggleMenu}>
          <MenuItem
            accessoryLeft={LogoutIcon}
            title="Logout"
            onPress={onLogoutPressed}
          />
        </OverflowMenu>
      </React.Fragment>
    ) : null;

  const renderBackAction = () =>
    !props.hideBackBtn ? (
      <TopNavigationAction icon={BackIcon} onPress={props.onBackPressed} />
    ) : null;

  const renderTitle = (props) => (
    <View style={styles.titleContainer}>
      <Avatar
        style={styles.logo}
        source={require('../assets/images/logo.png')}
      />
      <Text {...props}>Restaurents</Text>
    </View>
  );

  return (
    <Layout style={styles.container} level="1">
      <TopNavigation
        alignment="center"
        title={renderTitle}
        accessoryLeft={renderBackAction}
        accessoryRight={renderRightActions}
      />
    </Layout>
  );
};

export default NavigationHeader;
