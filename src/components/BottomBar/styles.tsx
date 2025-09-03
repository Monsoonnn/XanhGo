import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    bottomNav: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 25,
        flexDirection: "row",
        backgroundColor: "#fff",
        paddingVertical: 12,
        justifyContent: "space-around",
        width: "90%",
        marginHorizontal: "5%",
        borderRadius: 24,
    },
    navItem: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
    },
});