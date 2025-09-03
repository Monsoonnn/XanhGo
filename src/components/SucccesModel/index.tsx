import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import Fonts from "../../constants/font";

interface CustomModalProps {
  visible: boolean;
  onClose: () => void;
  message: string;
  imageSource?: any; 
  imageStyle?: any;
  children?: React.ReactNode; // thêm children
}

const SuccesModel: React.FC<CustomModalProps> = ({
  visible,
  onClose,
  message,
  imageSource,
  imageStyle,
  children
}) => {
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
          style={[styles.icon, imageStyle]}
          resizeMode="contain"
        />

        {/* Nội dung */}
        <Text style={styles.message}>{message}</Text>

        {/* Children được render dưới message */}
        {children && <View style={styles.childrenWrapper}>{children}</View>}
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
    zIndex: 99999,
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 40,
    paddingHorizontal: 30,
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
    fontSize: 21,
    fontFamily: Fonts.DelaGothicOne,
    textAlign: "center",
    color: "#222",
    marginBottom: 12,
  },
  childrenWrapper: {
    marginTop: 8,
    width: "100%",
    alignItems: "center",
  },
});
