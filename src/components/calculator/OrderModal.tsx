import { useState } from 'react';
import { X, Check, Send, Loader2, Shield, Clock, MapPin } from 'lucide-react';
import type { UseNeonCalculatorReturn } from '../../hooks/useNeonCalculator';
import { sendEmail } from '@/lib/email';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  calcState: UseNeonCalculatorReturn;
  mode: 'order' | 'quote';
}

export function OrderModal({ isOpen, onClose, calcState, mode }: OrderModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const { text, activeFont, activeColor, widthCm, isOutdoor, isRGB, hasDimmer, mountType, backboardColor, backboardShape, priceBreakdown, lineCount } = calcState;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    setIsSubmitting(true);

    try {
      // Generate SVG for email attachment
      const svgString = calcState.generateOrderSVG();
  
      // Build order data
      const orderData = {
        text,
        font: activeFont.name,
        color: activeColor.name,
        width: `${widthCm} cm`,
        lines: lineCount,
        outdoor: isOutdoor ? 'Yes (IP65)' : 'No (Indoor)',
        rgb: isRGB ? 'Yes' : 'No',
        dimmer: hasDimmer ? 'Yes' : 'No',
        mount: mountType,
        backboardShape: backboardShape,
        backboardColor: backboardColor,
        price: priceBreakdown?.totalPrice || 0,
        customerName: name,
        customerEmail: email,
        customerPhone: phone,
        customerMessage: message,
        svgDataLength: svgString?.length || 0,
        timestamp: new Date().toISOString(),
      };

      await sendEmail(orderData, mode === 'order' ? 'Calculator Instant Order' : 'Quote Request');
      setIsSuccess(true);
    } catch (err) {
      console.error(err);
      alert('Failed to submit order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
        <div
          className="relative bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl text-center"
          onClick={e => e.stopPropagation()}
        >
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 font-heading mb-2">
            {mode === 'order' ? 'Order Received!' : 'Quote Request Sent!'}
          </h3>
          <p className="text-slate-600 mb-6">
            Thank you, {name}! We'll contact you within 24 hours with a free design mockup.
          </p>
          <div className="flex flex-col gap-2 text-sm text-slate-500 mb-6">
            <div className="flex items-center gap-2 justify-center">
              <Shield className="w-4 h-4" />
              <span>2 Year Warranty</span>
            </div>
            <div className="flex items-center gap-2 justify-center">
              <Clock className="w-4 h-4" />
              <span>Production: 5-7 business days</span>
            </div>
            <div className="flex items-center gap-2 justify-center">
              <MapPin className="w-4 h-4" />
              <span>Handcrafted in Zurich, Switzerland</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-full bg-slate-900 text-white py-3 rounded-xl font-medium hover:bg-slate-800 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative bg-white rounded-2xl max-w-lg w-full shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <h3 className="text-lg font-bold text-slate-900 font-heading">
            {mode === 'order' ? '🛒 Complete Your Order' : '💬 Get a Free Quote'}
          </h3>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        {/* Order Summary */}
        <div className="p-6 bg-slate-50 border-b border-slate-100">
          <h4 className="text-sm font-semibold text-slate-600 uppercase tracking-wider mb-3">Order Summary</h4>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="text-slate-500">Text:</div>
            <div className="text-slate-800 font-medium">"{text}"</div>
            <div className="text-slate-500">Font:</div>
            <div className="text-slate-800">{activeFont.name}</div>
            <div className="text-slate-500">Color:</div>
            <div className="text-slate-800 flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full inline-block border border-slate-200"
                style={{ backgroundColor: activeColor.hex }}
              />
              {activeColor.name}
            </div>
            <div className="text-slate-500">Size:</div>
            <div className="text-slate-800">{widthCm} cm wide</div>
            <div className="text-slate-500">Indoor/Outdoor:</div>
            <div className="text-slate-800">{isOutdoor ? 'Outdoor (IP65)' : 'Indoor'}</div>
            <div className="text-slate-500">Backing:</div>
            <div className="text-slate-800 capitalize">{backboardShape.replace(/-/g, ' ')} • {backboardColor.replace(/-/g, ' ')}</div>
            {isRGB && (
              <>
                <div className="text-slate-500">Special:</div>
                <div className="text-slate-800">RGB Color Changing</div>
              </>
            )}
          </div>
          {priceBreakdown && (
            <div className="mt-4 pt-3 border-t border-slate-200 flex justify-between items-center">
              <span className="text-sm text-slate-600">Estimated Total:</span>
              <span className="text-2xl font-bold text-neon-pink font-heading">
                {priceBreakdown.totalPrice} CHF
              </span>
            </div>
          )}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Full Name *</label>
            <input
              type="text"
              required
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Your name"
              className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-neon-pink/40 focus:border-neon-pink transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email *</label>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-neon-pink/40 focus:border-neon-pink transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Phone (optional)</label>
            <input
              type="tel"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              placeholder="+41 XX XXX XX XX"
              className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-neon-pink/40 focus:border-neon-pink transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Message (optional)</label>
            <textarea
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="Any special requests or questions..."
              rows={3}
              className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-neon-pink/40 focus:border-neon-pink transition-all resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting || !name.trim() || !email.trim()}
            className="w-full bg-neon-pink hover:bg-neon-pink/90 text-white font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-neon-pink/20"
          >
            {isSubmitting ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
            {isSubmitting
              ? 'Sending...'
              : mode === 'order'
                ? 'Submit Order'
                : 'Send Quote Request'
            }
          </button>

          <p className="text-center text-xs text-slate-400">
            By submitting, you agree to receive a free design mockup via email.
            No payment required at this stage.
          </p>
        </form>
      </div>
    </div>
  );
}
