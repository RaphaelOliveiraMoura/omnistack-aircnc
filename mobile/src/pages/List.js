import React, { useState, useEffect } from 'react';
import socketio from 'socket.io-client';

import {
  Alert,
  AsyncStorage,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  View,
  SafeAreaView
} from 'react-native';

import logo from '../../assets/logo.png';

import SpotList from '../components/SpotList';

export default function List({ navigation }) {
  const [techs, setTechs] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem('user').then(user_id => {
      const socket = socketio('http://192.168.0.121:3333', {
        query: { user_id }
      });
      socket.on('booking_response', booking => {
        Alert.alert(
          `Sua reserva em ${booking.spot.company} em ${booking.date} foi ${
            booking.approved ? 'APROVADA' : 'REJEITADA'
          }`
        );
      });
    });
  }, []);

  useEffect(() => {
    AsyncStorage.getItem('techs').then(storagedTechs => {
      const techsArray = storagedTechs.split(',').map(tech => tech.trim());
      setTechs(techsArray);
    });
  }, []);

  async function handleLogout() {
    await AsyncStorage.clear();
    navigation.navigate('Login');
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.logo} source={logo} />
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Desconectar</Text>
        </TouchableOpacity>
      </View>

      <ScrollView>
        {techs.map((tech, index) => (
          <SpotList key={index} tech={tech} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 40
  },
  logo: {
    height: 32,
    resizeMode: 'contain',
    alignSelf: 'center'
  },
  logoutButton: {
    backgroundColor: '#D2691E',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 8,
    margin: 12
  },
  logoutButtonText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: 'bold'
  }
});
