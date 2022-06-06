import React from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import App from "./App";
import {Provider} from "react-redux";
import { store} from "./redux/store";


const container = document.getElementById('root');
const rootRender = createRoot(container!);

rootRender.render(
    <Provider store={store}>
        <App/>
    </Provider>
);

