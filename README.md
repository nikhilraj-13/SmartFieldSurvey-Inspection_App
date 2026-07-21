# 📋 SmartFieldSurvey — Inspection App

> A **React Native + Expo** mobile application for field agents and students to create, manage, and track on-site inspection surveys — complete with GPS capture, camera integration, contact lookup, and a full survey history with priority filtering.

---

## 📱 App Overview

**SmartFieldSurvey** is a field inspection management tool built as a **Mobile Application Development Mini Project** at Swaminarayan University. It allows a user (field agent / student) to:

- Log in with a personalised profile
- Capture site inspection data with GPS coordinates auto-filled
- Photograph the site using the device camera
- Preview and submit a finalized survey report
- Browse and filter the complete history of past surveys
- Look up and copy device contacts for quick client entry

---

## ✨ Features

| Feature | Description |
|---|---|
| 🏠 **Dashboard** | Personalized welcome screen with quick-action cards and a live survey count |
| 📋 **Create Survey** | Full-featured form with auto GPS fetch, priority selector (High / Medium / Low), and edit support |
| 🔍 **Survey Preview** | Review all survey details before submission; edit or confirm with one tap |
| 📜 **Survey History** | FlatList of all submitted surveys with search-by-site and priority filter chips |
| 📷 **Camera** | Capture site photos using `expo-camera` with retake/delete controls |
| 📍 **Location** | Fetch live GPS coordinates (lat/lon/accuracy) and copy to clipboard |
| 📞 **Contacts** | Load device contacts via `expo-contacts`, search by name, copy phone numbers |
| 👤 **Profile** | Editable student profile with survey statistics (High Priority / Completed / Pending) |

---

## 🗂 Project Structure

```
SmartFieldSurvey-Inspection_App/
├── app/
│   ├── _layout.tsx              # Root layout (SurveyProvider + Drawer + Tabs navigation)
│   ├── (tabs)/
│   │   ├── _layout.tsx          # Bottom tab navigator
│   │   ├── index.tsx            # 🏠 Dashboard screen
│   │   ├── createSurvey.jsx     # 📋 Create / Edit survey form
│   │   ├── history.jsx          # 📜 Survey history with search + filters
│   │   └── profile.jsx          # 👤 User profile with editable fields & stats
│   └── (drawer)/
│       ├── camera.jsx           # 📷 Camera capture screen
│       ├── location.jsx         # 📍 GPS location screen
│       ├── contacts.jsx         # 📞 Device contacts screen
│       ├── clipboard.jsx        # 📋 Clipboard utility screen
│       ├── preview.jsx          # 🔍 Survey preview & submission screen
│       └── setting.jsx          # ⚙️  Settings screen
├── components/
│   ├── MyButton.jsx             # Reusable styled primary button
│   ├── MyInput.jsx              # Reusable styled text input
│   ├── SurveyCard.jsx           # Card component for a single survey
│   ├── header.jsx               # Shared screen header (title + subtitle)
│   └── ui/                      # Expo-default UI components
├── context/
│   └── SurveyContext.tsx        # Global state: surveys array + user profile
├── constants/                   # App-wide color/theme constants
├── hooks/                       # Custom React hooks
├── assets/                      # Icons, splash screen, adaptive icons
├── app.json                     # Expo configuration
└── package.json                 # Dependencies & scripts
```

---

## 🧭 Navigation Architecture

The app uses **Expo Router** with a nested navigation structure:

```
Root Layout (_layout.tsx)
└── SurveyProvider (Global Context)
    └── Drawer Navigator
        ├── (tabs) — Bottom Tab Navigator
        │   ├── Dashboard      (index.tsx)
        │   ├── Create Survey  (createSurvey.jsx)
        │   ├── History        (history.jsx)
        │   └── Profile        (profile.jsx)
        ├── Camera             (camera.jsx)
        ├── Location           (location.jsx)
        ├── Contacts           (contacts.jsx)
        ├── Preview            (preview.jsx)
        ├── Clipboard          (clipboard.jsx)
        └── Settings           (setting.jsx)
```

---

## 🔄 App Flow

```
Dashboard
  │
  ├──► Create Survey (form)
  │         │
  │         └──► Survey Preview ──► Submit ──► History
  │
  ├──► Camera (take site photo)
  ├──► Location (GPS fetch + copy)
  └──► Contacts (lookup + copy phone numbers)
```

---

## 🗃 Data Model

### Survey

```ts
type Survey = {
  id: string;           // Unique (Date.now().toString())
  site: string;         // Site / location name
  client: string;       // Client / company name
  priority: "High" | "Medium" | "Low";
  description: string;  // Inspection description
  date: string;         // Submission date (DD/MM/YYYY)
  contact?: string;     // Client contact number
  location?: string;    // GPS coordinates (lat, lon)
  notes?: string;       // Inspection notes
};
```

### User Profile

```ts
type UserProfile = {
  firstName: string;    // Shown on the Dashboard greeting
  fullName: string;
  semester: string;     // e.g. "Semester 3"
  university: string;
  enrollment: string;   // e.g. "SUK250054CE014"
  email: string;
  phone: string;
  avatarUrl: string;    // Remote image URL
};
```

---

## 📦 Tech Stack & Dependencies

| Package | Version | Purpose |
|---|---|---|
| `expo` | ~54.0.35 | Core Expo SDK |
| `expo-router` | ~6.0.24 | File-based navigation |
| `react-native` | 0.81.5 | Mobile UI framework |
| `react` | 19.1.0 | UI library |
| `@react-navigation/bottom-tabs` | ^7.4.0 | Bottom tab navigator |
| `@react-navigation/drawer` | ^7.13.2 | Slide-out drawer navigator |
| `expo-camera` | ~17.0.10 | Device camera access |
| `expo-location` | ~19.0.8 | GPS / location services |
| `expo-contacts` | ~15.0.11 | Device contact book access |
| `expo-clipboard` | ~8.0.8 | Copy text to clipboard |
| `expo-image` | ~3.0.11 | Optimized image rendering |
| `expo-haptics` | ~15.0.8 | Haptic feedback |
| `react-native-reanimated` | ~4.1.1 | Smooth animations |
| `react-native-gesture-handler` | ~2.28.0 | Touch gesture handling |
| `@expo/vector-icons` | ^15.0.3 | Ionicons icon set |
| `typescript` | ~5.9.2 | Type safety (TSX files) |

---

## ⚙️ Device Permissions Required

| Permission | Used For |
|---|---|
| **Camera** | Taking site inspection photos (`expo-camera`) |
| **Location (Foreground)** | Auto-filling GPS coordinates on survey creation and the Location screen (`expo-location`) |
| **Contacts** | Loading device contact list for quick phone number lookup (`expo-contacts`) |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or newer
- [Expo Go](https://expo.dev/client) app on your Android or iOS device **or** an emulator

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/nikhilraj-13/SmartFieldSurvey-Inspection_App.git
cd SmartFieldSurvey-Inspection_App

# 2. Install dependencies
npm install

# 3. Start the development server
npm start
```

### Running on Device / Emulator

```bash
# Android
npm run android

# iOS
npm run ios

# Web (limited — native APIs not supported in browser)
npm run web
```

Scan the QR code in the terminal with the **Expo Go** app on your device.

---

## 📸 Key Screens

### 🏠 Dashboard
- Personalized greeting with user's first name and avatar tap to profile.
- **Student Details Card** — name, semester, and university.
- **Today's Surveys Count** — live count from global context.
- **Quick Actions** grid — New Survey, Camera, Location, Contacts.
- **Recent Surveys** — the 2 most recently submitted surveys.

### 📋 Create Survey
- Input fields: Site Name, Client Name, Contact Number, Description, Notes (all required, validated).
- GPS coordinates are **auto-fetched** in the background on form load.
- **Priority** selector: High / Medium / Low toggle buttons.
- Navigates to the **Preview** screen before final save.
- Supports **edit mode** when returning from Preview → Edit Survey.

### 🔍 Survey Preview
- Displays all survey fields in a structured, read-only card layout.
- **Edit Survey** — returns to Create Survey with form pre-filled.
- **Submit Survey** — saves to global context and navigates to History.

### 📜 Survey History
- Full list of submitted surveys in a `FlatList`.
- **Real-time search** by site name.
- **Priority Filter Chips**: All / High / Medium / Low.
- Each card supports View Details (alert modal) and Delete (with confirmation).

### 📷 Camera
- Live viewfinder using `expo-camera`'s `CameraView`.
- Circular shutter button to capture a photo.
- After capture: shows the photo with timestamp and **Retake** / **Delete** options.
- Graceful permission handling with a prompt to grant camera access.

### 📍 Location
- Displays live **Latitude**, **Longitude**, and **Accuracy** (in meters).
- **Refresh Location** button to re-fetch current GPS position.
- **Copy Current Location** button copies coordinates to clipboard.

### 📞 Contacts
- Loads full device contact list with phone numbers.
- Search contacts by name in real-time.
- **Copy** button on each row copies the phone number to clipboard.
- Pull-to-refresh support.

### 👤 Profile
- Displays avatar, full name, semester, and university.
- **Edit Profile** mode — inline editing of all fields (name, enrollment, email, phone, avatar URL).
- **Survey Statistics** — High Priority, Completed, and Pending counts derived from global state.
- **About** card with project context.

---

## 🧩 Reusable Components

| Component | File | Description |
|---|---|---|
| `MyButton` | `components/MyButton.jsx` | Styled CTA button with configurable title, press handler, and style overrides |
| `MyInput` | `components/MyInput.jsx` | Styled text input supporting `multiline`, `keyboardType`, and placeholder |
| `SurveyCard` | `components/SurveyCard.jsx` | Card showing site, client, priority badge, date, and view/delete actions |
| `Header` | `components/header.jsx` | Shared screen header with `title` and optional `subtitle` props |

---

## 🌐 Global State — SurveyContext API

All survey data and user profile information is managed by `SurveyContext.tsx`, wrapping the entire app in `_layout.tsx`.

| Value / Function | Type | Description |
|---|---|---|
| `surveys` | `Survey[]` | Array of all survey records |
| `addSurvey(survey)` | `(Omit<Survey, 'id'>) => void` | Appends a new survey with an auto-generated ID |
| `deleteSurvey(id)` | `(string) => void` | Removes a survey by its ID |
| `profile` | `UserProfile` | Current user profile object |
| `updateProfile(profile)` | `(UserProfile) => void` | Replaces the profile with updated values |

> **Note:** State is in-memory only. Data does **not** persist between app restarts. Use `AsyncStorage` or a backend API to add persistence.

---

## 🛣 Roadmap / Future Improvements

- [ ] **Persistent Storage** — Save surveys using `AsyncStorage` or SQLite
- [ ] **Photo Attachment** — Link captured photos to individual survey records
- [ ] **Cloud Sync** — Upload surveys to Firebase Firestore or a REST API
- [ ] **PDF Export** — Generate a printable PDF report from a survey
- [ ] **Authentication** — Login/signup with Firebase Auth or Supabase
- [ ] **Dark Mode** — Full theme toggle using `useColorScheme`
- [ ] **Map View** — Display survey locations on an interactive map (`react-native-maps`)
- [ ] **Offline Support** — Queue and sync surveys when connectivity is restored

---

## 👨‍💻 Author

| Field | Detail |
|---|---|
| **Name** | Nikhil Raj |
| **Enrollment** | SUK250054CE014 |
| **Semester** | Semester 3 |
| **University** | Swaminarayan University |
| **Email** | nikhil.raj.cg@gmail.com |

---

## 📄 License

This project is developed as an academic mini project. All rights reserved by the author.

---

> Built with ❤️ using **React Native**, **Expo SDK 54**, and **Expo Router**
