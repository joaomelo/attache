import { renderTrackReport } from '../../app/view/email';

export function convertTracksToMails (tracks) {
  const subject = 'Attaché - Track Report';

  return tracks.flatMap(r => {
    const message = renderTrackReport(r);
    const stakeId = r.stake.id;

    return r.stake.emails.map(to => ({
      to,
      subject,
      message,
      stakeId
    }));
  });
}
