import { Navigate } from "react-router";



const RuteProtected = ({isAuthenticated, children}) => {
   if(!isAuthenticated){
       return <Navigate to="/login" />
   }
   return children;
}

export default RuteProtected;