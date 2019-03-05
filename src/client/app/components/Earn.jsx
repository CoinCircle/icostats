import React from 'react';
import injectSheet from 'react-jss';

class Footer extends React.Component {
  render() {
    const { classes: c } = this.props;

    return (
      <a
        className={c.container}
        target="_blank"
        href="https://coincircle.com/earn"
      >
        <img
          className={c.img}
          src="https://coincircle.com/img/logotype-white.svg"
        />
        <span className={c.text}>
          Compete to win $500 in crypto every day.
        </span>
        <button className={c.button}>Join Now</button>
      </a>
    )
  }
}

const styles = {
  container: {
    flex: '0 0 40px',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    height: '30px',
    background: 'linear-gradient(94deg, hsl(242, 60%, 47%) 0%, hsl(205, 100%, 57%) 73%)',
    textAlign: 'center',
    padding: '10px 0',
    color: 'white',
    textDecoration: 'none',
    fontWeight: 900
  },
  text: {
    marginRight: '20px'
  },
  button: {
    color: 'hsl(0, 0%, 100%)',
    fontSize: '13px',
    fontWeight: '700',
    boxShadow: 'rgba(0, 0, 0, 0.25) 1px 3px 10px 0px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    maxWidth: '14rem',
    letterSpacing: '1px',
    background: 'hsl(219, 63%, 23%)',
    padding: '9px 18px',
    marginLeft: '12px',
    borderWidth: 'initial',
    borderStyle: 'none',
    borderRadius: '4px',
    outline: 'none',
    justifyContent: 'center',
    marginRight: '20px'
  },
  img: {
    marginLeft: '20px',
    marginRight: 'auto'
  },
  '@media(max-width: 920px)': {
    button: {
      display: 'none'
    }
  },
  '@media(max-width: 786px)': {
    img: {
      display: 'none'
    },
    container: {
      justifyContent: 'center'
    }
  }
};

export default injectSheet(styles)(Footer);
