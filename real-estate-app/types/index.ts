export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  propertyType: 'house' | 'apartment' | 'condo' | 'land' | 'commercial';
  status: 'available' | 'sold' | 'pending' | 'rented';
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  yearBuilt?: number;
  images: string[];
  features: string[];
  agentId: string;
  agentName: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  email: string;
  displayName: string;
  role: 'admin' | 'agent' | 'client';
  photoURL?: string;
  phone?: string;
  createdAt: Date;
}

export interface PropertyFormData {
  title: string;
  description: string;
  price: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  propertyType: 'house' | 'apartment' | 'condo' | 'land' | 'commercial';
  status: 'available' | 'sold' | 'pending' | 'rented';
  bedrooms: string;
  bathrooms: string;
  squareFeet: string;
  yearBuilt?: string;
  features: string;
}
