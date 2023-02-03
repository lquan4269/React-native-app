import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Card,Button,Icon} from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import * as MailComposer from 'expo-mail-composer';

class ContactComponent extends Component {
    render() {
        return (
            <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
            <Card>
                <Card.Title>Our Address</Card.Title>
                <Card.Divider />
                <Text>121, Clear Water Bay Road</Text>
                <Text>Clear Water Bay, Kowloon</Text>
                <Text>TP HCM</Text>
                <Text>Tel: +852 1234 5678</Text>
                <Text>Fax: +852 8765 4321</Text>
                <Text>Email:duongvanduong@gmail.com</Text>
                <Button title=' Send Email' buttonStyle={{ backgroundColor: '#7cc' }}
            icon={<Icon name='envelope-o' type='font-awesome' color='white' />}
            onPress={this.sendMail} />
            </Card>
            </Animatable.View>
        );
    }
    sendMail() {
        MailComposer.composeAsync({
          recipients: ['quan.lc1920@sinhvien.hoasen.edu.vn'],
          subject: 'From school',
          body: 'Hello '
        });
      }
}
export default ContactComponent;