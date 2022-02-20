import { Route, Redirect } from "react-router-dom";
import { getUser } from "./services/authorize";

const AdminRoute = ({component:Component,...rest}) => (
  <Route
    {...rest}
    render ={props =>
      getUser() 
      ?
      (<Component {...props}/>)
      :
      (<Redirect
          to={{pathname:"/login",state:{from:props.location}}}
        />
      )
    }
  />
)

export default AdminRoute