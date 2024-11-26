import {
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
    Text,
    Platform,
} from "react-native";

export default function FeaturedArtistsContent({artists, navigate}) {
    return(
        <ScrollView
            horizontal
            style={styles.scrollView}
            showsHorizontalScrollIndicator={false}
        >
            {artists?.map((item, index) => (
                <TouchableOpacity
                    key={index}
                    style={styles.artistContainer}
                    onPress={() =>
                        navigate(
                            item.name,
                            item.profilePictureLink,
                            item.artistType,
                            index,
                            item._id // Assuming `_id` is the user's unique identifier
                        )
                    }
                >
                    <Image
                        source={{ uri: item.profilePictureLink }}
                        style={styles.image}
                    />
                    <Text style={styles.artistName}>{item.name}</Text>
                    <Text style={styles.artistType}>{(item.artistType)? item.artistType : 'artistType'}</Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        flexDirection: "row",
        padding: '0.75%',
    },
    artistContainer: {
        flexDirection: 'column',
        textAlign: 'left',
        justifyContent: 'center',
        width: (Platform.OS === 'web') ? 200 : 95,
        marginRight: (Platform.OS === 'web') ? 20 : 2.5,
    },
    image: {
        width: '100%',
        height: (Platform.OS === 'web') ? 200 : 95,
        marginBottom: 3.5,
        borderRadius: 3,
    },
    artistName: {
        fontSize: 10,
        color: "black",
        fontFamily: "LEMON MILK Bold",
    },
    artistType: {
        fontSize: 9,
        color: "black",
        fontWeight: "bold",
    },
});