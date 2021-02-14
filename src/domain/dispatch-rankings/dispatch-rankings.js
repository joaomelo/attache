import { renderRanking } from '../../app/view/email';

export async function dispatchRankings (rankings, { dispatch }) {
  const mails = convertRankingsToMail(rankings);
  const promises = mails.map(async mail => {
    await dispatch(mail);
    return mail;
  });
  const sentMails = await Promise.allSettled(promises);
  return sentMails;
}

function convertRankingsToMail (rankings) {
  const subject = 'attaché - stake ranking';

  return rankings.flatMap(r => {
    const message = renderRanking(r);
    const stakeId = r.stake.id;

    return r.stake.emails.map(to => ({
      to,
      subject,
      message,
      stakeId
    }));
  });
}
