export async function dispatchMails (mails, { dispatch }) {
  const promises = mails.map(async mail => {
    await dispatch(mail);
    return mail;
  });
  const result = await Promise.allSettled(promises);

  return result
    .filter(r => r.status === 'fulfilled')
    .map(r => r.value);
}
