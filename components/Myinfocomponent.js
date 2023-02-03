import React, { Component } from 'react';
import {Button, Text, View } from 'react-native'

class Myinfo extends Component{
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         age: 21,
    //         weight: 70
    //     };
    // }

    state = {
        age: 21,
        weight: 70
    };

    render(){
        return(
            <View>
                <Text style={{ margin: 50 }}>Hello mudafuka</Text>
                <Text>My name is {this.props.name}</Text>
                <Text>I'm {this.state.age} years old</Text>
                <Text>My weight is {this.state.weight}</Text>
                <Button title='Next Year' onPress={() => this.onPressNextYear()}></Button>
            </View>
        );
    }

    onPressNextYear(){
        //   alert('fuck yeah!');
        this.state.age +=1;
        this.state.weight +=2;
        this.setState(this.state);
    }
}

export default Myinfo;