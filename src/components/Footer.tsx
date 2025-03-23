
import React from 'react';
import { FooterProps } from '@/types';

const Footer: React.FC<FooterProps> = ({ version = '1.0.0' }) => {
  return (
    <footer className="w-full py-6 mt-auto">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
            <span>&copy; {new Date().getFullYear()}</span>
            <span className="text-primary">•</span>
            <span>Trigeminal Predictor</span>
            <span className="text-primary">•</span>
            <span>v{version}</span>
          </div>
          
          <div className="mt-4 md:mt-0 flex items-center space-x-4">
            <a 
              href="#" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy
            </a>
            <a 
              href="#" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Terms
            </a>
            <a 
              href="#" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              About
            </a>
          </div>
        </div>
        
        <div className="mt-4 text-xs text-center text-muted-foreground">
          <p>This tool is provided for research purposes only and should not be used for clinical diagnosis.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
