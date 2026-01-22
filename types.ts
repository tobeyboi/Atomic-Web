import React from 'react';

export interface GeneratedHabit {
  habits: string[];
  treeDescription: string;
  advice: string;
}

export interface FeatureCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
}