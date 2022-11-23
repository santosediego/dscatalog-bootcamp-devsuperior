import React from 'react';
import './styles.css';

type Props = {
    name: string
}

const CategoryBadge = ({ name }: Props) => {
    return (
        <div className="category-bad-container">
            {name}
        </div>
    );
}

export default CategoryBadge;
