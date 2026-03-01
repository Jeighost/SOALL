import { useState, useEffect } from 'react';
import { getSettings, updateSettings } from '../services/api';
import { useForm, useFieldArray } from 'react-hook-form';
import { FiSave, FiPlus, FiTrash2 } from 'react-icons/fi';
import toast from 'react-hot-toast';

const ContentSettings = () => {
  const [loading, setLoading] = useState(true);
  const { register, handleSubmit, control, reset, formState: { isSubmitting } } = useForm({
    defaultValues: {
      marqueeItems: [''],
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'marqueeItems'
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await getSettings();
        reset(res.data);
      } catch (error) {
        console.error('Error fetching settings:', error);
        toast.error('Error al cargar configuración');
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, [reset]);

  const onSubmit = async (data) => {
    try {
      await updateSettings(data);
      toast.success('Configuración guardada');
    } catch (error) {
      toast.error('Error al guardar');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-fucsia"></div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-display font-bold mb-8">Configuración de contenido</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Hero Section */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-display font-bold mb-4">Hero (Portada)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Badge
              </label>
              <input
                {...register('heroBadge')}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Título (usa {'<em>'}texto{'</em>'} para itálica)
              </label>
              <input
                {...register('heroTitle')}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subtítulo
              </label>
              <textarea
                {...register('heroSubtitle')}
                rows="3"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Texto botón 1
              </label>
              <input
                {...register('heroBtn1Text')}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enlace botón 1
              </label>
              <input
                {...register('heroBtn1Link')}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Texto botón 2
              </label>
              <input
                {...register('heroBtn2Text')}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enlace botón 2
              </label>
              <input
                {...register('heroBtn2Link')}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Marquee */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-display font-bold mb-4">Barra deslizante (Marquee)</h2>
          <div className="space-y-3">
            {fields.map((field, index) => (
              <div key={field.id} className="flex gap-2">
                <input
                  {...register(`marqueeItems.${index}`)}
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-lg"
                  placeholder="Ej: ✦ Envíos a todo el país"
                />
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                >
                  <FiTrash2 size={18} />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => append('')}
              className="flex items-center gap-2 text-fucsia hover:text-fucsia-dark"
            >
              <FiPlus size={18} />
              Agregar item
            </button>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-display font-bold mb-4">Banner CTA</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subtítulo
              </label>
              <input
                {...register('ctaSubtitle')}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Título
              </label>
              <input
                {...register('ctaTitle')}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descripción
              </label>
              <textarea
                {...register('ctaDescription')}
                rows="2"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Texto botón
              </label>
              <input
                {...register('ctaButtonText')}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enlace WhatsApp
              </label>
              <input
                {...register('ctaButtonLink')}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg"
                placeholder="https://wa.me/..."
              />
            </div>
          </div>
        </div>

        {/* Footer y Contacto */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-display font-bold mb-4">Footer y Contacto</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Copyright
              </label>
              <input
                {...register('footerCopyright')}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Créditos (puede incluir HTML)
              </label>
              <input
                {...register('footerCredits')}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Número WhatsApp
              </label>
              <input
                {...register('whatsappNumber')}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg"
                placeholder="+573012230298"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email contacto
              </label>
              <input
                {...register('contactEmail')}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Instagram URL
              </label>
              <input
                {...register('socialInstagram')}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Facebook URL
              </label>
              <input
                {...register('socialFacebook')}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                TikTok URL
              </label>
              <input
                {...register('socialTikTok')}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* SEO */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-display font-bold mb-4">SEO</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Título del sitio
              </label>
              <input
                {...register('siteTitle')}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Meta descripción
              </label>
              <textarea
                {...register('metaDescription')}
                rows="3"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-2 bg-fucsia hover:bg-fucsia-dark text-white px-6 py-3 rounded-lg transition disabled:opacity-50"
          >
            <FiSave size={18} />
            {isSubmitting ? 'Guardando...' : 'Guardar cambios'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContentSettings;