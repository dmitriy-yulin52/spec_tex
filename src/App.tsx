import React from 'react';
import './App.sass';
import classNames from "classnames";
import {Content} from "./components/content/Content";


const styleApp = {
    height: '100%'
}as const

function App() {
  return (
    <div style={styleApp}>
        <Content/>
    </div>
  );
}

export default App;
