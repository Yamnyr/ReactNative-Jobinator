import { StyleSheet, Text, View } from 'react-native';
import {TextInput, TouchableOpacity} from "react-native-web";
import React, {useContext, useState} from 'react';
import { Authentification, FetchUser } from "../services/api/user";
import {Context} from "../context/store";
import { setRefreshToken, setStatus, setToken } from "../actions/authentification";
import { register } from "../services/api/user";
import { useNavigation } from "@react-navigation/native";



export default function Accueil() {
  const { dispatch, state } = useContext(Context);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  function connect(params) {
    Authentification(params).then(async (user) => {
      if (user.error) {
        setError(user.message);
      } else {
        const {jwt} = user;
        dispatch(setToken(jwt));

        console.log("Accueil::handleSubmit", user)
          FetchUser(state.jwt)
            .then((user) => {if (user.error) {
              setError(user.message);
            } else {
              const {status} = user;
              dispatch(setStatus(status));
            }});
      }
    });
  }


  function handleSubmit() {
    connect({ login, password });
  }

  return (
    <View>
      <View style={styles.Content}>
        <View style={styles.container}>
          <form onSubmit={handleSubmit}>
            <TextInput
              style={styles.input}
              placeholder="Login"
              onChange={(e) => setLogin(e.target.value)}
              value={login}
            />
            <TextInput
              style={styles.input}
              placeholder="password"
              secureTextEntry={true}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Se connecter</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('register')}>
              <Text style={styles.buttonText}>Se créer un compte</Text>
            </TouchableOpacity>
          </form>
        </View>
      </View>
      <View style={styles.Error}>
        <Text style={styles.error}>{error}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Content:{
    backgroundColor: '#004677',
    textAlign: "center",
    height:'80vh',
  },
  Error:{
    backgroundColor: '#770046',
  },
  error:{
    margin:20,
    color: 'white',
    fontWeight: 'bold'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    width: '80%',
    margin: 12,
    borderWidth: 3,
    borderColor: '#770046',
    padding: 10,
    fontSize:20,
    color: 'white',
    borderRadius: 5,
    fontWeight: "bold",
  },
  button: {
    width: '80%',
    marginHorizontal:'10%',
    padding: 10,
    marginVertical: 20,
    borderRadius: 5,
    backgroundColor:'#770046',

  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: "bold",
  },
});