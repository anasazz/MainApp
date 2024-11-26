import React, { useState, useRef, useEffect } from 'react';
import { View, Image, Pressable, StyleSheet, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import logoImg from "../assets/Logo_T.png";
import { useNavigation, StackActions } from '@react-navigation/native';
import LongSearchBar from './LongSearchBar';
import LoginButton from './LoginButton';
import LogoTitle from './LogoTitle';

export default function Navbar() {
  const navigation = useNavigation();
  const [showSearch, setShowSearch] = useState(false);
  const [showNavItems, setShowNavItems] = useState(false);
  const slideAnimation = useRef(new Animated.Value(0)).current;
  const fadeAnimation = useRef(new Animated.Value(0)).current;

  const handleToggleNavItems = () => {
    setShowNavItems(!showNavItems); // Toggle navigation items container
    setShowSearch(false); // Hide search bar
    Animated.timing(slideAnimation, {
      toValue: showNavItems ? 0 : 1, // Use the updated state
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const handleOpenSearch = () => {
    setShowSearch(true); // Open search bar
    Animated.parallel([
      Animated.timing(slideAnimation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(fadeAnimation, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      })
    ]).start();
  };

  const handleCloseSearch = () => {
    Animated.parallel([
      Animated.timing(slideAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(fadeAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      })
    ]).start(() => {
      setShowSearch(false); // Close search bar
      setShowNavItems(false); // Close navigation items
    });
  };

  const refreshApp = () => {
    navigation.dispatch(
      StackActions.replace('Home') // Replace current screen with Home to simulate a refresh
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
          <Pressable onPress={refreshApp} style={styles.logoAndTitle}>
            <Image source={logoImg} style={styles.logo} />
            <LogoTitle />
          </Pressable>
        <Pressable onPress={handleToggleNavItems} style={styles.menuButton}>
          <Icon name={showNavItems ? "close" : "menu"} size={30} color="black" />
        </Pressable>
      </View>
      <Animated.View style={[styles.navItemsContainer, {
        transform: [
          {
            translateX: slideAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: [400, 0], // Slide in from right (400) to show
            }),
          },
        ],
      }]}>
        <Pressable onPress={() => navigation.navigate("Statistics")} style={styles.navItem}>
          <Icon name="equalizer" size={24} color="black" />
        </Pressable>
        <Pressable onPress={handleOpenSearch} style={styles.navItem}>
          <Icon name="search" size={24} color="black" />
        </Pressable>
        <Pressable onPress={() => navigation.navigate("Settings")} style={styles.navItem}>
          <Icon name="settings" size={24} color="black" />
        </Pressable>
      </Animated.View>
      {showSearch && (
        <Animated.View style={[styles.searchContainer, {
          opacity: fadeAnimation, // Apply fade animation
        }]}>
          <LongSearchBar onClose={handleCloseSearch} />
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    paddingBottom: 5,
    zIndex: 99,
  },
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingHorizontal: 20,
  },
  logo: {
    width: 50,
    height: 50,
  },
  menuButton: {
    padding: 10,
  },
  navItemsContainer: {
    position: 'absolute',
    top: 12,
    right: 60,
    backgroundColor: '#dae2f0',
    paddingVertical: 11,
    paddingHorizontal: 1,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  navItem: {
    marginHorizontal: 8,
  },
  logoAndTitle: {
    flexDirection: 'row',
    alignItems: 'center', // Ensure items are centered vertically
  },
});
