import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { getArtistType, updateArtistType } from '../../API/API'; // Import the getArtistType function
import { useAuth } from '../../state/AuthProvider';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; // Import MaterialIcons

const ProfileArtistType = () => {
    const { userData } = useAuth();
    const token = userData?.token;
    const [artistType, setArtistType] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([
        { label: 'Painter', value: 'Painter' },
        { label: 'Graphic Designer', value: 'Graphic Designer' },
        { label: 'Photographer', value: 'Photographer' },
        { label: 'Sculptor', value: 'Sculptor' },
        { label: 'Illustrator', value: 'Illustrator' },
    ]);

    useEffect(() => {
        // Fetch the artist type when the component mounts
        const fetchArtistType = async () => {
            if (!token) return; // Exit if there's no token

            try {
                const response = await getArtistType(token);
                if (response && response.success) {
                    setArtistType(response.artistType);
                } else {
                    console.error('Failed to fetch artist type:', response.error);
                }
            } catch (error) {
                console.error('Error fetching artist type:', error);
            }
        };

        fetchArtistType();
    }, [token]);

    const handleSaveArtistType = async () => {
        if (!token) {
            Alert.alert('Error', 'You need to be logged in to update your artist type.');
            return;
        }

        try {
            const response = await updateArtistType(artistType, token);
            if (response && response.success) {
                Alert.alert('Success', 'Artist type updated successfully!');
            } else {
                Alert.alert('Error', 'Failed to update artist type.');
            }
        } catch (error) {
            console.error('Error updating artist type:', error);
            Alert.alert('Error', 'An error occurred while updating the artist type.');
        }
        setIsEditing(false);
    };

    return (
        <View style={styles.container}>
            {isEditing ? (
                <View>
                    <DropDownPicker
                        open={open}
                        value={artistType}
                        items={items}
                        setOpen={setOpen}
                        setValue={setArtistType}
                        setItems={setItems}
                        placeholder="Select your artist type"
                        style={styles.dropdown}
                        listMode="SCROLLVIEW"
                        dropDownContainerStyle={{
                            maxHeight: 150,
                        }}
                    />
                    <TouchableOpacity style={styles.saveButton} onPress={handleSaveArtistType}>
                        <Text style={styles.saveButtonText}>Save Artist Type</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <View style={styles.artistTypeContainer}>
                    <View style={styles.artistTypeTextContainer}>
                        <Text style={styles.artistTypeText}>
                            {artistType || 'No artist type selected. Set your artist type!'}
                        </Text>
                    </View>
                    <TouchableOpacity style={styles.editButton} onPress={() => setIsEditing(true)}>
                        <MaterialIcons name="edit" size={24} color="#555" />
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',  // Ensure the container takes full width
        backgroundColor: 'rgba(255, 255, 255, 0)', // Transparent background
        borderRadius: 8,
        alignItems: 'center',
    },
    heading: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 6,
        color: '#333',
    },
    dropdown: {
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 4,
        marginVertical: 4,
        paddingVertical: 5,
    },
    artistTypeContainer: {
        flexDirection: 'row',  // Ensure items are placed in a row
        alignItems: 'center',  // Center the text vertically with the icon
        justifyContent: 'center',  // Center the content horizontally
        width: '80%',
        position: 'relative',  // Make the edit button position relative to this container
    },
    artistTypeTextContainer: {
        flex: 1,  // Take up remaining space for text
        alignItems: 'center',  // Center the text horizontally
    },
    artistTypeText: {
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',  // Center text inside the container
        color: '#333',
    },
    editButton: {
        position: 'absolute',  // Position the edit button absolutely
        right: 0,  // Align it to the right edge
        padding: 4,  // Smaller padding for tighter alignment
    },
    saveButton: {
        backgroundColor: '#007BFF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ProfileArtistType;

