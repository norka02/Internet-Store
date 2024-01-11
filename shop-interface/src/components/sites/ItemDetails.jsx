import React from "react";
import "./ItemDetails.css";

function ItemDetails(props) {

    return(
        <>
            <div className="container">
                Item details: {props.id}
            </div>
        </>
    );
}

export default ItemDetails;