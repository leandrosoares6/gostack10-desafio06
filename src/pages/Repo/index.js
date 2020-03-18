import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { WebView } from 'react-native-webview';

export default class Repo extends Component {
  static navigationOptions = ({ route }) => ({
    title: route.params?.repo.name,
  });

  // eslint-disable-next-line react/static-property-placement
  static propTypes = {
    route: PropTypes.shape({
      params: PropTypes.shape(),
    }).isRequired,
  };

  render() {
    const { route } = this.props;
    const { repo } = route.params;

    return <WebView source={{ uri: repo.html_url }} style={{ flex: 1 }} />;
  }
}
