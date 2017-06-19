/* eslint-disable */
export default function generateHTMLForEmail({ email, message }) {
  return `
    <h1>ICO Stats Feedback</h1>

    <p>
      A user has submitted the following feedback via ICOStats.com:
    </p>

    <strong>Email:</strong> ${email}
    <br />
    <strong>Feedback:</strong>
    <p>
      ${message.replace(/\n/g, '<br />')}
    </p>
  `;
}
