'use client';
import React from 'react';
import { ThreeDots } from 'react-loader-spinner';
import { FaTimes } from 'react-icons/fa';
import FilterLoader from '../FilterLoader/FilterLoader';


interface Props {
  title: string;
  options: { id: string; name: string; slug: string }[];
  selected: string[];
  loading: boolean;
  setSelected: (val: string[]) => void;
}

export default function FilterPanel({ title, options, selected, loading, setSelected }: Props) {
  const handleCheckboxChange = (slug: string) => {
    if (selected.includes(slug)) {
      setSelected(selected.filter(item => item !== slug));
    } else {
      setSelected([...selected, slug]);
    }
  };

  return (
    <div className="attribute-box">
      <h6>{title}</h6>
      {loading ? (
        <FilterLoader />
      ) : (
        options.map(option => (
          <div className="attribute-box-check" key={option.id} data-aos="fade-up" >
            <input
              className="type-check"
              type="checkbox"
              value={option.slug}
              checked={selected.includes(option.slug)}
              onChange={() => handleCheckboxChange(option.slug)}
            />
            <label>{option.name}</label>
          </div>
        ))
      )}
    </div>
  );
}
