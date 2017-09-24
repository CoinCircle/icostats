import React from 'react';
import injectSheet from 'react-jss';

function Unikoin({ classes: c }) {
  return (
    <a
      className={c.container}
      href="https://token.unikrn.com"
      onClick={event => {
        event.preventDefault();
        window.analytics.track({
          category: 'Advertising',
          action: 'Click Footer Ad',
          label: 'Unikrn'
        });

        setTimeout(() => window.location.href = 'https://unikoingold.com', 300);
      }}
    >
      <img src="/img/unikoin.png" className={c.logo} alt="unikoin" />
      <h2 className={c.title}>
        Token Sale Live Now
      </h2>
      <p className={c.description}>
        Established esports bettings platform
      </p>
      <button className={c.button}>Join Now</button>
    </a>
  );
}

export default injectSheet({
  container: {
    cursor: 'pointer',
    display: 'flex',
    background: 'hsl(266, 53%, 25%)',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: '48px',
    position: 'fixed',
    bottom: '0',
    left: '0',
    zIndex: '99999'
  },
  logo: {
    marginLeft: '20px',
    marginTop: '-7px'
  },
  title: {
    margin: '5px 22px',
    fontSize: '20px',
    textTransform: 'uppercase',
    color: 'hsl(0, 0%, 100%)'
  },
  description: {
    margin: '0',
    color: 'hsl(0, 0%, 100%)',
    marginRight: 'auto'
  },
  button: {
    marginRight: '20px',
    textTransform: 'uppercase',
    fontWeight: '900',
    color: 'hsl(0, 0%, 100%)',
    fontSize: '20px',
    background: 'hsl(291, 64%, 42%)',
    padding: '3px 23px',
    borderRadius: '1px',
    border: '1px solid hsl(0, 0%, 2%)',
    cursor: 'pointer',
    outline: 'none'
  },
  '@media (max-width: 648px)': {
    title: {
      fontSize: '12px',
      margin: '5px 12px'
    },
    description: {
      display: 'none'
    },
    button: {
      fontSize: '12px',
      padding: '8px 10px'
    },
    logo: {
      maxWidth: '85px'
    }
  }
})(Unikoin);
