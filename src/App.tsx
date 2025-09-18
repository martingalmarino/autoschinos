import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Catalogo from './pages/Catalogo';
import Marcas from './pages/Marcas';
import BrandDetail from './pages/BrandDetail';
import ModelDetail from './pages/ModelDetail';
import TerminosCondiciones from './pages/TerminosCondiciones';
import PoliticaPrivacidad from './pages/PoliticaPrivacidad';
import PoliticaCookies from './pages/PoliticaCookies';
import AvisoLegal from './pages/AvisoLegal';
import TestCatalog from './pages/TestCatalog';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/catalogo" element={<Catalogo />} />
      <Route path="/marcas" element={<Marcas />} />
      <Route path="/marcas/:brandName" element={<BrandDetail />} />
      <Route path="/marcas/:brandName/:modelName" element={<ModelDetail />} />
      <Route path="/terminos-condiciones" element={<TerminosCondiciones />} />
      <Route path="/politica-privacidad" element={<PoliticaPrivacidad />} />
      <Route path="/politica-cookies" element={<PoliticaCookies />} />
      <Route path="/aviso-legal" element={<AvisoLegal />} />
      <Route path="/test-catalog" element={<TestCatalog />} />
    </Routes>
  );
}

export default App;

