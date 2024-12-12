"use client";

import { useState, useEffect } from "react";
import { PropertyItem } from "@/types/Properties";
import Link from "next/link";
import { AuthProvider, useAuth } from '../../components/AuthContext';
import PropertyCard from "@/app/components/PropertyCard";
import ModalComponent from "@/app/components/modal";

const Properties = () => {
  const [properties, setProperties] = useState<PropertyItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const {isAdmin} = useAuth();


  useEffect(() => {
    fetchProperties();
  }, [isAdmin]);  


  const fetchProperties = async () => {
    if (!isAdmin){
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const res = await fetch("https://localhost:7118/api/PropertyItem", {
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch users data");
      }

      const data: PropertyItem[] = await res.json();
      setProperties(data);
    } catch (err: any) {
      setError(err.message || "An error occurred while fetching users.");
    } finally {
      setLoading(false);
    }  
  };


  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`https://localhost:7118/api/PropertyItem?propertyItemId=${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete user.");
      }

      // Remove the user from the local state after successful deletion
      setProperties((prevUsers) => prevUsers.filter((user) => user.id !== id));
    } catch (err: any) {
      setError(err.message || "An error occurred while deleting the user.");
    }
  };


  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (<>    
    {isAdmin ? <>
      <div className="my-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {properties.map((property) => (
          <PropertyCard key={property.id} id={property.id} address={property.address} yearOfConstruction={property.yearOfConsruction} propertyType={property.propertyType} userId={property.ownerId} onDelete={handleDelete} />
        ))}
      </div>
      <div className="flex flex-col items-center">
       <ModalComponent />
      
      </div>
      
    </>: <p className="p-3 mt-6 text-lg/8 text-gray-600">You are not authorized to view this content. <br />Log in as admin and try again.</p>}
    
      </>
  );
};

export default Properties;