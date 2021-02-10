Attaché is in early development. Most of the documentation below are specs that the project aims to implement.

# TL;DR

Attaché is a minimal SERP tracker. It crosses the presence of pages against results of search terms and reports that periodically.

A valid use case would be: every week, I want to receive in my email the updated ranking of pages `company.com` and `landing-page.com` in Google searches against terms `service`, `service my-city` and `service my-neighborhood`.
# Stakes

A  Stake is a record combining pages and terms that Attaché will take snapshots daily. The Stake will also contain a list of emails to send weekly ranking reports.

**Page:** a [URL](https://en.wikipedia.org/wiki/URL) (or part of it) to be checked against search results. The page is what we want to appear as close to the first search result as possible.

**Term:** one or more keywords to search periodically. Something as `my service` or `my service my city`.

**Snapshot:** the ordered list of pages as they appear in the result of an organic search. The snapshot also holds metadata like when the search ran. The app takes snapshots for every term daily.

# Rankings

A Ranking is a weekly report exploring the position of Pages in Snapshots. It is an e-mail with one or more synthetic charts and an annexed CSV file with the details.

The Ranking will have a chart for every term in the corresponding Stake. Every page in the Stake will be a line in the chart. The line will show the page position in that term search results during time. 

# Stack

*Describe the main technical components they relationships and where they live in the code*

# Develop

*The steps needed to get the repo and put things in motion in the local development and testing*

## Development Environment Variables
FIREBASE_PROJECT_ID=attache-11863
FIRESTORE_EMULATOR_HOST=localhost:8080
SCALE_SERP_KEY=KJKLEWKHR879845HUIHFWJ

# Deploy App

*How to manually and automatically deploy the app*

## Production Environment Variables
SCALE_SERP_KEY=KJKLEWKHR879845HUIHFWJ

# License
Made by [João Melo](https://twitter.com/joaomeloplus) and licensed under the GNU General Public License v3.0 - see the [LICENSE](LICENSE) file for details.