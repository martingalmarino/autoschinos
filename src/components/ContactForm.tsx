import React, { useState } from 'react';

interface ContactFormProps {
  vehicleOfInterest?: string;
}

const ContactForm: React.FC<ContactFormProps> = ({ vehicleOfInterest = '' }) => {
  const [formData, setFormData] = useState({
    vehiculo: vehicleOfInterest,
    nombre: '',
    telefono: '',
    email: '',
    mensaje: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Crear mensaje para WhatsApp
    const whatsappMessage = `
Hola! Me interesa obtener información sobre:

🚗 *Vehículo de interés:* ${formData.vehiculo}

👤 *Datos de contacto:*
• Nombre: ${formData.nombre}
• Teléfono: ${formData.telefono}
• Email: ${formData.email}

💬 *Mensaje:*
${formData.mensaje}

Enviado desde autoschinos.ar
    `.trim();

    // Codificar para URL
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/5493515000000?text=${encodedMessage}`;
    
    // Abrir WhatsApp
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header del formulario */}
          <div className="bg-gradient-to-r from-primary-500 to-primary-600 px-8 py-6">
            <h2 className="text-2xl md:text-3xl font-bold text-white text-center">
              ¿Te interesa este vehículo?
            </h2>
            <p className="text-primary-100 text-center mt-2">
              Completá el formulario y te contactamos con toda la información
            </p>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="p-8">
            {/* Vehículo de interés */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Vehículo de interés
              </label>
              <input
                type="text"
                value={formData.vehiculo}
                onChange={(e) => handleInputChange('vehiculo', e.target.value)}
                placeholder="ford RANGER BLACK 4X4 2.0 2025 0KM COLOR GRIS PLATA"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
                required
              />
            </div>

            {/* Nombre y Teléfono en fila */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre completo
                </label>
                <input
                  type="text"
                  value={formData.nombre}
                  onChange={(e) => handleInputChange('nombre', e.target.value)}
                  placeholder="Nombre completo"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Teléfono
                </label>
                <input
                  type="tel"
                  value={formData.telefono}
                  onChange={(e) => handleInputChange('telefono', e.target.value)}
                  placeholder="Teléfono"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Correo electrónico
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="Correo electrónico"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
                required
              />
            </div>

            {/* Mensaje */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mensaje
              </label>
              <textarea
                value={formData.mensaje}
                onChange={(e) => handleInputChange('mensaje', e.target.value)}
                placeholder="Mensaje"
                rows={5}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm resize-none"
              />
            </div>

            {/* Botón de envío */}
            <div className="text-center">
              <button
                type="submit"
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors duration-200 shadow-lg hover:shadow-xl w-full md:w-auto"
              >
                Enviar
              </button>
            </div>

            {/* Información adicional */}
            <div className="mt-6 text-center text-sm text-gray-500">
              <p>Al enviar el formulario serás redirigido a WhatsApp para completar la consulta</p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
