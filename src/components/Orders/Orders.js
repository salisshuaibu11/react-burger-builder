import { useEffect } from 'react';
import { connect } from 'react-redux';

import Order from '../Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../UI/Spinner/Spinner';

const Orders = (props) => {
    useEffect(() => {
        props.onFetchOrders();
    }, []);

    let orders = <Spinner />;
    if (!props.loading) {
        orders = props.orders.map(order => (
            <Order 
             key={order.id}
             ingredients={order.ingredients}
             price={+order.price}/>
        ))
    };

    return (
        <div>
           {orders}
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        orders: state.order.orders,
        loading: state.order.loading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchOrders: () => dispatch(actions.fetchOrders())
    };
};

export default  connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));