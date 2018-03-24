import React from 'react';
import injectSheet from 'react-jss';

class AlertsCTA extends React.Component {
  state = {
    inputValue: ''
  }

  handleChange = (event) => {
    this.setState({
      inputValue: event.target.value
    });
  }

  render() {
    const { classes: c } = this.props;

    return (
      <form
        novalidate
        className={c.container}
        method="post"
        target="_blank"
        action="//coincircle.us16.list-manage.com/subscribe/post?u=fe27d79e7114564ede2644cd1&amp;id=603deaf5fa"
      >
        <h2 className={c.title}>
          最新ICO情報配信中
        </h2>
        <div className={c.description}>
          メールアドレスをご登録いただければ最新のICO情報をお届けします！
        </div>
        <input
          name="EMAIL"
          type="text"
          className={c.input}
          placeholder="Your Email"
          onChange={this.handleChange}
          value={this.state.inputValue}
        />
        <button className={c.btnSubmit} type="submit">
          登録する
        </button>
      </form>
    );
  }
}

const styles = {
  container: {
    margin: '10px 20px 26px',
    border: '1px solid hsl(289, 90%, 50%)',
    padding: '6px 20px',
    fontSize: '12px',
    background: 'hsla(0, 0%, 0%, 0)',
    alignSelf: 'center',
    fontWeight: '900',
    marginBottom: '43px',
    borderRadius: '2px',
    textTransform: 'uppercase',
    textDecoration: 'none',
    textAlign: 'center'
  },
  title: {
    textTransform: 'uppercase',
    fontWeight: '900',
    margin: '20px 0 20px',
    color: 'white',
    fontSize: '16px'
  },
  description: {
    textTransform: 'none',
    fontWeight: '300',
    margin: '10px 0 13px',
    fontSize: '14px',
    color: 'white'
  },
  input: {
    background: 'none',
    border: 'none',
    borderBottom: '1px solid hsl(0, 0%, 32%)',
    padding: '9px 0px',
    outline: 'none',
    color: 'white',
    '&::placeholder,&:-webkit-input-placeholder': {
      color: 'hsla(0, 0, 100%, .5)'
    }
  },
  btnSubmit: {
    color: 'hsl(289, 90%, 50%)',
    border: '1px solid hsl(289, 90%, 50%)',
    cursor: 'pointer',
    padding: '6px 20px',
    fontSize: '12px',
    background: 'hsla(0, 0%, 0%, 0)',
    alignSelf: 'center',
    fontWeight: '900',
    marginBottom: '12px',
    borderRadius: '2px',
    textTransform: 'uppercase',
    textDecoration: 'none',
    display: 'block',
    marginTop: '27px',
    width: '100%',
    outline: 'none'
  }
};

export default injectSheet(styles)(AlertsCTA);
