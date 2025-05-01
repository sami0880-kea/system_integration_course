@echo off
echo Starting database setup...

set PGPASSWORD=admin123
psql -h localhost -p 5432 -U postgres < db_setup.sql
psql -h localhost -p 5432 -U postgres < db_testdata.sql
psql -h localhost -p 5432 -U postgres < db_permissions.sql

psql -h localhost -p 5432 -U postgres -c "\l"
psql -h localhost -p 5432 -U postgres -d employee_db -c "\du"
psql -h localhost -p 5432 -U postgres -d employee_db -c "\dt"

echo Database setup completed! 