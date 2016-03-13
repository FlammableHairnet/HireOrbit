create database if not exists hireorbit;


\connect hireorbit;


create table indeed_jobs (
  internal_id SERIAL PRIMARY KEY,
  jobtitle text,
  company text,
  city text,
  state text,
  country text,
  formattedLocation text,
  source text,
  date timestamp,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  snippet text,
  url text,
  latitude text,
  longitude text,
  jobkey text,
  UNIQUE (jobkey),
  sponsored boolean,
  expired boolean,
  indeedApply boolean,
  formattedLocationFull text,
  noUniqueUrl boolean,
  formattedRelativeTime text,
  onmousedown text
);

create table users (
  internal_id SERIAL PRIMARY KEY,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  username text NOT NULL,
  UNIQUE (username),
  name text,
  github_avatar_url text,
  github_html_url text,
  github_access_token text,
  github_refresh_token text
);

create table saved_searches (
  internal_id SERIAL PRIMARY KEY,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  user_id integer NOT NULL REFERENCES users (internal_id)
);

create table jobs_saved_searches (
  internal_id SERIAL PRIMARY KEY,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  jobkey_id text NOT NULL REFERENCES indeed_jobs (jobkey),
  saved_search_id integer NOT NULL REFERENCES saved_searches (internal_id)
);

create table workflow_state (
  internal_id SERIAL PRIMARY KEY,
  state text NOT NULL,
  jobkey_id text NOT NULL REFERENCES indeed_jobs (jobkey),
  user_id integer NOT NULL REFERENCES users (internal_id)
);


CREATE OR REPLACE FUNCTION update_modified_column() 
RETURNS TRIGGER AS $$
BEGIN
    NEW.modified = now();
    RETURN NEW; 
END;
$$ language 'plpgsql';

CREATE TRIGGER update_indeed_jobs_modtime BEFORE UPDATE ON indeed_jobs FOR EACH ROW EXECUTE PROCEDURE  update_modified_column();
CREATE TRIGGER update_saved_searches_modtime BEFORE UPDATE ON saved_searches FOR EACH ROW EXECUTE PROCEDURE  update_modified_column();
CREATE TRIGGER update_jobs_saved_searches_modtime BEFORE UPDATE ON jobs_saved_searches FOR EACH ROW EXECUTE PROCEDURE  update_modified_column();
CREATE TRIGGER update_workflow_state_modtime BEFORE UPDATE ON workflow_state FOR EACH ROW EXECUTE PROCEDURE  update_modified_column();
CREATE TRIGGER update_users_modtime BEFORE UPDATE ON users FOR EACH ROW EXECUTE PROCEDURE  update_modified_column();
