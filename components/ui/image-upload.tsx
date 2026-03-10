'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Button } from './button';

interface ImageUploadProps {
  value?: string[];
  onChange?: (urls: string[]) => void;
  maxImages?: number;
  className?: string;
}

export function ImageUpload({ value = [], onChange, maxImages = 5, className }: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFiles = (files: File[]) => {
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    const remainingSlots = maxImages - value.length;
    const filesToProcess = imageFiles.slice(0, remainingSlots);

    filesToProcess.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          onChange?.([...value, e.target.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const removeImage = (index: number) => {
    const newValue = value.filter((_, i) => i !== index);
    onChange?.(newValue);
  };

  return (
    <div className={className}>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={cn(
          'border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors',
          isDragging 
            ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20' 
            : 'border-gray-300 dark:border-gray-600 hover:border-emerald-400',
          value.length >= maxImages && 'opacity-50 cursor-not-allowed'
        )}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleInputChange}
          className="hidden"
          disabled={value.length >= maxImages}
        />
        <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <p className="text-gray-600 dark:text-gray-300">
          Click to upload or drag and drop
        </p>
        <p className="text-sm text-gray-400 mt-1">
          PNG, JPG up to 10MB ({value.length}/{maxImages})
        </p>
      </div>

      {value.length > 0 && (
        <div className="mt-4 grid grid-cols-4 gap-4">
          {value.map((url, index) => (
            <div key={index} className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 group">
              <Image
                src={url}
                alt={`Upload ${index + 1}`}
                fill
                className="object-cover"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

interface SingleImageUploadProps {
  value?: string;
  onChange?: (url: string) => void;
  className?: string;
}

export function SingleImageUpload({ value, onChange, className }: SingleImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file?.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onChange?.(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onChange?.(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  if (value) {
    return (
      <div className={cn('relative aspect-square rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 group', className)}>
        <Image
          src={value}
          alt="Uploaded image"
          fill
          className="object-cover"
        />
        <button
          type="button"
          onClick={() => onChange?.('')}
          className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-xl"
        >
          ×
        </button>
      </div>
    );
  }

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      className={cn(
        'border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors aspect-square',
        isDragging 
          ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20' 
          : 'border-gray-300 dark:border-gray-600 hover:border-emerald-400',
        className
      )}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleInputChange}
        className="hidden"
      />
      <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
      <p className="text-gray-600 dark:text-gray-300">
        Click or drag to upload
      </p>
    </div>
  );
}
