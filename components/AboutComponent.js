import React, { Component } from 'react';
import { FlatList, Text, ScrollView } from 'react-native';
import { Card, Avatar, ListItem } from 'react-native-elements';
import { baseUrl } from '../shared/baseUrl';
import Loading from './LoadingComponent';
import * as Animatable from 'react-native-animatable';
// redux
import { connect } from 'react-redux';
const mapStateToProps = state => {
  return {
    leaders: state.leaders
  }
};

class About extends Component {
    render() {
        return (
            <ScrollView>
              <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
                <RenderHistory />
                </Animatable.View>
                <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
                <RenderLeadership items={this.props.leaders.leaders}
                isLoading={this.props.leaders.isLoading}
                errMess={this.props.leaders.errMess} />
                </Animatable.View>
            </ScrollView>
        );
      }
}

class RenderHistory extends Component {
    render() {
        return(
            <Card>
                <Card.Title>School History</Card.Title>
                <Card.Divider />
                <Text>Started in 2016</Text>
                <Text>School name is The school is named after the general's name Duong Van Duong </Text>
            </Card>
        );
    }
}

class RenderLeadership extends Component {
    render() {
        if (this.props.isLoading) {
            return (
              <Card>
                <Card.Title>Corporate Leadership</Card.Title>
                <Card.Divider />
                <Loading />
              </Card>
            );
        } else if (this.props.errMess) {
            return (
              <Card>
                <Card.Title>Corporate Leadership</Card.Title>
                <Card.Divider />
                <Text>{this.props.errMess}</Text>
              </Card>
            );
        } else {
            return(
                <Card>
                    <Card.Title>Corporate Leadership</Card.Title>
                    <Card.Divider/>
                    <FlatList data={this.props.items}
                        renderItem={({ item, index }) => this.renderLeaderItem(item, index)}
                        keyExtractor={item => item.id.toString()} />
                </Card>
            );
        }
    }

    renderLeaderItem(item, index) { 
        return (
          <ListItem key={index}>
            <Avatar rounded source={{ uri: baseUrl + item.image }} />
            <ListItem.Content>
              <ListItem.Title>{item.name}</ListItem.Title>
              <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        );
    };
}
export default connect(mapStateToProps)(About);