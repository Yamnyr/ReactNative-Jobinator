import { StyleSheet, Text, View } from 'react-native';
import {TextInput, TouchableOpacity} from "react-native-web";
import React, {useContext, useState} from 'react';
import {Authentification} from "../services/api/user";
import {Context} from "../context/store";
import {setRefreshToken, setToken} from "../actions/authentification";
import { register } from "../services/api/user";
import { useNavigation } from "@react-navigation/native";



export default function Register() {
  const { dispatch } = useContext(Context);
  const [name, setName] = useState('');
  const [status, setStatus] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigation = useNavigation();


  // const credentials = await Keychain.getGenericPassword();
  // if (credentials) {
  //     console.log(
  //         'Credentials successfully loaded for user ' + credentials
  //     );
  //     authentication(credentials)
  // } else {
  //     console.log('No credentials stored');
  // }

  /*
  je recupère le refreshtoken
  verifie si il est set
  si oui lance la meyhode autentification
  si non ne fait rien
  */

  function registration(params) {
    register(params).then(async (user) => {
      if (user.error) {
        setError(user.message);
      } else {
        const {jwt} = user;

        console.log("Register::handleSubmit", user)
      }
    });
  }


  function handleSubmit() {
    registration({ name, status, login, password });
  }

  return (
    <View>
      <View style={styles.Content}>
        <View style={styles.container}>
          <form onSubmit={handleSubmit}>
            <TextInput
              style={styles.input}
              placeholder="name"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <TextInput
              style={styles.input}
              placeholder="Status"
              onChange={(e) => setStatus(e.target.value)}
              value={status}
            />
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
              <Text style={styles.buttonText}>S'inscrire</Text>
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