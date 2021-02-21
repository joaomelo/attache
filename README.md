[![codecov](https://codecov.io/gh/joaomelo/attache/branch/main/graph/badge.svg?token=9H7SY34E7I)](https://codecov.io/gh/joaomelo/attache)

# TL;DR

Attaché is a minimal SERP tracker built with personal use in mind. It periodically reports the position of pages in organic search results.

The use case would be: every week, I want to receive in my email the updated Ranking of pages `company.com` and `landing-page.com` in searches against the Terms `service`, `service my-city` and `service my-neighborhood`.

# Main concepts

**Stake:** combination of pages and terms that Attaché will take Snapshots daily. The Stake will also contain a list of emails to send weekly ranking reports.

**Page:** part of an [URL](https://en.wikipedia.org/wiki/URL) to be checked against search results. The Page is what we want to appear as close to the first search result as possible.

**Term:** one or more keywords to search periodically. Something as `my service` or `my service my city`.

**Snapshot:** ordered list of pages as they appear in the result of an organic search. The Snapshot also holds metadata like when the search ran. The app takes daily Snapshots for every Term.

**Ranking:** time series of Pages positions in Snapshots. 

**Trend:** time series of the first Page in Snapshots. 

**Track Report:** weekly email report with Serp data about a Stake. Stake's Terms will be presented with its last seven days Trend and Rankings for every Page in the Stake. 

# How It Works

Attaché is a combination of two background services that run periodically. The first is the `snapshotsScheduledService` which takes and saves Snapshots for every Stake's Terms in the database.

The second is the `tracksScheduledService`. It dispatches email reports with Rankings and Trends data for every Stake.

Both services run in [Cloud Functions for Firebase](https://firebase.google.com/docs/functions) and use [Cloud Firestore](https://firebase.google.com/docs/firestore) as database. 

Attaché is developed using Javascript and takes advantage of the language thriving open source library ecosystem. It also relies upon [Scale SERP](https://www.scaleserp.com/) to take search Snapshots and [Send Grid](https://sendgrid.com/) to dispatch emails. 

# Stack

*Describe the main technical components they relationships and where they live in the code*

# Develop

*The steps needed to get the repo and put things in motion in the local development and testing*

## Development Environment Variables
FIRESTORE_EMULATOR_HOST=localhost:8080 // not only port but signals firebase is running in non production env
SCALE_SERP_KEY=asdasdasd
SEND_GRID_KEY=SG.asdasdasdadasdasdd
DEFAULT_FROM_EMAIL=asdsadasdasdasd@sdfdsfsdf.hoisach

# Deploy App

*How to manually and automatically deploy the app*

## Production Environment Variables
SCALE_SERP_KEY=KJKLEWKHR879845HUIHFWJ

# License
Made by [João Melo](https://twitter.com/joaomeloplus) and licensed under the GNU General Public License v3.0 - see the [LICENSE](LICENSE) file for details.