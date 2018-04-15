# Requirements

This section documents the requirements associated with this project. Design 
requirements are listed here but detailed within their own documents within
this directory.

All assumptions and the scope of work is listed within this file. If more
more detail is required then associated documents within this directory will
be added.


## Client Statement of Work

Create a “Crypto currency dashboard” that:

* Connects to the coinmarketcap API https://coinmarketcap.com/api/
* Displays the $USD value of various crypto currencies
* Creation of a crypto currency portfolio with the insertion of multiple numeric crypto currency holdings e.g. 0.75 BTC and save in a database store of your choice
* Load a saved portfolio
* Display a portfolio’s total value in $USD
* Programming languages allowed: Javascript, NodeJS, HTML5, CSS

All work should be committed into a git repository that you can share with us (ie. Github) to provide evidence of version control


## Scope of Work

Unfortunately due to restriction on available time, no time was available to
do a proper requirements analysis or feedback session with the client. This
would be absolutely enssential given the vagueness of the statement of work.

With this restriction, I have specified a scope of work to mark the boundries
of the project. These are covered by the below assumptions and taken into
account within the design requirements.

This is a pre-sales proof-of-concept development:

* Should have adequate unit testing/e2e for confidence in customer presentation
* Only required for limited concurrent users that a single node instance can 
support
* No requiremnts on installation/deployment scripts
* No CI integration required
* Support only Chrome Browser (v65+)

This is also a solo-project, so there will be no reviews before the presented
to the client (not exactly a good idea under normal circumstances!).


## Work Assumptions

1. TypeScript was not allowed
2. May use any public javascript/css library/framework
3. Must comply with the usage policy of the coinmarketcap API 
https://coinmarketcap.com/api/
4. User data persists across sessions and devices

## Design Requirements

