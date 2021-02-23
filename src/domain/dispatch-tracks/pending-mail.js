import { mountTracks } from '../tracks';
import { renderTrackReport } from '../../app/view';

export function determinePendingMail (stakes, snapshots, sentMail) {
  const tracks = mountTracks(stakes, snapshots);
  const mails = convertTracksToMails(tracks);
  const pendingMail = mails.filter(m => !sentMail.find(s =>
    s.stakeId === m.stakeId && s.to === m.to
  ));

  return pendingMail;
}

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
