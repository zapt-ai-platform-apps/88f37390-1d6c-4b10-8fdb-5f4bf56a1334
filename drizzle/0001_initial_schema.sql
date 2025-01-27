CREATE TABLE departments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE employees (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  date_of_joining DATE NOT NULL,
  department_id UUID REFERENCES departments(id),
  reporting_manager_id UUID REFERENCES employees(id),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE leave_balances (
  employee_id UUID PRIMARY KEY REFERENCES employees(id),
  pl_balance INT DEFAULT 15,
  cl_balance INT DEFAULT 12,
  last_updated TIMESTAMP DEFAULT NOW()
);

CREATE TABLE leave_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id UUID REFERENCES employees(id),
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  leave_type TEXT CHECK (leave_type IN ('PL', 'CL')),
  status TEXT CHECK (status IN ('PENDING', 'APPROVED', 'REJECTED')) DEFAULT 'PENDING',
  created_at TIMESTAMP DEFAULT NOW()
);