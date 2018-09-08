import React from 'react';
import Aux from '../../../hoc/Auxi';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    const ingredientsSummary = Object.keys(props.ingredients)
        .map(igKeys => {
            return <li key={igKeys}><span style={{textTransform: 'capitalize'}}>{igKeys}</span>: {props.ingredients[igKeys]}</li>
        });

    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicius burger with following ingredients:</p>
            <ul>
                {ingredientsSummary}
            </ul>
            <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
            <p>Continue to Checkout?</p>
            <Button btnType='Danger' clicked={props.purchaseCancelled}>CANCEL</Button>
            <Button btnType='Success' clicked={props.purchaseContinued}>CONTINUE</Button>
        </Aux>
    )
};

export default orderSummary;