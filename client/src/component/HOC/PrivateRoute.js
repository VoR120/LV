import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            component={(props) => {
                // const token = localStorage.getItem('thesis_token');
                const token = 1;
                return token ? <Component {...props} /> : <Redirect to={"/login"} />
            }}
        />
    )
}

export default PrivateRoute;