import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text, Switch, Button, Alert, Modal } from 'react-native';
import { Icon } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { format } from 'date-fns';
import * as Animatable from 'react-native-animatable';
import * as Permissions from 'expo-permissions';
import * as Notifications from 'expo-notifications';
import * as Calendar from 'expo-calendar';

class Reservation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      guests: 1,
      smoking: false,
      date: new Date(),
      showDatePicker: false,
      showModal: false
    }
  }
  render() {
    return (
      <Animatable.View animation="zoomIn" duration={2000}>
        <ScrollView>
        <View style={styles.formRow}>
          <Text style={styles.formLabel}>Number of Guests</Text>
          <Picker style={styles.formItem} selectedValue={this.state.guests} onValueChange={(value) => this.setState({ guests: value })}>
            <Picker.Item label='1' value='1' />
            <Picker.Item label='2' value='2' />
            <Picker.Item label='3' value='3' />
            <Picker.Item label='4' value='4' />
            <Picker.Item label='5' value='5' />
            <Picker.Item label='6' value='6' />
          </Picker>
        </View>
        <View style={styles.formRow}>
          <Text style={styles.formLabel}>Smoking/No-Smoking?</Text>
          <Switch style={styles.formItem} value={this.state.smoking} onValueChange={(value) => this.setState({ smoking: value })} />
        </View>
        <View style={styles.formRow}>
          <Text style={styles.formLabel}>Date and Time</Text>
          <Icon name='schedule' size={36} onPress={() => this.setState({ showDatePicker: true })} />
          <Text style={{ marginLeft: 10 }}>{format(this.state.date, 'dd/MM/yyyy --- HH:mm')}</Text>
          <DateTimePickerModal mode='datetime' isVisible={this.state.showDatePicker} isDarkModeEnabled={false}
            onConfirm={(date) => this.setState({ date: date, showDatePicker: false })}
            onCancel={() => this.setState({ showDatePicker: false })} />
        </View>
        <View style={styles.formRow}>
          <Button title='Reserve' color='#7cc' onPress={() => this.handleReservation()} />
        </View>
        </ScrollView>
      </Animatable.View>
    );
  }
  async obtainNotificationPermission() {
    let permission = await Permissions.getAsync(Permissions.USER_FACING_NOTIFICATIONS);
    if (permission.status !== 'granted') {
      permission = await Permissions.askAsync(Permissions.USER_FACING_NOTIFICATIONS);
      if (permission.status !== 'granted') {
        Alert.alert('Permission not granted to show notifications');
      }
    }
    return permission;
  }
  async obtainCalendarPermission() {
    let permission = await Permissions.getAsync(Permissions.CALENDAR);
    if (permission.status !== 'granted') {
      permission = await Permissions.askAsync(Permissions.CALENDAR);
      if (permission.status !== 'granted') {
        Alert.alert('Permission not granted to access the calendar');
      }
    }
    return permission;
  }
  async presentLocalNotification(date) {
    await this.obtainNotificationPermission();
    Notifications.setNotificationHandler({
      handleNotification: async () => ({ shouldShowAlert: true, shouldPlaySound: true, shouldSetBadge: true })
    });
    Notifications.scheduleNotificationAsync({
      content: {
        title: 'Your Reservation',
        body: 'Reservation for ' + date + ' requested',
        sound: true,
        vibrate: true
      },
      trigger: null
    });
  }
  async addReservationToCalendar(date) {
    const calendarEvent = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT)
    console.log("calendarEvent", JSON.stringify(calendarEvent))
    await this.obtainCalendarPermission()
    var dateMs = Date.parse(date)
    var startDate = new Date(dateMs)
    var endDate = new Date(dateMs + 2 * 60 * 60 * 1000)
    let details = {
      title: 'Test Reservation',
      color: '#512DA8',
      source: {
        name: calendarEvent.find(cal => cal.accessLevel === Calendar.CalendarAccessLevel.OWNER).source.name,
        isLocalAccount: true
      },
      name: 'Restaurant Reservation',
      ownerAccount: calendarEvent.find(cal => cal.accessLevel == Calendar.CalendarAccessLevel.OWNER).ownerAccount,
      accessLevel: Calendar.CalendarAccessLevel.OWNER,
    }
    Calendar.createCalendarAsync(details).then(id => {
      Calendar.createEventAsync(id, {
        title: 'Table Reservation',
        startDate: startDate,
        endDate: endDate,
        timeZone: 'Asia/Hong_Kong',
        location:
          '121, Clear Water Bay Road, Clear Water Bay, Kowloon, Hong Kong',
      }).catch((err) => console.log(err))
    })
  }
  handleReservation() {
    Alert.alert(
      'Your Reservation OK?',
      'Number of Guestes: ' + this.state.guests + '\nSmoking? ' + this.state.smoking + '\nDate and Time: ' + this.state.date.toISOString(),
      [
        { text: 'Cancel', onPress: () => this.resetForm() },
        {
          text: 'OK', onPress: () => {
            this.addReservationToCalendar(this.state.date);
            this.presentLocalNotification(this.state.date);
            this.resetForm();
          }
        },
      ],
      { cancelable: false }
    );
  }
  resetForm() {
    this.setState({
      guests: 1,
      smoking: false,
      date: new Date(),
      showDatePicker: false
    });
  }
  // local notification
  async obtainNotificationPermission() {
    let permission = await Permissions.getAsync(Permissions.USER_FACING_NOTIFICATIONS);
    if (permission.status !== 'granted') {
      permission = await Permissions.askAsync(Permissions.USER_FACING_NOTIFICATIONS);
      if (permission.status !== 'granted') {
        Alert.alert('Permission not granted to show notifications');
      }
    }
    return permission;
  }
  async presentLocalNotification(date) {
    await this.obtainNotificationPermission();
    Notifications.setNotificationHandler({
      handleNotification: async () => ({ shouldShowAlert: true, shouldPlaySound: true, shouldSetBadge: true })
    });
    Notifications.scheduleNotificationAsync({
      content: {
        title: 'Your Reservation',
        body: 'Reservation for ' + date + ' requested',
        sound: true,
        vibrate: true
      },
      trigger: null
    });
  }

  // calendar
  async obtainCalendarPermission() {
    let permission = await Permissions.getAsync(Permissions.CALENDAR);
    if (permission.status !== 'granted') {
      permission = await Permissions.askAsync(Permissions.CALENDAR);
      if (permission.status !== 'granted') {
        Alert.alert('Permission not granted to access the calendar');
      }
    }
    return permission;
  }
  async addReservationToCalendar(date) {
    await this.obtainCalendarPermission();
    const defaultCalendarSource = { isLocalAccount: true, name: 'Expo Calendar' };
    const newCalendarID = await Calendar.createCalendarAsync({
      title: 'Expo Calendar',
      color: 'blue',
      entityType: Calendar.EntityTypes.EVENT,
      sourceId: defaultCalendarSource.id,
      source: defaultCalendarSource,
      name: 'internalCalendarName',
      ownerAccount: 'personal',
      accessLevel: Calendar.CalendarAccessLevel.OWNER,
    });
    const eventId = await Calendar.createEventAsync(newCalendarID, {
      title: 'Con Fusion Table Reservation',
      startDate: date,
      endDate: new Date(date.getTime() + 2 * 60 * 60 * 1000),
      timeZone: 'Asia/Hong_Kong',
      location: '121, Clear Water Bay Road, Clear Water Bay, Kowloon, Hong Kong'
    });
  }
};
export default Reservation;

const styles = StyleSheet.create({
  formRow: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row',
    margin: 20
  },
  formLabel: {
    fontSize: 18,
    flex: 2
  },
  formItem: {
    flex: 1
  }
});
