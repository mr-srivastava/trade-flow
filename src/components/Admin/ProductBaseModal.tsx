'use client';

import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Edit, Save, X, Loader2, Plus } from 'lucide-react';
import { Toaster } from 'sonner';

interface ProductBaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'view' | 'edit' | 'new';
  isLoading?: boolean;
  onSave?: (formData: unknown) => void;
  onEdit?: () => void;
  isSaving?: boolean;
  children: React.ReactNode;
  title?: string;
}

export default function ProductBaseModal({
  isOpen,
  onClose,
  mode,
  isLoading = false,
  onSave,
  onEdit,
  isSaving = false,
  children,
  title,
}: ProductBaseModalProps) {
  const getModalTitle = () => {
    if (title) return title;
    switch (mode) {
      case 'new':
        return 'New Product';
      case 'edit':
        return 'Edit Product';
      default:
        return 'Product Details';
    }
  };

  const getIcon = () => {
    switch (mode) {
      case 'new':
        return <Plus className="h-5 w-5" />;
      case 'edit':
        return <Save className="h-5 w-5" />;
      default:
        return <Edit className="h-4 w-4" />;
    }
  };

  const handleAction = () => {
    if (mode === 'view' && onEdit) {
      onEdit();
    } else if ((mode === 'edit' || mode === 'new') && onSave) {
      onSave({});
    }
  };

  const getActionText = () => {
    switch (mode) {
      case 'new':
        return 'Create';
      case 'edit':
        return 'Save';
      default:
        return 'Edit';
    }
  };

  return (
    <>
      <Toaster position="bottom-right" richColors />
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent side="right" className="w-full sm:max-w-2xl lg:max-w-4xl overflow-y-auto">
          <SheetHeader>
            <div className="flex items-center gap-4">
              <SheetTitle className="text-2xl font-bold text-blue-600">
                {getModalTitle()}
              </SheetTitle>
              {!isLoading && (
                <div className="flex gap-2">
                  {mode === 'edit' || mode === 'new' ? (
                    <>
                      <Button onClick={handleAction} size="sm" disabled={isSaving}>
                        {isSaving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : getIcon()}
                        {isSaving && mode === 'edit' ? 'Saving...' : getActionText()}
                      </Button>
                      <Button onClick={onClose} variant="outline" size="sm" disabled={isSaving}>
                        <X className="h-4 w-4 mr-2" />
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <Button onClick={handleAction} variant="outline" size="sm">
                      {getIcon()}
                      {getActionText()}
                    </Button>
                  )}
                </div>
              )}
            </div>
          </SheetHeader>

          {isLoading ? (
            <div className="mt-6 flex flex-col items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
              <p className="text-sm text-muted-foreground">Loading product details...</p>
            </div>
          ) : (
            <div className="mt-6">{children}</div>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}
