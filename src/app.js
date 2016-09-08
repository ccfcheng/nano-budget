import React from 'react';
import { render } from 'react-dom';
import document from 'global/document';

const App = () => <h1>Testing</h1>;

const div = document.getElementById('app');

render(<App />, div);
