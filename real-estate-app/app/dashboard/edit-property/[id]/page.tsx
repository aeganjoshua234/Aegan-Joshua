'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { useRouter, useParams } from 'next/navigation';
import PropertyForm from '@/components/property-form';
import { getProperty, updateProperty } from '@/lib/properties';
import { PropertyFormData, Property } from '@/types';
import toast from 'react-hot-toast';

export default function EditPropertyPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && (!user || (user.role !== 'agent' && user.role !== 'admin'))) {
      router.push('/dashboard');
    } else if (user) {
      loadProperty();
    }
  }, [user, authLoading, params.id]);

  const loadProperty = async () => {
    try {
      const data = await getProperty(params.id as string);
      if (!data) {
        toast.error('Property not found');
        router.push('/dashboard');
        return;
      }
      
      if (user?.role !== 'admin' && data.agentId !== user?.id) {
        toast.error('You do not have permission to edit this property');
        router.push('/dashboard');
        return;
      }
      
      setProperty(data);
    } catch (error) {
      console.error('Error loading property:', error);
      toast.error('Failed to load property');
      router.push('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (data: PropertyFormData, newImages: File[]) => {
    if (!property) return;

    try {
      await updateProperty(property.id, data, newImages, property.images);
      toast.success('Property updated successfully!');
      router.push('/dashboard');
    } catch (error: any) {
      console.error('Error updating property:', error);
      toast.error(error.message || 'Failed to update property');
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user || !property) {
    return null;
  }

  const initialData: PropertyFormData = {
    title: property.title,
    description: property.description,
    price: property.price.toString(),
    address: property.address,
    city: property.city,
    state: property.state,
    zipCode: property.zipCode,
    propertyType: property.propertyType,
    status: property.status,
    bedrooms: property.bedrooms.toString(),
    bathrooms: property.bathrooms.toString(),
    squareFeet: property.squareFeet.toString(),
    yearBuilt: property.yearBuilt?.toString() || '',
    features: property.features.join(', '),
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <button
          onClick={() => router.back()}
          className="text-blue-600 hover:text-blue-700 mb-4"
        >
          ← Back to Dashboard
        </button>
        <h1 className="text-4xl font-bold text-gray-900">Edit Property</h1>
      </div>

      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Current Images</h3>
          <div className="grid grid-cols-3 gap-4">
            {property.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Property ${index + 1}`}
                className="w-full h-32 object-cover rounded-lg"
              />
            ))}
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Upload new images to add them to the property (existing images will be kept)
          </p>
        </div>

        <PropertyForm
          initialData={initialData}
          onSubmit={handleSubmit}
          submitLabel="Update Property"
        />
      </div>
    </div>
  );
}
