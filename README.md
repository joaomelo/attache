# TL;DR

Attache is in early development. The goal is to build a SERP tracker. It crosses the presence of pages against results of search terms and reports that periodically.

A typical use case would be: every week, I want to receive in my WhatsApp the ranking of pages `company.com` and `landing-page.com` in Google searches against terms `service`, `service my-city` and `service my-neighborhood`.

# Main Concepts

**Page:** a [URL](https://en.wikipedia.org/wiki/URL) (or part of it) to be checked against search terms results. This is what our want to appear in the first search result.

**Term:** one or more keywords to run in a single search.

**Snapshot:** the ordered list of pages in the organic search result of a term enhanced with metadata like when the search ran and how many results where tracked.

**Ranking:** the position of a page against a specifically snapshot.

**Stake:** combination of pages and terms to be ranked periodically. Represents an product, service or any personal interest.

**Contact:** a channel setup to send reports to - e.g: WhatsApp +1 (555) 555-5555 or email me@email.com.

**Subscription:** a stake and some contacts to receive reports about its rankings.

# Frequencies

Snapshots for all stakes' terms are attempted daily. This frequency is adopted also for creating rankings for stakes pages.

Stakes reports are dispatched accordingly to each subscription setup. The options are daily, weekly or monthly. 