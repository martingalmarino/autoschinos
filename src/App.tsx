import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Catalogo from './pages/Catalogo';
import Marcas from './pages/Marcas';
import BrandDetail from './pages/BrandDetail';
import ModelDetail from './pages/ModelDetail';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/catalogo" element={<Catalogo />} />
      <Route path="/marcas" element={<Marcas />} />
      <Route path="/marcas/:brandName" element={<BrandDetail />} />
      <Route path="/marcas/:brandName/:modelName" element={<ModelDetail />} />
    </Routes>
  );
}

export default App;

