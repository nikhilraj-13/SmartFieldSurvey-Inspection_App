import React, { createContext, useState, useContext, ReactNode } from 'react';

type Survey = {
  id: string;
  site: string;
  client: string;
  priority: string;
  description: string;
  date: string;
  contact?: string;
  location?: string;
  notes?: string;
};

type UserProfile = {
  firstName: string;
  fullName: string;
  semester: string;
  university: string;
  enrollment: string;
  email: string;
  phone: string;
  avatarUrl: string;
};

type SurveyContextType = {
  surveys: Survey[];
  addSurvey: (survey: Omit<Survey, 'id'>) => void;
  deleteSurvey: (id: string) => void;
  profile: UserProfile;
  updateProfile: (profile: UserProfile) => void;
};

const SurveyContext = createContext<SurveyContextType | null>(null);

export function SurveyProvider({ children }: { children: ReactNode }) {
  const [surveys, setSurveys] = useState<Survey[]>([
    {
      id: "1",
      site: "ABC Construction",
      client: "Patel Company",
      priority: "High",
      description: "Initial safety check required before starting operations.",
      date: "12/10/2023",
    },
    {
      id: "2",
      site: "Sunrise Mall",
      client: "Reliance",
      priority: "Medium",
      description: "Routine maintenance and inspection of HVAC.",
      date: "15/10/2023",
    },
    {
      id: "3",
      site: "Road Inspection",
      client: "Government",
      priority: "Low",
      description: "Pothole tracking along Main St.",
      date: "20/10/2023",
    },
  ]);

  const [profile, setProfile] = useState<UserProfile>({
    firstName: "Nikhil",
    fullName: "Nikhil Raj",
    semester: "Semester 3",
    university: "Swaminarayan University",
    enrollment: "SUK250054CE014",
    email: "nikhil.raj.cg@gmail.com",
    phone: "+91 8252799973",
    avatarUrl: "https://res.cloudinary.com/djxj4t2xg/image/upload/v1784549553/file_k6b3mp.jpg",
  });

  const addSurvey = (survey: Omit<Survey, 'id'>) => {
    setSurveys([...surveys, { ...survey, id: Date.now().toString() }]);
  };

  const deleteSurvey = (id: string) => {
    setSurveys(surveys.filter((item) => item.id !== id));
  };

  const updateProfile = (updatedProfile: UserProfile) => {
    setProfile(updatedProfile);
  };

  return (
    <SurveyContext.Provider value={{ surveys, addSurvey, deleteSurvey, profile, updateProfile }}>
      {children}
    </SurveyContext.Provider>
  );
}

export function useSurvey() {
  const context = useContext(SurveyContext);
  if (!context) {
    throw new Error('useSurvey must be used within a SurveyProvider');
  }
  return context;
}
