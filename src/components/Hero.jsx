import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Award } from 'lucide-react';
import { ScrollReveal } from './animations/ScrollReveal';
import { ParallaxContainer } from './animations/ParallaxContainer';
import { ImageReveal } from './animations/ImageReveal';
import { RippleButton } from './animations/RippleButton';

export const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-cream-50 pt-8 pb-16 lg:py-20 border-b border-champagne-300/40">
      
      {/* Scroll Parallax Background Glow */}
      <ParallaxContainer offset={60} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-champagne-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cream-200/40 rounded-full blur-3xl" />
      </ParallaxContainer>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Text & CTA */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            
            <ScrollReveal direction="down" delay={0.1}>
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-cream-100 border border-champagne-400/40 text-champagne-600 text-xs font-bold uppercase tracking-[0.25em]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Spring / Summer 2026 Couture</span>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.2}>
              <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-bold text-noir-900 tracking-tight leading-[1.05]">
                The Art of <br />
                <span className="font-heading italic font-bold text-gold-gradient">
                  Timeless Elegance
                </span>
              </h1>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.3}>
              <p className="text-base sm:text-lg text-noir-600 max-w-xl mx-auto lg:mx-0 font-sans leading-relaxed tracking-wide">
                Impeccable French tailoring, 100% Mongolian cashmere, and handcrafted Italian leather. Designed in Paris for the discerning collector.
              </p>
            </ScrollReveal>

            {/* Ripple Buttons */}
            <ScrollReveal direction="up" delay={0.4}>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link to="/shop">
                  <RippleButton className="w-full sm:w-auto px-9 py-4 bg-noir-900 hover:bg-champagne-600 text-cream-50 font-bold text-xs uppercase tracking-[0.25em] rounded-full shadow-luxury transition-all duration-300 hover:scale-[1.03] flex items-center justify-center gap-3 group">
                    <span>Discover Collection</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </RippleButton>
                </Link>

                <Link to="/shop?category=Haute%20Couture">
                  <RippleButton className="w-full sm:w-auto px-8 py-4 bg-transparent hover:bg-cream-100 text-noir-900 font-bold text-xs uppercase tracking-[0.25em] rounded-full border border-noir-900/30 transition-all text-center">
                    Atelier Lookbook
                  </RippleButton>
                </Link>
              </div>
            </ScrollReveal>

            {/* Accolades Bar */}
            <ScrollReveal direction="up" delay={0.5}>
              <div className="pt-8 border-t border-champagne-300/40 grid grid-cols-3 gap-4 text-center lg:text-left">
                <div>
                  <p className="font-heading text-2xl font-bold text-noir-900">100%</p>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-champagne-600 mt-0.5">
                    Natural Silk & Cashmere
                  </p>
                </div>
                <div>
                  <p className="font-heading text-2xl font-bold text-noir-900">PARIS</p>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-champagne-600 mt-0.5">
                    Haute Couture Studio
                  </p>
                </div>
                <div>
                  <p className="font-heading text-2xl font-bold text-noir-900">FREE</p>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-champagne-600 mt-0.5">
                    Worldwide Shipping
                  </p>
                </div>
              </div>
            </ScrollReveal>

          </div>

          {/* Right Column: Image Reveal Showcase */}
          <div className="lg:col-span-5 relative">
            <ScrollReveal direction="left" delay={0.3}>
              <div className="relative mx-auto max-w-md lg:max-w-none">
                
                {/* Image Reveal with Curtain Mask */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-champagne-300/60 bg-cream-100 group">
                  <ImageReveal
                    src="https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=1000&q=80"
                    alt="Le Manteau Cashmere Trench"
                    className="h-[460px] sm:h-[540px]"
                    imgClassName="object-top transform group-hover:scale-105 transition-transform duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-noir-950/70 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Floating Image Label */}
                  <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl glass-noir text-white flex items-center justify-between">
                    <div>
                      <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-champagne-400">
                        Look No. 01
                      </span>
                      <h3 className="font-heading text-lg font-bold text-cream-50 mt-0.5">
                        Le Manteau Cashmere Trench
                      </h3>
                    </div>
                    <span className="font-heading text-base font-bold text-champagne-400">
                      $1,850
                    </span>
                  </div>
                </div>

                {/* Floating Quality Badge */}
                <div className="absolute -bottom-6 -left-6 px-5 py-3.5 bg-white rounded-2xl shadow-luxury border border-champagne-200 flex items-center gap-3 hidden sm:flex z-20">
                  <div className="w-10 h-10 rounded-full bg-champagne-100 text-champagne-600 flex items-center justify-center">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-noir-500 font-bold uppercase tracking-wider">Craftsmanship</p>
                    <p className="text-xs font-bold text-noir-900">Loro Piana Certified</p>
                  </div>
                </div>

              </div>
            </ScrollReveal>
          </div>

        </div>
      </div>
    </section>
  );
};
