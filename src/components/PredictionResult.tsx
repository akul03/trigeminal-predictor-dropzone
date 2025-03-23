
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PredictionResultProps, FactorData } from '@/types';
import { Progress } from '@/components/ui/progress';

const PredictionResult: React.FC<PredictionResultProps> = ({ isLoading, result, error }) => {
  if (isLoading) {
    return (
      <Card className="w-full max-w-md mx-auto mt-8 animate-pulse-gentle">
        <CardHeader>
          <CardTitle className="text-center">Analyzing data...</CardTitle>
          <CardDescription className="text-center">
            Our model is processing your patient data
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <div className="w-full h-6 bg-muted rounded-full mb-6"></div>
          <div className="w-full space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center space-x-2">
                <div className="w-24 h-4 bg-muted rounded"></div>
                <div className="flex-1 h-2 bg-muted rounded-full"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full max-w-md mx-auto mt-8 border-destructive/50 animate-scale">
        <CardHeader>
          <CardTitle className="text-center text-destructive">Error</CardTitle>
          <CardDescription className="text-center">
            We encountered an issue processing your file
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center text-sm text-muted-foreground">{error}</p>
          <div className="mt-4 flex justify-center">
            <button 
              className="px-4 py-2 text-sm bg-muted rounded-md hover:bg-secondary transition-colors"
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!result) {
    return null;
  }

  const getPredictionColor = (prediction: string) => {
    return prediction === 'Positive' 
      ? 'text-blue-600 dark:text-blue-400' 
      : 'text-emerald-600 dark:text-emerald-400';
  };

  const getProbabilityColor = (probability: number) => {
    if (probability > 0.7) return 'text-red-600 dark:text-red-400';
    if (probability > 0.3) return 'text-amber-600 dark:text-amber-400';
    return 'text-emerald-600 dark:text-emerald-400';
  };

  const FactorBar: React.FC<{ factor: FactorData }> = ({ factor }) => {
    const percentage = Math.round(factor.weight * 100);
    
    return (
      <div className="mb-4">
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium">{factor.name}</span>
          <span className="text-sm text-muted-foreground">{factor.value}</span>
        </div>
        <div className="flex items-center">
          <Progress className="h-2 flex-1" value={percentage} />
          <span className="ml-2 text-xs text-muted-foreground w-10 text-right">{percentage}%</span>
        </div>
      </div>
    );
  };

  return (
    <Card className="w-full max-w-md mx-auto mt-8 prediction-appear">
      <CardHeader>
        <div className="flex items-center justify-center mb-2">
          <div className={`text-xs px-2 py-0.5 rounded-full ${
            result.prediction === 'Positive' 
              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' 
              : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300'
          }`}>
            {result.prediction === 'Positive' ? 'Risk Detected' : 'Low Risk'}
          </div>
        </div>
        <CardTitle className="text-center">Prediction Result</CardTitle>
        <CardDescription className="text-center">
          Analysis completed with {(result.confidenceScore * 100).toFixed(1)}% confidence
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6 text-center">
          <div className="text-sm text-muted-foreground mb-2">Probability of Trigeminal Neuralgia</div>
          <div className={`text-4xl font-semibold ${getProbabilityColor(result.probability)}`}>
            {(result.probability * 100).toFixed(1)}%
          </div>
          <div className={`text-sm font-medium mt-1 ${getPredictionColor(result.prediction)}`}>
            {result.prediction === 'Positive' 
              ? 'Indicators suggest possible condition' 
              : 'Indicators suggest unlikely condition'}
          </div>
        </div>
        
        <div className="mt-6">
          <h3 className="text-sm font-medium mb-3">Contributing Factors</h3>
          <div className="space-y-2">
            {result.factors.map((factor, index) => (
              <FactorBar key={index} factor={factor} />
            ))}
          </div>
        </div>
        
        <div className="mt-8 pt-4 border-t text-center">
          <p className="text-xs text-muted-foreground">
            This prediction is based on statistical analysis and should be reviewed by a healthcare professional.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PredictionResult;
