import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8001/recipe/${id}`)
      .then(response => response.json())
      .then(data => setRecipe(data))
      .catch(error => console.error(error));
  }, [id]);

  function handleDelete(id) {
    fetch(`http://localhost:8001/recipe/${id}`, { method: 'DELETE' })
      .then(() => (window.location.href = "/"))
      .catch(error => console.error(error));
  }

  if (!recipe) return <p>Loading...</p>;

  return (
    <div>
      <h1>{recipe.name}</h1>
      <p>{recipe.description}</p>
      <p>Difficulty: {recipe.difficulty}</p>
      <h3>Ingredients</h3>
      <ul>{recipe.ingredients.map((item, index) => <li key={index}>{item}</li>)}</ul>
      <h3>Steps</h3>
      <ol>{recipe.steps.map((step, index) => <li key={index}>{step}</li>)}</ol>
      <Link to={`/recipes/${id}/edit`}>Edit</Link>
      <button onClick={() => handleDelete(id)}>Delete</button>
    </div>
  );
}

export default RecipeDetail;
