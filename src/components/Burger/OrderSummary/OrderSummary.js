import React, {Component} from 'react';
import Aux from '../../../hoc/Auxi/Auxi';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {

    render() {
        const ingredientsSummary = Object.keys(this.props.ingredients)
            .map(igKeys => {
                return <li key={igKeys}><span
                    style={{textTransform: 'capitalize'}}>{igKeys}</span>: {this.props.ingredients[igKeys]}</li>
            });

        return (
            <Aux>
                <h3>Your Order</h3>
                <p>A delicius burger with following ingredients:</p>
                <ul>
                    {ingredientsSummary}
                </ul>
                <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
                <p>Continue to Checkout?</p>
                <Button btnType='Danger' clicked={this.props.purchaseCancelled}>CANCEL</Button>
                <Button btnType='Success' clicked={this.props.purchaseContinued}>CONTINUE</Button>
            </Aux>
        )
    }
};

export default OrderSummary;