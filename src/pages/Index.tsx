
import React, { useState } from 'react';
import { processCSVFile } from '@/utils/csvProcessor';
import { PredictionData } from '@/types';
import { toast } from '@/components/ui/use-toast';

// Import components
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FileUpload from '@/components/FileUpload';
import PredictionResult from '@/components/PredictionResult';

const Index = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<PredictionData | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const handleFileAccepted = async (file: File) => {
    setIsProcessing(true);
    setError(null);
    setResult(null);
    
    try {
      const predictionResult = await processCSVFile(file);
      setResult(predictionResult);
      
      toast({
        title: "Analysis Complete",
        description: "Your file has been successfully processed.",
      });
    } catch (err) {
      console.error("Error processing file:", err);
      setError(err instanceof Error ? err.message : "An unknown error occurred");
      
      toast({
        title: "Processing Error",
        description: err instanceof Error ? err.message : "Failed to process your file",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header title="Trigeminal Neuralgia Predictor" />
      
      <main className="flex-1 container px-4 py-8 mx-auto">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12 text-center">
            <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-4 animate-float">
              Advanced Neural Prediction
            </div>
            <h2 className="text-3xl font-bold mb-4 animate-slide-up">
              Predict Trigeminal Neuralgia from Patient Data
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto animate-fade-in">
              Our machine learning model analyzes patient information to identify patterns 
              associated with Trigeminal Neuralgia, helping with early detection.
            </p>
          </div>
          
          <div className="glass p-8 rounded-xl shadow-sm">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex flex-col justify-center">
                <div className="text-sm font-medium text-muted-foreground mb-2">Step 1</div>
                <h3 className="text-xl font-semibold mb-4">Upload Patient Data</h3>
                <p className="text-muted-foreground text-sm mb-6">
                  Upload a CSV file containing patient information. The file should include relevant 
                  clinical data such as demographics, symptoms, medical history, and diagnostic test results.
                </p>
                <FileUpload 
                  onFileAccepted={handleFileAccepted}
                  isProcessing={isProcessing}
                />
              </div>
              
              <div>
                <div className="text-sm font-medium text-muted-foreground mb-2">Step 2</div>
                <h3 className="text-xl font-semibold mb-4">View Prediction Results</h3>
                
                <PredictionResult 
                  isLoading={isProcessing}
                  result={result}
                  error={error}
                />
                
                {!isProcessing && !result && !error && (
                  <div className="bg-muted/40 rounded-xl p-8 text-center">
                    <div className="w-16 h-16 rounded-full bg-muted/70 mx-auto flex items-center justify-center mb-4">
                      <svg 
                        className="h-8 w-8 text-muted-foreground/70" 
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      >
                        <path d="M2 12h20M12 2v20" />
                      </svg>
                    </div>
                    <h4 className="text-foreground/80 text-lg font-medium mb-2">No Data Uploaded</h4>
                    <p className="text-muted-foreground text-sm">
                      Upload a CSV file to see prediction results here
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="mt-16 grid md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center p-6 rounded-lg animate-fade-in">
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
                <svg 
                  className="h-6 w-6 text-blue-600 dark:text-blue-400" 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2">Patient-Centered</h3>
              <p className="text-sm text-muted-foreground">
                Designed to support early detection and improve patient outcomes through timely intervention.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 rounded-lg animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mb-4">
                <svg 
                  className="h-6 w-6 text-amber-600 dark:text-amber-400" 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M12 2v8" />
                  <path d="m4.93 10.93 1.41 1.41" />
                  <path d="M2 18h2" />
                  <path d="M20 18h2" />
                  <path d="m19.07 10.93-1.41 1.41" />
                  <path d="M22 22H2" />
                  <path d="m16 6-4 4-4-4" />
                  <path d="M16 18a4 4 0 0 0-8 0" />
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2">Data-Driven</h3>
              <p className="text-sm text-muted-foreground">
                Leverages advanced machine learning to identify patterns in patient data that may indicate Trigeminal Neuralgia.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 rounded-lg animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mb-4">
                <svg 
                  className="h-6 w-6 text-emerald-600 dark:text-emerald-400" 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2">Privacy-Focused</h3>
              <p className="text-sm text-muted-foreground">
                All processing happens locally in your browser, ensuring your sensitive patient data never leaves your computer.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
