import { useContext, useState } from "react";
import { DataContext } from "../server/DataContext";
import hero from "../assets/home hero.jpg";
import "../styles/Home.css"; 

function Home() {
  const { query, setQuery, fetchNutrition, nutrition, loading, error } =
    useContext(DataContext);

  const [showPopup, setShowPopup] = useState(false);

  const handleSearch = async () => {
    await fetchNutrition();
    setShowPopup(true);
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
                placeholder="Enter food (e.g., 1lb apple)"
                className="input"
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
              <button className="save-btn">Save</button>
            </div>
            <h3>Results for: {query}</h3>
            {nutrition.map((item, index) => (
              <div key={index} className="card">
                <p><strong>Food:</strong> {item.name}</p>
                <p><strong>Calories:</strong> {item.calories}</p>
                <p><strong>Protein:</strong> {item.protein_g} g</p>
                <p><strong>Fat:</strong> {item.fat_total_g} g</p>
                <p><strong>Carbs:</strong> {item.carbohydrates_total_g} g</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}

export default Home;
