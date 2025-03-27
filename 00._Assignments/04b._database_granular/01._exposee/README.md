# PostgreSQL Granular Data Documentation

## Overview

This documentation demonstrates granular data access control in PostgreSQL

## Prerequisites

### 1. Install Docker

- Download and install [Docker](https://www.docker.com/products/docker-desktop/)

### 2. Install PostgreSQL

For macOS:

```bash
# Install PostgreSQL
brew install libpq
```

For Windows:

- Download and install [PostgreSQL](https://www.postgresql.org/download/windows/)

## Database Connection Details

```plaintext
Host: localhost
Port: 5432
Database: employee_db
```

## Available Users

1. **Restricted User** (Minimal Access)

   ```
   Username: restricted_user
   Password: restrict123
   Access Level: Can only view basic employee information
   ```

2. **Read User** (Read-only Access)

   ```
   Username: read_user
   Password: read123
   Access Level: Can read most employee data except sensitive notes
   ```

3. **Write User** (Department-specific Access)
   ```
   Username: write_user
   Password: write123
   Access Level: Full access to IT department records only
   ```

## Setup Instructions

### 1. Start PostgreSQL Container

```bash
docker run --name granular-data -e POSTGRES_PASSWORD=admin123 -p 5432:5432 -d postgres:17
```

### 2. Initialize Database

Navigate to the project directory and run the setup script:

```bash
sh setup_db.sh
```

This script will:

- Create the database and tables
- Set up permissions and users
- Insert test data

## Testing Access Levels

### 1. Restricted User Tests

Connect as restricted_user:

```bash
psql -h localhost -p 5432 -U restricted_user -d employee_db
```

Try these queries:

```sql
-- Should succeed
SELECT * FROM public_employee_info;

-- Should fail
SELECT * FROM employees;
SELECT * FROM departments;
```

### 2. Read User Tests

Connect as read_user:

```bash
psql -h localhost -p 5432 -U read_user -d employee_db
```

Try these queries:

```sql
-- Should succeed
SELECT first_name, last_name, email, salary, department FROM employees;

-- Should fail
SELECT sensitive_notes FROM employees;
INSERT INTO employees (first_name, last_name) VALUES ('Test', 'User');
```

### 3. Write User Tests

Connect as write_user:

```bash
psql -h localhost -p 5432 -U write_user -d employee_db
```

Try these queries:

```sql
-- Should succeed
SELECT * FROM employees WHERE department = 'IT';
INSERT INTO employees (first_name, last_name, department) VALUES ('John', 'Doe', 'IT');

-- Should fail
SELECT * FROM employees WHERE department = 'Sales';
INSERT INTO employees (first_name, last_name, department) VALUES ('Jane', 'Doe', 'Sales');
```

## Expected Results

### Restricted User

- Can only view basic employee information
- Cannot access salary or email
- Cannot write

### Read User

- Can view employee information
- Cannot write

### Write User

- Can read and write IT department records
