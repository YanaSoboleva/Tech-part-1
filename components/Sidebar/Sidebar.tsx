"use client";

import { FormEvent, useState } from "react";
import Image from 'next/image';
import { useFilters } from "@/app/context/FilterContext";
import styles from "../Sidebar/Sidebar.module.css";

const FILTER_CONFIG = [
  { id: 'form', title: 'Camper form', options: [['alcove', 'Alcove'], ['panel_van', 'Panel Van'], ['integrated', 'Integrated'], ['semi_integrated', 'Semi Integrated']] },
  { id: 'engine', title: 'Engine', options: [['diesel', 'Diesel'], ['petrol', 'Petrol'], ['hybrid', 'Hybrid'], ['electric', 'Electric']] },
  { id: 'transmission', title: 'Transmission', options: [['automatic', 'Automatic'], ['manual', 'Manual']] },
] as const;

export default function SidebarDefault() {
  const { setQueryFilters } = useFilters();
  const [formState, setFormState] = useState({ location: "", form: "", engine: "", transmission: "" });

  const updateDraft = (field: string, value: string) => {
    setFormState(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const appliedFilters = Object.fromEntries(Object.entries(formState).filter(([, v]) => v !== ""));
    setQueryFilters(appliedFilters);
  };

  return (
    <aside className={styles.sidebarContainer}>
      <form onSubmit={handleSubmit}>
        <label className={styles.formLabel} htmlFor="location">Location</label>
        <input
          id="location"
          className={styles.formInput}
          placeholder="City"
          value={formState.location}
          onChange={(e) => updateDraft('location', e.target.value)}
        />

        {FILTER_CONFIG.map(({ id, title, options }) => (
          <div key={id} className={styles.filterGroup}>
            <h2 className={styles.filterTitle}>{title}</h2>
            <div className={styles.filterOptions}>
              {options.map(([value, label]) => (
                <label key={value}>
                  <input
                    type="radio"
                    name={id}
                    className={styles.filterRadio}
                    value={value}
                    checked={formState[id as keyof typeof formState] === value}
                    onChange={() => updateDraft(id, value)}
                  />
                  {label}
                </label>
              ))}
            </div>
          </div>
        ))}

        <button className={styles.searchButton} type="submit">Search</button>
        <button className={styles.clearButton} type="button" onClick={() => { 
           setFormState({ location: "", form: "", engine: "", transmission: "" });
           setQueryFilters({});
        }}>
          <Image src="/close.svg" alt="Clear" width={24} height={24} />
          Clear filters
        </button>
      </form>
    </aside>
  );
}