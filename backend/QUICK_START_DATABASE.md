# Quick Start Guide - Car Repair Service Database

## Prerequisites

- MySQL 8.0 or higher installed
- MySQL client or MySQL Workbench
- Basic SQL knowledge

## Installation Steps

### Step 1: Install MySQL (if not already installed)

#### Windows
```bash
# Download from: https://dev.mysql.com/downloads/mysql/
# Or use Chocolatey:
choco install mysql
```

#### Mac
```bash
brew install mysql
brew services start mysql
```

#### Linux (Ubuntu/Debian)
```bash
sudo apt update
sudo apt install mysql-server
sudo systemctl start mysql
sudo mysql_secure_installation
```

### Step 2: Create Database

#### Option A: Command Line
```bash
# Navigate to the backend directory
cd "c:\Users\User\OneDrive\Desktop\cff final promp\backend"

# Import the schema
mysql -u root -p < database_schema.sql
```

#### Option B: MySQL Workbench
1. Open MySQL Workbench
2. Connect to your MySQL server
3. File → Open SQL Script → Select `database_schema.sql`
4. Execute the script (⚡ lightning icon or Ctrl+Shift+Enter)

#### Option C: Manual via MySQL CLI
```bash
mysql -u root -p

# Then in MySQL prompt:
source c:/Users/User/OneDrive/Desktop/cff final promp/backend/database_schema.sql
```

### Step 3: Verify Installation

```sql
-- Connect to the database
USE car_repair_service;

-- Check all tables exist (should return 12 tables)
SHOW TABLES;

-- Check sample data loaded
SELECT COUNT(*) AS category_count FROM service_categories;
SELECT COUNT(*) AS service_count FROM services;

-- View available services
SELECT 
    sc.name AS category, 
    s.name AS service, 
    s.price 
FROM services s
JOIN service_categories sc ON s.category_id = sc.id
ORDER BY sc.display_order, s.display_order;
```

Expected output:
```
+----------------------------+
| Tables_in_car_repair_service |
+----------------------------+
| appointment_services       |
| appointments               |
| customers                  |
| invoice_items              |
| invoices                   |
| mechanics                  |
| refresh_tokens             |
| reviews                    |
| service_categories         |
| services                   |
| users                      |
| vehicles                   |
+----------------------------+
12 rows in set
```

### Step 4: Create Application Database User

For security, create a dedicated user for your application:

```sql
-- Create user (change password!)
CREATE USER 'car_repair_app'@'localhost' 
IDENTIFIED BY 'YourSecurePassword123!';

-- Grant necessary privileges
GRANT SELECT, INSERT, UPDATE, DELETE 
ON car_repair_service.* 
TO 'car_repair_app'@'localhost';

-- Grant procedure execution
GRANT EXECUTE 
ON car_repair_service.* 
TO 'car_repair_app'@'localhost';

-- Apply changes
FLUSH PRIVILEGES;

-- Verify
SHOW GRANTS FOR 'car_repair_app'@'localhost';
```

### Step 5: Test Database Operations

#### Insert Test Customer
```sql
USE car_repair_service;

-- Insert a test customer
INSERT INTO customers (id, first_name, last_name, email, phone, is_vip)
VALUES (UUID(), 'Test', 'Customer', 'test@example.com', '+1-555-9999', FALSE);

-- Verify
SELECT * FROM customers WHERE email = 'test@example.com';
```

#### Insert Test Vehicle
```sql
-- Get customer ID
SET @customer_id = (SELECT id FROM customers WHERE email = 'test@example.com');

-- Insert vehicle
INSERT INTO vehicles (id, customer_id, make, model, year, vin, license_plate, color)
VALUES (UUID(), @customer_id, 'Toyota', 'Camry', 2020, '1HGBH41JXMN109186', 'ABC-1234', 'Silver');

-- Verify
SELECT * FROM vehicles WHERE customer_id = @customer_id;
```

#### Create Test Appointment
```sql
-- Get IDs
SET @customer_id = (SELECT id FROM customers WHERE email = 'test@example.com');
SET @vehicle_id = (SELECT id FROM vehicles WHERE customer_id = @customer_id LIMIT 1);
SET @service_id = (SELECT id FROM services WHERE name = 'Standard Oil Change');

-- Create appointment
SET @appointment_id = UUID();
INSERT INTO appointments (
    id, customer_id, vehicle_id, scheduled_date, 
    duration, status, priority
)
VALUES (
    @appointment_id, @customer_id, @vehicle_id, 
    DATE_ADD(NOW(), INTERVAL 2 DAY),
    45, 'Pending', 0
);

-- Add service to appointment
INSERT INTO appointment_services (id, appointment_id, service_id, price, estimated_minutes)
SELECT UUID(), @appointment_id, id, price, estimated_minutes
FROM services WHERE id = @service_id;

-- View appointment with auto-calculated total
SELECT * FROM vw_appointment_details WHERE appointment_id = @appointment_id;
```

## Configuration for .NET Application

### Update appsettings.json

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=car_repair_service;User=car_repair_app;Password=YourSecurePassword123!;CharSet=utf8mb4;"
  }
}
```

### Install Required NuGet Packages

```bash
dotnet add package Pomelo.EntityFrameworkCore.MySql
dotnet add package Microsoft.EntityFrameworkCore.Design
```

### Update Program.cs or Startup.cs

```csharp
// Add these using statements
using Microsoft.EntityFrameworkCore;
using Pomelo.EntityFrameworkCore.MySql;

// In ConfigureServices or builder.Services
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseMySql(connectionString, 
        ServerVersion.AutoDetect(connectionString)));
```

## Common Operations

### Reset Database (CAUTION: Deletes all data!)

```sql
DROP DATABASE IF EXISTS car_repair_service;
```

Then run the schema file again.

### Backup Database

```bash
# Full backup
mysqldump -u root -p car_repair_service > backup_$(date +%Y%m%d).sql

# Structure only (no data)
mysqldump -u root -p --no-data car_repair_service > schema_backup.sql

# Data only (no structure)
mysqldump -u root -p --no-create-info car_repair_service > data_backup.sql
```

### Restore Database

```bash
mysql -u root -p car_repair_service < backup_20260302.sql
```

### View Active Appointments

```sql
SELECT * FROM vw_appointment_details
WHERE scheduled_date >= CURDATE()
    AND status NOT IN ('Cancelled', 'Completed')
ORDER BY scheduled_date;
```

### Check Mechanic Availability

```sql
-- Check who's available on a specific date/time
CALL sp_get_available_mechanics('2026-03-15 10:00:00', 120);
```

### Generate Invoice

```sql
-- After appointment is completed
SET @appointment_id = 'your-appointment-uuid';
SET @invoice_id = UUID();

-- Create invoice
INSERT INTO invoices (id, appointment_id, invoice_number, invoice_date, status)
VALUES (
    @invoice_id, 
    @appointment_id,
    CONCAT('INV-', DATE_FORMAT(NOW(), '%Y%m%d'), '-', LPAD(FLOOR(RAND() * 9999), 4, '0')),
    NOW(),
    'Pending'
);

-- Add line items from appointment services
INSERT INTO invoice_items (id, invoice_id, description, quantity, unit_price, total_price, item_type)
SELECT 
    UUID(),
    @invoice_id,
    s.name,
    1,
    aps.price,
    aps.price,
    'Service'
FROM appointment_services aps
JOIN services s ON aps.service_id = s.id
WHERE aps.appointment_id = @appointment_id
    AND aps.is_deleted = FALSE;

-- Calculate totals (includes tax)
CALL sp_calculate_invoice_totals(@invoice_id);

-- View invoice
SELECT * FROM vw_invoice_summary WHERE invoice_id = @invoice_id;
```

## Troubleshooting

### Issue: "Access denied for user"
```sql
-- Check user exists and has correct privileges
SELECT User, Host FROM mysql.user WHERE User = 'car_repair_app';
SHOW GRANTS FOR 'car_repair_app'@'localhost';

-- If needed, recreate user (Step 4 above)
```

### Issue: "Unknown database"
```sql
-- List all databases
SHOW DATABASES;

-- If car_repair_service missing, re-run schema file
```

### Issue: Slow queries
```sql
-- Check if indexes exist
SHOW INDEXES FROM appointments;

-- Analyze query performance
EXPLAIN SELECT * FROM vw_appointment_details WHERE scheduled_date >= CURDATE();

-- Optimize tables
OPTIMIZE TABLE appointments;
OPTIMIZE TABLE appointment_services;
```

### Issue: Trigger not firing
```sql
-- List all triggers
SHOW TRIGGERS;

-- Check trigger code
SHOW CREATE TRIGGER trg_update_appointment_total_after_service_insert;

-- If needed, drop and recreate from schema file
```

### Issue: Stored procedure errors
```sql
-- List procedures
SHOW PROCEDURE STATUS WHERE Db = 'car_repair_service';

-- View procedure code
SHOW CREATE PROCEDURE sp_calculate_invoice_totals;

-- Test procedure
CALL sp_calculate_invoice_totals('your-invoice-uuid');
```

## Performance Optimization Tips

### 1. Enable Query Cache (MySQL 5.7 and earlier)
```sql
SET GLOBAL query_cache_type = ON;
SET GLOBAL query_cache_size = 67108864; -- 64MB
```

### 2. Monitor Slow Queries
```sql
-- Enable slow query log
SET GLOBAL slow_query_log = 'ON';
SET GLOBAL long_query_time = 2; -- Queries taking > 2 seconds

-- Check slow queries
SELECT * FROM mysql.slow_log ORDER BY start_time DESC LIMIT 10;
```

### 3. Analyze Table Statistics
```sql
ANALYZE TABLE appointments;
ANALYZE TABLE appointment_services;
ANALYZE TABLE invoices;
```

### 4. Monitor Table Sizes
```sql
SELECT 
    table_name,
    ROUND(((data_length + index_length) / 1024 / 1024), 2) AS size_mb,
    table_rows
FROM information_schema.tables
WHERE table_schema = 'car_repair_service'
ORDER BY (data_length + index_length) DESC;
```

## Next Steps

1. ✅ Database created and verified
2. ✅ Test data inserted successfully
3. 📝 Configure connection string in application
4. 📝 Create Entity Framework entities (or use existing Domain entities)
5. 📝 Test database operations from application
6. 📝 Implement repository pattern
7. 📝 Add data seeding for production
8. 📝 Set up automated backups
9. 📝 Configure monitoring and alerts

## Resources

- **MySQL Documentation**: https://dev.mysql.com/doc/
- **Entity Framework Core**: https://docs.microsoft.com/ef/core/
- **Pomelo EF Core Provider**: https://github.com/PomeloFoundation/Pomelo.EntityFrameworkCore.MySql
- **Database Design Best Practices**: See `DATABASE_DOCUMENTATION.md`
- **ER Diagram**: See `ER_DIAGRAM.md`

## Support

For issues or questions:
1. Check `DATABASE_DOCUMENTATION.md` for detailed information
2. Review the troubleshooting section above
3. Consult MySQL error logs: `/var/log/mysql/error.log` (Linux) or MySQL Workbench → Server → Server Logs

---

**✨ Database setup complete! You're ready to build your Car Repair Service application.**
