// @flow
import React from 'react';
import injectSheet from 'react-jss';
import { connect } from 'react-redux';
import mapValues from 'lodash/mapValues';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import classNames from 'classnames';
import htmlForFeedback from 'shared/lib/emails/feedback.template.js';
import htmlForRequestICO from 'shared/lib/emails/requestICO.template.js';
import Modal from './Modal';
import { closeFeedback } from '../actions';

type Props = {
  classes: Object,
  onClose: () => void,
  sendMail: (name: string, email: string, html: string, subject: string) => void
};

class Feedback extends React.Component {
  props: Props;
  state = {
    view: 'INTRO',
    person_name: '',
    name: '',
    email: '',
    symbol: '',
    raise: '',
    tokens_sold: '',
    start_date: '',
    notes: '',
    message: ''
  };

  thanks = () => {
    this.setState({ view: 'THANKS' });
    setTimeout(() => this.props.onClose(), 3000);
  }

  handleSubmit = (event: Event & { currentTarget: HTMLFormElement }) => {
    event.preventDefault();
    if (!(event.currentTarget instanceof HTMLFormElement)) {
      return;
    }
    const { view } = this.state;

    if (view === 'FEEDBACK') {
      const { email, message, name } = this.state;
      const html = htmlForFeedback({ email, message });
      const subject = 'ICO Stats Feedback';

      this.props.sendMail(name, email, html, subject).then(this.thanks);
    } else {
      const {
        person_name, name, symbol, raise, tokens_sold, start_date, notes, email
      } = this.state;
      const data = {
        person_name, name, symbol, raise, tokens_sold, start_date, notes, email
      };
      const html = htmlForRequestICO(data);
      const subject = 'Request for New ICO Stats Listing';

      this.props.sendMail(person_name, email, html, subject).then(this.thanks);
    }
  }

  renderCurrentView() {
    switch (this.state.view) {
      case 'INTRO':
        return this.renderIntro();
      case 'FEEDBACK':
        return this.renderSuggestFeature();
      case 'LISTING':
        return this.renderAddListing();
      case 'THANKS':
        return this.renderThanks();
      default:
        return this.renderIntro();
    }
  }

  getTitle() {
    switch (this.state.view) {
      case 'INTRO': return 'Help Make ICO Stats Better!';
      case 'FEEDBACK': return 'What should we work on next?';
      case 'LISTING': return 'Add a Listing';
      default: return 'Help Make ICO Stats Better!';
    }
  }

  renderThanks() {
    const { classes: c } = this.props;

    return (
      <div className={c.intro}>
        <p className={c.text}>
          Thank you for your feedback!
        </p>
      </div>
    );
  }

  renderIntro() {
    const { classes: c } = this.props;

    return (
      <div className={c.intro}>
        <p className={c.text}>
          ICO Stats is in early alpha so we need your feedback to decide what
          to add next! Let us know your thoughts here.
        </p>
        <div className={c.introButtons}>
          <button
            className={c.btnInvert}
            onClick={() => this.setState({ view: 'FEEDBACK' })}
          >
            Suggest a Feature/Improvement
          </button>
          <button
            className={c.btnInvert}
            onClick={() => this.setState({ view: 'LISTING' })}
          >
            Request to add listing
          </button>
        </div>
      </div>
    );
  }

  renderSuggestFeature() {
    const { classes: c } = this.props;
    const back = (
      <span
        className={c.btnBack}
        onClick={() => this.setState({ view: 'INTRO' })}
      >
        <i className="material-icons">keyboard_arrow_left</i>
        Back
      </span>
    );

    return (
      <form className={c.suggest} onSubmit={this.handleSubmit}>
        {back}
        <div className={c.fieldset}>
          <label className={c.label} htmlFor="email">
            What&apos;s your name? (optional)
          </label>
          <input
            value={this.state.name}
            onChange={e => this.setState({ name: e.target.value })}
            type="name"
            name="name"
            className={c.input}
            placeholder="Vitalik Buterin"
          />
        </div>
        <div className={c.fieldset}>
          <label className={c.label} htmlFor="email">
            Enter your email if you&apos;d like a reply:
          </label>
          <input
            value={this.state.email}
            onChange={e => this.setState({ email: e.target.value })}
            type="email"
            name="email"
            className={c.input}
            placeholder="ico.ninja@gmail.com"
          />
        </div>
        <div className={classNames(c.fieldset, 'mod-textarea')}>
          <label className={c.label} htmlFor="message">
            What would make ICO Stats more valuable to you?
          </label>
          <textarea
            value={this.state.message}
            onChange={e => this.setState({ message: e.target.value })}
            name="message"
            placeholder="Type here..."
            className={c.textarea}
          />
        </div>
        <button className={c.btnInvert} type="submit">
          Submit
        </button>
      </form>
    );
  }

  renderAddListing() {
    const { classes: c } = this.props;
    const back = (
      <span
        className={c.btnBack}
        onClick={() => this.setState({ view: 'INTRO' })}
      >
        <i className="material-icons">keyboard_arrow_left</i>
        Back
      </span>
    );
    const fields = [{
      name: 'person_name',
      label: 'Your Name (optional)',
      placeholder: 'Vitalik Buterin',
      type: 'text'
    }, {
      name: 'name',
      label: 'ICO Name',
      placeholder: 'Golem',
      type: 'text'
    }, {
      name: 'symbol',
      label: 'Symbol',
      placeholder: 'GNT',
      type: 'text'
    }, {
      name: 'raise',
      label: 'USD Raised',
      placeholder: '75000000',
      type: 'number'
    }, {
      name: 'tokens_sold',
      label: '# of Tokens Sold in Crowdsale',
      placeholder: '15000000',
      type: 'number'
    }, {
      name: 'start_date',
      label: 'Start Date',
      placeholder: '05/31/2017',
      type: 'date'
    }];

    return (
      <form
        className={c.suggest}
        style={{ marginTop: '5px' }}
        onSubmit={this.handleSubmit}
      >
        {back}
        <div className={c.text}>
          Fill this out to request an addition to our listings. To expedite the
          process, please be as accurate as possible and provide sources for
          your information.
        </div>
        {fields.map(field => (
          <div className={c.fieldset} key={field.name}>
            <label className={c.label} htmlFor={field.name}>
              {field.label}
            </label>
            <input
              value={this.state[field.name]}
              onChange={e => this.setState({ [field.name]: e.target.value })}
              name={field.name}
              type="text"
              className={c.input}
              placeholder={field.placeholder}
              required
            />
          </div>
        ))}
        <div
          className={classNames(c.fieldset, 'mod-textarea')}
          style={{ marginTop: '10px' }}
        >
          <label className={c.label} htmlFor="notes">
            Additional Notes / Sources - Please provide links or some sort of
            evidence that the data is valid.
          </label>
          <textarea
            value={this.state.notes}
            onChange={e => this.setState({ notes: e.target.value })}
            name="notes"
            placeholder="Type here..."
            className={c.textarea}
            style={{ marginBottom: '0' }}
          />
        </div>
        <div className={c.fieldset}>
          <label className={c.label} htmlFor="email">
            Enter your email if you&pos;d like a reply:
          </label>
          <input
            value={this.state.email}
            onChange={e => this.setState({ email: e.target.value })}
            name="email"
            type="email"
            className={c.input}
            placeholder="ico.ninja@gmail.com"
          />
        </div>
        <button className={c.btnInvert} type="submit">
          Submit
        </button>
      </form>
    );
  }

  render() {
    const { classes: c } = this.props;

    return (
      <Modal
        className={c.modal}
        title={this.getTitle()}
        actions={null}
        onClose={this.props.onClose}
        hideFooter
      >
        {this.renderCurrentView()}
      </Modal>
    );
  }
}

const styles = {
  modal: {
    width: '90%',
    height: '90%',
    '& .Modal-title': {
      fontSize: '22px',
      fontWeight: '700',
      color: 'hsl(0, 0%, 24%)',
      margin: '45px 0 10px 30px'
    }
  },
  intro: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    color: 'hsl(0, 0%, 24%)',
    fontSize: '24px',
    lineHeight: '36px',
    flexDirection: 'column',
    flexGrow: '2',
    textAlign: 'center',
    padding: '30px'
  },
  introButtons: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: '50px'
  },
  text: {
    fontWeight: '300',
    color: 'hsl(0, 0%, 24%)',
    textShadow: [
      '-0.1px -0.1px 0 hsl(0, 0%, 24%)',
      '0.1px -0.1px 0 hsl(0, 0%, 24%)',
      '-0.1px 0.1px 0 hsl(0, 0%, 24%)',
      '0.1px 0.1px 0 hsl(0, 0%, 24%)'
    ]
  },
  btnInvert: {
    color: 'hsl(206, 100%, 52%)',
    cursor: 'pointer',
    padding: '18px 0',
    fontSize: '22px',
    flexShrink: 0,
    background: 'hsla(206, 100%, 52%, 0.05)',
    fontWeight: '900',
    marginTop: '20px',
    marginBottom: '40px',
    borderRadius: '3px',
    textTransform: 'uppercase',
    textDecoration: 'none',
    textAlign: 'center',
    width: '100%',
    border: '2px dashed hsl(206, 100%, 52%)',
    '&:hover': {
      color: 'hsl(15, 85%, 70%)',
      borderColor: 'hsl(15, 85%, 70%)',
      background: 'hsla(15, 85%, 70%,0.1)'
    }
  },
  suggest: {
    display: 'flex',
    flexDirection: 'column',
    flex: '100%',
    margin: '0 30px',
    justifyContent: 'space-between',
    marginTop: '29px',
    overflow: 'scroll'
  },
  fieldset: {
    display: 'flex',
    flexShrink: 0,
    margin: '10px 0',
    flexDirection: 'column',
    '&.mod-textarea': {
      marginTop: '51px',
      flexGrow: '2'
    }
  },
  label: {
    color: 'hsl(0, 0%, 24%)',
    fontWeight: '400',
    marginBottom: '5px',
    fontSize: '15px'
  },
  input: {
    border: '1px solid hsl(0, 0%, 86%)',
    borderRadius: '4px',
    padding: '14px 12px',
    fontSize: '14px',
    fontWeight: '500',
    color: 'hsl(0, 0%, 30%)',
    '&:focus': {
      outline: '1px solid hsl(208, 100%, 57%)'
    },
    '&::placeholder': {
      color: 'hsl(0, 0%, 80%)'
    }
  },
  textarea: {
    border: '1px solid hsl(0, 0%, 86%)',
    borderRadius: '4px',
    padding: '14px 12px',
    fontSize: '15px',
    fontWeight: '300',
    color: 'hsl(0, 0%, 30%)',
    flexGrow: '2',
    marginBottom: '40px',
    lineHeight: '1.2em',
    '&:focus': {
      outline: '1px solid hsl(208, 100%, 57%)'
    },
    '&::placeholder': {
      color: 'hsl(0, 0%, 80%)'
    }
  },
  btnBack: {
    cursor: 'pointer',
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    left: '10px',
    top: '13px',
    fontSize: '11px',
    color: 'hsl(207, 90%, 45%)',
    textTransform: 'uppercase',
    '& > .material-icons': {
      fontSize: '22px'
    }
  }
};

/* =============================================================================
=    GraphQL
============================================================================= */
const ACTION = gql`
mutation sendMail(
  $name: String!,
  $email: String!,
  $message: String!,
  $subject: String
) {
  sendMail(name: $name, email: $email, message: $message, subject: $subject)
}
`;
const mapActionsToProps = ({ mutate }) => ({
  sendMail: (name, email, message, subject) => mutate({
    variables: { name, email, message, subject }
  })
});
const withGraphQL = graphql(ACTION, {
  props: mapActionsToProps
});
const mapDispatchToProps = dispatch => ({
  onClose: () => dispatch(closeFeedback())
});

export default compose(
  injectSheet(styles),
  withGraphQL,
  connect(null, mapDispatchToProps)
)(Feedback);
