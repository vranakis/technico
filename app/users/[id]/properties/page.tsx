"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import PropertyCard from "@/components/PropertyCard";

interface PropertyItem {
  id: string;
  address: string;
  yearOfConstruction: number;
  propertyType: string;
}

const PropertiesPage = () => {
  const params = useParams();
  const router = useRouter();
  const id = params?.id;

  const [properties, setProperties] = useState<PropertyItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchProperties = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`https://localhost:7118/api/PropertyItem/${id}`);

        if (!response.ok) {
          throw new Error(`Error ${response.status}: Failed to fetch properties`);
        }

        const data = await response.json();
        setProperties(data);
      } catch (err: any) {
        setError(err.message || "An error occurred while fetching properties.");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [id]);

  const handleDelete = async (propertyId: string) => {
    try {
      const response = await fetch(`https://localhost:7118/api/PropertyItem/${propertyId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: Failed to delete property`);
      }

      setProperties((prev) => prev.filter((property) => property.id !== propertyId));
    } catch (err: any) {
      console.error("Error deleting property:", err.message);
      setError(err.message || "An error occurred while deleting the property.");
    }
  };

  if (loading) return <p>Loading properties...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold text-center mb-6">User Properties</h1>
      <div className="flex flex-col items-center mb-6">
        <Link href={`/users/${id}/properties/add-property`} className="btn btn-primary">
          Add New Property
        </Link>
      </div>
      {properties.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {properties.map((property) => (
            <PropertyCard
              key={property.id}
              id={property.id}
              address={property.address}
              yearOfConstruction={property.yearOfConstruction}
              propertyType={property.propertyType}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <p className="text-center">No properties found for this user.</p>
      )}
    </div>
  );
};

export default PropertiesPage;