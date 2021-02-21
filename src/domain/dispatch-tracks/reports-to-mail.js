import { renderTrackReport } from '../../app/view/email';

export function convertReportsToMails (reports) {
  const subject = 'Attaché - Track Report';

  return reports.flatMap(r => {
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
