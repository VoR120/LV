import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import PrivateRoute from '../component/HOC/PrivateRoute';

const RouteList = (props) => {
    return (
        <Fragment>
            {props.routes.map(({ component: Component, path, isPrivate, ...rest }) => {
                return (
                    <Fragment key={path}>
                        {isPrivate ? (
                            <PrivateRoute
                                component={Component}
                                path={path}
                                {...rest}
                            />
                        ) : (
                            <Route
                                component={Component}
                                path={path}
                                {...rest}
                            />
                        )}
                    </Fragment>
                )
            })
            }
        </Fragment>
    )
};

export default RouteList;