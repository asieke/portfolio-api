#!/bin/bash

echo "----------------------"
echo "Initializing DB Schema"
echo "----------------------"

DIR=`dirname $0`

echo "----------------------"
echo "Fetching Historical Data"
echo "----------------------"

node "./$DIR/scripts/generateHistoricalCSV.js"

psql -d diversa -f "./$DIR/SCHEMA.sql"
psql -d diversa -c "\copy historical_assets(ticker, asset_class, asset_category, name) from './$DIR/csv/historical_assets.csv'"
psql -d diversa -c "\copy historical_prices(date, ticker, close) from './$DIR/csv/historical_crypto.csv'"
psql -d diversa -c "\copy historical_prices(ticker, date, close) from './$DIR/csv/historical_prices.csv'"
psql -d diversa -c "\copy historical_actions(ticker, type, date, value) from './$DIR/csv/historical_actions.csv'"