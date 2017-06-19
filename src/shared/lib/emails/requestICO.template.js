/* eslint-disable */
export default function generateHTMLForEmail({
  name,
  symbol,
  raise,
  tokens_sold,
  start_date,
  notes,
  email,
  person_name
}) {
  return `
  <style>
    body, html {
      margin: 0px;
      padding: 0px;
    }
    html {
      height: 0px;
    }
    h1 {
      margin: 0;
    }
    p {
      margin: 0;
    }
    .details {
      line-height: 1.5em;
    }
  </style>
  <h1>
    New ICO Stats Listing Request
  </h1>
  <p>
    ${person_name} has requested to have an ICO listed on ICOStats.com - the
    details are below:
  </p>
  <div class="details">
    <strong>Name of ICO:</strong> ${name}
    <strong>Symbol:</strong> ${symbol}
    <strong>USD Raised:</strong> ${raise}
    <strong># of Tokens Sold:</strong> ${tokens_sold}
    <strong>ICO Start Date:</strong> ${start_date}
    <strong>Email:</strong> ${email}
  </div>
  <br/>
  <strong>Addiional Notes:</strong>
  <p style="margin-top: 0px;">
    ${notes.replace(/\n/g, '<br />')}
  </p>
    `;
  }
