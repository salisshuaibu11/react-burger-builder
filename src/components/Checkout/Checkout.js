import { withRouter, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

const Checkout = (props) => {

    const checkoutCancelledHandler = () => {
        props.history.goBack();
    }

    const checkoutContinuedHandler = () => {
        props.history.replace('/checkout/contact-data');
    };

    let summary = <Redirect to="/" />
    const purchasedRedirect = props.purchased ? <Redirect to="/" /> : null;
    if (props.ings) {
        summary = (
            <div> 
                {purchasedRedirect}          
                <CheckoutSummary 
                checkoutContinued={checkoutContinuedHandler}
                checkoutCancelled={checkoutCancelledHandler}
                ingredients={props.ings}/>
                <Route path={props.match.path + '/contact-data'}>
                <ContactData 
                    {...props}
                    ingredients={props.ings}
                    price={props.price}/>
                </Route>
            </div>
        )
    }

    return (
        <div>
            {summary}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        purchased: state.order.purchased
    }
}

export default connect(mapStateToProps)(withRouter(Checkout));