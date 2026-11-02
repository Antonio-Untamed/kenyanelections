CREATE TABLE IF NOT EXISTS app_state (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  payload TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS submissions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  payload TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS results (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  payload TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT OR IGNORE INTO results (payload, created_at) VALUES (
  '{"id":1,"name":"Nakuru Town East","county":"Nakuru","status":"Verified","total":12430,"winners":[{"name":"Amani Kariuki","party":"Unity Alliance","votes":4655},{"name":"Zawadi Otieno","party":"Progress Party","votes":3580},{"name":"Hassan Juma","party":"Civic Front","votes":2180},{"name":"Neema Chebet","party":"Green Future","votes":2015}]}',
  CURRENT_TIMESTAMP
);

INSERT OR IGNORE INTO results (payload, created_at) VALUES (
  '{"id":2,"name":"Nyali","county":"Mombasa","status":"Pending","total":11890,"winners":[{"name":"Amani Kariuki","party":"Unity Alliance","votes":4215},{"name":"Zawadi Otieno","party":"Progress Party","votes":3395},{"name":"Hassan Juma","party":"Civic Front","votes":2280},{"name":"Neema Chebet","party":"Green Future","votes":2000}]}',
  CURRENT_TIMESTAMP
);

INSERT OR IGNORE INTO results (payload, created_at) VALUES (
  '{"id":3,"name":"Kisumu Central","county":"Kisumu","status":"Verified","total":13140,"winners":[{"name":"Amani Kariuki","party":"Unity Alliance","votes":4820},{"name":"Zawadi Otieno","party":"Progress Party","votes":3740},{"name":"Hassan Juma","party":"Civic Front","votes":2440},{"name":"Neema Chebet","party":"Green Future","votes":2140}]}',
  CURRENT_TIMESTAMP
);
