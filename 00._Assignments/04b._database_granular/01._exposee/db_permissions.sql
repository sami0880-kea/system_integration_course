-- Create users with different access levels
CREATE USER read_user WITH PASSWORD 'read123';
CREATE USER write_user WITH PASSWORD 'write123';
CREATE USER restricted_user WITH PASSWORD 'restrict123';

-- Create view for restricted access
CREATE VIEW public_employee_info AS 
SELECT first_name, last_name, department 
FROM employees;

-- Enable Row Level Security
ALTER TABLE employees ENABLE ROW LEVEL SECURITY;

-- Create policy for department-based access
CREATE POLICY department_access ON employees
    FOR ALL
    TO write_user
    USING (department = 'IT');

-- Grant permissions
GRANT SELECT ON public_employee_info TO restricted_user;
GRANT SELECT ON public_employee_info TO read_user;
GRANT SELECT ON employees TO read_user;
GRANT SELECT, INSERT, UPDATE ON employees TO write_user;

-- Grant sequence permissions
GRANT USAGE, SELECT ON SEQUENCE employees_id_seq TO write_user;