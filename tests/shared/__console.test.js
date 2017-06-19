/**
 * This has no real test. Its just used as a sort of REPL. If tests are running
 * in watch mode, this is a good place to use as a REPL as it is built by
 * webpack, allowing all babel features to work, unlike the node console.
 */
import { sendMail } from 'server/lib/mail';
import generateHTMLForEmail from 'shared/lib/emails/feedback.template.js';

const message = `This is a solid ICO.

They have a reputation for getting things done and have successfully IPO'd
3 companies in the past.

You can check Louis at http:/linkedin.com/u/louis123

Call me at 3109897067

Thanks, Jim`;

describe.only('Console', function () {
  const data = {
    email: 'john.doe@gmail.com',
    message
  };
  const html = generateHTMLForEmail(data);

  sendMail('John Doe', 'john.doe@gmail.com', html);
});
