#!/bin/bash
echo "Starting database setup..."

PGPASSWORD=admin123 psql -h localhost -p 5432 -U postgres << EOF

DROP DATABASE IF EXISTS employee_db;

\i db_setup.sql
\i db_testdata.sql
\i db_permissions.sql

\l
\c employee_db
\du
\dt
EOF

echo "Database setup completed!"