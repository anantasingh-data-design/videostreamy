import React from 'react';
import {Field /*this is a component so 1st letter 'F' always start with capital*/, reduxForm} from 'redux-form';
import {createStream} from '../../actions';
class StreamForm extends React.Component{
    
    renderError({error,touched}){
        if(touched && error){
            return(
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            )
        }
    }
    renderInput=({input,label,meta})=>{
        
         /*<input {...input} />
        //below line for single access onchange and value property for input but above line is accessing for all property of input element
        //<input onChange={formProps.input.onChange } value ={formProps.input.value}/>*/
        const className =`field ${meta.error && meta.touched ? 'error' :''}`
        return(
            <div className={className}>
            <label>{label}</label>
                <input {...input}  autoComplete= "off" />
                {this.renderError(meta)}
            </div>
        )
    }
    onSubmit =(formValues) =>{
        this.props.onSubmit(formValues);
    };
   
    render(){
     
    return (
        <form onSubmit={this.props.handleSubmit(this.onSubmit)} 
            className="ui form error">
            <Field name="title" component={this.renderInput} label="Enter Title"/>
            <Field name="description" component={this.renderInput} label="Enter Description" />
            <button className="ui button primary">Submit</button>
        </form>
    );
    }
}
const validate =(formValues) =>{
    const errors ={};
    if(!formValues.title){
        errors.title= 'You must enter title';
    }
    if(!formValues.description){
        errors.description='You must enter description';
    }
    return errors;
}
// export default reduxForm({
//     form:'streamCreate',//name of the form
//     //validate:validate//validate function we just created and below code same also coz validate is identical to validate so gere only mention validate
//     validate
// })(StreamCreate);

export default  reduxForm({
    form:'StreamForm',//name of the form
    //validate:validate//validate function we just created and below code same also coz validate is identical to validate so gere only mention validate
    validate,
})(StreamForm);
