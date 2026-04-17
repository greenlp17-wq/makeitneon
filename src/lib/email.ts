import emailjs from '@emailjs/browser';
import { siteConfig } from '@/config/site';

/**
 * Utility to send emails via EmailJS.
 * It will log to console in development, or if credentials are dummy.
 */
export async function sendEmail(templateParams: Record<string, unknown>, formName: string = 'Contact Form') {
  const { serviceId, templateId, publicKey } = siteConfig.emailjs;

  // In development or if no API keys are set, just log and simulate delay
  if (!publicKey || publicKey === 'public_key_dummy' || import.meta.env.DEV) {
    console.log(`[EmailJS Simulation] Sending ${formName} with data:`, templateParams);
    return new Promise((resolve) => setTimeout(resolve, 1500));
  }

  try {
    const response = await emailjs.send(serviceId, templateId, templateParams, publicKey);
    console.log('SUCCESS!', response.status, response.text);
    return response;
  } catch (error) {
    console.error('FAILED...', error);
    throw error;
  }
}
