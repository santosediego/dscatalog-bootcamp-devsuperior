import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native'

const Home: React.FC = ({ navigation }) => {
    return (
        <View>
            <Text>Bem vindo ao DS-Catalog</Text>
            <TouchableOpacity
                onPress={() => navigation.navigate("Catalog")}>
                <Text>[Catalog]</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Home;