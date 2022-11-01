DROP TABLE historical_actions, historical_prices, historical_assets, historical_values;

CREATE TABLE IF NOT EXISTS historical_prices (
  id serial PRIMARY KEY,
  ticker VARCHAR(16),
  close NUMERIC,
  date DATE
);

CREATE TABLE IF NOT EXISTS historical_actions (
  id serial PRIMARY KEY,
  ticker VARCHAR(16),
  date DATE,
  type VARCHAR(16),
  value NUMERIC
);

CREATE TABLE IF NOT EXISTS historical_assets (
  id serial PRIMARY KEY,
  ticker VARCHAR(16),
  asset_class VARCHAR(64),
  asset_category VARCHAR(64),
  name VARCHAR(128)
);

CREATE TABLE IF NOT EXISTS historical_values (
  id serial PRIMARY KEY,
  ticker VARCHAR(16),
  date DATE,
  value NUMERIC
);

CREATE INDEX historical_prices_ticker ON historical_prices(ticker);
CREATE INDEX historical_actions_ticker ON historical_actions(ticker);
CREATE INDEX historical_assets_ticker ON historical_assets(ticker);
CREATE INDEX historical_values_ticker ON historical_values(ticker);
