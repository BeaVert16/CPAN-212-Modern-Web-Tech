import { Routes, Route } from 'react-router-dom';
import RecipeList from './pages/ListRecipe';
import RecipeDetail from './pages/DetailedRecipe';
import RecipeEdit from './pages/EditRecipe';
import AddRecipe from './pages/AddRecipe';
import './App.css'; 

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<RecipeList />} />
        <Route path="/recipes/new" element={<AddRecipe />} />
        <Route path="/recipes/:id" element={<RecipeDetail />} />
        <Route path="/recipes/:id/edit" element={<RecipeEdit />} />
      </Routes>
    </div>
  );
}

export default App;
