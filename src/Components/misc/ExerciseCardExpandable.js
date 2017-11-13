import React, {Component} from 'react';
import PropTypes from 'prop-types';
import CloseIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import CodeIcon from 'material-ui/svg-icons/action/code';
import IconButton from 'material-ui/IconButton';

function getStyles() {
  return {
    root: {
      top: 0,
      bottom: 0,
      right: 4,
      margin: 'auto',
      position: 'absolute',
    },
  };
}

class ExerciseCardExpandable extends Component {
  static propTypes = {
    closeIcon: PropTypes.node,
    expanded: PropTypes.bool,
    iconStyle: PropTypes.object,
    onExpanding: PropTypes.func.isRequired,
    openIcon: PropTypes.node,
    style: PropTypes.object,
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  static defaultProps = {
    closeIcon: <CloseIcon />,
    openIcon: <CodeIcon />,
  };

  render() {
    const styles = getStyles(this.props, this.context);

    return (
      <IconButton
        tooltip="Ver código"
        style={Object.assign(styles.root, this.props.style)}
        onClick={this.props.onExpanding}
        iconStyle={this.props.iconStyle}>
        {!this.props.expanded ? this.props.openIcon : this.props.closeIcon}
      </IconButton>
    );
  }
}

export default ExerciseCardExpandable;
