import React from 'react';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

const newsItems = [
  {
    image: 'https://cdn.ca.yapla.com/company/CPYmC5A4aK0NH6iO0MGqD5U/asset/images/module-activite/img-actualite-webi-decouverte.png',
    title: 'Nouveau sur Yapla? Ce webinaire est pour vous!',
    description: 'Nouveau sur Yapla? Ce webinaire est pour vous!',
    link: 'https://app.livestorm.co/yapla/demonstration-yapla-qc',
    linkText: "M'inscrire",
  },
  {
    image: 'https://cdn.ca.yapla.com/company/CPYmC5A4aK0NH6iO0MGqD5U/asset/images/module-activite/img-actu-newsletter.jpg',
    title: '4 formations gratuites pour maîtriser Yapla Infolettres',
    description: '4 formations gratuites pour maîtriser Yapla Infolettres',
    link: 'https://app.livestorm.co/yapla/yapla-infolettres-partie1',
    linkText: "M'inscrire",
  },
  {
    image: 'https://cdn.ca.yapla.com/company/CPYmC5A4aK0NH6iO0MGqD5U/asset/images/module-activite/image-actu-cuy24.png',
    title: 'Conférence Utilisateurs Yapla 2024 le 22 octobre à Montréal!',
    description: 'Découvrez le programme complet de notre conférence annuelle.',
    link: 'https://www.yapla.com/fr-ca/conference-utilisateurs-2024',
    linkText: 'Voir le programme',
  },
];

export const News: React.FC = () => {
  return (
    <div>
      <h2 className="text-lg font-semibold text-content-text-primary-light dark:text-content-text-primary-dark mb-6">
        Latest News
      </h2>
      
      <div className="space-y-4">
        {newsItems.map((item, index) => (
          <a
            key={index}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="
              flex gap-6
              p-4
              bg-white dark:bg-secondary-900/10
              hover:bg-primary-150/10 dark:hover:bg-secondary-900/20
              border border-secondary-200 dark:border-primary-800/30
              rounded-xl
              overflow-hidden
              transition-all duration-200
              group
            "
          >
            <div className="shrink-0 w-36 h-24 overflow-hidden rounded-lg">
              <img 
                src={item.image} 
                alt={item.title}
                className="
                  w-full h-full 
                  object-cover
                  group-hover:scale-105
                  transition-transform duration-300
                "
              />
            </div>
            
            <div className="flex-grow min-w-0">
              <h3 className="
                text-base font-semibold 
                text-content-text-primary-light dark:text-content-text-primary-dark
                mb-1.5
                line-clamp-1
              ">
                {item.title}
              </h3>
              
              <p className="
                text-sm 
                text-content-text-secondary-light dark:text-content-text-secondary-dark
                mb-3
                line-clamp-2
              ">
                {item.description}
              </p>
              
              <div className="
                inline-flex items-center
                text-sm font-medium
                text-primary-600 dark:text-primary-400
                group-hover:text-primary-700 dark:group-hover:text-primary-300
                transition-colors duration-200
              ">
                {item.linkText}
                <ArrowRightIcon className="w-4 h-4 ml-1.5 transition-transform duration-200 group-hover:translate-x-0.5" />
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};
