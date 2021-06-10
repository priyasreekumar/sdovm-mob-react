import 'react-native';
import React from 'react';
import Login from '../app/components/standalone/login/';
import renderer from 'react-test-renderer';

test('Login SnapShot ', () => {
  const login = renderer.create(<Login />).toJSON();

  expect(login).toMatchSnapshot();
});
