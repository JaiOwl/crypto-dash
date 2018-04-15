# Design

## Release v0.0.1

### Feature 1 - Initial Mock Design

Objective:

1. Visualise the interface and demonstrate a concept for the display
2. Identify data display formats and presentation
3. Understand scaling and spacial area of presentation
4. Provide visual aid to guid implementation

Expected Output:

* Mock Screens for Dashboard page
* Mock Screens for Portfolios page
* Mock Screens for Portfolio page


### Feature 2 - Initial NodeJS Server Project

Objective:

1. Create a NodeJS Express HTTP Server project capable of hosting:
    1. RESTful API based interface to clients
    2. Static content
2. Create a build chain that builds and creates a distribution that can run the
server.

Expected Output:

* Server sub-project
* Simple Express NodeJS based HTTP Server hosting static content from 
configurable location
* Simple API Router for :/api route prefixes


### Feature 3 - Initial VueJS Client Project

Objective:

1. Create a VueJS Client SPA using the Vue-CLI tool.
2. SPA application with a simple router for three stub pages:
    1. Dashboard page (the default home page)
    2. Portfolios page
    3. Portfolio page (sub route of portfolios based on portfolio id)
3. Integration of client into build chain so distribution hosts the applciation
as static content

Expected Output:

* Client sub-project
* Simple VueJS application based on preset template


### Feature 4 - Simple Crypto-Currency Dashboard

Objective:

1. Display a set of Cypto-Currencies within Dashboard page
    1. Should cover at-least the top 24 Cypto-Currencies
    2. Each currency should display
        1. Name
        2. Symbol
        3. Current Price in USD
        4. Percentage change over the last 7 days, 24 hours, and last hour
    3. Currencies should be ordered by highest Price
2. Display should update at regular interval (every 10mins inline with API updates)
3. Server should provide API for client to GET all currency records

Expected Output:

* Dashboard page which displays updating prices for at-least 24 crypto-currencies
hosted via the distribution build


### Feature 5 - Public Portfolios

Objective:

1. Display a list of all Portfolios within the Portfolios page
    1. Should show all portfolios
    2. Each Porfolio should display
        1. Name
        2. Value
        3. Investment Gain/Loss (value and percentage)
        4. Percentage change over the last 7 days, 24 hours, and last hour based
        on associated portfolio inventory
    3. Portfolios should be ordered bu hishest value
2. Display Portfolio details on dedicated page
    1. Summary of Portfolio value
    2. Listing of all Portfolio inventory
    3. Each portfolio inventory shoud display
        1. Name
        2. Unit count
        3. Value at current price
        4. Percentage change of currency over the last 7 days, 24 hours, and last hour
        5. Value difference from purchase cost
    4. Listing of all transactions of the Portfolio
    5. Each prtfolio transaction should display
        1. Whether was buy or sell (do not include trades)
        2. Crypto Currency of transaction
        3. Number of units
        4. Value of currency at time of purchase
        5. Total Cost/Price of Buy/Sell Transaction (ie. Value + Fees)
        6. Date of transaction
    6. Ability to rename portfolio
    7. Ability to delete portfolio
3. Should update on associated currency value updates
4. Server should provide API to:
    1. Retrieve all portfolio records
    2. Each Portfolio record contains:
        1. Portfolio name
        2. List inventory
        3. List of transations
    3. Add new Portfolio Record
    4. Update Portfolio Record
    5. Delete Portfolio Record
    6. Add new Transaction Record

Nb. Will not support editing/deleting existing transactions ATM

Expected Output:

* Portfolios Page displaying a portfolio summary for each saved Portfolio
* Ability to add a new Portfolio from the portfolios page
* Ability to navigate to a specific Portfolio's page
* Portfolio Page displaying:
    * a summary of the portfolio
    * a listing of portfolio cryto-currencies (with sumary of value/performance)
    * a listing of transactions (BUY/SELL) associated with the Portfolio


### Feature 6 - User Accounts

Objective:

1. Provide ability for user to login
2. Only show portfolios associated with the user's account
3. Require user to login to see portfolios

Expected Output:

* Sign in option
* Restricted access to portfolios page
* Only access to portfolios of logged in user

Nb. Not intended to cover a user sharing multi sessions
