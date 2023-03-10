import { StyleSheet, Text, View } from 'react-native';
import {ScrollView} from "react-native-web";
import {Authentification} from "../services/api/user";
import {setToken} from "../actions/authentification";
import ContactItem from "./JobsItem";

import {useContext, useEffect, useState} from "react";
import {Context} from "../context/store";
import { fetchAllJobs } from "../services/api/jobs";
import JobsItem from "./JobsItem";
export default function JobList() {

  const { state, dispatch } = useContext(Context);
  const [listContacts, setListJobs] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchAllJobs(state.jwt)
      .then((jobs) => {if (jobs.error) {
        setError(jobs.message);
      } else {
        setListJobs(jobs.map((job) => (
          <JobsItem key={job.id} data={job}/>

        )));
        console.log("Accueil::handleSubmit", jobs)
      }});
  }, [state.jwt]);


  return (
    <View>
      <ScrollView style={styles.Content}>
        {listContacts}
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
});