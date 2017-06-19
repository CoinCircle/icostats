/* eslint-disable import/prefer-default-export */
import nodemailer from 'nodemailer';
import settings from 'settings';
import Promise from 'bluebird';

const transporter = nodemailer.createTransport({
  service: 'Mailgun',
  auth: {
    user: settings.SMTP_USERNAME,
    pass: settings.SMTP_PASSWORD
  }
});

Promise.promisifyAll(transporter);

export async function sendMail(
  name,
  email,
  message,
  subject = 'ICO Stats Feedback'
) {
  const options = {
    subject,
    from: `"${name}" <${email}>`,
    replyTo: email,
    to: 'me@cooperm.com',
    text: message,
    html: message.replace(/\n/g, '<br/>')
  };

  try {
    await transporter.sendMailAsync(options);
    return true;
  } catch (err) {
    throw new Error(err.message);
  }
}
