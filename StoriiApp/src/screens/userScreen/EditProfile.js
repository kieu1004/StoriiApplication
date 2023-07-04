import React, { Component } from 'react';
import ProfileForm from '../../components/ProfileForm';
import UserController from '../../backend/controllers/UserController';
import UserModel from '../../backend/models/UserModel';

export default class EditProfile extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Edit User',
    };
  };

  state = {
    user: new UserModel('', '', '', '', '', '', '', ''),
  };

  componentDidMount() {
    const { route } = this.props;
    const { user } = route.params || {};

    if (user) {
      this.setState({ user });
    }
  }

  onUserUpdated = async (userData) => {
    const { user } = this.state;
    try {
      await UserController.updateUser(userData, (updatedUser) => {
        console.log('User updated');
        this.props.navigation.popToTop();
      });
    } catch (error) {
      console.log('Failed to update user:', error.message);
    }
  };

  render() {
    return (
      <ProfileForm
        user={this.state.user}
        onUserUpdated={this.onUserUpdated}
      />
    );
  }
}