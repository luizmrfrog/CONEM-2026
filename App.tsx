
import React, { useState, useEffect, useRef } from 'react';
import { 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  ArrowRight, 
  Clock, 
  Award, 
  Users, 
  BookOpen, 
  Download, 
  Send,
  MessageCircle,
  Play,
  FileText,
  Video,
  ChevronRight
} from 'lucide-react';

// --- Custom Hooks ---

const useScrollReveal = () => {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.reveal');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);
};

// --- Components ---

const Reveal: React.FC<{ children: React.ReactNode; className?: string; delay?: number }> = ({ children, className = "", delay = 0 }) => {
  return (
    <div className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
};

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 py-4 ${scrolled ? 'bg-[#002846]/90 backdrop-blur-xl border-b border-[#16607C]/30 py-3' : 'bg-transparent'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center p-1 transition-transform group-hover:rotate-12">
             <span className="text-[#002846] font-bold text-xs">C26</span>
          </div>
          <span className="font-montserrat font-black text-xl tracking-tighter text-white">
            CONEM<span className="text-[#FF9311]">2026</span>
          </span>
        </div>
        <div className="hidden md:flex gap-10 text-[11px] font-bold tracking-[0.2em] uppercase">
          {['visão', 'local', 'inscrição', 'trabalhos'].map((item) => (
            <a 
              key={item} 
              href={`#${item.replace('çã', 'ca')}`} 
              className="relative text-white/70 hover:text-white transition-colors after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[1px] after:bg-[#FF9311] after:transition-all hover:after:w-full"
            >
              {item}
            </a>
          ))}
        </div>
        <button className="bg-[#E23100] text-white px-6 py-2.5 rounded-full text-xs font-black glow-orange transition-all hover:scale-105 hover:bg-[#ff3b00] active:scale-95">
          GARANTIR VAGA
        </button>
      </div>
    </nav>
  );
};

const Countdown: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 45, hours: 12, minutes: 34, seconds: 56 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex gap-4 md:gap-10 justify-center mt-16">
      {[
        { label: 'DIAS', value: timeLeft.days },
        { label: 'HORAS', value: timeLeft.hours },
        { label: 'MINUTOS', value: timeLeft.minutes },
        { label: 'SEGUNDOS', value: timeLeft.seconds }
      ].map((item, idx) => (
        <div key={idx} className="text-center group">
          <div className="text-3xl md:text-6xl font-black text-[#FF9311] text-glow-gold tabular-nums transition-transform group-hover:scale-110 duration-500">
            {String(item.value).padStart(2, '0')}
          </div>
          <div className="text-[10px] md:text-xs text-white/40 font-black tracking-widest mt-2">
            {item.label}
          </div>
        </div>
      ))}
    </div>
  );
};

const WhatsAppButton: React.FC = () => {
  return (
    <a 
      href="https://wa.me/5563992421841" 
      target="_blank" 
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-[100] bg-[#25D366] text-white p-5 rounded-full shadow-[0_10px_40px_rgba(37,211,102,0.4)] transition-all hover:scale-110 active:scale-90 animate-bounce"
    >
      <MessageCircle size={32} />
    </a>
  );
};

const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-[110vh] flex flex-col items-center justify-center pt-24 pb-12 overflow-hidden bg-[#002846]">
      {/* Background Parallax Image */}
      <div className="absolute inset-0 z-0 opacity-25 pointer-events-none scale-110 animate-[pulse_10s_infinite_alternate]">
        <img 
          src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&q=80&w=2000" 
          className="w-full h-full object-cover grayscale mix-blend-overlay"
          alt="Recife Skyline"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#002846] via-transparent to-[#002846]" />
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center max-w-6xl">
        <Reveal>
          <div className="inline-block px-5 py-2 rounded-full border border-[#FF9311]/20 bg-[#FF9311]/5 text-[#FF9311] text-[10px] font-black tracking-[0.3em] mb-10 uppercase">
            Recife • 14 - 16 Agosto 2026
          </div>
        </Reveal>

        <Reveal delay={200}>
          <h1 className="text-5xl md:text-8xl lg:text-9xl font-black text-white leading-[0.9] mb-10 tracking-tighter">
            A REVOLUÇÃO <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF9311] via-white to-[#FF9311] bg-[length:200%_auto] animate-[pulse_5s_infinite]">DA MEDICINA</span>
          </h1>
        </Reveal>

        <Reveal delay={400}>
          <p className="text-lg md:text-2xl text-white/60 max-w-4xl mx-auto mb-14 leading-relaxed font-light">
            O sistema tradicional formou para o passado. O <span className="text-white font-bold">CONEM 2026</span> prepara você para o <span className="text-[#FF9311] font-bold">inédito</span>. Tecnologia, ciência e networking de elite.
          </p>
        </Reveal>

        <Reveal delay={600} className="flex flex-col items-center">
          <button className="group relative bg-[#E23100] text-white px-12 py-6 rounded-2xl text-xl font-black glow-orange animate-pulse-cta transition-all hover:scale-105 active:scale-95 flex items-center gap-4">
            GARANTIR MEU ACESSO
            <ChevronRight className="transition-transform group-hover:translate-x-1" size={24} />
          </button>
          <Countdown />
        </Reveal>
      </div>

      {/* Decorative Floating Elements */}
      <div className="absolute top-1/2 left-10 w-32 h-32 glass-premium rounded-full blur-2xl opacity-20 animate-blob" />
      <div className="absolute top-1/3 right-10 w-48 h-48 bg-[#FF9311]/10 rounded-full blur-3xl opacity-20 animate-blob [animation-delay:2s]" />
    </section>
  );
};

const VisionSection: React.FC = () => {
  return (
    <section id="vision" className="py-32 bg-[#002846] relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <Reveal className="relative">
            <div className="absolute -left-10 top-0 w-2 h-32 bg-gradient-to-b from-[#FF9311] to-transparent shadow-[0_0_20px_rgba(255,147,17,0.3)]" />
            <div className="text-[#16607C] font-black text-xs tracking-[0.4em] uppercase mb-6">
              MANIFESTO DA ELITE MÉDICA
            </div>
            <h2 className="text-4xl md:text-6xl font-black mb-10 leading-[1.1] tracking-tighter">
              NÃO É APENAS UM CONGRESSO. <br />
              <span className="text-[#FF9311]">É O SEU PRÓXIMO NÍVEL.</span>
            </h2>
            <div className="space-y-8 text-white/70 text-lg md:text-xl font-light leading-relaxed">
              <p>
                O mercado não perdoa o básico. Os diplomas de ontem não compram a relevância de amanhã.
              </p>
              <p className="font-medium text-white/90">
                O CONEM 2026 é o portal de quem recusa a mediocridade do sistema tradicional.
              </p>
              <p>
                Saia da sala de aula e entre na arena estratégica. Networking premium e ciência de ponta no ambiente mais sofisticado do Nordeste.
              </p>
              <div className="text-3xl font-black text-white italic pt-6 flex items-center gap-4">
                <div className="w-12 h-[1px] bg-[#FF9311]" />
                O futuro pertence a quem se antecipa.
              </div>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 gap-6 relative">
            <div className="space-y-6 pt-12">
              <Reveal delay={200}>
                <div className="glass-card p-10 rounded-3xl group cursor-pointer">
                   <Clock className="text-[#FF9311] mb-6 group-hover:scale-110 transition-transform" size={40} />
                   <h3 className="font-black text-xl mb-3 uppercase tracking-tight">Visão Elite</h3>
                   <p className="text-sm text-white/50 leading-relaxed">Dominância de mercado e gestão de carreira médica.</p>
                </div>
              </Reveal>
              <Reveal delay={400}>
                <div className="glass-card p-10 rounded-3xl group cursor-pointer">
                   <Award className="text-[#FF9311] mb-6 group-hover:scale-110 transition-transform" size={40} />
                   <h3 className="font-black text-xl mb-3 uppercase tracking-tight">Autoridade</h3>
                   <p className="text-sm text-white/50 leading-relaxed">Chancela para as residências mais disputadas.</p>
                </div>
              </Reveal>
            </div>
            <div className="space-y-6">
              <Reveal delay={300}>
                <div className="glass-card p-10 rounded-3xl group cursor-pointer">
                   <Users className="text-[#FF9311] mb-6 group-hover:scale-110 transition-transform" size={40} />
                   <h3 className="font-black text-xl mb-3 uppercase tracking-tight">Conexões</h3>
                   <p className="text-sm text-white/50 leading-relaxed">Ambiente propício para parcerias de alto valor.</p>
                </div>
              </Reveal>
              <Reveal delay={500}>
                <div className="glass-card p-10 rounded-3xl group cursor-pointer">
                   <BookOpen className="text-[#FF9311] mb-6 group-hover:scale-110 transition-transform" size={40} />
                   <h3 className="font-black text-xl mb-3 uppercase tracking-tight">Inovação</h3>
                   <p className="text-sm text-white/50 leading-relaxed">Prática clínica com o que há de mais moderno.</p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const LocationSection: React.FC = () => {
  return (
    <section id="local" className="relative py-40 bg-[#002846] overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=2000" 
          className="w-full h-full object-cover opacity-20 scale-105 animate-[pulse_15s_infinite]"
          alt="RioMar Recife"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#002846] via-transparent to-[#002846]" />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <Reveal className="text-center mb-20">
          <h2 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter uppercase leading-[0.9]">
            SOFISTICAÇÃO NO <br />
            <span className="text-white/30">CORAÇÃO DE RECIFE</span>
          </h2>
          <p className="text-xl md:text-2xl text-white/70 max-w-4xl mx-auto font-light leading-relaxed">
            Uma experiência imersiva no RioMar Shopping. Onde o aprendizado encontra o máximo conforto e status.
          </p>
        </Reveal>
        
        <Reveal delay={300} className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24 font-black text-2xl md:text-4xl uppercase tracking-tighter">
          <div className="flex flex-col items-center gap-4 group">
            <div className="w-20 h-20 glass-premium rounded-full flex items-center justify-center text-[#E23100] group-hover:scale-110 transition-transform">
               <MapPin size={40} />
            </div>
            <span className="text-white">RioMar Recife</span>
          </div>
          <div className="flex flex-col items-center gap-4 group">
             <div className="w-20 h-20 glass-premium rounded-full flex items-center justify-center text-[#FF9311] group-hover:scale-110 transition-transform">
               <Calendar size={40} />
            </div>
            <span className="text-white">Agosto 2026</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

const OfferSection: React.FC = () => {
  return (
    <section id="oferta" className="py-32 bg-[#002846] relative">
      <div className="container mx-auto px-6 max-w-5xl">
        <Reveal className="text-center mb-20">
          <h2 className="text-4xl md:text-7xl font-black mb-6 uppercase tracking-tighter">SEU PASSAPORTE <span className="text-[#FF9311]">PREMIUM</span></h2>
          <p className="text-white/50 text-xl font-light">Vagas limitadas para o lote inaugural.</p>
        </Reveal>

        <Reveal delay={200}>
          <div className="glass-premium rounded-[60px] p-8 md:p-20 border-white/10 relative overflow-hidden group">
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#FF9311]/10 blur-[120px] rounded-full group-hover:scale-125 transition-transform duration-1000" />
            
            <div className="grid lg:grid-cols-2 gap-16 relative z-10">
              <div className="space-y-10">
                <h3 className="text-3xl font-black uppercase tracking-tight">CONEM FULL PASS</h3>
                <div className="space-y-6">
                  {[
                    "Acesso total aos 3 dias de imersão presencial.",
                    "Certificado com horas de alta relevância acadêmica.",
                    "Entrada no lounge de networking premium."
                  ].map((benefit, i) => (
                    <div key={i} className="flex items-start gap-5 group/item">
                      <div className="w-8 h-8 rounded-full bg-[#FF9311]/20 flex items-center justify-center shrink-0 mt-0.5 group-hover/item:bg-[#FF9311] transition-colors">
                        <CheckCircle2 className="text-[#FF9311] group-hover/item:text-[#002846]" size={20} />
                      </div>
                      <span className="text-lg md:text-xl font-medium text-white/90">{benefit}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-[#E23100]/5 border border-[#E23100]/20 rounded-[32px] p-8 mt-12 backdrop-blur-md">
                   <div className="flex gap-6">
                     <div className="text-4xl animate-bounce">🎁</div>
                     <div>
                       <h4 className="font-black text-[#E23100] text-xl uppercase mb-2">KIT CONGRESSISTA EXCLUSIVO</h4>
                       <p className="text-white/60 text-sm leading-relaxed italic">Válido apenas para este lote: Pasta Executiva + Bloco CONEM + Caneta Premium + Brindes Parceiros.</p>
                     </div>
                   </div>
                </div>
              </div>

              <div className="flex flex-col justify-center items-center text-center p-8 glass-premium rounded-[40px] border-[#FF9311]/10">
                <div className="text-white/40 line-through text-2xl mb-4 font-light">De R$ 497,00 por apenas:</div>
                <div className="text-7xl md:text-9xl font-black text-[#FF9311] mb-6 text-glow-gold tracking-tighter drop-shadow-[0_10px_30px_rgba(255,147,17,0.3)]">
                  R$ 179
                </div>
                <div className="text-white/60 font-bold mb-12 text-lg uppercase tracking-widest italic">Pagamento Único</div>
                
                <button className="w-full bg-[#E23100] hover:bg-[#ff3b00] text-white py-8 rounded-3xl text-2xl font-black transition-all glow-orange animate-pulse-cta uppercase tracking-[0.1em]">
                  QUERO MINHA VAGA AGORA
                </button>
                <div className="mt-8 flex items-center gap-3 text-white/40 text-[10px] font-black uppercase tracking-[0.2em]">
                  <CheckCircle2 size={14} /> AMBIENTE 100% SEGURO & CRIPTOGRAFADO
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

const WorkshopSection: React.FC = () => {
  return (
    <section className="py-32 bg-[#002846] relative">
      <div className="container mx-auto px-6 text-center">
        <Reveal>
          <h2 className="text-4xl md:text-7xl font-black mb-8 uppercase tracking-tighter leading-none">DOMINE A <span className="text-[#16607C]">TÉCNICA</span></h2>
          <p className="text-white/50 text-xl font-light max-w-3xl mx-auto mb-20 leading-relaxed">
            Hands-on de alto padrão. Aprenda com quem está na linha de frente da inovação médica brasileira.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {[
            { label: "GRADE DE HORÁRIOS", icon: <Clock size={24} />, desc: "Confira todas as salas e workshops" },
            { label: "EDITAL DE PRÁTICAS", icon: <FileText size={24} />, desc: "Regras para participação prática" },
            { label: "SUBMETER PROPOSTA", icon: <Send size={24} />, desc: "Envie seu workshop para avaliação" }
          ].map((item, idx) => (
            <Reveal key={idx} delay={idx * 150}>
              <button className="w-full group glass-premium hover:bg-[#16607C]/40 p-12 rounded-[40px] transition-all flex flex-col items-center gap-6 border-transparent hover:border-[#16607C]/50 hover:-translate-y-2">
                <div className="w-16 h-16 bg-[#16607C]/20 rounded-2xl flex items-center justify-center text-white group-hover:bg-[#16607C] group-hover:scale-110 transition-all shadow-xl">
                  {item.icon}
                </div>
                <div className="space-y-2">
                  <h4 className="font-black text-xl uppercase tracking-tight">{item.label}</h4>
                  <p className="text-white/40 text-sm font-medium">{item.desc}</p>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const ScientificSection: React.FC = () => {
  return (
    <section id="trabalhos" className="py-32 bg-[#002846] relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#FF9311]/5 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <Reveal>
            <div className="text-[#E23100] font-black text-xs tracking-[0.4em] uppercase mb-6">CIÊNCIA E RECONHECIMENTO</div>
            <h2 className="text-5xl md:text-7xl font-black mb-10 leading-[1] tracking-tighter uppercase">
              SEU NOME <br />
              <span className="text-[#FF9311]">IMORTALIZADO</span>
            </h2>
            <p className="text-xl text-white/60 mb-10 font-light leading-relaxed">
              Contribua para o avanço da medicina. A submissão de trabalhos no CONEM 2026 é uma vitrine para seu potencial acadêmico.
            </p>
            <div className="inline-flex items-center gap-4 bg-white/5 border border-white/10 px-8 py-4 rounded-2xl mb-16">
              <span className="text-white/40 font-bold uppercase text-sm tracking-widest">Taxa de Submissão</span>
              <span className="text-3xl font-black text-[#FF9311]">R$ 45,00</span>
            </div>

            <div className="space-y-6">
               {[
                 { text: "Edital nº 1 – Abertura e Regras", link: "#" },
                 { text: "Template Oficial de Resumo", link: "#" },
                 { text: "Calendário de Apresentações", link: "#" }
               ].map((item, i) => (
                 <a key={i} href={item.link} className="flex items-center gap-6 text-white/80 hover:text-[#FF9311] transition-all group">
                   <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-[#FF9311] group-hover:text-[#002846] transition-all">
                     <FileText size={20} />
                   </div>
                   <span className="text-lg font-bold uppercase tracking-tight">{item.text}</span>
                 </a>
               ))}
            </div>
          </Reveal>

          <div className="space-y-12">
            {[
              { title: "Submissão Digital", desc: "Processo 100% online através da nossa plataforma científica.", icon: <Send /> },
              { title: "Curadoria de Elite", desc: "Avaliação técnica por mestres e doutores renomados.", icon: <CheckCircle2 /> },
              { title: "Apresentação de Impacto", desc: "Exposição em e-posters de alta definição durante o evento.", icon: <Video /> }
            ].map((step, idx) => (
              <Reveal key={idx} delay={idx * 200} className="flex gap-10 group cursor-default">
                <div className="w-20 h-20 bg-white text-[#002846] rounded-[24px] flex items-center justify-center shrink-0 shadow-[0_15px_30px_rgba(255,255,255,0.1)] group-hover:scale-110 group-hover:rotate-3 transition-all">
                  {React.cloneElement(step.icon as React.ReactElement, { size: 32 })}
                </div>
                <div>
                  <h3 className="text-2xl font-black mb-3 uppercase tracking-tight group-hover:text-[#FF9311] transition-colors">{step.title}</h3>
                  <p className="text-white/50 text-lg leading-relaxed font-light">{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const SocialProofSection: React.FC = () => {
  return (
    <section className="py-32 bg-[#002846] relative">
      <div className="container mx-auto px-6 text-center">
        <Reveal>
          <h2 className="text-4xl md:text-7xl font-black mb-20 uppercase tracking-tighter">VIVÊNCIAS QUE <span className="text-[#FF9311]">TRANSFORMAM</span></h2>
        </Reveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {[1, 2, 3, 4].map((i) => (
            <Reveal key={i} delay={i * 100} className="group relative aspect-[9/16] rounded-[40px] overflow-hidden cursor-pointer shadow-2xl transition-all hover:scale-[1.02]">
              <img 
                src={`https://images.unsplash.com/photo-1559839734-2b71f1e59816?auto=format&fit=crop&q=80&w=800&h=1400&sig=${i}`} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-[50%] group-hover:grayscale-0"
                alt="Testimonial"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-24 h-24 bg-[#FF9311] rounded-full flex items-center justify-center text-[#002846] scale-75 group-hover:scale-100 transition-all duration-500 shadow-[0_0_50px_rgba(255,147,17,0.5)]">
                  <Play size={40} fill="currentColor" />
                </div>
              </div>
              <div className="absolute bottom-10 left-8 text-left transition-transform duration-500 group-hover:-translate-y-2">
                <div className="font-black text-xl uppercase tracking-tighter text-white mb-1">Dr. Thiago Mendes</div>
                <div className="text-[#FF9311] text-xs font-black tracking-widest uppercase">CONEM Class 2024</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const PartnersSection: React.FC = () => {
  return (
    <section className="py-40 relative bg-[#002846]">
      <div className="absolute inset-0 sand-texture pointer-events-none opacity-5" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="space-y-32">
          <Reveal className="text-center">
             <h3 className="text-[#FF9311] font-black tracking-[0.4em] text-xs mb-16 uppercase">REALIZAÇÃO</h3>
             <div className="flex justify-center">
                <div className="w-80 h-32 glass-premium rounded-[32px] flex items-center justify-center border-white/5 transition-all hover:border-[#FF9311]/30">
                   <div className="text-3xl font-black text-white/40 tracking-tighter">LOGO <span className="text-[#FF9311]/40">CONEM</span></div>
                </div>
             </div>
          </Reveal>

          <Reveal delay={200} className="text-center">
             <h3 className="text-[#FF9311] font-black tracking-[0.4em] text-xs mb-16 uppercase">PATROCÍNIO DIAMANTE</h3>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-28 glass-premium rounded-3xl flex items-center justify-center grayscale opacity-40 hover:opacity-100 hover:grayscale-0 transition-all hover:border-[#FF9311]/20">
                    <span className="font-black text-sm tracking-widest text-white/50">SPONSOR {i}</span>
                  </div>
                ))}
             </div>
          </Reveal>

          <Reveal delay={400} className="text-center">
             <h3 className="text-[#FF9311] font-black tracking-[0.4em] text-xs mb-16 uppercase">PARCEIROS ESTRATÉGICOS</h3>
             <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="h-20 glass-premium rounded-2xl flex items-center justify-center grayscale opacity-30 hover:opacity-100 hover:grayscale-0 transition-all">
                    <span className="font-black text-[10px] tracking-widest text-white/40">BRAND {i}</span>
                  </div>
                ))}
             </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#002846] border-t border-white/5 pt-32 pb-12 overflow-hidden relative">
      <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-[#16607C]/5 blur-[200px] rounded-full translate-x-1/2 translate-y-1/2 pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-20 mb-32">
          <div className="space-y-10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center p-1">
                <span className="text-[#002846] font-black text-sm">C26</span>
              </div>
              <span className="font-montserrat font-black text-3xl tracking-tighter text-white">
                CONEM<span className="text-[#FF9311]">2026</span>
              </span>
            </div>
            <p className="text-white/40 text-lg font-light leading-relaxed">
              O futuro da medicina brasileira passa por aqui. Elite, tecnologia e propósito reunidos no maior evento médico do Nordeste.
            </p>
          </div>

          <div>
            <h4 className="text-[#16607C] font-black text-xs tracking-[0.3em] uppercase mb-12">NAVEGAÇÃO ELITE</h4>
            <ul className="space-y-6 font-bold text-white/60">
              <li><a href="#" className="hover:text-[#FF9311] transition-all hover:translate-x-1 inline-block uppercase tracking-tight">O Manifesto</a></li>
              <li><a href="#" className="hover:text-[#FF9311] transition-all hover:translate-x-1 inline-block uppercase tracking-tight">Localização</a></li>
              <li><a href="#" className="hover:text-[#FF9311] transition-all hover:translate-x-1 inline-block uppercase tracking-tight">Grade Científica</a></li>
              <li><a href="#" className="hover:text-[#FF9311] transition-all hover:translate-x-1 inline-block uppercase tracking-tight">Inscrever Trabalho</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[#16607C] font-black text-xs tracking-[0.3em] uppercase mb-12">CONCIERGE</h4>
            <p className="text-white/40 mb-10 text-sm font-medium leading-relaxed">Atendimento personalizado para caravanas, ligas e condições corporativas.</p>
            <div className="space-y-6">
              <div className="flex items-center gap-4 text-white/80 group cursor-pointer hover:text-[#E23100] transition-colors">
                <div className="w-10 h-10 glass-premium rounded-xl flex items-center justify-center group-hover:bg-[#E23100] transition-all">
                   <MessageCircle size={18} />
                </div>
                <span className="font-bold">(63) 99242-1841</span>
              </div>
              <div className="flex items-center gap-4 text-white/80 group cursor-pointer hover:text-[#E23100] transition-colors">
                <div className="w-10 h-10 glass-premium rounded-xl flex items-center justify-center group-hover:bg-[#E23100] transition-all">
                   <Send size={18} />
                </div>
                <span className="font-bold">adm@medassina.com.br</span>
              </div>
            </div>
          </div>

          <div className="space-y-12">
            <h4 className="text-[#16607C] font-black text-xs tracking-[0.3em] uppercase mb-12">Siga o Movimento</h4>
            <div className="flex gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-16 h-16 rounded-[24px] glass-premium flex items-center justify-center hover:bg-white/10 hover:border-[#FF9311]/30 cursor-pointer transition-all hover:-translate-y-2 group">
                   <div className="w-6 h-6 bg-white/20 rounded-md group-hover:bg-[#FF9311] transition-colors" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="text-white/20 text-[10px] font-black tracking-[0.3em] uppercase text-center md:text-left">
            CONEM 2026 • © TODOS OS DIREITOS RESERVADOS. <br className="md:hidden" />
            FEITO PARA A ELITE MÉDICA DO NORDESTE.
          </div>
          <div className="flex gap-10 text-[10px] font-black text-white/40 tracking-[0.2em] uppercase">
            <a href="#" className="hover:text-white transition-colors">POLÍTICAS</a>
            <a href="#" className="hover:text-white transition-colors">TERMOS</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Main App ---

function App() {
  useScrollReveal();

  return (
    <div className="relative min-h-screen bg-[#002846] text-white selection:bg-[#FF9311] selection:text-[#002846]">
      <Navbar />
      
      <main>
        <HeroSection />
        <VisionSection />
        <LocationSection />
        <OfferSection />
        <WorkshopSection />
        <ScientificSection />
        <SocialProofSection />
        <PartnersSection />
      </main>

      <Footer />
      <WhatsAppButton />

      {/* Persistent Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
        <div className="absolute top-1/4 -left-1/4 w-[800px] h-[800px] bg-[#16607C]/10 blur-[180px] rounded-full animate-blob" />
        <div className="absolute bottom-1/4 -right-1/4 w-[800px] h-[800px] bg-[#E23100]/5 blur-[180px] rounded-full animate-blob [animation-delay:4s]" />
      </div>
    </div>
  );
}

export default App;
