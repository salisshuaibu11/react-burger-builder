import './Input.css';

const input = (props) => {
    let inputElement = null;

    switch(props.elementType) {
        case ('input'):
            inputElement = <input 
                className={
                    props.invalid && 
                    props.shouldValidate &&
                    props.touched ? 'InputElement Invalid' : 'InputElement'} 
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}/>
            break;
        case ('textarea'):
            inputElement = <textarea 
                className={props.invalid && 
                    props.shouldValidate &&
                    props.touched ? 'InputElement Invalid' : 'InputElement'}
                {...props.elementConfig} 
                value={props.value}
                onChange={props.changed}/>
            break;
        case ('select'):
            inputElement = (
                <select
                className={props.invalid && 
                    props.shouldValidate && 
                    props.touched ? 'InputElement Invalid' : 'InputElement'}
                value={props.value}
                onChange={props.changed}>
                    {props.elementConfig.options.map(option => (
                        <option 
                            key={option.value}
                            value={option.value}>
                                {option.displayValue}
                        </option>
                    ))}
                </select>
            );
            break;
        default:
            inputElement = <input 
                className={props.invalid && 
                    props.shouldValidate &&
                    props.touched ? 'InputElement Invalid' : 'InputElement'} 
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}/>
    }
    return (
        <div className="Input">
            <label className="Label">{props.label}</label>
            {inputElement}
        </div>
    )
}

export default input;