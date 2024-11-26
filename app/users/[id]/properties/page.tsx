"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface PropertyItem {
  address: string;
  yearOfConstruction: number;
  propertyType: string;
}

const PropertiesPage = () => {
  const params = useParams();
  const userId = params?.id;

  const [properties, setProperties] = useState<PropertyItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) return;

    const fetchProperties = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch all properties tied to the user ID
        const response = await fetch(`https://localhost:7118/api/PropertyItem/${userId}`);

        if (!response.ok) {
          throw new Error(`Error ${response.status}: Failed to fetch properties`);
        }

        const data: PropertyItem[] = await response.json();
        setProperties(data);
      } catch (err: any) {
        setError(err.message || "An error occurred while fetching properties.");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [userId]);

  if (loading) return <p>Loading properties...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>User Properties</h1>
      {properties.length > 0 ? (
        <ul>
          {properties.map((property, index) => (
            <li key={index} style={{ marginBottom: "20px", textAlign: "left" }}>
              <strong>Address:</strong> {property.address} <br />
              <strong>Year of Construction:</strong> {property.yearOfConstruction} <br />
              <strong>Property Type:</strong> {property.propertyType}
            </li>
          ))}
        </ul>
      ) : (
        <p>No properties found for this user.</p>
      )}
    </div>
  );
};

export default PropertiesPage;