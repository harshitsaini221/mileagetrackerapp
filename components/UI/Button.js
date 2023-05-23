import { View, Text, Pressable, StyleSheet } from "react-native";

function Button({ children, onPress, mode, style }) {
  return (
    <View style={style}>
      <Pressable onPress={onPress} style={({pressed}) => pressed && styles.pressed}>
        <View style={[styles.button, mode === 'flat' && styles.flat]}>
          <Text style={[styles.buttonText, mode === 'flat' && styles.flatText]}>{children}</Text>
        </View>
      </Pressable>
    </View>
  );
}

export default Button;

const styles = StyleSheet.create({
  button: {
    borderRadius: 4,
    padding: 8,
    backgroundColor: "#8ab4f8",
  },
  flat: {
    backgroundColor: "transparent",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  flatText: {
    color: "#ccc",
  },
  pressed: {
    opacity: 0.75,
    backgroundColor: "#00FFFF",
    borderRadius: 4,
  },
});
