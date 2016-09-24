'use strict';

import React from 'react';
import { Route, Redirect, Router, RouterContext} from 'react-router';
import {Provider} from 'react-redux';
import {getStore} from './stores/qm-store';

import App from './components/app';
import Inside from './components/inside';
import LoginPage from './pages/login';
import SignupPage from './pages/signup';
import TopicsPage from './pages/topics';
import TopicPage from './pages/topic';
import TopicCreatePage from './pages/topic-create';

export const routes = (
    <Route path="" component={App}>
        <Route path="" component={Inside}>
            <Route path="/topics" component={TopicsPage} />
            <Route path="/topic/create" component={TopicCreatePage} />
            <Route path="/topic/:id" component={TopicPage} />
        </Route>

        <Route path="/login" component={LoginPage} />
        <Route path="/signup" component={SignupPage} />
        <Redirect from="/" to="/login" />
    </Route>
);

export const serverSide = (renderProps, initialState) => {
    return (
        <Provider store={getStore(initialState) }>
            <RouterContext {...renderProps} />
        </Provider>
    );
};

export const clientSide = renderProps => (
    <Provider store={getStore(window.__PRELOADED_STATE__) }>
        <Router {...renderProps}/>
    </Provider>
);