import React from 'react';
import { createRoot } from 'react-dom/client';

class MyComponent extends React.Component {
  render() {
    return <p>Hello, class component!</p>;
  }
}

const root = createRoot(document.getElementById('root'));
root.render(<MyComponent />);