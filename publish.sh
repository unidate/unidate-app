#!/bin/sh
# This will build, package and upload the app to GitHub.
yarn run build && GH_TOKEN=undefined node_modules/.bin/build -mw -p always
