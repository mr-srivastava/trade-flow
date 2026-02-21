'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2 } from 'lucide-react';

// Type definitions for form fields
interface KeyValueField {
  id: string;
  key: string;
  value: string;
}

interface FAQField {
  id: string;
  question: string;
  answer: string;
}

// Dynamic Key-Value Field Component
interface DynamicKeyValueFieldsProps {
  fields: KeyValueField[];
  append: (value: { key: string; value: string }) => void;
  remove: (index: number) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors: any;
  name: string;
  keyLabel?: string;
  keyPlaceholder?: string;
  valuePlaceholder?: string;
  emptyMessage?: string;
}

export function DynamicKeyValueFields({
  fields,
  append,
  remove,
  register,
  errors,
  name,
  keyLabel = 'Key',
  keyPlaceholder = 'Enter key',
  valuePlaceholder = 'Enter value',
  emptyMessage = 'No entries yet',
}: DynamicKeyValueFieldsProps) {
  // Helper function to safely get error messages
  const getErrorMessage = (fieldPath: string) => {
    try {
      const pathParts = fieldPath.split('.');
      let current = errors;
      for (const part of pathParts) {
        if (current && current[part]) {
          current = current[part];
        } else {
          return null;
        }
      }
      return current?.message || null;
    } catch {
      return null;
    }
  };

  const hasError = (fieldPath: string) => {
    return !!getErrorMessage(fieldPath);
  };

  return (
    <div className="space-y-3">
      {fields.length === 0 && (
        <p className="text-sm text-muted-foreground italic text-center py-4">{emptyMessage}</p>
      )}

      {fields.map((field, index) => (
        <div key={field.id} className="flex gap-2 items-start">
          <div className="flex-1">
            <Input
              {...register(`${name}.${index}.key`)}
              placeholder={keyPlaceholder}
              className={hasError(`${name}.${index}.key`) ? 'border-red-500' : ''}
            />
            {getErrorMessage(`${name}.${index}.key`) && (
              <p className="text-sm text-red-500 mt-1">{getErrorMessage(`${name}.${index}.key`)}</p>
            )}
          </div>
          <div className="flex-1">
            <Input
              {...register(`${name}.${index}.value`)}
              placeholder={valuePlaceholder}
              className={hasError(`${name}.${index}.value`) ? 'border-red-500' : ''}
            />
            {getErrorMessage(`${name}.${index}.value`) && (
              <p className="text-sm text-red-500 mt-1">
                {getErrorMessage(`${name}.${index}.value`)}
              </p>
            )}
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => remove(index)}
            className="mt-0"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}

      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => append({ key: '', value: '' })}
        className="w-full"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add {keyLabel}
      </Button>
    </div>
  );
}

// Dynamic FAQ Field Component
interface DynamicFAQFieldsProps {
  fields: FAQField[];
  append: (value: { question: string; answer: string }) => void;
  remove: (index: number) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors: any;
  name: string;
}

export function DynamicFAQFields({
  fields,
  append,
  remove,
  register,
  errors,
  name,
}: DynamicFAQFieldsProps) {
  // Helper function to safely get error messages
  const getErrorMessage = (fieldPath: string) => {
    try {
      const pathParts = fieldPath.split('.');
      let current = errors;
      for (const part of pathParts) {
        if (current && current[part]) {
          current = current[part];
        } else {
          return null;
        }
      }
      return current?.message || null;
    } catch {
      return null;
    }
  };

  const hasError = (fieldPath: string) => {
    return !!getErrorMessage(fieldPath);
  };

  return (
    <div className="space-y-4">
      {fields.length === 0 && (
        <p className="text-sm text-muted-foreground italic text-center py-4">No FAQs yet</p>
      )}

      {fields.map((field, index) => (
        <div key={field.id} className="border rounded-lg p-4 space-y-3 bg-muted/20">
          <div className="flex justify-between items-center">
            <h4 className="font-medium text-sm">FAQ {index + 1}</h4>
            <Button type="button" variant="outline" size="sm" onClick={() => remove(index)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          <div>
            <Input
              {...register(`${name}.${index}.question`)}
              placeholder="Enter question"
              className={hasError(`${name}.${index}.question`) ? 'border-red-500' : ''}
            />
            {getErrorMessage(`${name}.${index}.question`) && (
              <p className="text-sm text-red-500 mt-1">
                {getErrorMessage(`${name}.${index}.question`)}
              </p>
            )}
          </div>
          <div>
            <Textarea
              {...register(`${name}.${index}.answer`)}
              placeholder="Enter answer"
              className={`min-h-[80px] ${
                hasError(`${name}.${index}.answer`) ? 'border-red-500' : ''
              }`}
            />
            {getErrorMessage(`${name}.${index}.answer`) && (
              <p className="text-sm text-red-500 mt-1">
                {getErrorMessage(`${name}.${index}.answer`)}
              </p>
            )}
          </div>
        </div>
      ))}

      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => append({ question: '', answer: '' })}
        className="w-full"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add FAQ
      </Button>
    </div>
  );
}

// Read-only display components for view mode
interface KeyValueDisplayProps {
  items: Array<{ key: string; value: string }>;
  emptyMessage?: string;
  variant?: 'default' | 'safety' | 'application';
}

export function KeyValueDisplay({
  items,
  emptyMessage = 'No entries',
  variant = 'default',
}: KeyValueDisplayProps) {
  if (!items || items.length === 0) {
    return <p className="text-sm text-muted-foreground italic text-center py-4">{emptyMessage}</p>;
  }

  const getVariantClasses = () => {
    switch (variant) {
      case 'safety':
        return 'bg-destructive/5 border border-destructive/20';
      case 'application':
        return 'bg-primary/5 border border-primary/20';
      default:
        return 'bg-muted/50';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {items.map((item, index) => (
        <div key={index} className={`text-sm p-2 rounded ${getVariantClasses()}`}>
          <span className="font-medium text-foreground">{item.key}:</span>{' '}
          <span className="text-muted-foreground">{item.value}</span>
        </div>
      ))}
    </div>
  );
}

interface FAQDisplayProps {
  items: Array<{ question: string; answer: string }>;
}

export function FAQDisplay({ items }: FAQDisplayProps) {
  if (!items || items.length === 0) {
    return (
      <p className="text-sm text-muted-foreground italic text-center py-4">No FAQs available</p>
    );
  }

  return (
    <div className="space-y-4">
      {items.map((faq, index) => (
        <div key={index} className="p-3 bg-muted/30 rounded-lg">
          <p className="font-medium text-foreground mb-2">{faq.question}</p>
          <p className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
        </div>
      ))}
    </div>
  );
}
