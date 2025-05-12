# Migration

## Command

### Create Scheme

`npx knex --knexfile knexfile.js --env pg migrate:make create_users_table`

### Migrate

`npx knex --knexfile knexfile.js --env pg migrate:latest`

## Database Connection

### MySQL

#### Connect to MySQL

```bash
docker compose exec mysql mysql -u user -ppassword mysqldb
```

#### MySQL Commands

```sql
# List all tables in the database
SHOW TABLES;

# Show users table
DESCRIBE users;

# Show all users
SELECT * FROM users;
```

### PostgreSQL

#### Connect to PostgreSQL

```bash
docker compose exec postgres psql -U user -d postgresdb
```

#### PostgreSQL Commands

```sql
# List all tables in the database
\dt

# Show users table
\d users

# Show all users
SELECT * FROM users;
```
