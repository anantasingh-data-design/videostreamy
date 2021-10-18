import React from 'react';
import { connect } from 'react-redux';
import {signIn,signOut} from '../actions';


class GoogleAuth extends React.Component{
    componentDidMount() {
        window.gapi.load('client:auth2',() => {//this line load the library
 
            window.gapi.client.init({// initialize here
                clientId:'1096881783999-0edkb2ju2u316kji1iod9va8avdictaf.apps.googleusercontent.com',
                scope:'email'
            }).then(()=>{
                this.auth = window.gapi.auth2.getAuthInstance();//getAuthinstance->google auth object n its a  js client reference to the auth library
                //this.setState({isSignedIn:this.auth.isSignedIn.get() })update component level state with new property called isSignedIn
                this.onAuthChange(this.auth.isSignedIn.get());//update our authstate inside of our redux store
                this.auth.isSignedIn.listen(this.onAuthChange);//wait for authentication status to change
            })
        });
    }
    onAuthChange = isSignedIn => {
       if(isSignedIn){
           this.props.signIn(this.auth.currentUser.get().getId());
       }
       else{
           this.props.signOut();
       }
    };
    onSignInClick = () =>{
        this.auth.signIn();
    }
    onSignOutClick = () =>{
        this.auth.signOut();
    }
    renderAuthButton(){
        if(this.props.isSignedIn=== null){
            return null;
        }else if(this.props.isSignedIn){
            return <button onClick={this.onSignOutClick} className="ui red google button">
                <i className="google icon" />
                SignOut
            </button>
        }else{
            return <button onClick={this.onSignInClick} className="ui green google button">
                <i className="google icon" />
                SignIn with GOOGLE
            </button>
        }
    }
    render(){
        return <div>{this.renderAuthButton()}</div>; 
    }
}
const mapStateToProps = state =>{
    return { isSignedIn:state.auth.isSignedIn }
}
export default connect(mapStateToProps,{signIn,signOut})(GoogleAuth);