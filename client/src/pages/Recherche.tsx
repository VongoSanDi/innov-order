import React, { useState, useCallback } from "react";
import VerticalTable from "@/components/VerticalTable";
import { Button, TextField } from "@mui/material";
import { getFoodFacts } from "@/apis/foodFacts";
import { FrontendProductData } from "@/types/index";
import { useError } from "@/context/ErrorContext";

const Recherche: React.FC = () => {
  const { setError } = useError()
  const [query, setQuery] = useState<string>("");
  const [products, setProducts] = useState<FrontendProductData[]>([]);

  const handleSearch = useCallback(async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setError(null);

    if (!query.trim()) {
      setError("Please enter a barcode to search");
      return;
    }

    try {
      const result = await getFoodFacts(query);

      if (result && typeof result === 'object') {
        const newProduct: FrontendProductData = {
          ...result
        };

        setProducts(prevProducts => {
          const updatedProducts = [...prevProducts, newProduct];
          return updatedProducts;
        });

        setQuery(""); // Réinitialiser le champ de recherche
      } else {
        setError("Format de données incorrect ou produit non trouvé");
      }
    } catch (error) {
      setError("Une erreur est survenue lors de la recherche");
    }
  }, [query]);

  const handleRemoveProduct = useCallback((index: number) => {
    setProducts(prevProducts => {
      const updatedProducts = prevProducts.filter((_, i) => i !== index);
      return updatedProducts;
    });
  }, []);

  return (
    <>
      <div className="recherche-container">
        <TextField
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          label="Search"
          variant="outlined"
        />
        <Button onClick={handleSearch} variant="contained" color="primary">
          Find and add to display
        </Button>
      </div>
      <div>
        <VerticalTable
          data={products}
          onRemoveProduct={handleRemoveProduct}
        />
      </div>
    </>
  );
};

export default Recherche;
