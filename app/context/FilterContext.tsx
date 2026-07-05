"use client";

import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from "react";

type FiltersState = {
  location?: string;
  form?: string;
  engine?: string;
  transmission?: string;
};

interface FilterContextType {
  queryFilters: FiltersState;
  setQueryFilters: Dispatch<SetStateAction<FiltersState>>;
}

const FilterContext = createContext<FilterContextType | null>(null);

export function FilterProvider({ children }: { children: ReactNode }) {
  const [queryFilters, setQueryFilters] = useState<FiltersState>({});

  return (
    <FilterContext.Provider value={{ queryFilters, setQueryFilters }}>
      {children}
    </FilterContext.Provider>
  );
}

export const useFilters = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilters must be used within a FilterProvider");
  }
  return context;
};