import AuthSignin from "../components/AuthSignin"
import Quote from "../components/Quote"

export const SignIn = () =>{
    return (
      <div>
      <div className="grid grid-cols-1 lg:grid-cols-2">
       <div className=""><AuthSignin /></div>
       <div className="hidden lg:block">
         <Quote />
       </div>
     </div>
    </div>
    )
}