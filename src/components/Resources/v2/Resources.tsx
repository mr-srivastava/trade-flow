import React from 'react';
import { BookOpen, FileText, Video, Download } from 'lucide-react';

interface Resource {
  icon: JSX.Element;
  title: string;
  description: string;
  link: string;
}

const resources: Resource[] = [
  {
    icon: <BookOpen className='h-6 w-6' />,
    title: 'Industry Reports',
    description: 'In-depth analysis of chemical industry trends',
    link: '#',
  },
  {
    icon: <FileText className='h-6 w-6' />,
    title: 'Whitepapers',
    description: 'Expert insights on supply chain optimization',
    link: '#',
  },
  {
    icon: <Video className='h-6 w-6' />,
    title: 'Webinars',
    description: 'Interactive sessions with industry experts',
    link: '#',
  },
  {
    icon: <Download className='h-6 w-6' />,
    title: 'Case Studies',
    description: 'Real-world success stories from our clients',
    link: '#',
  },
];

const ResourcesSection: React.FC = () => {
  return (
    <section id='resources' className='py-16 bg-gradient-to-b from-syntara-darker to-syntara-dark'>
      <div className='section-container'>
        <div className='text-center mb-12'>
          <h2 className='text-2xl md:text-3xl font-bold mb-4 text-white'>Educational Resources</h2>
          <p className='text-syntara-light/80 max-w-2xl mx-auto'>
            Explore our knowledge base to stay updated with industry trends and best practices
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
          {resources.map((resource, index) => (
            <a
              href={resource.link}
              key={index}
              className='glass-card p-6 text-center hover:bg-syntara-primary/5 transition-all duration-300'
            >
              <div className='inline-flex items-center justify-center w-12 h-12 rounded-full bg-syntara-primary/10 text-syntara-primary mb-4'>
                {resource.icon}
              </div>
              <h3 className='text-lg font-medium mb-2 text-white'>{resource.title}</h3>
              <p className='text-sm text-syntara-light/80'>{resource.description}</p>
            </a>
          ))}
        </div>

        <div className='mt-12 text-center'>
          <a href='#' className='btn-outline'>
            Browse All Resources
          </a>
        </div>
      </div>
    </section>
  );
};

export default ResourcesSection;
