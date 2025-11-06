'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getProperty } from '@/lib/properties';
import { Property } from '@/types';

export default function PropertyDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    loadProperty();
  }, [params.id]);

  const loadProperty = async () => {
    try {
      const data = await getProperty(params.id as string);
      setProperty(data);
    } catch (error) {
      console.error('Error loading property:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Property not found</h2>
          <button
            onClick={() => router.push('/properties')}
            className="text-blue-600 hover:text-blue-700"
          >
            Back to properties
          </button>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const statusColors = {
    available: 'bg-green-100 text-green-800',
    sold: 'bg-red-100 text-red-800',
    pending: 'bg-yellow-100 text-yellow-800',
    rented: 'bg-blue-100 text-blue-800',
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={() => router.back()}
        className="mb-6 text-blue-600 hover:text-blue-700 flex items-center"
      >
        ← Back
      </button>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="relative h-96 bg-gray-200">
          {property.images && property.images.length > 0 ? (
            <>
              <img
                src={property.images[currentImageIndex]}
                alt={property.title}
                className="w-full h-full object-cover"
              />
              {property.images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {property.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-3 h-3 rounded-full ${
                        index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              No Image Available
            </div>
          )}
          <div className="absolute top-4 right-4">
            <span className={`px-4 py-2 rounded-full text-sm font-semibold ${statusColors[property.status]}`}>
              {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
            </span>
          </div>
        </div>

        <div className="p-8">
          <div className="mb-6">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">{property.title}</h1>
            <p className="text-3xl font-bold text-blue-600 mb-4">{formatPrice(property.price)}</p>
            <p className="text-gray-600 text-lg">
              {property.address}, {property.city}, {property.state} {property.zipCode}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 p-6 bg-gray-50 rounded-lg">
            <div>
              <p className="text-gray-600 text-sm">Bedrooms</p>
              <p className="text-2xl font-bold text-gray-900">{property.bedrooms}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Bathrooms</p>
              <p className="text-2xl font-bold text-gray-900">{property.bathrooms}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Square Feet</p>
              <p className="text-2xl font-bold text-gray-900">{property.squareFeet.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Property Type</p>
              <p className="text-2xl font-bold text-gray-900 capitalize">{property.propertyType}</p>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
            <p className="text-gray-700 leading-relaxed">{property.description}</p>
          </div>

          {property.features && property.features.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Features</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {property.features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {property.yearBuilt && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Year Built</h2>
              <p className="text-gray-700">{property.yearBuilt}</p>
            </div>
          )}

          <div className="border-t pt-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Contact Agent</h2>
            <p className="text-gray-700">
              <span className="font-semibold">{property.agentName}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
