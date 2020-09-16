import React from 'react';
import { View } from 'react-native';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import theme from '../theme';

import ThemeProvider from '../ThemeProvider';

describe('ThemeProvider', () => {
  it('should work', () => {
    const component = shallow(
      <ThemeProvider>
        <View />
      </ThemeProvider>
    );
    expect(toJson(component)).toMatchSnapshot();
  });

  it('should update and replace theme', () => {
    const component = shallow(
      <ThemeProvider>
        <View />
      </ThemeProvider>
    );
    const instance = component.instance();

    expect(instance.state).toMatchObject({
      theme,
    });

    instance.updateTheme({
      colors: {
        primary: 'pink',
      },
    });

    expect(instance.state).toMatchObject({
      theme: {
        ...theme,
        colors: {
          ...theme.colors,
          primary: 'pink',
        },
      },
    });

    instance.replaceTheme({});

    expect(instance.state).toMatchObject({
      theme,
    });
  });

  it('should get the theme', () => {
    const component = shallow(
      <ThemeProvider>
        <View />
      </ThemeProvider>
    );
    const instance = component.instance();

    expect(instance.state).toMatchObject({
      theme,
    });

    const retrievedTheme = instance.getTheme();

    expect(retrievedTheme).toBeTruthy();
    expect(retrievedTheme).toEqual(theme);
  });

  it('should contain useDark key', () => {
    const component = shallow(
      <ThemeProvider>
        <View />
      </ThemeProvider>
    );
    const instance = component.instance();

    expect(instance.state).toMatchObject({
      theme,
      useDark: false,
    });
  });
});
