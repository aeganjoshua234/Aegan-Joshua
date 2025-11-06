'use client';

import { useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import PropertyForm from '@/components/property-form';
import { createProperty } from '@/lib/properties';
import { PropertyFormData } from '@/types';
import toast from 'react-hot-toast';

export default function AddPropertyPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || (user.role !== 'agent' && user.role !== 'admin'))) {
      router.push('/dashboard');
    }
  }, [user, loading]);

  const handleSubmit = async (data: PropertyFormData, images: File[]) => {
    if (!user) return;

    try {
      await createProperty(data, images, user.id, user.displayName);
      toast.success('Property created successfully!');
      router.push('/dashboard');
    } catch (error: any) {
      console.error('Error creating property:', error);
      toast.error(error.message || 'Failed to create property');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user || (user.role !== 'agent' && user.role !== 'admin')) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <button
          onClick={() => router.back()}
          className="text-blue-600 hover:text-blue-700 mb-4"
        >
          ← Back to Dashboard
        </button>
        <h1 className="text-4xl font-bold text-gray-900">Add New Property</h1>
      </div>

      <div className="bg-white rounded-lg shadow-md p-8">
        <PropertyForm onSubmit={handleSubmit} submitLabel="Create Property" />
      </div>
    </div>
  );
}
