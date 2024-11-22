import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./ListRecipe.css";

function RecipeList() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8001/recipe")
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setRecipes(data);
      })
      .catch((error) => console.error(error));
  }, []);

  function handleDelete(id) {
    fetch(`http://localhost:8001/recipe/${id}`, { method: "DELETE" })
      .then(() => setRecipes(recipes.filter((recipe) => recipe._id !== id)))
      .catch((error) => console.error(error));
  }

  return (
    <div>
      <h1>All Recipes</h1>
      <Link to="/recipes/new">Add New Recipe</Link>
      <div className="recipe-list">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="recipe-card">
            <h2>{recipe.name}</h2>
            <p>{recipe.description}</p>
            <div className="recipe-actions">
              <Link to={`/recipes/${recipe._id}`}>View</Link>
              <Link to={`/recipes/${recipe._id}/edit`}>Edit</Link>
              <button onClick={() => handleDelete(recipe._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecipeList;
