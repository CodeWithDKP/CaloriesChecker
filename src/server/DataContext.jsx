import { createContext, useState } from "react";
import axios from "axios";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [query, setQuery] = useState("");
  const [nutrition, setNutrition] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Meals storage
  const [meals, setMeals] = useState({
    breakfast: [],
    lunch: [],
    snacks: [],
    dinner: [],
  });

  const API_URL = "https://api.calorieninjas.com/v1/nutrition?query=";
  const API_KEY = "YegAuUIuxfcx88TZ5wukMA==af02f5SK7MeiSzhh";

  const fetchNutrition = async () => {
    if (!query) {
      setError("Please enter a food item!");
      return;
    }

    setLoading(true);
    setNutrition(null);
    setError("");

    try {
      const response = await axios.get(API_URL + encodeURIComponent(query), {
        headers: { "X-Api-Key": API_KEY },
      });

      if (response.data.items && response.data.items.length > 0) {
        setNutrition(response.data.items);
      } else {
        setError("No nutrition info found for this item.");
      }
    } catch (err) {
      console.error(err);
      setError("Error fetching nutrition data.");
    } finally {
      setLoading(false);
    }
  };

  // Add selected food into a meal
  const addToMeal = (mealType, food) => {
    setMeals((prev) => ({
      ...prev,
      [mealType]: [...prev[mealType], food],
    }));
  };

  return (
    <DataContext.Provider
      value={{
        query,
        setQuery,
        nutrition,
        loading,
        error,
        fetchNutrition,
        meals,
        addToMeal,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
