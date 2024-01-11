import React from "react";
import { Link } from 'react-router-dom';

function ProductCard(props) {
    return(
        <>
            <li key={props.id} className="product-item">
                <Link className="product-item-link" to={props.path} >
                    <figure className="product-item-pic-wrap"  data-category={props.label}>
                        <img src={props.src} alt="Product item" className="product-item-img" />
                    </figure>
                    <div className="product-item-info">
                        <h5 className="product-item-text">
                           {props.text}
                        </h5>
                        <h5>
                            Price: {props.price} PLN
                        </h5>
                    </div>
                </Link>
            </li>
        </>
    );
}

export default ProductCard;