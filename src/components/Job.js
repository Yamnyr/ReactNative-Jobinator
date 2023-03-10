import { StyleSheet, Text, View, Image } from 'react-native';
import React, {useContext, useEffect, useState} from "react";
import {Context} from "../context/store";
import {setToken} from "../actions/authentification";
import {TouchableOpacity} from "react-native-web";
import {useNavigation} from "@react-navigation/native";
import { fetchJob } from "../services/api/jobs";

export default function Job({route}) {
  const { state, dispatch } = useContext(Context);
  const { itemId } = route.params;

  const [avatar, setAvatar] = useState('')
  const [description, setDescription] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState(null);
  const [job, setJob] = useState(null);
  const [createdAt, setCreatedAt] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    fetchJob(state.jwt, itemId.id)
      .then((job) => {
        setAvatar(job.avatar),
          setName(job.name),
          setDescription(job.description)
          setCreatedAt(job.createdAt)
          setJob(job)
      });
  }, [itemId]);

  return (
    <View>
      <View style={styles.Content}>
        <Text style={styles.text}>{name}</Text>
        <Text style={styles.text}>{description}</Text>
        <Text style={styles.text}>{createdAt}</Text>
      </View>
      <button style={styles.disconnect} onClick={() => dispatch(setToken(null))}>Se deconnecter</button>
      <View style={styles.Error}>
        <Text style={styles.error}>{error}</Text>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  disconnect:{
    border: 'none',
    color:"white",
    fontSize:20,
    padding:10,
    fontWeight:"bold",
    backgroundColor:'#770046',
  },
  Content:{
    backgroundColor: '#004677',
    height: '80vh',
    textAlign: "center",
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    backgroundColor: 'transparent',
    opacity: 1,
    margin: 12,
    padding: 10,
    borderRadius: 5,
    borderWidth:3,
    borderColor: '#770046',
    width: '80%',
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
  avatar:{
    width: 150,
    height: 150,
    borderRadius: 75,
    marginVertical: 20,
    borderColor:'#770046',
    borderWidth:3,
  },
  Error:{
    backgroundColor: '#770046',
  },
  error:{
    margin:20,
    color: 'white',
    fontWeight: 'bold'
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
    textAlign: 'center',
    fontWeight: "bold",
  },
});
