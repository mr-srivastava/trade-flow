import React from 'react';
import { Shield, Globe, Award, Users } from 'lucide-react';

const AboutSection: React.FC = () => {
  const values = [
    {
      icon: <Shield className='h-6 w-6 text-syntara-primary' />,
      title: 'Compliance',
      description: 'We adhere to stringent USP and international standards',
    },
    {
      icon: <Globe className='h-6 w-6 text-syntara-primary' />,
      title: 'Global Reach',
      description: 'Operations spanning across major markets worldwide',
    },
    {
      icon: <Award className='h-6 w-6 text-syntara-primary' />,
      title: 'Quality',
      description: 'Unwavering commitment to quality in every transaction',
    },
    {
      icon: <Users className='h-6 w-6 text-syntara-primary' />,
      title: 'Partnerships',
      description: 'Building lasting relationships with industry leaders',
    },
  ];

  return (
    <section id='about' className='py-16'>
      <div className='section-container'>
        <div className='glass-card p-8 md:p-12'>
          <h2 className='text-2xl md:text-3xl font-bold mb-8 text-white'>
            About Us <span className='text-syntara-light/70 text-xl'>/Section for USP</span>
          </h2>

          <div className='grid grid-cols-1 lg:grid-cols-5 gap-8'>
            <div className='lg:col-span-3'>
              <p className='text-syntara-light mb-6 leading-relaxed'>
                Syntara is a leading global platform for chemical and pharmaceutical trading,
                connecting manufacturers, suppliers, and buyers across the world. We leverage
                cutting-edge technology to streamline operations and reduce costs while ensuring
                compliance with international standards.
              </p>
              <p className='text-syntara-light mb-6 leading-relaxed'>
                Our platform integrates AI-driven analytics, secure blockchain transactions, and
                real-time market data to provide unparalleled insights and efficiency in the
                chemical trading industry.
              </p>
              <p className='text-syntara-light mb-6 leading-relaxed'>
                With a global network spanning over 65 countries, we facilitate seamless trade
                operations while ensuring regulatory compliance and quality assurance at every step.
              </p>

              <div className='flex flex-col sm:flex-row gap-4 mt-8'>
                <a href='#capabilities' className='btn-primary'>
                  Our Capabilities
                </a>
                <a href='#partners' className='btn-outline'>
                  Our Partners
                </a>
              </div>
            </div>

            <div className='lg:col-span-2 bg-syntara-darker rounded-lg p-6 border border-border/30'>
              <h3 className='text-xl font-medium mb-6 text-white'>Our Core Values</h3>
              <div className='space-y-6'>
                {values.map((value, index) => (
                  <div key={index} className='flex gap-4'>
                    <div className='flex-shrink-0 bg-secondary/50 p-3 rounded-full'>
                      {value.icon}
                    </div>
                    <div>
                      <h4 className='font-medium text-white'>{value.title}</h4>
                      <p className='text-sm text-syntara-light/80'>{value.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
