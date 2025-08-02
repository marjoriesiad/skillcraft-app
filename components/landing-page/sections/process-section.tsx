'use client';

import { User, Target, GitBranch } from 'lucide-react';
import {steps} from '@/data/home-data'

const iconMap: Record<string, React.ElementType> = {
  User,
  Target,
  GitBranch,
};

const ProcessSection = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24" id="process-section">
      {/* Header */}
      <div className="text-center mb-20">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
          Comment ça marche
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-terra-primary to-terra-secondary mx-auto mb-8"></div>
        <p className="text-slate-400 text-xl max-w-2xl mx-auto font-light">
          Trois étapes simples pour transformer votre apprentissage
        </p>
      </div>

      {/* Steps */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-20">
        {steps.map((step, index) => {
          const Icon = iconMap[step.icon];

          return (
            <div key={index} className="group text-center">
              {/* Number */}
              <div className="text-6xl md:text-7xl font-light text-terra-primary/20 mb-6 group-hover:text-terra-primary/40 transition-colors duration-500">
                {step.number}
              </div>

              {/* Icon */}
              <div className="w-12 h-12 mx-auto mb-8 text-terra-primary group-hover:scale-110 group-hover:text-terra-secondary transition-all duration-300">
                {Icon && <Icon className="w-full h-full" strokeWidth={1.5} />}
              </div>

              {/* Content */}
              <div className="space-y-4">
                <h3 className="text-xl md:text-2xl font-semibold text-white group-hover:text-terra-primary transition-colors duration-300">
                  {step.title}
                </h3>

                <p className="text-slate-400 text-base leading-relaxed font-light max-w-sm mx-auto group-hover:text-slate-300 transition-colors duration-300">
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProcessSection;