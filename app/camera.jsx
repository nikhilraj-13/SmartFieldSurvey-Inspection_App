import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  Alert,
  SafeAreaView,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import AppHeader from "@/components/AppHeader";

export default function CameraScreen() {
  const [permission, requestPermission] = useCameraPermissions();

  const cameraRef = useRef(null);

  const [cameraOpen, setCameraOpen] = useState(false);
  const [photoUri, setPhotoUri] = useState(null);
  const [photoTime, setPhotoTime] = useState("");

  const openCamera = async () => {
    if (!permission?.granted) {
      const result = await requestPermission();

      if (!result.granted) {
        Alert.alert(
          "Permission Required",
          "Please allow camera permission."
        );
        return;
      }
    }

    setCameraOpen(true);
  };

  const takePhoto = async () => {
    if (!cameraRef.current) return;

    try {
      const photo = await cameraRef.current.takePictureAsync();

      setPhotoUri(photo.uri);
      setPhotoTime(new Date().toLocaleTimeString());

      setCameraOpen(false);
    } catch (error) {
      Alert.alert("Error", "Could not capture photo.");
    }
  };

  const retakePhoto = () => {
    setPhotoUri(null);
    setPhotoTime("");
    setCameraOpen(true);
  };

  const deletePhoto = () => {
    Alert.alert("Delete Photo", "Are you sure you want to delete it?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        onPress: () => {
          setPhotoUri(null);
          setPhotoTime("");
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader title="Camera" />

      {cameraOpen ? (
        <View style={styles.cameraContainer}>
          <CameraView
            ref={cameraRef}
            style={styles.camera}
            facing="back"
          />

          <View style={styles.cameraButtons}>
            <Pressable
              style={styles.button}
              onPress={() => setCameraOpen(false)}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </Pressable>

            <Pressable
              style={styles.button}
              onPress={takePhoto}
            >
              <Text style={styles.buttonText}>Capture</Text>
            </Pressable>
          </View>
        </View>
      ) : (
        <View style={styles.content}>
          {photoUri ? (
            <>
              <Image
                source={{ uri: photoUri }}
                style={styles.image}
              />

              <Text style={styles.text}>
                Captured at: {photoTime}
              </Text>

              <View style={styles.buttonRow}>
                <Pressable
                  style={styles.button}
                  onPress={retakePhoto}
                >
                  <Text style={styles.buttonText}>Retake</Text>
                </Pressable>

                <Pressable
                  style={[styles.button, styles.deleteButton]}
                  onPress={deletePhoto}
                >
                  <Text style={styles.buttonText}>Delete</Text>
                </Pressable>
              </View>
            </>
          ) : (
            <>
              <Text style={styles.text}>No photo captured.</Text>

              <Pressable
                style={styles.button}
                onPress={openCamera}
              >
                <Text style={styles.buttonText}>Open Camera</Text>
              </Pressable>
            </>
          )}
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  cameraContainer: {
    flex: 1,
  },

  camera: {
    flex: 1,
  },

  image: {
    width: 300,
    height: 400,
    borderRadius: 10,
    marginBottom: 20,
  },

  text: {
    fontSize: 18,
    marginBottom: 20,
  },

  buttonRow: {
    flexDirection: "row",
    marginTop: 20,
  },

  cameraButtons: {
    position: "absolute",
    bottom: 30,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },

  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginHorizontal: 10,
  },

  deleteButton: {
    backgroundColor: "red",
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});