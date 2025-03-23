
import React, { useCallback, useState } from 'react';
import { FileUploadProps } from '@/types';
import { validateCSVFile } from '@/utils/csvProcessor';
import { toast } from '@/components/ui/use-toast';

const FileUpload: React.FC<FileUploadProps> = ({ onFileAccepted, isProcessing }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer) {
      e.dataTransfer.dropEffect = 'copy';
    }
  }, []);

  const processFile = useCallback((file: File) => {
    if (!validateCSVFile(file)) {
      toast({
        title: "Invalid file",
        description: "Please upload a valid CSV file under 5MB",
        variant: "destructive"
      });
      return;
    }

    setFileName(file.name);
    onFileAccepted(file);
  }, [onFileAccepted]);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      processFile(file);
    }
  }, [processFile]);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      processFile(file);
    }
  }, [processFile]);

  return (
    <div className="w-full max-w-md mx-auto animate-fade-in">
      <div 
        className={`relative flex flex-col items-center justify-center p-12 border-2 border-dashed rounded-xl transition-all duration-300 ease-in-out
          ${isDragging ? 'file-drop-active border-primary/80 bg-primary/5' : 'border-muted-foreground/25 hover:border-primary/40 bg-background'}
          ${isProcessing ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <input 
          type="file" 
          id="file-upload" 
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
          onChange={handleFileChange}
          accept=".csv"
          disabled={isProcessing}
        />
        
        <div className="mb-4 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
          {isProcessing ? (
            <svg 
              className="animate-spin h-8 w-8 text-primary" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24"
            >
              <circle 
                className="opacity-25" 
                cx="12" 
                cy="12" 
                r="10" 
                stroke="currentColor" 
                strokeWidth="4"
              ></circle>
              <path 
                className="opacity-75" 
                fill="currentColor" 
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          ) : (
            <svg 
              className="h-8 w-8 text-primary"
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
          )}
        </div>
        
        {fileName ? (
          <div className="text-center">
            <p className="text-sm font-medium">{fileName}</p>
            <p className="text-xs text-muted-foreground mt-1">
              {isProcessing ? 'Processing...' : 'File uploaded. Drop another to replace.'}
            </p>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-sm font-medium">Drop your CSV file here</p>
            <p className="text-xs text-muted-foreground mt-1">or click to browse</p>
          </div>
        )}
        
        <div className="mt-6 px-3 py-1 rounded-full bg-secondary flex items-center justify-center">
          <span className="text-xs text-muted-foreground">only .csv files up to 5MB</span>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
