import { FC } from 'react';

interface Product {
    id: number;
    name: string;
}

interface Category {
    id: number;
    name: string;
    products: Product[];
}

interface Props {
    category: Category;
}


const Show: FC<Props> = ({ category }) => {
    return (
        <div>
            <h1>{category.name}</h1>
            <ul>
                {category.products.map(product => (
                    <li key={product.id}>{product.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default Show;
