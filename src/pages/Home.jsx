import { useContext, useState } from "react";
import { DataContext } from "../server/DataContext";
import hero from "../assets/home hero.jpg";
import "../styles/Home.css";

function Home() {
  const { query, setQuery, fetchNutrition, nutrition, loading, error, addToMeal } =
    useContext(DataContext);

  const [showPopup, setShowPopup] = useState(false);
  const [quantity, setQuantity] = useState(100); // default grams
  const [mealChoice, setMealChoice] = useState("");

  const handleSearch = async () => {
    await fetchNutrition();
    setShowPopup(true);
  };

  // Scale nutrition data based on user quantity
  const scaleNutrition = (item) => {
    const factor = quantity / 100;
    return {
      ...item,
      calories: (item.calories * factor).toFixed(2),
      protein_g: (item.protein_g * factor).toFixed(2),
      fat_total_g: (item.fat_total_g * factor).toFixed(2),
      carbohydrates_total_g: (item.carbohydrates_total_g * factor).toFixed(2),
    };
  };

  // ✅ now accepts food item directly
  const handleSave = (food) => {
    if (!mealChoice) {
      alert("Please select a meal type!");
      return;
    }
    addToMeal(mealChoice, food);
    setMealChoice("");
    setShowPopup(false);
    alert("Food saved successfully ✅");
  };

  return (
    <main>
      {/* Hero Section */}
      <section
        className="hero"
        style={{ backgroundImage: `url(${hero})` }}
      >
        <div className="overlay">
          <div className="input-box">
            <h2>Nutrition Search</h2>
            <div className="search-box">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter food (e.g., apple)"
                className="input"
              />
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="grams"
                className="input"
                style={{ width: "100px", marginLeft: "10px" }}
              />
              <button onClick={handleSearch} className="btn">
                Get Nutrition
              </button>
            </div>
            {loading && <p className="loading">Loading...</p>}
            {error && <p className="error">{error}</p>}
          </div>
        </div>
      </section>

      {/* Popup Modal */}
      {showPopup && nutrition && (
        <div className="popup">
          <div className="popup-content">
            <div className="popup-header">
              <button
                className="close-btn"
                onClick={() => setShowPopup(false)}
              >
                ✖
              </button>
            </div>
            <h3>
              Results for: {query} ({quantity}g)
            </h3>
            {nutrition.map((item, index) => {
              const scaled = scaleNutrition(item);
              return (
                <div key={index} className="card">
                  <p><strong>Food:</strong> {item.name}</p>
                  <p><strong>Calories:</strong> {scaled.calories}</p>
                  <p><strong>Protein:</strong> {scaled.protein_g} g</p>
                  <p><strong>Fat:</strong> {scaled.fat_total_g} g</p>
                  <p><strong>Carbs:</strong> {scaled.carbohydrates_total_g} g</p>

                  <div className="meal-options">
                    <label>
                      <input
                        type="radio"
                        value="breakfast"
                        checked={mealChoice === "breakfast"}
                        onChange={(e) => setMealChoice(e.target.value)}
                      /> Breakfast
                    </label>
                    <label>
                      <input
                        type="radio"
                        value="lunch"
                        checked={mealChoice === "lunch"}
                        onChange={(e) => setMealChoice(e.target.value)}
                      /> Lunch
                    </label>
                    <label>
                      <input
                        type="radio"
                        value="snacks"
                        checked={mealChoice === "snacks"}
                        onChange={(e) => setMealChoice(e.target.value)}
                      /> Snacks
                    </label>
                    <label>
                      <input
                        type="radio"
                        value="dinner"
                        checked={mealChoice === "dinner"}
                        onChange={(e) => setMealChoice(e.target.value)}
                      /> Dinner
                    </label>
                  </div>

                  {/* ✅ Pass scaled food directly */}
                  <button
                    className="save-btn"
                    onClick={() => handleSave(scaled)}
                  >
                    Save
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </main>
  );
}

export default Home;
