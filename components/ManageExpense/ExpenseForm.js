import { useState } from "react";
import { View,StyleSheet,Text, Alert } from "react-native";
import Input from "./Input";
import Button from "../UI/Buttons";
import { getFormattedDate } from "../../util/date";
import { GlobalStyles } from "../../constants/styles";
function ExpenseForm({onCancel, onSubmit, submitButtonLabel, defaultValues }) {
    const [inputs, setInputs] = useState({
        amount:{ 
            value: defaultValues ? defaultValues.amount.toString() : '',
            isValid:true,
    },
        date: {
            value: defaultValues ? getFormattedDate(defaultValues.date) : '',
            isValid:true,
        },
        description:{
            value: defaultValues ? defaultValues.description :'',
            isValid:true,
        }
    });
    
    function inputChangedHandler(inputIdentifier, enteredValue) {
        setInputs((curInputs) => {
            return {
                ...curInputs,
                [inputIdentifier]: {value : enteredValue, isValid: true},
            }
        });
    }

    function submitHandeler() {
        const expenseData ={
            amount: +inputs.amount.value,
            date: new Date(inputs.date.value),
            description: inputs.description.value,
        };
        
        const amountIsValid =!isNaN(expenseData.amount) && expenseData.amount > 0;
        const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
        const descriptionIsValid = expenseData.description.trim().length > 0;
        
        if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
            //Alert.alert('Invalid Input', 'Please check your input values')
            setInputs((curInputs) => {
                return {
                    amount :{ value: curInputs.amount.value, isValid: amountIsValid},
                    date :{ value: curInputs.date.value, isValid: dateIsValid},
                    description :{ value: curInputs.description.value, isValid: descriptionIsValid},
                }
            })
            return;
        }
        
        onSubmit(expenseData);
    }
    const formIsInvalid = !inputs.amount.isValid || !inputs.date.isValid || !inputs.description.isValid;
    return ( 
    <View style={styles.form}>
        <Text style={styles.title}>Your Expense</Text>
        <View style={styles.inputsRow}>
        <Input
        style={styles.rowInput} 
        label="Amount" 
        invaild={!inputs.amount.isValid}
        textInputConfig={{
            keyboardType: 'decimal-pad',
            onChangeText: inputChangedHandler.bind(this, 'amount'),
            value: inputs.amount.value,
        }}/>
        <Input 
        style={styles.rowInput} 
        label="Date" 
        invaild={!inputs.date.isValid}
        textInputConfig={{
          placeholder:'YYYY-MM-DD',  
          maxLength:10,
          keyboardType: 'decimal-pad',
          onChangeText : inputChangedHandler.bind(this, 'date'),
          value: inputs.date.value,
        }}/>
        </View>
        <Input 
        label="Description" 
        invaild={!inputs.description.isValid}
        textInputConfig={{
            multiline: true,
            onChangeText: inputChangedHandler.bind(this, 'description'),
            value: inputs.description.value,
        }}
        />
       {formIsInvalid && <Text style={styles.errorText}>Invalid Input values - Please check your enterd Data! </Text>}
         <View style={styles.buttons}>
            <Button style={styles.button} mode="flat" onpress={onCancel}>Cancel</Button>
            <Button style={styles.button} onpress={submitHandeler}>{submitButtonLabel}</Button>
        </View>
    </View> 
    );
}

export default ExpenseForm;

const styles=StyleSheet.create({
    inputsRow:{
        flexDirection:'row',
        justifyContent:"space-between",
    },
    rowInput:{
        flex:1,
    },
    form:{
        marginTop:40,
    },
    title:{
        fontSize:24,
        fontWeight:'bold',
        color:'white', 
        marginVertical:24,
        textAlign:'center',
    },
    buttons:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
    },
    button:{
        minWidth:120,
        marginHorizontal:8,
    },
    errorText: {
        textAlign:'center',
        color:GlobalStyles.colors.error500,
        margin:8,

    }
})