import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ component: Component, permission, ...rest }) => {

    return (
        <Route
            {...rest}
            component={(props) => {
                const token = localStorage.getItem('token');
                if (token) {
                    const info = localStorage.getItem('info')
                    const perObj = JSON.parse(info).Quyen
                    let perArr = [];
                    Object.keys(perObj).forEach(el => {
                        if (perObj[el] == 1)
                            perArr.push(Number(el));
                    })
                    let found = true;
                    if (permission)
                        found = permission.some(r => perArr.includes(r));

                    return found ? <Component {...props} /> : <Redirect to="/accessdenied" />
                } else {
                    return <Redirect to={"/login"} />
                }
            }}
        />
    )
}

export default PrivateRoute;