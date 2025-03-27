-- Insert sample employee data
INSERT INTO employees (first_name, last_name, email, salary, department)
VALUES 
('Alice', 'Smith', 'alice@company.com', 60000, 'IT'),
('Bob', 'Jones', 'bob@company.com', 75000, 'Sales'),
('Carol', 'Wilson', 'carol@company.com', 90000, 'Executive');

-- Insert sample department data
INSERT INTO departments (name, budget)
VALUES 
('IT', 500000),
('Sales', 750000),
('Executive', 1000000);