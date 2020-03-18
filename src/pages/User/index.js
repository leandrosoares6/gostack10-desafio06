import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { ActivityIndicator, TouchableOpacity } from 'react-native';

import api from '../../services/api';

import {
  Container,
  Header,
  Avatar,
  Name,
  Bio,
  ActivityIndicatorContainer,
  Stars,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Author,
} from './styles';

export default class User extends Component {
  static navigationOptions = ({ route }) => ({
    title: route.params?.user?.name,
  });

  // eslint-disable-next-line react/static-property-placement
  static propTypes = {
    route: PropTypes.shape({
      params: PropTypes.shape(),
    }).isRequired,
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }).isRequired,
  };

  // eslint-disable-next-line react/state-in-constructor
  state = {
    page: 1,
    stars: [],
    loading: false,
    refreshing: false,
  };

  async componentDidMount() {
    const { page } = this.state;

    this.setState({ page: 1, loading: true });

    await this.fetchData(page);
  }

  handleNavigate = repo => {
    const { navigation } = this.props;

    navigation.navigate('Repo', { repo });
  };

  async fetchData(page) {
    const { stars } = this.state;
    const { route } = this.props;
    const { user } = route.params;

    const response = await api.get(`/users/${user.login}/starred`, {
      params: {
        page,
      },
    });

    const array = [...stars, ...response.data];

    this.setState({
      stars: array,
      loading: false,
    });
  }

  async refreshList() {
    this.setState({ refreshing: true, page: 1, stars: [] }, () => {
      this.fetchData(1);
    });
  }

  async loadMore() {
    const { page } = this.state;
    this.setState({ page: page + 1 });
    await this.fetchData(page + 1);
  }

  render() {
    const { stars, loading, refreshing } = this.state;
    const { route } = this.props;
    const { user } = route.params;

    return (
      <Container>
        <Header>
          <Avatar source={{ uri: user.avatar }} />
          <Name>{user.name}</Name>
          <Bio>{user.bio}</Bio>
        </Header>
        {loading ? (
          <ActivityIndicatorContainer>
            <ActivityIndicator size={60} color="#7159c1" />
          </ActivityIndicatorContainer>
        ) : (
          <Stars
            onEndReachedThreshold={0.3}
            onEndReached={() => this.loadMore()}
            onRefresh={() => this.refreshList()}
            refreshing={refreshing}
            data={stars}
            keyExtractor={(star, index) => String(index)}
            renderItem={({ item }) => (
              <Starred>
                <TouchableOpacity
                  onPress={() => this.handleNavigate(item)}
                  style={{ flexDirection: 'row' }}
                >
                  <OwnerAvatar source={{ uri: item?.owner?.avatar_url }} />
                  <Info>
                    <Title>{item?.name}</Title>
                    <Author>{item?.owner?.login}</Author>
                  </Info>
                </TouchableOpacity>
              </Starred>
            )}
          />
        )}
      </Container>
    );
  }
}
