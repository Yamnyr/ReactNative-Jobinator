import { StyleSheet, Text, View } from 'react-native';
import {TextInput, TouchableOpacity} from "react-native-web";
import React, {useContext, useState} from 'react';
import { Authentification, FetchUser } from "../services/api/user";
import {Context} from "../context/store";
import { setRefreshToken, setStatus, setToken } from "../actions/authentification";
import { register } from "../services/api/user";
import { useNavigation } from "@react-navigation/native";
import { addJob } from "../services/api/jobs";

export default function JobAdd() {
  const { state } = useContext(Context);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  function Add(data) {
    console.log(data)
    addJob(state.jwt, data).then(async (job) => {
      if (job.error) {
        setError(job.message);
      } else {
        console.log("jobAdd::handleSubmit", job);
      }
    });
  }

  function handleSubmit() {
    Add({name, description});
  }

  return (
    <View>
      <View style={styles.Content}>
        <View style={styles.container}>
          <form onSubmit={handleSubmit}>
            <TextInput
              style={styles.input}
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <TextInput
              style={styles.input}
              placeholder="description"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>créer une nouvel offre d'emploie</Text>
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