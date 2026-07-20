import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  Alert,
  Pressable,
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
        <Text style={styles.permissionText}>Camera permission required.</Text>
        <MyButton title="Allow Camera" onPress={requestPermission} />
      </View>
    );
  }

  const takePhoto = async () => {
    if (cameraRef.current) {
      try {
        const result = await cameraRef.current.takePictureAsync();
        setPhoto(result.uri);
        const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        setTime(currentTime);
      } catch (error) {
        Alert.alert("Error", "Failed to take photo");
      }
    }
  };

  const deletePhoto = () => {
    Alert.alert("Delete Photo", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
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
        <ActivityIndicator size="large" color="#5D4949" />
        <Text style={styles.loadingText}>Opening Camera...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header title="Camera" subtitle="Capture a survey image." />

      <View style={styles.content}>
        {photo == null ? (
          <View style={styles.cameraContainer}>
            <CameraView style={styles.camera} ref={cameraRef} />
          </View>
        ) : (
          <View style={styles.cameraContainer}>
            <Image source={{ uri: photo }} style={styles.camera} />
          </View>
        )}

        {photo == null ? (
          <View style={styles.captureContainer}>
            <Pressable 
              style={({ pressed }) => [
                styles.captureButtonOuter,
                pressed && { opacity: 0.8 }
              ]} 
              onPress={takePhoto}
            >
              <View style={styles.captureButtonInner} />
            </Pressable>
            <Text style={styles.captureText}>Tap to Capture</Text>
          </View>
        ) : (
          <View style={styles.actionContainer}>
            <Text style={styles.timeText}>Capture Time: {time}</Text>
            <MyButton title="Retake Photo" onPress={() => setPhoto(null)} style={styles.actionBtn} />
            <MyButton title="Delete Photo" onPress={deletePhoto} style={[styles.actionBtn, styles.deleteBtn]} />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 40,
  },
  cameraContainer: {
    width: "90%",
    aspectRatio: 4 / 5,
    borderRadius: 24,
    overflow: "hidden",
    backgroundColor: "#E2E8F0",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  camera: {
    flex: 1,
  },
  captureContainer: {
    alignItems: "center",
    marginTop: 24,
  },
  captureButtonOuter: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: "#5D4949",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#5D4949",
  },
  captureText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#5D4949",
    marginTop: 10,
  },
  actionContainer: {
    width: "90%",
    marginTop: 20,
    alignItems: "center",
  },
  timeText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#64748B",
    marginBottom: 10,
  },
  actionBtn: {
    alignSelf: "stretch",
    maxWidth: "100%",
    marginVertical: 6,
  },
  deleteBtn: {
    backgroundColor: "#C94A4A",
    shadowColor: "#C94A4A",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
  },
  permissionText: {
    fontSize: 16,
    color: "#475569",
    fontWeight: "500",
    marginBottom: 16,
  },
  loadingText: {
    fontSize: 15,
    color: "#64748B",
    fontWeight: "500",
    marginTop: 12,
  },
});
