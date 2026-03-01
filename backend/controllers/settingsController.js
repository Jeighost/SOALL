const Settings = require('../models/Settings');

// @desc    Obtener configuración (público)
// @route   GET /api/settings
// @access  Public
const getPublicSettings = async (req, res) => {
  try {
    const settings = await Settings.getSettings();
    // No enviar datos sensibles al público
    res.json({
      heroBadge: settings.heroBadge,
      heroTitle: settings.heroTitle,
      heroSubtitle: settings.heroSubtitle,
      heroBtn1Text: settings.heroBtn1Text,
      heroBtn1Link: settings.heroBtn1Link,
      heroBtn2Text: settings.heroBtn2Text,
      heroBtn2Link: settings.heroBtn2Link,
      marqueeItems: settings.marqueeItems,
      ctaSubtitle: settings.ctaSubtitle,
      ctaTitle: settings.ctaTitle,
      ctaDescription: settings.ctaDescription,
      ctaButtonText: settings.ctaButtonText,
      ctaButtonLink: settings.ctaButtonLink,
      footerCopyright: settings.footerCopyright,
      footerCredits: settings.footerCredits,
      socialInstagram: settings.socialInstagram,
      socialFacebook: settings.socialFacebook,
      socialTikTok: settings.socialTikTok,
      whatsappNumber: settings.whatsappNumber,
      contactEmail: settings.contactEmail,
      siteTitle: settings.siteTitle,
      metaDescription: settings.metaDescription
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener configuración' });
  }
};

// @desc    Obtener toda la configuración (admin)
// @route   GET /api/settings/all
// @access  Private
const getAllSettings = async (req, res) => {
  try {
    const settings = await Settings.getSettings();
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener configuración' });
  }
};

// @desc    Actualizar configuración
// @route   PUT /api/settings
// @access  Private
const updateSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne();

    if (!settings) {
      settings = new Settings();
    }

    // Actualizar solo los campos enviados
    Object.keys(req.body).forEach(key => {
      if (key !== '_id' && key !== '__v' && key !== 'createdAt' && key !== 'updatedAt') {
        settings[key] = req.body[key];
      }
    });

    const updated = await settings.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar configuración' });
  }
};

module.exports = {
  getPublicSettings,
  getAllSettings,
  updateSettings
};