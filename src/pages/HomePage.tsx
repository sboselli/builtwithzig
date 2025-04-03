import { useState } from 'react';
import { Header } from '../components/Header';
import { ProjectCard } from '../components/ProjectCard';
import { projects, categories } from '../data/projects';

export function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredProjects = projects.filter(project => {
    const matchesCategory = !selectedCategory || project.category.includes(selectedCategory);
    const matchesSearch = !searchTerm || 
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Header onSearch={setSearchTerm} />
      
      <main className="max-w-7xl mx-auto py-8">
        <div className="text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            Discover Amazing Projects{' '}
            <span className="inline-block bg-blue-600 text-white dark:bg-blue-500 dark:text-white px-2 py-1 rounded transform rotate-2">
              Built with Zig
            </span>
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Explore our curated collection of projects built with Zig.
          </p>
        </div>

        {/* Category Filter - Changed to wrap on mobile */}
        <div className="flex flex-wrap gap-2 py-4 px-4 sm:px-6 lg:px-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category === selectedCategory ? null : category)}
              className={`
                px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors
                ${selectedCategory === category 
                  ? 'bg-black dark:bg-white text-white dark:text-black' 
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}
              `}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-6 px-4 sm:px-6 lg:px-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </main>
    </div>
  );
}