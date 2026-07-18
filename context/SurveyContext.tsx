import React, { createContext, useState, useContext, ReactNode } from 'react';

type Survey = {
  id: string;
  site: string;
  client: string;
  priority: string;
  description: string;
  date: string;
};

type SurveyContextType = {
  surveys: Survey[];
  addSurvey: (survey: Omit<Survey, 'id'>) => void;
  deleteSurvey: (id: string) => void;
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

  const addSurvey = (survey: Omit<Survey, 'id'>) => {
    setSurveys([...surveys, { ...survey, id: Date.now().toString() }]);
  };

  const deleteSurvey = (id: string) => {
    setSurveys(surveys.filter((item) => item.id !== id));
  };

  return (
    <SurveyContext.Provider value={{ surveys, addSurvey, deleteSurvey }}>
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
