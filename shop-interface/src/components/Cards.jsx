import React from "react";
import ProductCard from "./ProductCard";
import "./Cards.css";

function Cards() {
    return(
    <>
        <div className="cards">
            <h1>Check out products!</h1>
            <div className="cards-container">
                <div className="cards-wrapper">
                    <ul className="cards-items">
                        <ProductCard 
                            src="/public/back3.png"
                            text="This is sample clothes description 1"
                            label="Samle product type"
                            path="/"
                        />
                        <ProductCard 
                            src="/public/back3.png"
                            text="This is sample clothes description 2"
                            label="Samle product type"
                            path="/"
                        />
                        <ProductCard 
                            src="/public/back3.png"
                            text="This is sample clothes description 3"
                            label="Samle product type"
                            path="/"
                        />
                        <ProductCard 
                            src="/public/back3.png"
                            text="This is sample clothes description 4"
                            label="Samle product type"
                            path="/"
                        />
                        <ProductCard 
                            src="/public/back3.png"
                            text="This is sample clothes description 4"
                            label="Samle product type"
                            path="/"
                        />
                        <ProductCard 
                            src="/public/back3.png"
                            text="This is sample clothes description 4"
                            label="Samle product type"
                            path="/"
                        />
                    </ul>
                </div>
            </div>
        </div>
    </>
    );
}

export default Cards;