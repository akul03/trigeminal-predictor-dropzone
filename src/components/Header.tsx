
import React from 'react';
import { HeaderProps } from '@/types';

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className="w-full py-6 animate-slide-down">
      <div className="container px-4 mx-auto flex flex-col items-center justify-center">
        <div className="flex items-center justify-center mb-2">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 text-primary animate-pulse-gentle" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          <h1 className="text-2xl font-semibold ml-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
            {title}
          </h1>
        </div>
        <p className="text-sm text-muted-foreground max-w-md text-center">
          Upload your patient data in CSV format to predict the likelihood of Trigeminal Neuralgia
        </p>
      </div>
    </header>
  );
};

export default Header;
