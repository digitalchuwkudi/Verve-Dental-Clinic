import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Phone, 
  PhoneCall,
  Calendar, 
  CalendarPlus,
  CalendarDays,
  CheckCircle2, 
  Star, 
  ChevronDown, 
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  MessageSquare,
  MapPin,
  Clock,
  Instagram,
  Facebook,
  Twitter,
  Menu,
  X,
  Stethoscope,
  Sparkles,
  ShieldCheck,
  Smile,
  SmilePlus,
  Activity,
  HeartPulse,
  Moon,
  Sun,
  Mail,
  ArrowRight,
  Quote,
  ClipboardPlus,
  Zap,
  Layers,
  Palette,
  AlertCircle,
  Users,
  Feather,
  CreditCard,
  Wand2,
  ArrowUp
} from 'lucide-react';

// --- Components ---

const WhatsAppIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
  </svg>
);

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    let timeoutId: number | null = null;
    const handleScroll = () => {
      if (timeoutId === null) {
        timeoutId = window.setTimeout(() => {
          setIsScrolled(window.scrollY > 300);
          timeoutId = null;
        }, 50);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutId !== null) window.clearTimeout(timeoutId);
    };
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-[#E6F4F1]/95 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-[#E6F4F1]">
              <Smile size={24} />
            </div>
            <span className={`font-heading font-bold text-2xl tracking-tight ${isScrolled ? 'text-[#0A1F1C]' : 'text-[#E6F4F1]'}`}>
              VerveDentist
            </span>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-4 lg:space-x-8">
            <a href="#home" className={`text-sm lg:text-base font-medium hover:text-accent-green transition-colors ${isScrolled ? 'text-[#0A1F1C]' : 'text-[#E6F4F1]'}`}>Home</a>
            <a href="#about" className={`text-sm lg:text-base font-medium hover:text-accent-green transition-colors ${isScrolled ? 'text-[#0A1F1C]' : 'text-[#E6F4F1]'}`}>About Us</a>
            <a href="#services" className={`text-sm lg:text-base font-medium hover:text-accent-green transition-colors ${isScrolled ? 'text-[#0A1F1C]' : 'text-[#E6F4F1]'}`}>Services</a>
            <a href="#results" className={`text-sm lg:text-base font-medium hover:text-accent-green transition-colors ${isScrolled ? 'text-[#0A1F1C]' : 'text-[#E6F4F1]'}`}>Results</a>
            <a href="#testimonials" className={`text-sm lg:text-base font-medium hover:text-accent-green transition-colors ${isScrolled ? 'text-[#0A1F1C]' : 'text-[#E6F4F1]'}`}>Reviews</a>
            <a href="#contact" className={`text-sm lg:text-base font-medium hover:text-accent-green transition-colors ${isScrolled ? 'text-[#0A1F1C]' : 'text-[#E6F4F1]'}`}>Contact Us</a>
            <a href="tel:+2290192206612" className={`text-base lg:text-lg font-bold hover:text-accent-green transition-colors flex items-center gap-2 whitespace-nowrap ${isScrolled ? 'text-[#0A1F1C]' : 'text-[#E6F4F1]'}`}>
              <Phone size={20} /> +229 01 92 20 66 12
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className={`lg:hidden p-2 rounded-lg backdrop-blur-sm ${isScrolled ? 'text-[#0A1F1C] bg-[#E6F4F1]' : 'text-[#E6F4F1] bg-white/20'}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#E6F4F1] border-t border-slate-200 shadow-lg overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1 flex flex-col">
              <a href="#home" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-3 text-base font-medium text-[#0A1F1C] hover:text-accent-green rounded-lg">Home</a>
              <a href="#about" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-3 text-base font-medium text-[#0A1F1C] hover:text-accent-green rounded-lg">About Us</a>
              <a href="#services" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-3 text-base font-medium text-[#0A1F1C] hover:text-accent-green rounded-lg">Services</a>
              <a href="#results" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-3 text-base font-medium text-[#0A1F1C] hover:text-accent-green rounded-lg">Results</a>
              <a href="#testimonials" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-3 text-base font-medium text-[#0A1F1C] hover:text-accent-green rounded-lg">Reviews</a>
              <a href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-3 text-base font-medium text-[#0A1F1C] hover:text-accent-green rounded-lg">Contact Us</a>
              <a href="tel:+2290192206612" onClick={() => setIsMobileMenuOpen(false)} className="mt-4 w-full bg-primary hover:bg-accent-green hover:text-primary hover:-translate-y-1 transition-all duration-300 text-[#E6F4F1] px-6 py-3 rounded-full text-lg font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/30 hover:shadow-accent-green/20 whitespace-nowrap">
                <Phone size={20} /> +229 01 92 20 66 12
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <>
      <section id="home" className="relative h-[100svh] md:h-[65vh] lg:h-[95vh] xl:h-screen overflow-hidden bg-black">
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          <video 
            src="https://res.cloudinary.com/dx41voszq/video/upload/q_auto,f_auto,w_1280/v1775748213/Dental_website_au1wod.mp4" 
            autoPlay 
            loop 
            muted 
            playsInline
            disablePictureInPicture
            preload="auto"
            className="w-full h-full object-cover"
            style={{ 
              transform: 'translate3d(0, 0, 0)', 
              willChange: 'transform',
              backfaceVisibility: 'hidden',
              perspective: 1000
            }}
          />
          {/* Gradient overlay for navbar readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/10 to-transparent pointer-events-none"></div>
        </div>
      </section>

      {/* Hero Text Section */}
      <section className="bg-[#0A1F1C] py-20 lg:py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          <div className="max-w-[1200px] w-full flex flex-col items-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex items-center justify-center gap-2 mb-6"
            >
              <span className="py-1.5 px-4 rounded-full bg-white/10 text-[#E6F4F1] backdrop-blur-sm shadow-sm flex items-center gap-2 font-bold text-sm border border-white/10">
                <Sparkles size={16} className="text-accent-green" />
                Available 24 hours
              </span>
              <div className="hidden sm:flex items-center gap-1 py-1.5 px-4 rounded-full bg-white/10 backdrop-blur-sm text-[#E6F4F1] font-semibold text-sm shadow-sm border border-white/10">
                <Star size={14} className="text-accent-green" fill="currentColor" />
                4.9/5 Google Reviews
              </div>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-[56px] sm:text-[60px] md:text-[75px] font-bold font-anton tracking-tight text-[#E6F4F1] mb-6 leading-[1.1] text-center"
            >
              Professional Dentist in Norwood, Adelaide
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-[24px] font-normal font-poppins text-slate-300 mb-10 leading-relaxed text-center max-w-2xl"
            >
              You can now smile and laugh with total <span className="relative inline-block">Confidence<svg className="absolute w-full h-3 -bottom-1 left-0 text-accent-green" viewBox="0 0 100 20" preserveAspectRatio="none"><path d="M0 15 Q 50 0 100 15" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/></svg></span>.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mt-2"
            >
              <button 
                onClick={() => window.dispatchEvent(new CustomEvent('open-chat'))}
                className="group relative inline-flex items-center justify-center gap-3 px-6 py-3 rounded-full bg-black/40 backdrop-blur-md border border-accent-green/50 text-[#E6F4F1] transition-all hover:bg-black/60 shadow-[0_0_20px_rgba(134,197,42,0.15)] hover:shadow-[0_0_30px_rgba(134,197,42,0.3)] hover:-translate-y-1 w-full sm:w-auto"
              >
                <div className="w-10 h-10 rounded-full bg-accent-green flex items-center justify-center group-hover:scale-110 transition-transform text-[#0A1F1C] shrink-0">
                  <MessageCircle size={20} />
                </div>
                <div className="flex flex-col items-start text-left">
                  <span className="font-semibold text-base leading-tight">Chat with our AI Receptionist</span>
                  <span className="text-xs text-slate-300 font-poppins mt-0.5">Get immediate answers 24/7 & fast priority follow-ups</span>
                </div>
              </button>

              <a href="#booking" className="w-full sm:w-auto bg-white hover:bg-accent-green hover:text-primary hover:-translate-y-1 text-primary px-8 py-4 sm:py-0 sm:h-[68px] rounded-full font-semibold text-lg transition-all duration-300 shadow-xl shadow-white/10 hover:shadow-accent-green/20 flex items-center justify-center gap-2 whitespace-nowrap">
                Book an Appointment <ArrowRight size={20} />
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-16 pt-10 w-full relative"
            >
              {/* Divider */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[70%] h-px bg-white/10"></div>
              
              <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-8">
                {/* Avatars + Happy Patients */}
                <div className="flex items-center gap-4">
                <div className="flex -space-x-4">
                  <img className="w-12 h-12 rounded-full border-2 border-[#0A1F1C] object-cover" src="https://i.ibb.co/XxLfCYjH/Whisk-56e9e320a2c6bdbb23843a93e41d6c52dr.jpg" alt="Patient" referrerPolicy="no-referrer" />
                  <img className="w-12 h-12 rounded-full border-2 border-[#0A1F1C] object-cover" src="https://i.ibb.co/Zw0CYmJ/Whisk-7311e51747f028790b04356abe002894eg.png" alt="Patient" referrerPolicy="no-referrer" />
                  <img className="w-12 h-12 rounded-full border-2 border-[#0A1F1C] object-cover" src="https://i.ibb.co/0VcB2WKD/Whisk-c64509d6960356493544616d08d2d7bddr.jpg" alt="Patient" referrerPolicy="no-referrer" />
                  <img className="w-12 h-12 rounded-full border-2 border-[#0A1F1C] object-cover" src="https://i.ibb.co/TB2ngfdT/Whisk-f3336bf086e4adf9ac24d6e6de47e2a7dr.jpg" alt="Patient" referrerPolicy="no-referrer" />
                </div>
                <div className="text-left">
                  <div className="text-[#E6F4F1] font-bold text-xl">10,000+</div>
                  <div className="text-accent-green text-sm font-medium uppercase tracking-wider">Happy Patients</div>
                </div>
              </div>

              {/* Features */}
              <div className="flex flex-wrap justify-center gap-6 lg:gap-10 text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="text-accent-green" size={20} />
                  <span className="font-medium">Board Certified</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="text-accent-green" size={20} />
                  <span className="font-medium">Modern Tech</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="text-accent-green" size={20} />
                  <span className="font-medium">Top Rated Care</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="text-accent-green" size={20} />
                  <span className="font-medium">Pain-Free</span>
                </div>
              </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};



const About = () => {
  return (
    <section id="about" className="py-24 bg-[#E6F4F1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="w-fit mx-auto px-4 py-1.5 rounded-full bg-[#0A1F1C]/90 text-accent-green font-semibold tracking-wider uppercase text-sm mb-4 block text-center">About Us</span>
            <h2 className="text-[40px] md:text-[50px] font-bold font-anton text-slate-900 mb-6 leading-tight text-center">
              Our Dental Clinic
            </h2>
            <p className="text-[20px] font-normal font-poppins text-slate-600 mb-6 leading-relaxed text-justify">
              We are a team of experienced and certified dental professionals dedicated to providing high-quality care in a calm and welcoming environment. Our clinic is equipped with the latest technology to ensure your absolute comfort and safety during every visit.
            </p>
            <p className="text-[20px] font-normal font-poppins text-slate-600 mb-8 leading-relaxed text-justify">
              Our mission is simple — to help you achieve a healthy, confident smile using modern techniques and personalized treatment plans. We believe in building long-lasting relationships with our patients based on trust, transparency, and exceptional results.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center">
                <div className="w-10 h-10 bg-[#0A1F1C] rounded-full flex items-center justify-center text-accent-green mb-3">
                  <ShieldCheck size={20} />
                </div>
                <span className="text-lg font-bold text-[#0A1F1C]">Board Certified</span>
              </div>
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center">
                <div className="w-10 h-10 bg-[#0A1F1C] rounded-full flex items-center justify-center text-accent-green mb-3">
                  <Activity size={20} />
                </div>
                <span className="text-lg font-bold text-[#0A1F1C]">Modern Facility</span>
              </div>
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center">
                <div className="w-10 h-10 bg-[#0A1F1C] rounded-full flex items-center justify-center text-accent-green mb-3">
                  <HeartPulse size={20} />
                </div>
                <span className="text-lg font-bold text-[#0A1F1C]">Patient Care</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative mt-8 lg:mt-0 pb-8 pr-4 sm:pr-8 group"
          >
            <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="https://i.ibb.co/hFSnYfZp/Whisk-f0bbe6edd0837979c724c3ac37b17d5bdr.jpg" 
                alt="Our dental experts" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute bottom-2 right-0 sm:bottom-0 sm:right-0 bg-white p-4 sm:p-6 rounded-2xl shadow-xl max-w-[200px] sm:max-w-xs z-10">
              <div className="flex items-center gap-3 sm:gap-4 mb-1 sm:mb-2">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#0A1F1C] rounded-full flex items-center justify-center text-accent-green shrink-0">
                  <Stethoscope size={20} className="sm:w-6 sm:h-6" />
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-bold text-[#0A1F1C]">15+</p>
                  <p className="text-slate-600 font-poppins text-sm leading-relaxed">Years Experience</p>
                </div>
              </div>
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  const services = [
    { title: 'General Checkups & Cleaning', icon: <ClipboardPlus size={32} className="text-accent-green" />, desc: 'Routine exams and professional cleanings to maintain optimal oral health.' },
    { title: 'Teeth Whitening', icon: <Zap size={32} className="text-accent-green" />, desc: 'Professional whitening treatments for a brighter, more confident smile.' },
    { title: 'Dental Implants', icon: <Layers size={32} className="text-accent-green" />, desc: 'Permanent, natural-looking solutions for missing teeth.' },
    { title: 'Braces & Orthodontics', icon: <SmilePlus size={32} className="text-accent-green" />, desc: 'Straighten your teeth with traditional braces or clear aligners.' },
    { title: 'Cosmetic Dentistry', icon: <Palette size={32} className="text-accent-green" />, desc: 'Veneers, bonding, and complete smile makeovers.' },
    { title: 'Emergency Dental Care', icon: <AlertCircle size={32} className="text-accent-green" />, desc: 'Prompt treatment for dental emergencies and severe pain.' },
  ];

  return (
    <section id="services" className="py-24 bg-[#E6F4F1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="w-fit mx-auto px-4 py-1.5 rounded-full bg-[#0A1F1C]/90 text-accent-green font-semibold tracking-wider uppercase text-sm mb-4 block">Our Services</span>
          <h2 className="text-[40px] md:text-[50px] font-bold font-anton text-slate-900 mb-6 leading-tight">Comprehensive Dental Services</h2>
          <p className="text-[20px] font-normal font-poppins text-slate-600">
            Everything you need for a healthy and beautiful smile, all in one place.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-3xl p-8 border border-slate-100 flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 bg-[#0A1F1C] rounded-2xl flex items-center justify-center text-[#E6F4F1] shadow-sm mb-6">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
              <p className="text-slate-600 leading-relaxed">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const WhyChooseUs = () => {
  const reasons = [
    { title: 'Expert Team', desc: 'Our dentists are leaders in their fields with decades of combined experience.', icon: <Users size={24} /> },
    { title: 'Painless Care', desc: 'We use advanced comfort techniques to ensure a relaxing, pain-free visit.', icon: <Feather size={24} /> },
    { title: 'Affordable', desc: 'Accessible payment plans and transparent pricing for all our treatments.', icon: <CreditCard size={24} /> },
    { title: 'Flexible', desc: 'Convenient evening and weekend slots available to fit your busy schedule.', icon: <CalendarDays size={24} /> }
  ];

  return (
    <section className="py-24 bg-primary text-[#E6F4F1] overflow-hidden relative">
      {/* Abstract Background Elements */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-white/5 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-white/5 blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-stretch">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-accent-green font-semibold tracking-wider uppercase text-sm mb-4 block text-center">Benefits</span>
            <h2 className="text-[40px] md:text-[50px] font-bold font-anton mb-8 leading-tight text-center">
              Why Patients Choose Our Clinic
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {reasons.map((reason, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center h-full"
                >
                  <div className="w-12 h-12 bg-[#0A1F1C] rounded-full flex items-center justify-center text-accent-green mb-4">
                    {reason.icon}
                  </div>
                  <h4 className="text-lg font-bold text-[#0A1F1C] mb-2">{reason.title}</h4>
                  <p className="text-slate-600 font-poppins text-sm leading-relaxed">{reason.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative lg:h-full group"
          >
            <div className="h-full min-h-[400px] lg:min-h-0 rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10">
              <img 
                src="https://i.ibb.co/KcmLs033/Whisk-1a889d50732dbbd815541544e920cabaeg.png" 
                alt="Modern dental clinic interior" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Gallery = () => {
  const results = [
    { image: 'https://i.ibb.co/rGk8Gyn2/Whisk-8170e104207b7f99a8e461b5c4d96975eg.png', label: 'Teeth Whitening' },
    { image: 'https://i.ibb.co/HDkX43Xq/Whisk-6599213630c387a816f41ddc2cd14493eg.png', label: 'Veneers' },
    { image: 'https://i.ibb.co/0RJbq2jK/Whisk-13d931e3b6593b3b2eb4383b57713aaaeg.png', label: 'Invisalign' },
    { image: 'https://i.ibb.co/k2tQ0JrL/Whisk-4abd9c5e5b0cb32b690495c3282ba2e6eg.png', label: 'Dental Implants' },
    { image: 'https://i.ibb.co/q38p9KXJ/Whisk-c5a2a1fe3672277872a47e9a2751177feg.png', label: 'Smile Makeover' },
    { image: 'https://i.ibb.co/S7JXZWMz/Whisk-797975dcd7c76d8a1724eb21fa5fe139eg.png', label: 'Crowns & Bridges' },
  ];

  return (
    <section id="results" className="py-24 bg-[#E6F4F1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="w-fit mx-auto px-4 py-1.5 rounded-full bg-[#0A1F1C]/90 text-accent-green font-semibold tracking-wider uppercase text-sm mb-4 block">Gallery</span>
          <h2 className="text-[40px] md:text-[50px] font-bold font-anton text-slate-900 mb-6">Real Results, Real Smiles</h2>
          <p className="text-[20px] font-normal font-poppins text-slate-600">
            See the transformation and confidence our treatments bring to our patients.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {results.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-3xl overflow-hidden shadow-lg border border-slate-100 relative group cursor-pointer"
            >
              <div className="relative h-[400px] overflow-hidden">
                <img src={item.image} alt={item.label} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
                
                <div className="absolute top-4 left-4 bg-black/50 text-[#E6F4F1] text-xs px-3 py-1.5 rounded-full backdrop-blur-sm font-medium z-30">Before</div>
                <div className="absolute top-4 right-4 bg-primary/80 text-[#E6F4F1] text-xs px-3 py-1.5 rounded-full backdrop-blur-sm font-medium z-30">After</div>

                {/* Gradient Overlay for Text */}
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-20"></div>
                
                {/* Text Content */}
                <div className="absolute bottom-0 left-0 right-0 p-8 text-center z-30">
                  <h3 className="font-bold text-2xl text-[#E6F4F1]">{item.label}</h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const HowItWorks = () => {
  const steps = [
    { num: '1', title: 'Book your appointment', desc: 'Schedule a time that works for you online or over the phone.' },
    { num: '2', title: 'Get a professional consultation', desc: 'Meet with our experts to discuss your goals and oral health.' },
    { num: '3', title: 'Receive personalized treatment', desc: 'Experience comfortable care tailored specifically to your needs.' },
    { num: '4', title: 'Enjoy your confident smile', desc: 'Walk out with a healthier, brighter smile you love to share.' },
  ];

  return (
    <section className="py-24 bg-[#E6F4F1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="w-fit mx-auto px-4 py-1.5 rounded-full bg-[#0A1F1C]/90 text-accent-green font-semibold tracking-wider uppercase text-sm mb-4 block text-center">Our Working Process</span>
          <h2 className="text-[40px] md:text-[50px] font-bold font-anton text-slate-900 mb-6">Simple Steps to Your Perfect Smile</h2>
        </div>

        <div className="grid md:grid-cols-4 gap-8 relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-[#E5E7EB] z-0"></div>

          {steps.map((step, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative z-10 text-center"
            >
              <div className="w-24 h-24 mx-auto bg-[#0A1F1C] border-4 border-primary-light rounded-full flex items-center justify-center mb-6 shadow-xl shadow-primary/5">
                <div className="text-accent-green text-3xl font-bold font-anton">{step.num}</div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
              <p className="text-slate-600">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const reviews = [
    { text: "Amazing experience! The team made me feel comfortable and my smile has never looked better.", author: "Sarah Jenkins", role: "Patient", rating: 5, image: "https://i.ibb.co/JFG07s95/Whisk-64c279d055f8323a1334ec1ee39576b4dr.jpg" },
    { text: "Professional, clean, and very friendly staff. Highly recommended! Best dental care I've received.", author: "Michael Robert", role: "Patient", rating: 5, image: "https://i.ibb.co/sx7Nvqq/Whiskb2d1062c530f0e9ab1448c6c5d4409ccdr.jpg" },
    { text: "I used to fear the dentist, but this clinic changed everything. Pain-free and wonderful results.", author: "Emma Thompson", role: "Patient", rating: 5, image: "https://i.ibb.co/FqBR1QTx/Whisk-4318f6c8f72861f8e2745b673d7cbc12dr.jpg" },
    { text: "The teeth whitening results were immediate and exactly what I wanted for my wedding day.", author: "David Wilson", role: "Patient", rating: 5, image: "https://i.ibb.co/gLxKkcRK/Whiskbed37b1e2c07333b0984c38bac54b52edr.jpg" },
    { text: "State-of-the-art facility with a team that truly cares about your dental health.", author: "Jessica Murphy", role: "Patient", rating: 5, image: "https://i.ibb.co/qLCX86S4/Whisk-24c8387be8588419e0c495c80a98bb57eg.png" }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  return (
    <section id="testimonials" className="py-24 bg-[#E6F4F1] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="w-fit mx-auto px-4 py-1.5 rounded-full bg-[#0A1F1C]/90 text-accent-green font-semibold tracking-wider uppercase text-sm mb-4 block text-center">Reviews</span>
          <h2 className="text-[40px] md:text-[50px] font-bold font-anton text-slate-900 mb-6">What Our Patients Say</h2>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden relative px-4 py-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="bg-white p-8 md:p-14 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100 text-center relative"
              >
                {/* Arrows */}
                <button 
                  onClick={prevSlide}
                  className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-8 h-8 md:w-12 md:h-12 rounded-full bg-[#0A1F1C] flex items-center justify-center text-accent-green hover:bg-[#0A1F1C]/90 transition-colors z-20"
                >
                  <ChevronLeft className="w-4 h-4 md:w-6 md:h-6" />
                </button>
                <button 
                  onClick={nextSlide}
                  className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-8 h-8 md:w-12 md:h-12 rounded-full bg-[#0A1F1C] flex items-center justify-center text-accent-green hover:bg-[#0A1F1C]/90 transition-colors z-20"
                >
                  <ChevronRight className="w-4 h-4 md:w-6 md:h-6" />
                </button>

                <div className="relative z-10 px-6 sm:px-10 md:px-16">
                  <div className="flex justify-center text-[#0A1F1C] mb-8">
                    <Quote size={48} className="fill-current" />
                  </div>
                  <p className="text-slate-600 font-medium italic mb-10 text-lg md:text-xl leading-relaxed">"{reviews[currentIndex].text}"</p>
                  <div className="flex flex-col items-center justify-center gap-4">
                    <div className="w-20 h-20 bg-slate-200 rounded-full overflow-hidden shadow-lg ring-4 ring-slate-50">
                      <img src={reviews[currentIndex].image} alt={reviews[currentIndex].author} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div>
                      <p className="font-bold text-[#0A1F1C] text-xl">{reviews[currentIndex].author}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Slider Controls */}
          <div className="flex justify-center items-center gap-6 mt-4">
            <div className="flex gap-2">
              {reviews.map((_, idx) => (
                <button 
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-3 h-3 rounded-full transition-all ${idx === currentIndex ? 'bg-[#0A1F1C] scale-125' : 'bg-slate-200 hover:bg-[#0A1F1C]/50'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Appointment = () => {
  return (
    <section id="booking" className="py-24 bg-[#E6F4F1] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-primary rounded-[32px] sm:rounded-[40px] shadow-2xl overflow-hidden p-4 sm:p-10 md:p-16 text-[#E6F4F1]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <span className="text-accent-green font-semibold tracking-wider uppercase text-sm mb-4 block text-center">Book an Appointment</span>
            <h2 className="text-[40px] md:text-[50px] font-bold font-anton text-[#E6F4F1] mb-6 leading-tight text-center">
              Ready for your best smile?
            </h2>
            <p className="text-[20px] font-normal font-poppins text-slate-300 mb-8 text-center max-w-3xl mx-auto">
              Take the first step towards a healthier, brighter smile. Choose the most convenient way to reach us and our friendly team will take care of the rest.
            </p>
            <div className="w-full h-px bg-white/20 my-10"></div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
            {/* Card 1: Online Booking Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white text-slate-900 rounded-3xl p-5 sm:p-8 shadow-lg flex flex-col h-full"
            >
               <div className="w-16 h-16 bg-[#0A1F1C] rounded-full flex items-center justify-center mb-6 mx-auto shrink-0">
                 <Calendar className="text-accent-green" size={32} />
               </div>
               <h3 className="text-3xl font-bold font-anton mb-4 text-center">Schedule Online</h3>
               <p className="text-slate-600 font-poppins mb-8 text-center text-lg">Pick a date and time instantly.</p>
               <form className="space-y-4 flex-grow flex flex-col" action="https://formspree.io/f/mwvaqzqe" method="POST">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Booking Name *</label>
                    <input type="text" name="name" required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-[#E6F4F1]" placeholder="Jane Smith" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Phone *</label>
                    <input type="tel" name="phone" required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-[#E6F4F1]" placeholder="(123) 123-1231" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Date *</label>
                      <input type="date" name="date" required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-[#E6F4F1]" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Time *</label>
                      <input type="time" name="time" required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-[#E6F4F1]" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Service *</label>
                    <select name="service" required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-[#E6F4F1]">
                      <option value="">Select a service</option>
                      <option>General Checkups & Cleaning</option>
                      <option>Teeth Whitening</option>
                      <option>Dental Implants</option>
                      <option>Braces & Orthodontics</option>
                      <option>Cosmetic Dentistry</option>
                      <option>Emergency Dental Care</option>
                    </select>
                  </div>
                  <div className="mt-auto pt-4">
                    <button type="submit" className="w-full bg-primary hover:bg-accent-green hover:text-primary hover:-translate-y-1 text-[#E6F4F1] px-4 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg transition-all duration-300 shadow-xl shadow-primary/30 hover:shadow-accent-green/20 flex items-center justify-center gap-2 whitespace-nowrap">
                      Book appointment <ArrowRight size={20} />
                    </button>
                  </div>
               </form>
            </motion.div>

            {/* Card 2: WhatsApp */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white text-slate-900 rounded-3xl p-5 sm:p-8 shadow-lg flex flex-col h-full"
            >
              <div className="w-16 h-16 bg-[#0A1F1C] rounded-full flex items-center justify-center mb-6 mx-auto shrink-0">
                <WhatsAppIcon className="text-accent-green" size={32} />
              </div>
              <h3 className="text-3xl font-bold font-anton mb-4 text-center">Schedule on WhatsApp</h3>
              <p className="text-slate-600 font-poppins mb-8 text-center text-lg">Chat with our reception team.</p>
              <form className="space-y-4 flex-grow flex flex-col" onSubmit={(e) => {
                e.preventDefault();
                window.open('https://wa.me/+2290192206612', '_blank');
              }}>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Booking Name *</label>
                    <input type="text" required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-[#E6F4F1]" placeholder="Jane Smith" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Phone *</label>
                    <input type="tel" required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-[#E6F4F1]" placeholder="(123) 123-1231" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Date *</label>
                      <input type="date" required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-[#E6F4F1]" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Time *</label>
                      <input type="time" required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-[#E6F4F1]" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Service *</label>
                    <select required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-[#E6F4F1]">
                      <option value="">Select a service</option>
                      <option>General Checkups & Cleaning</option>
                      <option>Teeth Whitening</option>
                      <option>Dental Implants</option>
                      <option>Braces & Orthodontics</option>
                      <option>Cosmetic Dentistry</option>
                      <option>Emergency Dental Care</option>
                    </select>
                  </div>
                  <div className="mt-auto pt-4">
                    <button type="submit" className="w-full bg-primary hover:bg-accent-green hover:text-primary hover:-translate-y-1 text-[#E6F4F1] px-4 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg transition-all duration-300 shadow-xl shadow-primary/30 hover:shadow-accent-green/20 flex items-center justify-center gap-2 whitespace-nowrap">
                      Book on WhatsApp <ArrowRight size={20} />
                    </button>
                  </div>
               </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const FAQ = () => {
  const faqs = [
    { q: "What services does VerveDentist offer?", a: "We offer a comprehensive range of dental services including general checkups, teeth whitening, implants, orthodontics, and cosmetic dentistry." },
    { q: "How often should I visit the dentist?", a: "We recommend visiting the dentist every six months for a routine checkup and professional cleaning." },
    { q: "Do dental treatments hurt?", a: "We prioritize your comfort. With modern techniques and anesthetics, most treatments are virtually pain-free." },
    { q: "How do I know which treatment is right for me?", a: "During your initial consultation, our experts will evaluate your oral health and discuss your goals to recommend a personalized treatment plan." },
    { q: "Are cosmetic dental procedures safe?", a: "Yes, when performed by certified professionals, cosmetic procedures like whitening and veneers are completely safe and highly effective." },
    { q: "Do you accept insurance or offer payment plans?", a: "We accept most major dental insurances and offer flexible payment plans to ensure you get the care you need." },
    { q: "How do I book an appointment?", a: "You can easily book an appointment online through our website, via WhatsApp, or by calling our clinic directly." }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-[#E6F4F1]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="text-[40px] md:text-[50px] font-bold font-anton text-slate-900 mb-8 tracking-tight">Frequently Asked Question</h2>
          <p className="text-[20px] font-normal font-poppins text-slate-600">From routine checkups to cosmetic procedures, here's all the information you need before visiting our clinic.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300"
            >
              <button 
                className="w-full px-8 py-6 text-left flex justify-between items-center focus:outline-none"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-semibold text-lg text-slate-900">{faq.q}</span>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${openIndex === index ? 'bg-primary text-[#E6F4F1]' : 'bg-[#0A1F1C] text-accent-green group-hover:bg-accent-green group-hover:text-[#0A1F1C]'}`}>
                  {openIndex === index ? (
                    <ChevronUp size={20} />
                  ) : (
                    <ChevronDown size={20} />
                  )}
                </div>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-8 pb-6 text-slate-600 leading-relaxed">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer id="contact" className="bg-[#0A1F1C] text-[#E6F4F1] pt-24 pb-8 overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Section */}
        <div className="mb-16">
          <div className="mb-16 text-center">
            <h2 className="text-[40px] md:text-[50px] font-bold font-anton tracking-tight mb-8">Contact Us</h2>
            <p className="text-[20px] font-normal font-poppins text-slate-300 max-w-2xl mx-auto">
              We're here to answer any questions you may have. Reach out to us and we'll respond as soon as we can.
            </p>
          </div>
          <div className="flex flex-col md:flex-row justify-between gap-10">
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-8 flex justify-center mt-1"><Clock className="text-accent-green shrink-0" size={24} /></div>
                <p className="text-slate-300 text-[18px] font-normal font-poppins">Monday - Sunday (5am - 6pm)</p>
              </div>
              <div className="flex items-start gap-4 text-slate-300">
                <div className="w-8 flex justify-center mt-1"><MapPin className="text-accent-green shrink-0" size={24} /></div>
                <div>
                  <p className="text-[18px] font-normal font-poppins">123 Medical Plaza, Suite 400</p>
                  <p className="text-[18px] font-normal font-poppins">New York, NY 10001</p>
                </div>
              </div>
            </div>
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-8 flex justify-center mt-1"><Phone className="text-accent-green shrink-0" size={24} /></div>
                <a href="tel:+2290192206612" className="text-slate-300 text-[18px] font-normal font-poppins hover:text-accent-green transition-colors">+229 01 92 20 66 12</a>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 flex justify-center mt-1"><WhatsAppIcon className="text-accent-green shrink-0" size={24} /></div>
                <a href="https://wa.me/+2290192206612" target="_blank" rel="noopener noreferrer" className="text-slate-300 text-[18px] font-normal font-poppins hover:text-accent-green transition-colors">+229 01 92 20 66 12</a>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 flex justify-center mt-1"><Mail className="text-accent-green shrink-0" size={24} /></div>
                <a href="mailto:madudimcjx@gmail.com" className="inline-block text-slate-300 text-[18px] font-normal font-poppins tracking-tight hover:text-accent-green transition-colors">
                  madudimcjx@gmail.com
                </a>
              </div>
            </div>
          </div>
          
          {/* AI Receptionist CTA */}
          <div className="mt-16 flex flex-col items-center text-center space-y-4">
            <p className="text-slate-400 text-lg font-poppins mb-2">Want answers immediately without waiting? Talk to our intelligent receptionist.</p>
            <button 
              onClick={() => window.dispatchEvent(new Event('open-chat'))}
              className="group bg-accent-green text-[#0A1F1C] px-8 py-4 rounded-full font-bold text-[18px] hover:bg-[#86c52a] hover:-translate-y-1 transition-all duration-300 flex items-center gap-3 shadow-lg hover:shadow-accent-green/20"
            >
              <MessageCircle size={24} className="group-hover:scale-110 transition-transform" />
              Chat with AI Receptionist Now
            </button>
          </div>
        </div>

        {/* Full Divider */}
        <div className="w-full h-px bg-white/10 mb-16"></div>

        {/* Middle Section - Links Grid */}
        <div className="flex justify-center mb-24">
          <div className="flex flex-wrap justify-center gap-24 md:gap-48 text-center md:text-left">
            {/* Company */}
            <div>
              <h4 className="text-accent-green mb-6 font-medium">Company</h4>
              <ul className="space-y-4">
                <li><a href="#home" className="hover:text-[#A3E635] transition-colors">Home</a></li>
                <li><a href="#about" className="hover:text-[#A3E635] transition-colors">About Us</a></li>
                <li><a href="#services" className="hover:text-[#A3E635] transition-colors">Services</a></li>
                <li><a href="#results" className="hover:text-[#A3E635] transition-colors">Gallery</a></li>
                <li><a href="#why-choose-us" className="hover:text-[#A3E635] transition-colors">Benefits</a></li>
                <li><a href="#how-it-works" className="hover:text-[#A3E635] transition-colors">Our Working Process</a></li>
                <li><a href="#testimonials" className="hover:text-[#A3E635] transition-colors">Reviews</a></li>
                <li><a href="#booking" className="hover:text-[#A3E635] transition-colors">Book Appointment</a></li>
                <li><a href="#team" className="hover:text-[#A3E635] transition-colors">Meet the Team</a></li>
                <li><a href="#contact" className="hover:text-[#A3E635] transition-colors">Contact Us</a></li>
              </ul>
            </div>

            {/* Socials */}
            <div>
              <h4 className="text-accent-green mb-6 font-medium">Socials</h4>
              <ul className="space-y-4">
                <li><a href="#" className="hover:text-[#A3E635] transition-colors">Instagram</a></li>
                <li><a href="#" className="hover:text-[#A3E635] transition-colors">Linkedin</a></li>
                <li><a href="#" className="hover:text-[#A3E635] transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-[#A3E635] transition-colors">Facebook</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Full Divider */}
        <div className="w-full h-px bg-white/10 mb-12"></div>

        {/* Bottom Section - Massive Logo */}
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-[28vw] md:text-[22vw] leading-none font-bold font-anton tracking-tighter text-[#E6F4F1] text-center w-full select-none">
            Verve
          </h1>
          <p className="text-[#E6F4F1] text-sm mt-8 text-center">
            &copy; {new Date().getFullYear()} VerveDentist Clinic. All rights reserved.
          </p>
          <p className="text-accent-green text-sm mt-2 text-center font-medium">
            Cooked by Digital Chukwudi
          </p>
        </div>

      </div>
    </footer>
  );
};



const Team = () => {
  const team = [
    {
      name: "Dr. Sarah Jenkins",
      role: "Lead Dentist",
      image: "https://i.ibb.co/YFKb18sb/Whisk-1ce7f7cef4d7e80a4fa418388502ae58dr.jpg",
      bio: "With over 15 years of experience, Dr. Jenkins specializes in cosmetic and restorative dentistry, bringing a gentle touch to every procedure."
    },
    {
      name: "Dr. Michael Chen",
      role: "Orthodontist",
      image: "https://i.ibb.co/MTZyB2W/Whisk-7417d91036b9c2bbbab4519acc790aecdr.jpg",
      bio: "Dr. Chen is passionate about creating perfect smiles. He uses the latest clear aligner technology to ensure comfortable and efficient treatment."
    },
    {
      name: "Dr. Emily Davis",
      role: "Pediatric Dentist",
      image: "https://i.ibb.co/NgBDncKs/Whisk-a419f04db94c0dbb45549955dada3009eg.png",
      bio: "Dedicated to children's oral health, Dr. Davis makes every visit fun and educational, ensuring a lifetime of healthy smiles for your little ones."
    }
  ];

  return (
    <section id="team" className="py-24 bg-[#E6F4F1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="w-fit mx-auto px-4 py-1.5 rounded-full bg-[#0A1F1C]/90 text-accent-green font-semibold tracking-wider uppercase text-sm mb-4 block">Our Experts</span>
          <h2 className="text-[40px] md:text-[50px] font-bold font-anton text-slate-900 mb-6">Meet the Team</h2>
          <p className="text-[20px] font-normal font-poppins text-slate-600">
            Get to know our highly skilled and compassionate dental professionals who are dedicated to your smile.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-3xl overflow-hidden shadow-lg border border-slate-100 group"
            >
              <div className="aspect-[3/4] overflow-hidden">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-8 text-center">
                <h3 className="text-2xl font-bold text-slate-900 mb-1">{member.name}</h3>
                <p className="text-accent-green font-semibold mb-4">{member.role}</p>
                <p className="text-slate-600 font-poppins text-sm leading-relaxed">
                  {member.bio}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let timeoutId: number | null = null;
    const toggleVisibility = () => {
      if (timeoutId === null) {
        timeoutId = window.setTimeout(() => {
          setIsVisible(window.scrollY > 800);
          timeoutId = null;
        }, 50);
      }
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
      if (timeoutId !== null) window.clearTimeout(timeoutId);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 p-3 bg-[#0A1F1C] text-accent-green rounded-full shadow-lg hover:bg-[#0A1F1C]/90 hover:-translate-y-1 transition-all duration-300"
          aria-label="Scroll to top"
        >
          <ArrowUp size={24} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

import Chatbot from './Chatbot';

export default function App() {
  return (
    <div className="min-h-screen bg-[#E6F4F1] dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans selection:bg-primary selection:text-[#E6F4F1] transition-colors duration-300">
      <ScrollToTop />
      <Navbar />
      <Chatbot />
      <main>
        <Hero />
        <About />
        <Services />
        <WhyChooseUs />
        <Gallery />
        <HowItWorks />
        <Testimonials />
        <Appointment />
        <Team />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
