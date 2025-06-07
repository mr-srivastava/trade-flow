import React from 'react';

interface ErrorDisplayProps {
  message: string;
}

export default function ErrorDisplay({ message }: ErrorDisplayProps) {
  return <div className="text-red-600 text-center py-4">{message}</div>;
}
