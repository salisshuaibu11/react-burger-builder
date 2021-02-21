import { useState } from 'react';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import Spinner from '../UI/Spinner/Spinner';

import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';

import './Auth.css';

const Auth = (props) => {
    const [contact, setContact] = useState({
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Mail Address'
            },
            value: '',
            validation: {
                required: true,
                isEmail: true
            },
            valid: false,
            touched: false
        },
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Password'
            },
            value: '',
            validation: {
                required: true,
                minLength: 6
            },
            valid: false,
            touched: false
        },
        isSignup: true
    });

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
    };

    let form = formElementsArray.map(formElement => (
        <Input 
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value} 
            invalid={!formElement.config.valid}
            touched={formElement.config.touched}
            shouldValidate={formElement.config.validation}
            changed={(event) => inputChangedHandler(event, formElement.id)}/>
    ));

    const submitHandler = (e) => {
        e.preventDefault();

        const email = contact.email.value;
        const password = contact.password.value;
        const isSignup = contact.isSignup;

        props.onAuth(email, password, isSignup);
    };

    const switchAuthModeHandler = () => {
        setContact({
            ...contact,
            isSignup: !contact.isSignup
        });
    };

    if (props.loading) {
        form = <Spinner />;
    };

    let errorMessage = null;
    if (props.error) {
        errorMessage = (
            <p>{props.error.message}</p>
        );
    };

    return (
        <div className="Auth">
            {errorMessage}
            <form onSubmit={submitHandler}>
                {form}
                <Button btnType="Success">SUBMIT</Button>
            </form>
            <Button 
                btnType="Danger"
                clicked={switchAuthModeHandler}>
                SWITCH TO
                {contact.isSignup ? ' SIGNIN' : ' SIGNUP'}
            </Button>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup))
    };
};

export default  connect(mapStateToProps, mapDispatchToProps)(Auth);