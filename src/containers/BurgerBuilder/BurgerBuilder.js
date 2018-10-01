import React, {Component} from 'react';

import Aux from '../../hoc/Auxi/Auxi';
import Burger from '../../components/Burger/Burger';
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from 'axios';
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {...}
    // }
    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false
    };

    componentDidMount() {
        console.log('get response');
        axios.get('/ingredients.json')
            .then(response => {
                this.setState({ingredients: response.data})
            })
    }

    updatePurchaseState() {
        const ingredients = {
            ...this.state.ingredients
        };
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            })
            .reduce((sum, el) => {
                return sum + el
            }, 0);
        this.setState({purchasable: sum > 0});
    }

    addIngredient = (type) => {
        this.setState((old, props) => ({
            ingredients: {
                ...old.ingredients,
                [type]: old.ingredients[type] + 1
            },
            totalPrice: old.totalPrice + INGREDIENT_PRICES[type]
        }));
        setTimeout(_ => {
            this.updatePurchaseState()
        })
    };

    removeIngredient = (type) => {
        this.setState((old, props) => ({
            ingredients: {
                ...old.ingredients,
                [type]: old.ingredients[type] > 0 ? old.ingredients[type] - 1 : old.ingredients[type]
            },
            totalPrice: old.totalPrice - INGREDIENT_PRICES[type]
        }));
        setTimeout(_ => {
            this.updatePurchaseState()
        })
    };

    purchaseHandler = () => {
        this.setState({purchasing: true});
    };

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    };

    purchaseContinueHandler = () => {
        // this.setState({loading: true});
        // const order = {
        //     ingredients: this.state.ingredients,
        //     price: this.state.totalPrice,
        //     customer: {
        //         name: 'Stas',
        //         address: {
        //             street: 'Snir',
        //             state: 'Israel'
        //         }
        //     }
        // };
        // axios.post('/orders.json', order)
        //     .then(response => {
        //         this.setState({loading: false, purchasing: false});
        //     })
        //     .catch(error => {
        //         this.setState({loading: false, purchasing: false});
        //     });
        const queryParams = [];
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push('price=' + this.state.totalPrice);
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString,
            state: this.state.ingredients
        });
    };

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let orderSummary = null;
        let burger = <Spinner/>;

        if (this.state.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControls ingredientAdded={this.addIngredient}
                                   ingredientRemoved={this.removeIngredient}
                                   disabled={disabledInfo}
                                   price={this.state.totalPrice}
                                   purchasable={this.state.purchasable}
                                   order={this.purchaseHandler}/>
                </Aux>
            );
            orderSummary = <OrderSummary ingredients={this.state.ingredients}
                                         purchaseCancelled={this.purchaseCancelHandler}
                                         purchaseContinued={this.purchaseContinueHandler}
                                         price={this.state.totalPrice}/>;
        }
        if (this.state.loading) {
            orderSummary = <Spinner/>
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);