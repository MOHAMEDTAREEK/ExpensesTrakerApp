import { Pressable, View,StyleSheet } from "react-native";
import {Ionicons} from '@expo/vector-icons';
function IconButton({icon, size, color, onpress}) {
    return (
    <Pressable onPress={onpress} style={({pressed}) => pressed && styles.pressed}>
        <View style={styles.buttoncontainer}>
            <Ionicons name={icon} size={size} color={color}/>
        </View>
    </Pressable>
    );
}

export default IconButton;

const styles=StyleSheet.create({
buttoncontainer:{
   borderRadius:24,
   padding:6,
   marginHorizontal:8,
   marginVertical:2,

},
pressed :{
    opacity:0.75,
}

});