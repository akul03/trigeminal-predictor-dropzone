
import { PredictionData } from "@/types";

/**
 * Processes a CSV file and performs analysis to predict Trigeminal Neuralgia
 * Note: This is a mock implementation that would be replaced with actual ML logic
 */
export const processCSVFile = async (file: File): Promise<PredictionData> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      try {
        // This is a mock implementation - in production, this would call an API
        // or use a trained model to analyze the CSV data
        const csvData = event.target?.result as string;
        const result = mockAnalyzeCSV(csvData);
        
        // Add artificial delay to simulate processing
        setTimeout(() => {
          resolve(result);
        }, 2000);
      } catch (error) {
        reject(new Error("Failed to process the CSV file. Please check the format."));
      }
    };
    
    reader.onerror = () => {
      reject(new Error("Failed to read the file. Please try again."));
    };
    
    reader.readAsText(file);
  });
};

/**
 * Mock implementation of CSV analysis
 * This would be replaced with actual machine learning algorithm in production
 */
const mockAnalyzeCSV = (csvData: string): PredictionData => {
  // Split CSV into lines and check if it has content
  const lines = csvData.split('\n').filter(line => line.trim().length > 0);
  
  if (lines.length < 2) {
    throw new Error("CSV file does not contain enough data");
  }
  
  // For this mock implementation, we'll generate random prediction results
  // In a real app, this would be based on trained ML models
  const probability = Math.random();
  const threshold = 0.5;
  
  return {
    probability: parseFloat(probability.toFixed(4)),
    prediction: probability > threshold ? 'Positive' : 'Negative',
    confidenceScore: parseFloat((0.5 + Math.random() * 0.5).toFixed(4)),
    factors: [
      {
        name: "Age",
        weight: parseFloat((Math.random() * 0.3).toFixed(2)),
        value: "45-60"
      },
      {
        name: "Gender",
        weight: parseFloat((Math.random() * 0.2).toFixed(2)),
        value: "Female"
      },
      {
        name: "Family History",
        weight: parseFloat((Math.random() * 0.25).toFixed(2)),
        value: "Positive"
      },
      {
        name: "Pain Intensity",
        weight: parseFloat((Math.random() * 0.4).toFixed(2)),
        value: 8.5
      },
      {
        name: "Pain Duration",
        weight: parseFloat((Math.random() * 0.35).toFixed(2)),
        value: "3-6 months"
      }
    ]
  };
};

/**
 * Validates a file to ensure it's a proper CSV
 */
export const validateCSVFile = (file: File): boolean => {
  // Check file type
  if (!file.name.endsWith('.csv')) {
    return false;
  }
  
  // Check file size (limit to 5MB for example)
  const maxSize = 5 * 1024 * 1024; // 5MB
  if (file.size > maxSize) {
    return false;
  }
  
  return true;
};
