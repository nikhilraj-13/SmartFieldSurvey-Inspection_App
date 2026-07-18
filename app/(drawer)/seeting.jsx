import {
    View,
    Text,
    StyleSheet
}
    from "react-native";


import Header from "../../components/header";


export default function Settings() {


    return (

        <View style={styles.container}>


            <Header title="Settings" />


            <Text style={styles.text}>
                Application Settings
            </Text>


        </View>

    );


}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },


    text: {
        fontSize: 22,
        fontWeight: "bold"
    }

});