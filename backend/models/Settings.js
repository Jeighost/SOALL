const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  // Hero
  heroBadge: { type: String, default: '✦ Nueva Colección 2026' },
  heroTitle: { type: String, default: 'Moda que\n<em>te define</em>' },
  heroSubtitle: { type: String, default: 'Piezas únicas pensadas para cada momento. Estilo, calidad y actitud en cada prenda.' },
  heroBtn1Text: { type: String, default: 'Ver Colección' },
  heroBtn1Link: { type: String, default: '#categorias' },
  heroBtn2Text: { type: String, default: 'Explorar todo' },
  heroBtn2Link: { type: String, default: '#catalogo' },
  
  // Marquee
  marqueeItems: { type: [String], default: [
    '✦ Envíos a todo el país',
    '✦ Nuevas llegadas cada semana',
    '✦ Compra 100% segura',
    '✦ Atención por WhatsApp',
    '✦ Devoluciones fáciles'
  ]},
  
  // CTA Banner
  ctaSubtitle: { type: String, default: '¿No encontraste lo que buscas?' },
  ctaTitle: { type: String, default: 'Contáctanos directo\npor WhatsApp' },
  ctaDescription: { type: String, default: 'Tenemos más prendas disponibles y te asesoramos con gusto.' },
  ctaButtonText: { type: String, default: 'Ir a WhatsApp' },
  ctaButtonLink: { type: String, default: 'https://wa.me/+573012230298' },
  
  // Footer
  footerCopyright: { type: String, default: '© 2025 SOALL. Todos los derechos reservados.' },
  footerCredits: { type: String, default: 'Hecho por <span style="color:var(--fucsia);">Jeighost</span> para amantes de la moda' },
  
  // Redes sociales
  socialInstagram: { type: String, default: '#' },
  socialFacebook: { type: String, default: '#' },
  socialTikTok: { type: String, default: '#' },
  
  // Contacto
  whatsappNumber: { type: String, default: '+573012230298' },
  contactEmail: { type: String, default: 'sofiafuentes0408@gmail.com' },
  
  // SEO
  siteTitle: { type: String, default: 'SOALL — Moda que te define' },
  metaDescription: { type: String, default: 'SOALL - Tienda de moda online. Ropa dama, caballero, accesorios y calzados.' }
}, { timestamps: true });

// Asegurar que solo exista un documento de configuración
settingsSchema.statics.getSettings = async function() {
  let settings = await this.findOne();
  if (!settings) {
    settings = await this.create({});
  }
  return settings;
};

module.exports = mongoose.model('Settings', settingsSchema);