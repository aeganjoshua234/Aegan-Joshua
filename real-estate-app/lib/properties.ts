import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDocs, 
  getDoc,
  query,
  where,
  orderBy,
  Timestamp
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from './firebase';
import { Property, PropertyFormData } from '@/types';

export async function createProperty(
  data: PropertyFormData, 
  images: File[], 
  agentId: string, 
  agentName: string
): Promise<string> {
  const imageUrls: string[] = [];
  
  for (const image of images) {
    const imageRef = ref(storage, `properties/${Date.now()}_${image.name}`);
    await uploadBytes(imageRef, image);
    const url = await getDownloadURL(imageRef);
    imageUrls.push(url);
  }
  
  const propertyData = {
    title: data.title,
    description: data.description,
    price: parseFloat(data.price),
    address: data.address,
    city: data.city,
    state: data.state,
    zipCode: data.zipCode,
    propertyType: data.propertyType,
    status: data.status,
    bedrooms: parseInt(data.bedrooms),
    bathrooms: parseFloat(data.bathrooms),
    squareFeet: parseInt(data.squareFeet),
    yearBuilt: data.yearBuilt ? parseInt(data.yearBuilt) : undefined,
    images: imageUrls,
    features: data.features.split(',').map(f => f.trim()).filter(f => f),
    agentId,
    agentName,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  };
  
  const docRef = await addDoc(collection(db, 'properties'), propertyData);
  return docRef.id;
}

export async function updateProperty(
  id: string, 
  data: PropertyFormData, 
  newImages: File[], 
  existingImages: string[]
): Promise<void> {
  const imageUrls = [...existingImages];
  
  for (const image of newImages) {
    const imageRef = ref(storage, `properties/${Date.now()}_${image.name}`);
    await uploadBytes(imageRef, image);
    const url = await getDownloadURL(imageRef);
    imageUrls.push(url);
  }
  
  const propertyData = {
    title: data.title,
    description: data.description,
    price: parseFloat(data.price),
    address: data.address,
    city: data.city,
    state: data.state,
    zipCode: data.zipCode,
    propertyType: data.propertyType,
    status: data.status,
    bedrooms: parseInt(data.bedrooms),
    bathrooms: parseFloat(data.bathrooms),
    squareFeet: parseInt(data.squareFeet),
    yearBuilt: data.yearBuilt ? parseInt(data.yearBuilt) : undefined,
    images: imageUrls,
    features: data.features.split(',').map(f => f.trim()).filter(f => f),
    updatedAt: Timestamp.now(),
  };
  
  await updateDoc(doc(db, 'properties', id), propertyData);
}

export async function deleteProperty(id: string): Promise<void> {
  const propertyDoc = await getDoc(doc(db, 'properties', id));
  
  if (propertyDoc.exists()) {
    const property = propertyDoc.data();
    
    for (const imageUrl of property.images || []) {
      try {
        const imageRef = ref(storage, imageUrl);
        await deleteObject(imageRef);
      } catch (error) {
        console.error('Error deleting image:', error);
      }
    }
  }
  
  await deleteDoc(doc(db, 'properties', id));
}

export async function getProperties(): Promise<Property[]> {
  const q = query(collection(db, 'properties'), orderBy('createdAt', 'desc'));
  const querySnapshot = await getDocs(q);
  
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt?.toDate(),
    updatedAt: doc.data().updatedAt?.toDate(),
  })) as Property[];
}

export async function getProperty(id: string): Promise<Property | null> {
  const docSnap = await getDoc(doc(db, 'properties', id));
  
  if (docSnap.exists()) {
    return {
      id: docSnap.id,
      ...docSnap.data(),
      createdAt: docSnap.data().createdAt?.toDate(),
      updatedAt: docSnap.data().updatedAt?.toDate(),
    } as Property;
  }
  
  return null;
}

export async function getPropertiesByAgent(agentId: string): Promise<Property[]> {
  const q = query(
    collection(db, 'properties'), 
    where('agentId', '==', agentId),
    orderBy('createdAt', 'desc')
  );
  const querySnapshot = await getDocs(q);
  
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt?.toDate(),
    updatedAt: doc.data().updatedAt?.toDate(),
  })) as Property[];
}
