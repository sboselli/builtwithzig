import { Project } from '../types/project';
import { useNavigate } from 'react-router-dom';

interface CardProps {
  project: Project;
}

export function ProjectCard({ project }: CardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/project/${project.id}`);
  };

  const renderLogo = () => {
    if (typeof project.logo === 'string') {
      // Check if the logo URL is valid
      if (!project.logo || project.logo.includes('undefined') || project.logo.includes('null')) {
        // Fallback to initials if URL is invalid
        return (
          <div 
            className="w-12 h-12 rounded-lg flex items-center justify-center text-white text-base font-medium bg-gray-400"
          >
            {project.name.split(' ').map(word => word[0]).join('').slice(0, 2).toUpperCase()}
          </div>
        );
      }
      // Valid URL logo
      return (
        <div className="w-12 h-12 rounded-lg overflow-hidden flex items-center justify-center bg-gray-100 p-1.5">
          <img 
            src={project.logo} 
            alt={project.name} 
            className="w-full h-full object-contain" 
            onError={(e) => {
              // Fallback to initials if image fails to load
              e.currentTarget.style.display = 'none';
              e.currentTarget.parentElement!.innerHTML = project.name
                .split(' ')
                .map(word => word[0])
                .join('')
                .slice(0, 2)
                .toUpperCase();
              e.currentTarget.parentElement!.classList.add('text-white', 'text-base', 'font-medium', 'bg-gray-400');
            }}
          />
        </div>
      );
    }

    // Initials logo
    return (
      <div 
        className="w-12 h-12 rounded-lg flex items-center justify-center text-white text-base font-medium"
        style={{ backgroundColor: project.logo?.color || '#9CA3AF' }}
      >
        {project.logo?.initials || project.name.split(' ').map(word => word[0]).join('').slice(0, 2).toUpperCase()}
      </div>
    );
  };

  return (
    <div 
      onClick={handleClick}
      className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow cursor-pointer"
    >
      <div className="flex items-start">
        <div className="flex items-center gap-4">
          {renderLogo()}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 dark:text-white">{project.name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">{project.description}</p>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {project.category.map((cat) => (
          <span 
            key={cat}
            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
          >
            {cat}
          </span>
        ))}
        {project.isOpenSource && (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
            Open Source
          </span>
        )}
      </div>
    </div>
  );
}