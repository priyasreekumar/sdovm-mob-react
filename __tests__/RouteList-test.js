import 'react-native';
import React from 'react';
import RouteList from '../app/components/standalone/routelist';
import renderer from 'react-test-renderer';

it('function test', () => {
  let RouteListObject = renderer.create(<RouteList />).getInstance();

  expect(RouteListObject.statusText('delivered')).toEqual('#6FCF97');
});
