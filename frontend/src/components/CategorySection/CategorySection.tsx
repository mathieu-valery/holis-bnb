import React from 'react';
import './CategorySection.css';

type CategorySectionProps = {
  title: string;
  children: React.ReactNode;
  // I tried to use JSX.Element type but doesnt work
};

const CategorySection: React.FC<CategorySectionProps> = (props) => {
  return (
    <>
      <h1 className="categorysection-title">{props.title}</h1>
      {props.children}
    </>
  );
};

export default CategorySection;
