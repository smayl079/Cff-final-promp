# Car Repair Service - Database Documentation

## Overview
This document provides comprehensive documentation for the Car Repair Service relational database implemented in MySQL.

## Entity-Relationship Diagram (ERD) Description

```
┌─────────────┐       ┌──────────────┐       ┌─────────────┐
│   USERS     │──1:M──│ REFRESH_     │       │  MECHANICS  │
│             │       │  TOKENS      │       │             │
│ • id (PK)   │       │              │       │ • id (PK)   │
│ • email     │       │ • id (PK)    │       │ • user_id   │
│ • role      │       │ • user_id(FK)│       │ • hourly_   │
│ • phone     │       │ • token      │       │   rate      │
└──────┬──────┘       └──────────────┘       └──────┬──────┘
       │ 1:1                                        │
       │                                            │ 1:M
       │                                            │
       └──────────────────────────────┐            │
                                      │            │
┌─────────────┐       ┌──────────────▼───┐        │
│  CUSTOMERS  │──1:M──│   APPOINTMENTS   │◄───────┘
│             │       │                  │
│ • id (PK)   │       │ • id (PK)        │
│ • email     │       │ • customer_id(FK)│
│ • phone     │       │ • vehicle_id (FK)│
│ • is_vip    │       │ • mechanic_id(FK)│
└──────┬──────┘       │ • scheduled_date │
       │              │ • status         │
       │ 1:M          │ • total_amount   │
       │              └────┬────┬────────┘
       │                   │    │ 1:1
       │                   │    │
┌──────▼──────┐            │    │       ┌──────────────┐
│  VEHICLES   │            │    └──────►│   INVOICES   │
│             │◄───────────┘            │              │
│ • id (PK)   │ 1:M                     │ • id (PK)    │
│ • customer_ │                         │ • appt_id(FK)│
│   id (FK)   │                         │ • invoice_   │
│ • make      │                         │   number     │
│ • model     │                         │ • total_     │
│ • vin       │                         │   amount     │
│ • year      │                         └──────┬───────┘
└─────────────┘                                │ 1:M
                                               │
       ┌───────────────────────┐               │
       │ APPOINTMENT_SERVICES  │         ┌─────▼────────┐
       │   (Junction Table)    │         │ INVOICE_     │
       │                       │         │ ITEMS        │
       │ • id (PK)             │         │              │
       │ • appointment_id (FK) │         │ • id (PK)    │
       │ • service_id (FK)     │         │ • invoice_   │
       │ • price (snapshot)    │         │   id (FK)    │
       └───────┬───────┬───────┘         │ • description│
               │       │                 │ • quantity   │
            M:1│       │1:M              └──────────────┘
               │       │
        ┌──────▼───────▼──────┐
        │     SERVICES        │
        │                     │
        │ • id (PK)           │
        │ • category_id (FK)  │
        │ • name              │
        │ • price             │
        │ • estimated_minutes │
        └───────────┬─────────┘
                    │ M:1
                    │
        ┌───────────▼─────────┐
        │ SERVICE_CATEGORIES  │
        │                     │
        │ • id (PK)           │
        │ • name              │
        │ • display_order     │
        └─────────────────────┘

        ┌─────────────┐
        │   REVIEWS   │
        │             │
        │ • id (PK)   │
        │ • customer_ │
        │   id (FK)   │
        │ • appt_id   │
        │   (FK)      │
        │ • rating    │
        │ • comment   │
        └─────────────┘
```

## Database Tables

### 1. **users** Table
Stores user authentication and profile information for all system users.

| Column | Type | Description |
|--------|------|-------------|
| id | CHAR(36) | Primary key (UUID) |
| email | VARCHAR(255) | Unique email address |
| password_hash | VARCHAR(255) | Hashed password |
| first_name | VARCHAR(100) | User's first name |
| last_name | VARCHAR(100) | User's last name |
| phone | VARCHAR(20) | Contact phone number |
| role | ENUM | User role (Customer, Mechanic, Receptionist, Manager, Admin) |
| is_active | BOOLEAN | Account status |
| email_verified | BOOLEAN | Email verification status |
| last_login_at | DATETIME | Last login timestamp |
| failed_login_attempts | INT | Security: failed login counter |
| locked_until | DATETIME | Security: account lock timestamp |

**Key Features:**
- Supports multiple user roles via ENUM
- Built-in security features (account locking, failed attempts)
- Soft delete support

### 2. **customers** Table
Stores detailed information about service customers.

| Column | Type | Description |
|--------|------|-------------|
| id | CHAR(36) | Primary key (UUID) |
| first_name | VARCHAR(100) | Customer's first name |
| last_name | VARCHAR(100) | Customer's last name |
| email | VARCHAR(255) | Unique email address |
| phone | VARCHAR(20) | Primary phone number |
| address | TEXT | Full address |
| date_of_birth | DATE | Birth date |
| is_vip | BOOLEAN | VIP status flag |
| notes | TEXT | Additional customer notes |

**Key Features:**
- Separate from users table (customers may not have user accounts)
- VIP program support
- Complete contact information

### 3. **mechanics** Table
Stores mechanic profiles and employment information.

| Column | Type | Description |
|--------|------|-------------|
| id | CHAR(36) | Primary key (UUID) |
| user_id | CHAR(36) | Foreign key to users table |
| first_name | VARCHAR(100) | Mechanic's first name |
| last_name | VARCHAR(100) | Mechanic's last name |
| specializations | TEXT | Areas of expertise |
| certifications | TEXT | Professional certifications |
| hire_date | DATE | Employment start date |
| hourly_rate | DECIMAL(10,2) | Billing rate per hour |
| is_active | BOOLEAN | Employment status |

**Key Features:**
- Links to users table for authentication
- Tracks specialized skills and certifications
- Hourly rate for billing purposes

### 4. **vehicles** Table
Stores information about customer vehicles (cars).

| Column | Type | Description |
|--------|------|-------------|
| id | CHAR(36) | Primary key (UUID) |
| customer_id | CHAR(36) | Foreign key to customers |
| make | VARCHAR(50) | Vehicle manufacturer |
| model | VARCHAR(50) | Vehicle model |
| year | INT | Manufacturing year |
| vin | VARCHAR(17) | Vehicle Identification Number (unique) |
| license_plate | VARCHAR(20) | License plate number |
| color | VARCHAR(30) | Vehicle color |
| mileage | INT | Current mileage |

**Key Features:**
- One customer can own multiple vehicles
- VIN uniqueness constraint
- Year validation (1900 to current year + 1)

### 5. **service_categories** Table
Organizes services into logical categories.

| Column | Type | Description |
|--------|------|-------------|
| id | CHAR(36) | Primary key (UUID) |
| name | VARCHAR(100) | Unique category name |
| description | TEXT | Category description |
| display_order | INT | Sort order for UI |
| is_active | BOOLEAN | Category status |

**Pre-loaded Categories:**
- Oil Change
- Brake Service
- Tire Service
- Engine Diagnostics
- Electrical
- Air Conditioning
- Transmission
- General Maintenance

### 6. **services** Table
Defines available repair and maintenance services.

| Column | Type | Description |
|--------|------|-------------|
| id | CHAR(36) | Primary key (UUID) |
| category_id | CHAR(36) | Foreign key to service_categories |
| name | VARCHAR(150) | Service name |
| description | TEXT | Detailed description |
| price | DECIMAL(10,2) | Base price |
| price_max | DECIMAL(10,2) | Maximum price (for ranges) |
| estimated_minutes | INT | Time estimate |
| is_active | BOOLEAN | Service availability |
| display_order | INT | Sort order within category |
| image_url | VARCHAR(500) | Service image URL |

**Key Features:**
- Price ranges support (min/max)
- Time estimation for scheduling
- Image support for marketing

### 7. **appointments** Table
Central table for booking and tracking service appointments.

| Column | Type | Description |
|--------|------|-------------|
| id | CHAR(36) | Primary key (UUID) |
| customer_id | CHAR(36) | Foreign key to customers |
| vehicle_id | CHAR(36) | Foreign key to vehicles |
| mechanic_id | CHAR(36) | Foreign key to mechanics (nullable) |
| scheduled_date | DATETIME | Appointment date and time |
| duration | INT | Duration in minutes |
| status | ENUM | Appointment status |
| notes | TEXT | Customer notes |
| mechanic_notes | TEXT | Internal mechanic notes |
| total_amount | DECIMAL(10,2) | Total cost (auto-calculated) |
| priority | INT | Priority level (0-2) |

**Status Values:**
- Pending
- Confirmed
- InProgress
- Completed
- Cancelled
- NoShow

**Priority Levels:**
- 0 = Normal
- 1 = Urgent
- 2 = Emergency

### 8. **appointment_services** Table
Junction table linking appointments to services (many-to-many).

| Column | Type | Description |
|--------|------|-------------|
| id | CHAR(36) | Primary key (UUID) |
| appointment_id | CHAR(36) | Foreign key to appointments |
| service_id | CHAR(36) | Foreign key to services |
| price | DECIMAL(10,2) | Price snapshot at booking |
| estimated_minutes | INT | Time snapshot at booking |

**Key Features:**
- Preserves historical pricing (price snapshots)
- Prevents price changes from affecting past bookings
- Unique constraint prevents duplicate service assignments

### 9. **invoices** Table
Manages billing and payment tracking.

| Column | Type | Description |
|--------|------|-------------|
| id | CHAR(36) | Primary key (UUID) |
| appointment_id | CHAR(36) | Foreign key to appointments (unique) |
| invoice_number | VARCHAR(50) | Unique invoice identifier |
| invoice_date | DATETIME | Invoice creation date |
| due_date | DATETIME | Payment due date |
| sub_total | DECIMAL(10,2) | Pre-tax total |
| tax_amount | DECIMAL(10,2) | Tax amount |
| total_amount | DECIMAL(10,2) | Final total |
| amount_paid | DECIMAL(10,2) | Amount received |
| status | ENUM | Invoice status |
| notes | TEXT | Invoice notes |

**Status Values:**
- Draft
- Pending
- Paid
- PartiallyPaid
- Overdue
- Cancelled

**Key Features:**
- One-to-one relationship with appointments
- Automatic status updates based on payment
- Tax calculation support

### 10. **invoice_items** Table
Itemized breakdown of invoice charges.

| Column | Type | Description |
|--------|------|-------------|
| id | CHAR(36) | Primary key (UUID) |
| invoice_id | CHAR(36) | Foreign key to invoices |
| description | VARCHAR(255) | Item description |
| quantity | INT | Item quantity |
| unit_price | DECIMAL(10,2) | Price per unit |
| total_price | DECIMAL(10,2) | Line item total |
| item_type | ENUM | Type of charge |

**Item Types:**
- Service
- Part
- Labor
- Other

### 11. **reviews** Table
Customer feedback and ratings.

| Column | Type | Description |
|--------|------|-------------|
| id | CHAR(36) | Primary key (UUID) |
| customer_id | CHAR(36) | Foreign key to customers |
| appointment_id | CHAR(36) | Foreign key to appointments (unique) |
| rating | INT | Rating (1-5 stars) |
| comment | TEXT | Review text |

**Key Features:**
- One review per appointment
- 5-star rating system
- Links to both customer and service appointment

### 12. **refresh_tokens** Table
JWT refresh token management for authentication.

| Column | Type | Description |
|--------|------|-------------|
| id | CHAR(36) | Primary key (UUID) |
| user_id | CHAR(36) | Foreign key to users |
| token | VARCHAR(500) | Unique refresh token |
| expires_at | DATETIME | Token expiration |
| is_revoked | BOOLEAN | Revocation status |

## Database Views

### vw_appointment_details
Complete appointment information with customer, vehicle, mechanic, and services.

**Usage:**
```sql
SELECT * FROM vw_appointment_details 
WHERE scheduled_date >= CURDATE()
ORDER BY scheduled_date;
```

### vw_invoice_summary
Invoice overview with customer information and payment status.

**Usage:**
```sql
SELECT * FROM vw_invoice_summary 
WHERE status = 'Pending'
ORDER BY invoice_date DESC;
```

### vw_customer_vehicle_history
Customer service history and lifetime value.

**Usage:**
```sql
SELECT * FROM vw_customer_vehicle_history 
WHERE total_spent > 1000
ORDER BY total_spent DESC;
```

## Stored Procedures

### sp_calculate_invoice_totals
Calculates invoice subtotal, tax, and total from line items.

**Parameters:**
- `p_invoice_id` (CHAR(36)) - Invoice ID

**Usage:**
```sql
CALL sp_calculate_invoice_totals('invoice-uuid-here');
```

### sp_get_available_mechanics
Finds mechanics available for a specific date and duration.

**Parameters:**
- `p_scheduled_date` (DATETIME) - Desired appointment date/time
- `p_duration` (INT) - Appointment duration in minutes

**Usage:**
```sql
CALL sp_get_available_mechanics('2026-03-15 10:00:00', 120);
```

## Database Triggers

### Appointment Total Calculation
- `trg_update_appointment_total_after_service_insert`
- `trg_update_appointment_total_after_service_update`
- `trg_update_appointment_total_after_service_delete`

Automatically recalculates `appointments.total_amount` when services are added, updated, or removed.

### Invoice Status Management
- `trg_update_invoice_status`

Automatically updates invoice status based on payment amount:
- Full payment → Status: Paid
- Partial payment → Status: PartiallyPaid
- No payment → Status: Pending

## Design Patterns & Best Practices

### 1. Soft Delete Pattern
All tables include `is_deleted` flag instead of physical deletion:
- Maintains referential integrity
- Enables data recovery
- Supports audit trails

### 2. Audit Trail
Every table tracks:
- `created_at` - Record creation timestamp
- `updated_at` - Last modification timestamp
- `created_by` - Creator identifier
- `updated_by` - Last modifier identifier

### 3. Price Snapshots
`appointment_services` stores price at booking time:
- Prevents historical data corruption
- Maintains billing accuracy
- Supports price history analysis

### 4. UUID Primary Keys
All tables use CHAR(36) UUIDs:
- Distributed system friendly
- Prevents ID conflicts in replication
- Enhanced security (non-sequential)

### 5. Optimistic Locking Ready
`updated_at` timestamp supports optimistic concurrency control in application layer.

## Indexing Strategy

### Primary Indexes
- All tables have UUID primary key indexes
- Ensures unique identification

### Foreign Key Indexes
- All foreign keys automatically indexed
- Optimizes JOIN operations

### Business Logic Indexes
- Email addresses (users, customers)
- License plates and VINs (vehicles)
- Appointment dates and statuses
- Invoice numbers and dates

### Composite Indexes
- `appointments(customer_id, scheduled_date)`
- `appointments(mechanic_id, scheduled_date)`
- `vehicles(customer_id, is_deleted)`

## Query Examples

### Find all appointments for a customer
```sql
SELECT * FROM vw_appointment_details
WHERE customer_email = 'jane.doe@email.com'
ORDER BY scheduled_date DESC;
```

### Calculate mechanic workload
```sql
SELECT 
    m.first_name, 
    m.last_name,
    COUNT(a.id) AS appointment_count,
    SUM(a.duration) AS total_minutes
FROM mechanics m
LEFT JOIN appointments a ON m.id = a.mechanic_id
WHERE a.scheduled_date BETWEEN '2026-03-01' AND '2026-03-31'
    AND a.status NOT IN ('Cancelled', 'NoShow')
    AND a.is_deleted = FALSE
GROUP BY m.id, m.first_name, m.last_name;
```

### Revenue report by service category
```sql
SELECT 
    sc.name AS category,
    COUNT(DISTINCT a.id) AS appointment_count,
    SUM(aps.price) AS total_revenue
FROM service_categories sc
INNER JOIN services s ON sc.id = s.category_id
INNER JOIN appointment_services aps ON s.id = aps.service_id
INNER JOIN appointments a ON aps.appointment_id = a.id
WHERE a.status = 'Completed'
    AND a.scheduled_date >= DATE_SUB(CURDATE(), INTERVAL 1 MONTH)
GROUP BY sc.id, sc.name
ORDER BY total_revenue DESC;
```

### Outstanding invoices
```sql
SELECT * FROM vw_invoice_summary
WHERE status IN ('Pending', 'PartiallyPaid', 'Overdue')
    AND balance_due > 0
ORDER BY invoice_date;
```

## Installation Instructions

### 1. Create Database
```bash
mysql -u root -p < database_schema.sql
```

### 2. Verify Installation
```sql
USE car_repair_service;
SHOW TABLES;
SELECT COUNT(*) FROM service_categories;
```

### 3. Create Application User (Optional)
```sql
CREATE USER 'car_repair_app'@'localhost' IDENTIFIED BY 'your_secure_password';
GRANT SELECT, INSERT, UPDATE, DELETE ON car_repair_service.* TO 'car_repair_app'@'localhost';
GRANT EXECUTE ON car_repair_service.* TO 'car_repair_app'@'localhost';
FLUSH PRIVILEGES;
```

## Connection String Example

### C# (.NET)
```csharp
"Server=localhost;Database=car_repair_service;User=car_repair_app;Password=your_password;CharSet=utf8mb4;"
```

### Node.js
```javascript
{
  host: 'localhost',
  database: 'car_repair_service',
  user: 'car_repair_app',
  password: 'your_password',
  charset: 'utf8mb4'
}
```

## Maintenance Recommendations

### Daily
- Monitor failed login attempts
- Check appointment conflicts

### Weekly
- Review outstanding invoices
- Analyze mechanic utilization

### Monthly
- Archive old soft-deleted records
- Optimize frequently accessed tables
- Review and update indexes based on query patterns

### Quarterly
- Full database backup
- Review and clean up test data
- Performance audit

## Security Considerations

1. **Password Storage**: Always hash passwords (bcrypt with salt)
2. **SQL Injection**: Use parameterized queries exclusively
3. **Access Control**: Implement row-level security in application layer
4. **Audit Logging**: Log all data modifications
5. **Encryption**: Encrypt sensitive data at rest and in transit
6. **Backup Strategy**: Regular automated backups with off-site storage

## Future Enhancements

### Potential Additions
- Parts inventory management
- Employee time tracking
- Customer loyalty program
- SMS/Email notification system
- Document attachments (photos, PDFs)
- Multi-location support
- Warranty tracking
- Service packages/bundles
- Fleet management for commercial customers

## Support & Documentation

For questions or issues, refer to:
- MySQL Official Documentation: https://dev.mysql.com/doc/
- Project README: See backend/README.md
- API Documentation: See backend/CarRepairService.API/

---

**Version:** 1.0  
**Last Updated:** March 2, 2026  
**Database Engine:** MySQL 8.0+  
**Character Set:** UTF8MB4  
**Collation:** utf8mb4_unicode_ci
