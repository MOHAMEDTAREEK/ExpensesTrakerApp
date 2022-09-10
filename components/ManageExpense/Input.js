import { View, Text, TextInput, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";

function Input({label,textInputConfig, style, invaild}) {
    
    const inputStyles = [styles.input];
    if (textInputConfig && textInputConfig.multiline) {
        inputStyles.push(styles.inputMultiline)
    }

    if (invaild) {
        inputStyles.push(styles.invaildInput);
    }

    return (
    <View style={[styles.inputcontainer, style]}>
        <Text style={[styles.label, invaild && styles.invaildlabel]}>{label}</Text>
        <TextInput style={inputStyles} {...textInputConfig} />
    </View>
    );
}

export default Input;

const styles=StyleSheet.create({
    inputcontainer:{
        marginHorizontal:4,
        marginVertical:8,
    },
    label:{
        fontSize:12,
        color:GlobalStyles.colors.primary100,
        marginBottom:4,
    },
    input:{
        backgroundColor:GlobalStyles.colors.primary100,
        padding:6,
        borderRadius:6,
        fontSize:18,
        color:GlobalStyles.colors.primary700,
    },
    inputMultiline:{
        minHeight:100,
        textAlignVertical: 'top'
    },
    invaildlabel:{
        color: GlobalStyles.colors.error500,
    },
    invaildInput: {
        backgroundColor: GlobalStyles.colors.error50,
    }

})