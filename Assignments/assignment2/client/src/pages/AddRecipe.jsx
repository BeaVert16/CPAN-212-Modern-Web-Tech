import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddRecipe() {
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState({
    name: '',
    description: '',
    difficulty: '',
    ingredients: [''],
    steps: [''],
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      [name]: value,
    }));
  }

  function handleArrayChange(e, index, key) {
    const { value } = e.target;
    setRecipe((prevRecipe) => {
      const updatedArray = [...prevRecipe[key]];
      updatedArray[index] = value;
      return { ...prevRecipe, [key]: updatedArray };
    });
  }

  function addArrayItem(key) {
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      [key]: [...prevRecipe[key], ''],
    }));
  }

  function removeArrayItem(index, key) {
    setRecipe((prevRecipe) => {
      const updatedArray = [...prevRecipe[key]];
      updatedArray.splice(index, 1);
      return { ...prevRecipe, [key]: updatedArray };
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch('http://localhost:8001/recipe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(recipe),
    })
      .then(() => navigate('/'))
      .catch((error) => console.error(error));
  }

  return (
    <div>
      <h1>Add New Recipe</h1>
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
        <label>
          Description:
          <textarea
            name="description"
            value={recipe.description}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Difficulty:
          <select
            name="difficulty"
            value={recipe.difficulty}
            onChange={handleChange}
            required
          >
            <option value="">Select Difficulty</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </label>

        <h3>Ingredients</h3>
        {recipe.ingredients.map((ingredient, index) => (
          <div key={index}>
            <input
              type="text"
              value={ingredient}
              onChange={(e) => handleArrayChange(e, index, 'ingredients')}
              required
            />
            <button type="button" onClick={() => removeArrayItem(index, 'ingredients')}>
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={() => addArrayItem('ingredients')}>
          Add Ingredient
        </button>

        <h3>Steps</h3>
        {recipe.steps.map((step, index) => (
          <div key={index}>
            <input
              type="text"
              value={step}
              onChange={(e) => handleArrayChange(e, index, 'steps')}
              required
            />
            <button type="button" onClick={() => removeArrayItem(index, 'steps')}>
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={() => addArrayItem('steps')}>
          Add Step
        </button>

        <button type="submit">Add Recipe</button>
      </form>
    </div>
  );
}

export default AddRecipe;
