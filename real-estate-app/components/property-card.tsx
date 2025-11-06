import Link from 'next/link';
import { Property } from '@/types';

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
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
    <Link href={`/properties/${property.id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer">
        <div className="relative h-48 bg-gray-200">
          {property.images && property.images.length > 0 ? (
            <img
              src={property.images[0]}
              alt={property.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              No Image
            </div>
          )}
          <div className="absolute top-2 right-2">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[property.status]}`}>
              {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
            </span>
          </div>
        </div>

        <div className="p-4">
          <h3 className="text-xl font-bold text-gray-900 mb-2">{property.title}</h3>
          <p className="text-2xl font-bold text-blue-600 mb-2">{formatPrice(property.price)}</p>
          
          <p className="text-gray-600 text-sm mb-3">
            {property.address}, {property.city}, {property.state} {property.zipCode}
          </p>

          <div className="flex items-center justify-between text-sm text-gray-600 border-t pt-3">
            <div className="flex items-center space-x-4">
              <span>{property.bedrooms} Beds</span>
              <span>{property.bathrooms} Baths</span>
              <span>{property.squareFeet.toLocaleString()} sqft</span>
            </div>
          </div>

          <div className="mt-3 text-xs text-gray-500">
            Agent: {property.agentName}
          </div>
        </div>
      </div>
    </Link>
  );
}
