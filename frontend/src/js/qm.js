'use strict';

import React from 'react';
import { Route, Redirect, Router, RouterContext} from 'react-router';
import ExamplePage from './pages/example';
import Page2Page from './pages/page2';
import {Provider} from 'react-redux';
import {getStore} from './stores/qm-store';

export const routes = (
    <Route path="" component={({children}) => (children) }>
        <Route path="/index" component={ExamplePage} />
        <Route path="/page2" component={Page2Page} />
        <Redirect from="*" to="/index" />
    </Route>
);

export const serverSide = (renderProps, initialState) => {
    return (
        <Provider store={getStore(initialState)}>
            <RouterContext {...renderProps} />
        </Provider>
    );
};

export const clientSide = renderProps => (
    <Provider store={getStore(window.__PRELOADED_STATE__)}>
        <Router {...renderProps}/>
    </Provider>
);