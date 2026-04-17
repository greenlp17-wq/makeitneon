// ═════════════════════════════════════════════════════════
// Make It Neon — Global Site Configuration
// All static external links, credentials, and business info
// ═════════════════════════════════════════════════════════

export const siteConfig = {
  // Business Info
  name: 'Make It Neon',
  domain: 'https://makeitneon.ch',
  email: 'info@makeitneon.ch',
  phone: '+41 76 123 45 67', // Replace with real phone number
  address: {
    street: 'Bahnhofstrasse 10', // Replace with real street
    postalCode: '8001',
    city: 'Zurich',
    country: 'Switzerland',
    mapLink: 'https://maps.google.com/?q=Bahnhofstrasse+10+8001+Zurich',
    googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2702.0444!2d8.5391!3d47.3769!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47900a01f38bae1d%3A0x3b9d2fd0b3b9f6e5!2sBahnhofstrasse%2C%208001%20Z%C3%BCrich!5e0!3m2!1sen!2sch!4v1690000000000!5m2!1sen!2sch'
  },
  
  // Social Links
  socials: {
    instagram: 'https://instagram.com/makeitneon',
    tiktok: 'https://tiktok.com/@makeitneon',
    facebook: 'https://facebook.com/makeitneon',
    googleReviews: 'https://g.page/makeitneon/review', // Replace with real link
    trustpilot: 'https://trustpilot.com/review/makeitneon.ch', // Replace with real link
  },

  // WhatsApp Widget
  whatsapp: {
    number: '41761234567', // Only numbers, no plus
    defaultMessage: 'Hello Make It Neon! I would like to get a quote for a custom sign.',
  },

  // Integrations
  analytics: {
    ga4MeasurementId: 'G-XXXXXXXXXX', // Replace with your real GA4 ID
  },
  
  // EmailJS Integration (for forms)
  emailjs: {
    serviceId: 'service_dummy', // Replace with your Service ID
    templateId: 'template_dummy', // Replace with your Template ID
    publicKey: 'public_key_dummy', // Replace with your Public Key
  }
};
