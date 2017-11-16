import React from 'react';
import MNForm from './MNForm.js';
import MForm from './MForm.js';
import MNArrayForm from './MNArrayForm.js';

class FormData extends React.PureComponent {
  componentWillMount() {
    this.props.changeSolved(false);
  }
  render() {
    const {type} = this.props;
    switch (type) {
      case 0:
      case 1:
      case 2:
      case 3:
        return <MNForm {...this.props} />;

      case 4:
      case 5:
      case 6:
        return <MForm {...this.props} />;
      case 7:
        return <MNArrayForm {...this.props} />;
      default:
        return <div>HOW THE FUCK DO WE GET HERE!</div>;
    }
  }
}

export default FormData;
