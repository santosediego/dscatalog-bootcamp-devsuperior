import React from "react";
import { View, Text, StyleSheet } from 'react-native';

const App = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Hello World!</Text>
      <Text style={styles.h2}>Diego Santos</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#069',
    flex: 1,
    alignItems: "center",// alinhamento horizontal
    justifyContent: "center", // alinhamento vertical
  },

  h1: {
    fontSize: 24,
    fontWeight: "700",
    color: "#fff"
  },

  h2: {
    fontSize: 18,
    fontWeight: "500",
    color: "#fff"
  }
})

export default App;