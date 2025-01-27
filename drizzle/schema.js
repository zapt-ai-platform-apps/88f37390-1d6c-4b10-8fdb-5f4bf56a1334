import { pgTable, uuid, text, date, integer, timestamp } from 'drizzle-orm/pg-core';

export const departments = pgTable('departments', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const employees = pgTable('employees', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  dateOfJoining: date('date_of_joining').notNull(),
  departmentId: uuid('department_id').references(() => departments.id),
  reportingManagerId: uuid('reporting_manager_id').references(() => employees.id),
  createdAt: timestamp('created_at').defaultNow(),
});

export const leaveBalances = pgTable('leave_balances', {
  employeeId: uuid('employee_id').primaryKey().references(() => employees.id),
  plBalance: integer('pl_balance').default(15),
  clBalance: integer('cl_balance').default(12),
  lastUpdated: timestamp('last_updated').defaultNow(),
});

export const leaveApplications = pgTable('leave_applications', {
  id: uuid('id').primaryKey().defaultRandom(),
  employeeId: uuid('employee_id').references(() => employees.id),
  startDate: date('start_date').notNull(),
  endDate: date('end_date').notNull(),
  leaveType: text('leave_type').$type<'PL' | 'CL'>().notNull(),
  status: text('status').$type<'PENDING' | 'APPROVED' | 'REJECTED'>().default('PENDING'),
  createdAt: timestamp('created_at').defaultNow(),
});