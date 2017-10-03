import React from 'react';
import injectSheet from 'react-jss';
import moment from 'moment';

const DEADLINE = moment('10/22/2017', 'MM/DD/YYYY').valueOf();
const ONE_SECOND = 1000;
const pad = n => {
  return (n < 10) ? `0${n}` : n;
};
const getTimeLeft = () => {
  const curr = Date.now();
  const diff = DEADLINE - curr;
  const duration = moment.duration(diff, 'milliseconds');

  return `${pad(duration.days())}:${pad(duration.hours())}:${pad(duration.minutes())}:${pad(duration.seconds())}`;
};

class UKGBox extends React.Component {

  state = {
    timeleft: getTimeLeft()
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({
        timeleft: getTimeLeft()
      });
    }, ONE_SECOND);
  }


  render() {
    const { classes: c } = this.props;

    return (
      <div className={c.container}>
        <h2 className={c.title}>
          UKG Token Sale
        </h2>
        <div className={c.description}>
          Ends In:
          <br />
          <strong>{this.state.timeleft}</strong>
        </div>
        <a className={c.cta} href="https://unikoingold.com/sale" target="_blank" rel="noopener noreferrer">
          Join Now
        </a>
      </div>
    );
  }
}

const styles = {
  container: {
    margin: '10px 20px 26px',
    padding: '6px 20px',
    fontSize: '12px',
    alignSelf: 'center',
    textAlign: 'center',
    fontWeight: '900',
    marginBottom: '43px',
    borderRadius: '2px',
    textTransform: 'uppercase',
    textDecoration: 'none',
    background: 'url(https://b.thumbs.redditmedia.com/a4fWNPrYByhR7Tb1JZUlbDVBS729b9EdP4BaI_hsaUw.png)',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center 67px'
  },
  title: {
    color: 'hsl(0, 0%, 100%)',
    margin: '20px 0 20px',
    fontSize: '16px',
    fontWeight: '900',
    textTransform: 'uppercase'
  },
  description: {
    color: 'hsl(0, 0%, 100%)',
    margin: '107px 0 13px',
    fontSize: '14px',
    fontWeight: '300',
    textTransform: 'none'
  },
  cta: {
    color: 'hsl(289, 90%, 50%)',
    cursor: 'pointer',
    border: '1px solid hsl(289, 90%, 50%)',
    outline: 'none',
    display: 'block',
    padding: '6px 20px',
    fontSize: '12px',
    alignSelf: 'center',
    background: 'hsla(0, 0%, 0%, 0)',
    marginTop: '27px',
    fontWeight: '900',
    borderRadius: '2px',
    marginBottom: '12px',
    textTransform: 'uppercase',
    textDecoration: 'none'
  }
};

export default injectSheet(styles)(UKGBox);
