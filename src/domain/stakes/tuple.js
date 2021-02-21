export function tupleTermsAndPages (stakes) {
  return stakes.flatMap(s =>
    s.terms.flatMap(t =>
      s.pages.map(p => [t, p])
    )
  );
}
