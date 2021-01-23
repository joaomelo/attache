# TL;DR

Attache is in early development. The goal is to build a SERP tracker. It crosses the presence of pages against results of search terms and reports that periodically.

A typical use case would be: every week, I want to receive in my WhatsApp the ranking of pages `company.com` and `landing-page.com` in Google searches against terms `service`, `service my-city` and `service my-neighborhood`.

# Main Concepts

**Page:** a [URL](https://en.wikipedia.org/wiki/URL) (or part of it) to be checked against search terms results. This is what our want to appear in the first search result.

**Term:** one or more keywords to run in a single search.

**Snapshot:** the ordered list of pages in the organic search result of a term enhanced with metadata like when the search ran and how many results where tracked.

**Ranking:** the position of a page against a specifically snapshot.

**Stake:** combination of pages and terms to be ranked daily. Represents an product, service or any personal interest.

**Contact:** a channel setup to send reports to - e.g: WhatsApp +1 (555) 555-5555 or email me@email.com.

**Subscription:** a stake, some contacts and a frequency to receive reports about its rankings. Frequency options are daily, weekly or monthly.

# Reports

Reports should be available in a rendered form but also in CSV data format.

## Metrics

This base data series are the base to create configurable reports.

**Page Ranking Evolution Metrics:** The available daily ranking of a page against a term during a time period.

**Page Ranking Aggregation Metrics:** The same page ranking against a terms during a time period, but now presented in a monthly pace. For each month there is the average ranking and how many positions the page variated from the last month and the same month in last year.

## Reports

...

# How to Use It

## Snapshooter Service

The snapshooter service while running will take snapshots for every term of all stakes periodically.

The frequency is a positive integer extracted the ENV_VARIABLE environment variable. The variable unit is minute. The default value is 60.

Snapshots are taken once a day. So, multiple daily cycles (every hour for example) are useful only to catch new terms added during the same day.
