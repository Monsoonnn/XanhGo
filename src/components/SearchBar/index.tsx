// src/components/SearchBar.tsx
import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, ActivityIndicator, Text } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { styles } from "./styles";
type SearchBarProps = {
    value: string;
    onChangeText: (text: string) => void;
    onClear: () => void;
    placeholder?: string;
    loading?: boolean;
};

const SearchBar: React.FC<SearchBarProps> = ({ value, onChangeText, onClear, placeholder, loading }) => {

    return (
        <>
            <View style={styles.searchInputContainer}>
                <View style={styles.destinationDot} />
                <View style={styles.destinationInputContainer}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder={placeholder || "Tìm kiếm địa điểm..."}
                        value={value}
                        onChangeText={onChangeText}
                        placeholderTextColor="#999"
                    />
                    {value.length > 0 && (
                        <TouchableOpacity style={styles.clearButton} onPress={onClear}>
                            <Icon name="close" size={20} color="black" />
                        </TouchableOpacity>
                    )}
                    {loading && (
                        <ActivityIndicator size="small" color="black" style={styles.loadingIcon} />
                    )}
                </View>
            </View>

        </>
    );
};

export default SearchBar;
