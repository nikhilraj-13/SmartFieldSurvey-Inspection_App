import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import MyButton from "../../components/MyButton";
import SurveyCard from "../../components/SurveyCard";
import { useSurvey } from "../../context/SurveyContext";

export default function Dashboard() {
  const router = useRouter();
  const { surveys, profile } = useSurvey();
  const todaySurvey = surveys.length;
  const recentSurveys = surveys.slice(-2).reverse();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
    >
      {/* Welcome Row with Profile Avatar */}
      <View style={styles.welcomeRow}>
        <View>
          <Text style={styles.welcomeSub}>Welcome Back</Text>
          <Text style={styles.welcomeName}>{profile.firstName}</Text>
        </View>
        <Pressable onPress={() => router.push("/(tabs)/profile")}>
          <Image
            source={{ uri: profile.avatarUrl }}
            style={styles.profileAvatar}
          />
        </Pressable>
      </View>

      {/* Card 1: Student Details */}
      <View style={styles.detailsCard}>
        <Text style={styles.detailsTitle}>Student Details</Text>

        <View style={styles.infoRow}>
          <Ionicons
            name="person"
            size={18}
            color="#5D4949"
            style={styles.infoIcon}
          />
          <Text style={styles.infoText}>{profile.fullName}</Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons
            name="school"
            size={18}
            color="#5D4949"
            style={styles.infoIcon}
          />
          <Text style={styles.infoText}>{profile.semester}</Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons
            name="business"
            size={18}
            color="#5D4949"
            style={styles.infoIcon}
          />
          <Text style={styles.infoText}>{profile.university}</Text>
        </View>
      </View>

      {/* Card 2: Today's Surveys Count */}
      <View style={styles.countCard}>
        <Text style={styles.countNumber}>{todaySurvey}</Text>
        <Text style={styles.countLabel}>Today's Surveys</Text>
      </View>

      <Text style={styles.sectionTitle}>Quick Actions</Text>

      <View style={styles.row}>
        <Pressable
          style={styles.card}
          onPress={() => router.push("/(tabs)/createSurvey")}
        >
          <Text style={styles.icon}>📋</Text>
          <Text style={styles.cardText}>New Survey</Text>
        </Pressable>

        <Pressable
          style={styles.card}
          onPress={() => router.push("/(drawer)/camera")}
        >
          <Text style={styles.icon}>⋆.📷˚</Text>
          <Text style={styles.cardText}>Camera</Text>
        </Pressable>
      </View>

      <View style={styles.row}>
        <Pressable
          style={styles.card}
          onPress={() => router.push("/(drawer)/location")}
        >
          <Text style={styles.icon}>➣</Text>
          <Text style={styles.cardText}>Location</Text>
        </Pressable>

        <Pressable
          style={styles.card}
          onPress={() => router.push("/(drawer)/clipboard")}
        >
          <Text style={styles.icon}>📞</Text>
          <Text style={styles.cardText}>Contacts</Text>
        </Pressable>
      </View>

      <Text style={styles.sectionTitle}>Recent Survey</Text>

      {recentSurveys.map((survey) => (
        <SurveyCard
          key={survey.id}
          id={survey.id}
          site={survey.site}
          client={survey.client}
          priority={survey.priority}
          description={survey.description}
          date={survey.date}
        />
      ))}

      <MyButton
        title="Create New Survey"
        onPress={() => router.push("/(tabs)/createSurvey")}
        style={styles.createSurveyBtn}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  scrollContent: {
    paddingBottom: 40,
  },
  welcomeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 16,
  },
  welcomeSub: {
    fontSize: 15,
    fontWeight: "500",
    color: "#888888",
    marginBottom: 2,
  },
  welcomeName: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#0F172A",
  },
  profileAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2.5,
    borderColor: "#5D4949",
  },
  detailsCard: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    marginVertical: 8,
    padding: 20,
    borderRadius: 18,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
  },
  detailsTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 6,
  },
  infoIcon: {
    marginRight: 12,
  },
  infoText: {
    fontSize: 15,
    color: "#475569",
    fontWeight: "500",
  },
  countCard: {
    backgroundColor: "#5D4949",
    marginHorizontal: 20,
    marginVertical: 8,
    paddingVertical: 24,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
    shadowColor: "#5D4949",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  countNumber: {
    fontSize: 48,
    color: "#FFFFFF",
    fontWeight: "bold",
    lineHeight: 48,
    marginBottom: 4,
  },
  countLabel: {
    fontSize: 14,
    color: "#FFFFFF",
    fontWeight: "600",
    opacity: 0.9,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginVertical: 8,
    gap: 16,
  },
  card: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    height: 100,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
  },
  icon: {
    fontSize: 32,
    marginBottom: 8,
  },
  cardText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#334155",
  },
  createSurveyBtn: {
    marginHorizontal: 20,
    marginTop: 24,
    alignSelf: "stretch",
    maxWidth: "100%",
  },
});
