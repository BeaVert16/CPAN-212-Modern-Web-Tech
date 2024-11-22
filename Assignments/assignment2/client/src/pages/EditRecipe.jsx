import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function RecipeEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState({
    name: '',
    description: '',
    difficulty: '',
    ingredients: [],
    steps: []
  });

  useEffect(() => {
    fetch(`http://localhost:8001/recipe/${id}`)
      .then(response => response.json())
      .then(data => setRecipe(data))
      .catch(error => console.error(error));
  }, [id]);

  function handleChange(e) {
    const { name, value } = e.target;
    setRecipe(prevRecipe => ({
      ...prevRecipe,
      [name]: value
    }));
  }

  function handleIngredientChange(index, value) {
    const updatedIngredients = [...recipe.ingredients];
    updatedIngredients[index] = value;
    setRecipe(prevRecipe => ({
      ...prevRecipe,
      ingredients: updatedIngredients
    }));
  }

  function handleStepChange(index, value) {
    const updatedSteps = [...recipe.steps];
    updatedSteps[index] = value;
    setRecipe(prevRecipe => ({
      ...prevRecipe,
      steps: updatedSteps
    }));
  }

  function addIngredient() {
    setRecipe(prevRecipe => ({
      ...prevRecipe,
      ingredients: [...prevRecipe.ingredients, '']
    }));
  }

  function addStep() {
    setRecipe(prevRecipe => ({
      ...prevRecipe,
      steps: [...prevRecipe.steps, '']
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch(`http://localhost:8001/recipe/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(recipe),
    })
      .then(() => navigate(`/recipes/${id}`))
      .catch(error => console.error(error));
  }

  return (
    <div>
      <h1>Edit Recipe</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={recipe.name}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Description:
          <textarea
            name="description"
            value={recipe.description}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Difficulty:
          <input
            type="text"
            name="difficulty"
            value={recipe.difficulty}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <h3>Ingredients</h3>
        {recipe.ingredients.map((ingredient, index) => (
          <div key={index}>
            <input
              type="text"
              value={ingredient}
              onChange={(e) => handleIngredientChange(index, e.target.value)}
              required
            />
          </div>
        ))}
        <button type="button" onClick={addIngredient}>Add Ingredient</button>
        <br />
        <h3>Steps</h3>
        {recipe.steps.map((step, index) => (
          <div key={index}>
            <input
              type="text"
              value={step}
              onChange={(e) => handleStepChange(index, e.target.value)}
              required
            />
          </div>
        ))}
        <button type="button" onClick={addStep}>Add Step</button>
        <br />
        <button type="submit">Update Recipe</button>
      </form>
    </div>
  );
}

export default RecipeEdit;
