Attaché is in early development. Most of the documentation below are specs that the project aims to implement.

# TL;DR

Attaché is a SERP tracker. It crosses the presence of pages against results of search terms and reports that periodically.

A typical use case would be: every week, I want to receive in my WhatsApp the ranking of pages `company.com` and `landing-page.com` in Google searches against terms `service`, `service my-city` and `service my-neighborhood`.

# Main Concepts

**Page:** a [URL](https://en.wikipedia.org/wiki/URL) (or part of it) to be checked against search results. The page is what we want to appear as close to the first search result as possible.

**Term:** one or more keywords to search periodically. Something as `my service` or `my service my city`.

**Snapshot:** the ordered list of pages as they appear in the result of an organic search. The snapshot also holds metadata like when the search ran. The app takes snapshots for every term daily.

**Ranking:** the position of a page in a specific snapshot.

**Stake:** a combination of pages and terms that Attaché will track periodically. A stake will typically combine pages and terms related to a product, service, or personal interest.

**Channel:** a setup to receive reports. For example: WhatsApp +1 (555) 555-5555 or email me@email.com.

**Subscription:** a stake, linked channels, and a frequency to send reports to those channels.

# Reports

Reports are data aggregations exploring snapshots and rankings. They are materialized in some channel or as a CSV file.

Metrics are the base of every report.

## Metrics

**Page Ranking Evolution:** The daily ranking of a page against a term during a period.

**Page Ranking Aggregation:** A page ranking against term searches during a period, aggregated at a monthly pace. The metric averages months rankings.

## Channels and Periods

The report then will be an instantiation of some metric in a channel with a standard period. We have :
- The last 30 days "Page Ranking Evolution" in WhatsApp.
- The last 30 days "Page Ranking Evolution" in Email.
- The last 12 months "Page Ranking Aggregation" in Email.

# App Architecture

*Describe the main technical components, where the code lives and they relationship*

# How to Develop

*The steps needed to get the repo and put things in motion in the local development and testing*

## Development Environment Variables
FIREBASE_PROJECT_ID=attache-11863
FIRESTORE_EMULATOR_HOST=localhost:8080
SCALE_SERP_KEY=KJKLEWKHR879845HUIHFWJ
SNAPSHOOTER_FREQUENCY=60

# Deploy App

*How to manually and automatically deploy the app*

## Production Environment Variables
SCALE_SERP_KEY=KJKLEWKHR879845HUIHFWJ
SNAPSHOOTER_FREQUENCY=60

# License
Made by [João Melo](https://twitter.com/joaomeloplus) and licensed under the GNU General Public License v3.0 - see the [LICENSE](LICENSE) file for details.