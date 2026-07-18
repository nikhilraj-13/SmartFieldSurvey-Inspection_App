import React, { createContext, useState, useContext } from 'react';

const SurveyContext = createContext();

export function SurveyProvider({ children }) {
  const [surveys, setSurveys] = useState([
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

  const addSurvey = (survey) => {
    setSurveys([...surveys, { ...survey, id: Date.now().toString() }]);
  };

  const deleteSurvey = (id) => {
    setSurveys(surveys.filter((item) => item.id !== id));
  };

  return (
    <SurveyContext.Provider value={{ surveys, addSurvey, deleteSurvey }}>
      {children}
    </SurveyContext.Provider>
  );
}

export function useSurvey() {
  return useContext(SurveyContext);
}
