
export function createPendingMail (tracks, sentMail, { render }) {
  const mails = convertTracksToMails(tracks, { render });
  const pendingMail = mails.filter(m => !sentMail.find(s =>
    s.stakeId === m.stakeId && s.to === m.to
  ));

  return pendingMail;
}

export function convertTracksToMails (tracks, { render }) {
  const subject = 'Attaché - Track Report';

  return tracks.flatMap(r => {
    const message = render(r);
    const stakeId = r.stake.id;

    return r.stake.emails.map(to => ({
      to,
      subject,
      message,
      stakeId
    }));
  });
}
