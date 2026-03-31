'use client';

import { motion } from 'framer-motion';
import {
  Sunrise,
  Bus,
  Flower2,
  Search,
  Sparkles,
  MessageSquareHeart,
  Gem,
  HeartHandshake
} from 'lucide-react';

const timeline = [
  {
    time: '7:00 AM',
    title: 'Wake up and get ready',
    description: 'Starting the most important day with a clear heart and mind.',
    icon: Sunrise,
    color: 'text-orange-400',
  },
  {
    time: '8:00 AM',
    title: 'Public transport to Keukenhof',
    description: 'A scenic journey through the Dutch countryside.',
    icon: Bus,
    color: 'text-blue-400',
  },
  {
    time: '9:00 AM',
    title: 'Reach Keukenhof Gardens',
    description: 'Arriving at the world\'s most beautiful spring garden.',
    icon: Flower2,
    color: 'text-pink-500',
  },
  {
    time: '9:30 AM',
    title: 'Bring her to a secluded corner',
    description: 'Finding a quiet, magical spot amidst the blooming tulips.',
    icon: Search,
    color: 'text-green-500',
  },
  {
    time: '9:45 AM',
    title: 'Surprise her with a pack of Pokémon cards',
    description: 'A playful moment before the big surprise.',
    icon: Sparkles,
    color: 'text-yellow-500',
  },
  {
    time: '9:47 AM',
    title: 'Proposal speech to her',
    description: 'Speaking from the heart, sharing our journey and my love.',
    icon: MessageSquareHeart,
    color: 'text-red-400',
  },
  {
    time: '9:48 AM',
    title: 'Drop a knee and ask THE QUESTION',
    description: 'The moment that changes everything.',
    icon: Gem,
    color: 'text-[#d4af37]',
  },
  {
    time: '9:50 AM',
    title: 'Hope and pray that she says YES!',
    description: 'Beginning our forever together.',
    icon: HeartHandshake,
    color: 'text-red-600',
  },
];

export default function ThePlan() {
  return (
    <section id="the-plan" className="py-24 px-6 bg-white relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-pink-50 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-50 rounded-full mix-blend-multiply filter blur-3xl opacity-30 translate-x-1/3 translate-y-1/3" />

      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-[#e63946] mb-4">
            The Plan
          </h2>
          <div className="w-24 h-1 bg-[#d4af37] mx-auto mb-6" />
          <p className="text-gray-600 font-sans italic tracking-wide">
            A timeline of our beautiful morning in the gardens.
          </p>
        </motion.div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-100 -translate-x-1/2 hidden md:block" />

          <div className="space-y-12">
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                className={`relative flex items-center justify-between md:justify-normal gap-8 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                {/* Timeline Point */}
                <div className="absolute left-4 md:left-1/2 w-8 h-8 bg-white border-2 border-[#d4af37] rounded-full -translate-x-1/2 z-10 hidden md:flex items-center justify-center">
                  <div className="w-2 h-2 bg-[#d4af37] rounded-full" />
                </div>

                {/* Content Card */}
                <div className={`w-full md:w-[45%] p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300`}>
                  <div className="flex items-center gap-4 mb-3">
                    <div className={`p-2 rounded-lg bg-gray-50 ${item.color}`}>
                      <item.icon size={24} />
                    </div>
                    <div>
                      <span className="text-sm font-bold text-[#d4af37] font-sans">
                        {item.time}
                      </span>
                      <h3 className="text-lg font-serif font-bold text-gray-800">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 font-sans leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Empty space for the other side on desktop */}
                <div className="hidden md:block w-[45%]" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
