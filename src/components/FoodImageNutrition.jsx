import React, { useState } from "react";

function NutritionTextSearch() {
  const [query, setQuery] = useState("");
  const [nutrition, setNutrition] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
      const response = await fetch(API_URL + encodeURIComponent(query), {
        method: "GET",
        headers: { "X-Api-Key": API_KEY },
      });

      if (!response.ok) throw new Error("API request failed");

      const data = await response.json();

      if (data.items && data.items.length > 0) {
        setNutrition(data.items);
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

  return (
    <div style={{ maxWidth: "600px", margin: "2rem auto", textAlign: "center" }}>
      <h2>Nutrition Search</h2>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter food (e.g., 1lb apple)"
        style={{ padding: "10px", width: "70%", marginRight: "10px" }}
      />
      <button onClick={fetchNutrition} style={{ padding: "10px 15px" }}>
        Get Nutrition
      </button>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {nutrition && (
        <div style={{ marginTop: "2rem", textAlign: "left" }}>
          <h3>Results for: {query}</h3>
          {nutrition.map((item, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #ccc",
                borderRadius: "10px",
                padding: "15px",
                marginBottom: "10px",
                background: "#f9f9f9",
              }}
            >
              <p><strong>Food:</strong> {item.name}</p>
              <p><strong>Calories:</strong> {item.calories}</p>
              <p><strong>Protein:</strong> {item.protein_g} g</p>
              <p><strong>Fat:</strong> {item.fat_total_g} g</p>
              <p><strong>Carbs:</strong> {item.carbohydrates_total_g} g</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default NutritionTextSearch;
