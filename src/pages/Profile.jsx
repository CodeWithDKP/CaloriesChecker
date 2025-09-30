import { useContext } from "react";
import { DataContext } from "../server/DataContext";
import { useNavigate } from "react-router-dom";

function Profile() {
  const { user, logout, meals, calculateSummary } = useContext(DataContext);
  const navigate = useNavigate();

  if (!user) {
    navigate("/Login"); // redirect if not logged in
    return null;
  }

  // Overall summary
  const summary = calculateSummary ? calculateSummary() : { calories: 0, protein: 0, fat: 0, carbs: 0 };

  // ✅ Function to calculate summary for each meal separately
  const calculateMealSummary = (mealItems) => {
    return mealItems.reduce(
      (acc, food) => ({
        calories: acc.calories + parseFloat(food.calories),
        protein: acc.protein + parseFloat(food.protein_g),
        fat: acc.fat + parseFloat(food.fat_total_g),
        carbs: acc.carbs + parseFloat(food.carbohydrates_total_g),
      }),
      { calories: 0, protein: 0, fat: 0, carbs: 0 }
    );
  };

  return (
    <div className="profile-container">
      <h2>Welcome, {user.name}</h2>
      <button
        onClick={() => {
          logout();
          navigate("/");
        }}
        className="btn-logout"
      >
        Logout
      </button>

      {/* ✅ Total summary for today */}
      <h3>Today’s Nutrition Summary</h3>
      <p><strong>Calories:</strong> {summary.calories.toFixed(2)}</p>
      <p><strong>Protein:</strong> {summary.protein.toFixed(2)} g</p>
      <p><strong>Fat:</strong> {summary.fat.toFixed(2)} g</p>
      <p><strong>Carbs:</strong> {summary.carbs.toFixed(2)} g</p>

      <hr />

      {/* ✅ Show each meal’s breakdown */}
      <h3>Meals</h3>
      {Object.keys(meals).map((meal) => {
        const mealSummary = calculateMealSummary(meals[meal]);
        return (
          <div key={meal} className="meal-section">
            <h4>{meal.toUpperCase()}</h4>
            
            {meals[meal].length === 0 ? (
              <p>No items added</p>
            ) : (
              <>
                {meals[meal].map((food, idx) => (
                  <p key={idx}>
                    🍴 {food.name} – {food.calories} cal, 
                    {food.protein_g}g protein, 
                    {food.fat_total_g}g fat, 
                    {food.carbohydrates_total_g}g carbs
                  </p>
                ))}
                {/* ✅ Meal totals */}
                <p className="meal-summary">
                  <strong>Total:</strong> {mealSummary.calories.toFixed(2)} cal, 
                  {mealSummary.protein.toFixed(2)}g protein, 
                  {mealSummary.fat.toFixed(2)}g fat, 
                  {mealSummary.carbs.toFixed(2)}g carbs
                </p>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Profile;
