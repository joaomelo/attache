import sgMail from '@sendgrid/mail';

export function createSendGridDispatch ({ defaults, key, logger }) {
  sgMail.setApiKey(key);

  return async mail => {
    const completeMail = {
      to: mail.to,
      subject: mail.subject,
      ...defaults
    };

    const messageKey = mail.message.includes('<html>') ? 'html' : 'text';
    completeMail[messageKey] = mail.message;

    try {
      const responses = await sgMail.send(completeMail);
      return responses[0];
    } catch (error) {
      logger.error(`error while trying to dispatch: "${error.message}"`);
    }
  };
}
