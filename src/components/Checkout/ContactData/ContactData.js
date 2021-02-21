import { useState } from 'react';
import { connect } from 'react-redux';

import Spinner from '../../UI/Spinner/Spinner';
import Button from '../../UI/Button/Button';
import axios from '../../../axios-orders';
import Input from '../../UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';

import './ContactData.css';

const ContactData = (props) => {
    const [contact, setContact] = useState({
        name: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your Name'
            },
            value: '',
            validation: {
                required: true 
            },
            valid: false,
            touched: false
        },
        street: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Street'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        zipCode: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'ZIP Code'
            },
            value: '',
            validation: {
                required: true,
                minLength: 5,
                maxLength: 5
            },
            valid: false,
            touched: false
        },
        country: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Country'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Your Email'
            },
            validation: {
                required: true
            },
            valid: false,
            value: '',
            touched: false
        },
        delivery: {
            elementType: 'select',
            elementConfig: {
                options: [
                    {value: 'fastest', displayValue: 'Fastest'},
                    {value: 'cheapest', displayValue: 'Cheapest'}
                ]
            },
            value: 'fastest',
            validation: {},
            valid: true
        },
        formIsValid: false
    });
    const [formIsValid, setFormIsValid] = useState(false);

    const orderHandler = (e) => {
        e.preventDefault();
        const formData = {};

        for (let formElementIdentifier in contact) {
            formData[formElementIdentifier] = contact[formElementIdentifier].value
        }

        const order = {
            ingredients: props.ings,
            price: props.price,
            orderData: formData
        };

        props.onOrderBurger(order);
    }

    const formElementsArray = [];
    for (let key in contact) {
        formElementsArray.push({
            id: key,
            config: contact[key]
        });
    };

    const checkValidity = (value, rules) => {
        let isValid = true;

        if (!rules) {
            return true;
        }
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
    }

    const inputChangedHandler = (e, inputIdentifier) => {
        const updatedOrderForm = {
            ...contact,

        }
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier],
        }   
        updatedFormElement.value = e.target.value;
        updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        setContact(updatedOrderForm);
        setFormIsValid(formIsValid);
    };
    
    let form = (
        <form onSubmit={orderHandler}>
            {formElementsArray.map(formElement => {
                return (<Input 
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value} 
                    invalid={!formElement.config.valid}
                    touched={formElement.config.touched}
                    shouldValidate={formElement.config.validation}
                    changed={(event) => inputChangedHandler(event, formElement.id)}/>)
            })}
            <Button disabled={formIsValid} btnType="Success" clicked={orderHandler}>ORDER</Button>
        </form>
    );
    if (props.loading) {
        form = <Spinner />
    }

    return (
        <div className="ContactData">
            <h4>Enter your Contact data</h4>
            {form}
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onOrderBurger: (orderData) => dispatch(actions.purchaseBurger(orderData))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));