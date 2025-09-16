import React, { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

interface SearchForm {
  marca: string;
  modelo: string;
}

const SearchBlock: React.FC = () => {
  const [formData, setFormData] = useState<SearchForm>({
    marca: '',
    modelo: ''
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState({
    marca: false,
    modelo: false
  });

  const marcas = [
    'Chery', 'Geely', 'JAC', 'Haval', 'BYD', 'Dongfeng', 
    'Great Wall', 'Lifan', 'MG', 'Changan', 'Foton', 'BAIC'
  ];

  const modelos = [
    'Tiggo 3', 'Tiggo 5', 'Tiggo 7', 'Tiggo 8', 'Arrizo 5', 'Arrizo 6',
    'Coolray', 'Atlas', 'Emgrand', 'Vision', 'GC2', 'GC6',
    'T40', 'T50', 'T60', 'T70', 'T80', 'T90',
    'H2', 'H6', 'H9', 'F7', 'F7x', 'Jolion'
  ];


  const handleInputChange = (field: keyof SearchForm, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setIsDropdownOpen(prev => ({ ...prev, [field]: false }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Búsqueda:', formData);
    // Aquí se implementaría la lógica de búsqueda
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-b from-white to-gray-50 rounded-xl shadow-lg hover:shadow-xl p-8 -mt-8 relative z-10 transition-shadow duration-300">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Buscá tu próximo auto
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Marca Dropdown */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Marca
                  </label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setIsDropdownOpen(prev => ({ ...prev, marca: !prev.marca }))}
                      className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-left focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    >
                      <span className={formData.marca ? 'text-gray-900' : 'text-gray-500'}>
                        {formData.marca || 'Elegí la marca'}
                      </span>
                      <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    </button>
                    
                    {isDropdownOpen.marca && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                        {marcas.map((marca) => (
                          <button
                            key={marca}
                            type="button"
                            onClick={() => handleInputChange('marca', marca)}
                            className="w-full text-left px-4 py-2 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                          >
                            {marca}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Modelo Dropdown */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Modelo
                  </label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setIsDropdownOpen(prev => ({ ...prev, modelo: !prev.modelo }))}
                      className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-left focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    >
                      <span className={formData.modelo ? 'text-gray-900' : 'text-gray-500'}>
                        {formData.modelo || 'Elegí el modelo'}
                      </span>
                      <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    </button>
                    
                    {isDropdownOpen.modelo && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                        {modelos.map((modelo) => (
                          <button
                            key={modelo}
                            type="button"
                            onClick={() => handleInputChange('modelo', modelo)}
                            className="w-full text-left px-4 py-2 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                          >
                            {modelo}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

              </div>

              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end space-y-4 sm:space-y-0">
                <a 
                  href="#" 
                  className="text-primary-500 hover:text-primary-600 font-medium transition-colors duration-200 text-center sm:text-left"
                >
                  • Ver todos los vehículos disponibles
                </a>
                <button
                  type="submit"
                  className="bg-primary-500 hover:bg-primary-600 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-200 w-full sm:w-auto"
                >
                  Buscar
                </button>
              </div>
            </form>

          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchBlock;
