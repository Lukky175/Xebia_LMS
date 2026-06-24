import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import HeaderNav from '../components/HeaderNav.jsx';
import Footer from '../components/Footer.jsx';

const officeLocations = [
  {
    city: "Amsterdam (HQ)",
    address: "Wibautstraat 224, 1097 DN Amsterdam, Netherlands",
    phone: "+31 (0)20 333 0606",
    email: "info@xebia.com"
  },
  {
    city: "Noida",
    address: "Logix Techno Park, Sector 127, Noida, UP 201301, India",
    phone: "+91 120 409 2700",
    email: "india-info@xebia.com"
  },
  {
    city: "Atlanta",
    address: "Peachtree St NE, Suite 1400, Atlanta, GA 30309, USA",
    phone: "+1 (404) 474 4114",
    email: "usa-info@xebia.com"
  },
  {
    city: "Paris",
    address: "Rue de la Chaussée d'Antin, 75009 Paris, France",
    phone: "+33 (0)1 83 62 10 10",
    email: "france-info@xebia.com"
  }
];

export default function Contact() {
  const [contactForm, setContactForm] = useState({ name: '', email: '', subject: 'demo', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (contactForm.name && contactForm.email && contactForm.message) {
      setFormSubmitted(true);
      setTimeout(() => {
        setFormSubmitted(false);
        setContactForm({ name: '', email: '', subject: 'demo', message: '' });
      }, 5000);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-blueish-grey">
      <HeaderNav />

      <main className="max-w-6xl mx-auto px-8 py-16 w-full flex-1 space-y-12">
        <div className="text-center space-y-3">
          <span className="text-cta-orange text-xs font-bold uppercase tracking-widest font-semibold">Connect With Us</span>
          <h1 className="text-4xl font-extrabold text-black tracking-tight font-extrabold">Let’s Start a Conversation</h1>
          <p className="text-dark-grey text-sm max-w-lg mx-auto">
            Have questions about corporate training setups, roadmap authorization, or private labs? Our support representatives are here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Message form on left */}
          <div className="lg:col-span-7 bg-white border border-medium-grey rounded-2xl p-8 shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-black border-b border-blueish-grey pb-4">Send Us A Message</h3>
            
            {formSubmitted ? (
              <div className="bg-emerald/10 border border-emerald/20 text-emerald p-6 rounded-xl space-y-2">
                <h4 className="text-sm font-bold flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  <span>Message Received!</span>
                </h4>
                <p className="text-xs text-emerald-900 leading-relaxed font-medium">
                  Thank you for contacting Xebia Academy support. A dedicated learning pathways manager has received your request and will reach out to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-dark-grey">Your Name</label>
                    <input 
                      type="text" 
                      required
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      placeholder="Jane Doe"
                      className="w-full px-4.5 py-2.5 text-xs text-black bg-blueish-grey border border-medium-grey rounded-lg focus:outline-none focus:border-tranquil-velvet transition"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-dark-grey">Email Address</label>
                    <input 
                      type="email" 
                      required
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      placeholder="jane.doe@company.com"
                      className="w-full px-4.5 py-2.5 text-xs text-black bg-blueish-grey border border-medium-grey rounded-lg focus:outline-none focus:border-tranquil-velvet transition"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-dark-grey">Request Subject</label>
                  <select 
                    value={contactForm.subject}
                    onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                    className="w-full px-4.5 py-2.5 text-xs text-black bg-blueish-grey border border-medium-grey rounded-lg focus:outline-none focus:border-tranquil-velvet transition font-bold"
                  >
                    <option value="demo">Request Corporate Demo</option>
                    <option value="billing">Enterprise Pricing & Contracts</option>
                    <option value="technical">Technical Support / Sandbox Issues</option>
                    <option value="other">General Inquiries</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-dark-grey">Message</label>
                  <textarea 
                    rows="5"
                    required
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    placeholder="Tell us about your team size, curriculum requirements, or support needs..."
                    className="w-full px-4.5 py-2.5 text-xs text-black bg-blueish-grey border border-medium-grey rounded-lg focus:outline-none focus:border-tranquil-velvet transition resize-none"
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  className="w-full py-3 bg-cta-orange hover:bg-[#E05600] text-white text-xs font-bold rounded-xl transition duration-150 flex items-center justify-center gap-2 shadow-md shadow-cta-orange/20 cursor-pointer border border-transparent"
                >
                  <Send className="h-4 w-4" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>

          {/* Office grid on right */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-medium-grey rounded-2xl p-8 shadow-sm space-y-4">
              <h3 className="text-lg font-bold text-black border-b border-blueish-grey dark:border-[#282A3A] pb-4">Corporate Office Directory</h3>
              <div className="space-y-6 max-h-[400px] overflow-y-auto sleek-scrollbar pr-2">
                {officeLocations.map((loc, idx) => (
                  <div key={idx} className="space-y-2 border-b border-blueish-grey/50 dark:border-[#282A3A]/50 pb-4 last:border-0 last:pb-0">
                    <h4 className="text-sm font-bold text-tranquil-velvet dark:text-[#d38bca] flex items-center gap-1.5">
                      <MapPin className="h-4 w-4 text-cta-orange" />
                      <span>{loc.city} Office</span>
                    </h4>
                    <div className="space-y-1 text-xs text-dark-grey leading-relaxed pl-5 font-medium">
                      <p>{loc.address}</p>
                      <p className="flex items-center gap-1.5 mt-1 text-black">
                        <Phone className="h-3.5 w-3.5 text-tranquil-velvet-dark" />
                        <span>{loc.phone}</span>
                      </p>
                      <p className="flex items-center gap-1.5 text-black">
                        <Mail className="h-3.5 w-3.5 text-tranquil-velvet-dark" />
                        <span>{loc.email}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
