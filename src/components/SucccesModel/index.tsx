import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import Fonts from "../../constants/font";

interface CustomModalProps {
  visible: boolean;
  onClose: () => void;
  message: string;
  imageSource?: any; 
}

const SuccesModel: React.FC<CustomModalProps> = ({ visible, onClose, message, imageSource }) => {
  if (!visible) return null; // khi không hiển thị thì return null

  return (
    <View style={styles.overlay}>
      <View style={styles.container}>
        {/* Nút đóng */}
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={{ fontSize: 18 }}>✕</Text>
        </TouchableOpacity>

        {/* Icon / Ảnh */}
        <Image
          source={
            imageSource
              ? imageSource
              : require("../../assets/icons/badge.png")
          }
          style={styles.icon}
          resizeMode="contain"
        />

        {/* Nội dung */}
        <Text style={styles.message}>{message}</Text>
      </View>
    </View>
  );
};

export default SuccesModel;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "105%",
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 40,
    paddingHorizontal: 32,
    borderRadius: 24,
    width: "90%",
  },
  closeButton: {
    position: "absolute",
    right: 16,
    top: 16,
  },
  icon: {
    width: 90,
    height: 90,
    marginBottom: 12,
  },
  message: {
    fontSize: 24,
    fontFamily: Fonts.DelaGothicOne,
    textAlign: "center",
    color: "#222",
  },
});
