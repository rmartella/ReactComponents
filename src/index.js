import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import { Checkbox } from 'antd';

function onChange(e) {
  console.log(`checked = ${e.target.checked}`);
}

ReactDOM.render(<Checkbox onChange={onChange}>Checkbox</Checkbox>, document.getElementById('container'));