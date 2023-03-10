import { StyleSheet, Text, View } from 'react-native';
import { ScrollView, TouchableOpacity } from "react-native-web";
import {FetchUser} from "../services/api/user";
import {setToken} from "../actions/authentification";
import ContactItem from "./JobsItem";

import {useContext, useEffect, useState} from "react";
import {Context} from "../context/store";
import { fetchAllJobs } from "../services/api/jobs";
import JobsItem from "./JobsItem";
import { useNavigation } from "@react-navigation/native";
export default function JobList() {

  const { state, dispatch } = useContext(Context);
  const [listContacts, setListJobs] = useState([])
  const [error, setError] = useState(null)
  const status = state.status;
  const navigation = useNavigation();
  useEffect(() => {
    fetchAllJobs(state.jwt)
      .then((jobs) => {if (jobs.error) {
        setError(jobs.message);
      } else {
        setListJobs(jobs.map((job) => (
          <JobsItem key={job.id} data={job}/>

        )));
        console.log("JobList::fetchAllJobs", jobs)
      }});
  }, [state.jwt]);


  return (
    <View>
      <ScrollView style={styles.Content}>
        {listContacts}
        {status === "entreprise" && (
          <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('jobAdd')}>
            <View>
              <Text style={styles.text}>+</Text>
            </View>
          </TouchableOpacity>
        )}
      </ScrollView>
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
    height:'80vh',
    backgroundColor: '#004677',
    textAlign: "center",
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
    backgroundColor: 'transparent',
    opacity: 1,
    margin: 20,
    padding: 15,
    borderRadius: 5,
    borderWidth:3,
    borderColor: '#770046',
  },
  text:{
    fontSize:20,
    color: "white",
    fontWeight: "bold",
  }
});