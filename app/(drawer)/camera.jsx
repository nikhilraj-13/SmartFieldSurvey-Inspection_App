import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";

import { CameraView, useCameraPermissions } from "expo-camera";

import Header from "../../components/header";
import MyButton from "../../components/MyButton";

export default function CameraScreen() {
  const cameraRef = useRef(null);

  const [permission, requestPermission] = useCameraPermissions();

  const [photo, setPhoto] = useState(null);
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text>Camera permission required.</Text>

        <MyButton title="Allow Camera" onPress={requestPermission} />
      </View>
    );
  }

  const takePhoto = async () => {
    if (cameraRef.current) {
      const result = await cameraRef.current.takePictureAsync();

      setPhoto(result.uri);

      const currentTime = new Date().toLocaleTimeString();

      setTime(currentTime);
    }
  };

  const deletePhoto = () => {
    Alert.alert("Delete Photo", "Are you sure?", [
      {
        text: "Cancel",
      },
      {
        text: "Delete",
        onPress: () => {
          setPhoto(null);
          setTime("");
        },
      },
    ]);
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#4F46E5" />

        <Text>Opening Camera...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header title="Camera" />

      {photo == null ? (
        <>
          <CameraView style={styles.camera} ref={cameraRef} />

          <MyButton title="Capture Photo" onPress={takePhoto} />
        </>
      ) : (
        <>
          <Image source={{ uri: photo }} style={styles.image} />

          <Text style={styles.time}>Capture Time : {time}</Text>

          <MyButton title="Retake Photo" onPress={() => setPhoto(null)} />

          <MyButton title="Delete Photo" onPress={deletePhoto} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  camera: {
    flex: 1,
    margin: 10,
    borderRadius: 10,
    overflow: "hidden",
  },

  image: {
    width: "95%",
    height: 400,
    alignSelf: "center",
    marginTop: 20,
    borderRadius: 10,
  },

  time: {
    textAlign: "center",
    marginVertical: 15,
    fontSize: 18,
    fontWeight: "bold",
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
