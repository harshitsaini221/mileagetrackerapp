import { Pressable, StyleSheet, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

function FloatingButton({ icon, size, color, onPress }) {
  
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.buttonContainer, ({ pressed }) => pressed && styles.pressed]}
    >
        <Ionicons name={icon} size={size} color={color} />
    </TouchableOpacity>
  );
}

export default FloatingButton;

const styles = StyleSheet.create({
  buttonContainer: {
    position: "absolute",
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    padding: 6,
    marginHorizontal: 8,
    marginVertical: 2,
    backgroundColor: "#8ab4f8",
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
    marginBottom: Platform.OS == "android" ? 50 : 80,
  },
  pressed: {
    opacity: 0.75,
  },
});

// const styles = StyleSheet.create({
//   floatingButton: {
// position: "absolute",
// bottom: 24,
// right: 24,
// width: 56,
// height: 56,
// borderRadius: 28,
// backgroundColor: "#8ab4f8",
// alignItems: "center",
// justifyContent: "center",
// elevation: 4,
// marginBottom: Platform.OS == "android" ? 50 : 80,
//   },
//   floatingButtonText: {
//     color: "#fff",
//     fontSize: 24,
//     fontWeight: "bold",
//     textAlign: 'center'
//   },
// });

// export default FloatingButton;
