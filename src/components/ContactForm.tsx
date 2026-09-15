'use client';

import { useState } from 'react';
import { CONTACT_EMAIL, WHATSAPP_NUMBER } from '@/lib/site';

interface ContactFormProps {
  vehicleOfInterest?: string;
  title?: string;
  subtitle?: string;
}

export default function ContactForm({
  vehicleOfInterest = '',
  title = '¿Te interesa este vehículo?',
  subtitle = 'Completá el formulario y te contactamos con toda la información',
}: ContactFormProps) {
  const [formData, setFormData] = useState({
    vehiculo: vehicleOfInterest,
    nombre: '',
    telefono: '',
    email: '',
    mensaje: '',
  });
  const [error, setError] = useState('');

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const message = `
Hola! Me interesa obtener información sobre:

Vehículo de interés: ${formData.vehiculo}

Datos de contacto:
• Nombre: ${formData.nombre}
• Teléfono: ${formData.telefono}
• Email: ${formData.email}

Mensaje:
${formData.mensaje || '(sin mensaje adicional)'}

Enviado desde autoschinos.ar
    `.trim();

    if (WHATSAPP_NUMBER) {
      const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
      window.open(url, '_blank', 'noopener,noreferrer');
      return;
    }

    const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      `Consulta: ${formData.vehiculo || 'autoschinos.ar'}`
    )}&body=${encodeURIComponent(message)}`;
    window.location.href = mailto;
  };

  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-primary-500 to-primary-600 px-8 py-6">
            <h2 className="text-2xl md:text-3xl font-bold text-white text-center">
              {title}
            </h2>
            <p className="text-primary-100 text-center mt-2">{subtitle}</p>
          </div>

          <form onSubmit={handleSubmit} className="p-8">
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Vehículo o consulta
              </label>
              <input
                type="text"
                value={formData.vehiculo}
                onChange={(e) => handleInputChange('vehiculo', e.target.value)}
                placeholder="Ej: BYD Dolphin Mini"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre completo
                </label>
                <input
                  type="text"
                  value={formData.nombre}
                  onChange={(e) => handleInputChange('nombre', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                  required
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Correo electrónico
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                required
              />
            </div>

            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mensaje
              </label>
              <textarea
                value={formData.mensaje}
                onChange={(e) => handleInputChange('mensaje', e.target.value)}
                rows={5}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm resize-none"
              />
            </div>

            {error && (
              <p className="text-red-600 text-sm mb-4 text-center">{error}</p>
            )}

            <div className="text-center">
              <button
                type="submit"
                className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors shadow-lg w-full md:w-auto"
              >
                {WHATSAPP_NUMBER ? 'Enviar por WhatsApp' : 'Enviar por email'}
              </button>
            </div>

            <p className="mt-6 text-center text-sm text-gray-500">
              {WHATSAPP_NUMBER
                ? 'Al enviar se abrirá WhatsApp con tu consulta lista para mandar.'
                : `Al enviar se abrirá tu cliente de correo hacia ${CONTACT_EMAIL}. Configurá NEXT_PUBLIC_WHATSAPP para usar WhatsApp.`}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
