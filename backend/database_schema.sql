-- =====================================================
-- Car Repair Service Database Schema - MySQL
-- =====================================================
-- Author: Database Architect
-- Date: March 2, 2026
-- Description: Complete relational database schema for 
--              car repair service management system
-- =====================================================

-- Drop existing database if exists (for clean setup)
DROP DATABASE IF EXISTS car_repair_service;
CREATE DATABASE car_repair_service CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE car_repair_service;

-- =====================================================
-- 1. USERS TABLE
-- =====================================================
CREATE TABLE users (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    role ENUM('Customer', 'Mechanic', 'Receptionist', 'Manager', 'Admin') NOT NULL DEFAULT 'Customer',
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    email_verified BOOLEAN NOT NULL DEFAULT FALSE,
    last_login_at DATETIME,
    failed_login_attempts INT NOT NULL DEFAULT 0,
    locked_until DATETIME,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by VARCHAR(100),
    updated_by VARCHAR(100),
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
    
    INDEX idx_email (email),
    INDEX idx_role (role),
    INDEX idx_is_active (is_active),
    INDEX idx_is_deleted (is_deleted)
) ENGINE=InnoDB;

-- =====================================================
-- 2. REFRESH TOKENS TABLE
-- =====================================================
CREATE TABLE refresh_tokens (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    user_id CHAR(36) NOT NULL,
    token VARCHAR(500) NOT NULL UNIQUE,
    expires_at DATETIME NOT NULL,
    is_revoked BOOLEAN NOT NULL DEFAULT FALSE,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by VARCHAR(100),
    updated_by VARCHAR(100),
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_token (token),
    INDEX idx_user_id (user_id),
    INDEX idx_expires_at (expires_at)
) ENGINE=InnoDB;

-- =====================================================
-- 3. CUSTOMERS TABLE
-- =====================================================
CREATE TABLE customers (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(20) NOT NULL,
    address TEXT,
    date_of_birth DATE,
    is_vip BOOLEAN NOT NULL DEFAULT FALSE,
    notes TEXT,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by VARCHAR(100),
    updated_by VARCHAR(100),
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
    
    INDEX idx_email (email),
    INDEX idx_phone (phone),
    INDEX idx_is_vip (is_vip),
    INDEX idx_is_deleted (is_deleted)
) ENGINE=InnoDB;

-- =====================================================
-- 4. MECHANICS TABLE
-- =====================================================
CREATE TABLE mechanics (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    user_id CHAR(36) NOT NULL UNIQUE,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    specializations TEXT,
    certifications TEXT,
    hire_date DATE NOT NULL,
    hourly_rate DECIMAL(10, 2) NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by VARCHAR(100),
    updated_by VARCHAR(100),
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_is_active (is_active),
    INDEX idx_is_deleted (is_deleted)
) ENGINE=InnoDB;

-- =====================================================
-- 5. VEHICLES (CARS) TABLE
-- =====================================================
CREATE TABLE vehicles (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    customer_id CHAR(36) NOT NULL,
    make VARCHAR(50) NOT NULL,
    model VARCHAR(50) NOT NULL,
    year INT NOT NULL,
    vin VARCHAR(17) NOT NULL UNIQUE,
    license_plate VARCHAR(20) NOT NULL,
    color VARCHAR(30),
    mileage INT,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by VARCHAR(100),
    updated_by VARCHAR(100),
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
    
    FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE,
    INDEX idx_customer_id (customer_id),
    INDEX idx_vin (vin),
    INDEX idx_license_plate (license_plate),
    INDEX idx_make_model (make, model),
    INDEX idx_is_deleted (is_deleted),
    
    CONSTRAINT chk_year CHECK (year >= 1900 AND year <= YEAR(CURDATE()) + 1),
    CONSTRAINT chk_vin_length CHECK (LENGTH(vin) = 17)
) ENGINE=InnoDB;

-- =====================================================
-- 6. SERVICE CATEGORIES TABLE
-- =====================================================
CREATE TABLE service_categories (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    display_order INT NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by VARCHAR(100),
    updated_by VARCHAR(100),
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
    
    INDEX idx_display_order (display_order),
    INDEX idx_is_active (is_active),
    INDEX idx_is_deleted (is_deleted)
) ENGINE=InnoDB;

-- =====================================================
-- 7. SERVICES TABLE
-- =====================================================
CREATE TABLE services (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    category_id CHAR(36) NOT NULL,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    price_max DECIMAL(10, 2),
    estimated_minutes INT NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    display_order INT NOT NULL DEFAULT 0,
    image_url VARCHAR(500),
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by VARCHAR(100),
    updated_by VARCHAR(100),
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
    
    FOREIGN KEY (category_id) REFERENCES service_categories(id) ON DELETE RESTRICT,
    INDEX idx_category_id (category_id),
    INDEX idx_is_active (is_active),
    INDEX idx_display_order (display_order),
    INDEX idx_is_deleted (is_deleted),
    INDEX idx_name (name),
    
    CONSTRAINT chk_price_positive CHECK (price >= 0),
    CONSTRAINT chk_price_max CHECK (price_max IS NULL OR price_max >= price),
    CONSTRAINT chk_estimated_minutes CHECK (estimated_minutes > 0)
) ENGINE=InnoDB;

-- =====================================================
-- 8. APPOINTMENTS TABLE
-- =====================================================
CREATE TABLE appointments (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    customer_id CHAR(36) NOT NULL,
    vehicle_id CHAR(36) NOT NULL,
    mechanic_id CHAR(36),
    scheduled_date DATETIME NOT NULL,
    duration INT NOT NULL, -- in minutes
    status ENUM('Pending', 'Confirmed', 'InProgress', 'Completed', 'Cancelled', 'NoShow') NOT NULL DEFAULT 'Pending',
    notes TEXT,
    mechanic_notes TEXT,
    total_amount DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    priority INT NOT NULL DEFAULT 0, -- 0=Normal, 1=Urgent, 2=Emergency
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by VARCHAR(100),
    updated_by VARCHAR(100),
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
    
    FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE RESTRICT,
    FOREIGN KEY (vehicle_id) REFERENCES vehicles(id) ON DELETE RESTRICT,
    FOREIGN KEY (mechanic_id) REFERENCES mechanics(id) ON DELETE SET NULL,
    INDEX idx_customer_id (customer_id),
    INDEX idx_vehicle_id (vehicle_id),
    INDEX idx_mechanic_id (mechanic_id),
    INDEX idx_scheduled_date (scheduled_date),
    INDEX idx_status (status),
    INDEX idx_priority (priority),
    INDEX idx_is_deleted (is_deleted),
    
    CONSTRAINT chk_duration CHECK (duration > 0),
    CONSTRAINT chk_total_amount CHECK (total_amount >= 0),
    CONSTRAINT chk_priority CHECK (priority BETWEEN 0 AND 2)
) ENGINE=InnoDB;

-- =====================================================
-- 9. APPOINTMENT_SERVICES TABLE (Junction Table)
-- =====================================================
CREATE TABLE appointment_services (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    appointment_id CHAR(36) NOT NULL,
    service_id CHAR(36) NOT NULL,
    price DECIMAL(10, 2) NOT NULL, -- Price snapshot at booking time
    estimated_minutes INT NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by VARCHAR(100),
    updated_by VARCHAR(100),
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
    
    FOREIGN KEY (appointment_id) REFERENCES appointments(id) ON DELETE CASCADE,
    FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE RESTRICT,
    INDEX idx_appointment_id (appointment_id),
    INDEX idx_service_id (service_id),
    INDEX idx_is_deleted (is_deleted),
    
    UNIQUE KEY unique_appointment_service (appointment_id, service_id),
    CONSTRAINT chk_as_price CHECK (price >= 0),
    CONSTRAINT chk_as_minutes CHECK (estimated_minutes > 0)
) ENGINE=InnoDB;

-- =====================================================
-- 10. INVOICES (PAYMENTS) TABLE
-- =====================================================
CREATE TABLE invoices (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    appointment_id CHAR(36) NOT NULL UNIQUE,
    invoice_number VARCHAR(50) NOT NULL UNIQUE,
    invoice_date DATETIME NOT NULL,
    due_date DATETIME,
    sub_total DECIMAL(10, 2) NOT NULL,
    tax_amount DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    total_amount DECIMAL(10, 2) NOT NULL,
    amount_paid DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    status ENUM('Draft', 'Pending', 'Paid', 'PartiallyPaid', 'Overdue', 'Cancelled') NOT NULL DEFAULT 'Draft',
    notes TEXT,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by VARCHAR(100),
    updated_by VARCHAR(100),
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
    
    FOREIGN KEY (appointment_id) REFERENCES appointments(id) ON DELETE RESTRICT,
    INDEX idx_appointment_id (appointment_id),
    INDEX idx_invoice_number (invoice_number),
    INDEX idx_invoice_date (invoice_date),
    INDEX idx_status (status),
    INDEX idx_is_deleted (is_deleted),
    
    CONSTRAINT chk_sub_total CHECK (sub_total >= 0),
    CONSTRAINT chk_tax_amount CHECK (tax_amount >= 0),
    CONSTRAINT chk_total_amount CHECK (total_amount >= 0),
    CONSTRAINT chk_amount_paid CHECK (amount_paid >= 0 AND amount_paid <= total_amount)
) ENGINE=InnoDB;

-- =====================================================
-- 11. INVOICE_ITEMS TABLE
-- =====================================================
CREATE TABLE invoice_items (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    invoice_id CHAR(36) NOT NULL,
    description VARCHAR(255) NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    unit_price DECIMAL(10, 2) NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    item_type ENUM('Service', 'Part', 'Labor', 'Other') NOT NULL DEFAULT 'Service',
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by VARCHAR(100),
    updated_by VARCHAR(100),
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
    
    FOREIGN KEY (invoice_id) REFERENCES invoices(id) ON DELETE CASCADE,
    INDEX idx_invoice_id (invoice_id),
    INDEX idx_item_type (item_type),
    INDEX idx_is_deleted (is_deleted),
    
    CONSTRAINT chk_quantity CHECK (quantity > 0),
    CONSTRAINT chk_unit_price CHECK (unit_price >= 0),
    CONSTRAINT chk_total_price CHECK (total_price >= 0)
) ENGINE=InnoDB;

-- =====================================================
-- 12. REVIEWS TABLE
-- =====================================================
CREATE TABLE reviews (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    customer_id CHAR(36) NOT NULL,
    appointment_id CHAR(36) NOT NULL UNIQUE,
    rating INT NOT NULL,
    comment TEXT,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by VARCHAR(100),
    updated_by VARCHAR(100),
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
    
    FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE,
    FOREIGN KEY (appointment_id) REFERENCES appointments(id) ON DELETE CASCADE,
    INDEX idx_customer_id (customer_id),
    INDEX idx_appointment_id (appointment_id),
    INDEX idx_rating (rating),
    INDEX idx_is_deleted (is_deleted),
    
    CONSTRAINT chk_rating CHECK (rating BETWEEN 1 AND 5)
) ENGINE=InnoDB;

-- =====================================================
-- SAMPLE DATA INSERTION
-- =====================================================

-- Insert Service Categories
INSERT INTO service_categories (id, name, description, display_order, is_active) VALUES
(UUID(), 'Oil Change', 'Oil change and lubrication services', 1, TRUE),
(UUID(), 'Brake Service', 'Brake inspection and repair services', 2, TRUE),
(UUID(), 'Tire Service', 'Tire replacement, rotation, and balancing', 3, TRUE),
(UUID(), 'Engine Diagnostics', 'Computer diagnostics and engine repair', 4, TRUE),
(UUID(), 'Electrical', 'Battery, alternator, and electrical system services', 5, TRUE),
(UUID(), 'Air Conditioning', 'AC system service and repair', 6, TRUE),
(UUID(), 'Transmission', 'Transmission service and repair', 7, TRUE),
(UUID(), 'General Maintenance', 'Regular maintenance and inspections', 8, TRUE);

-- Insert Sample Services
INSERT INTO services (id, category_id, name, description, price, price_max, estimated_minutes, is_active, display_order) 
SELECT 
    UUID(),
    id,
    'Standard Oil Change',
    'Complete oil change with filter replacement and multi-point inspection',
    49.99,
    NULL,
    45,
    TRUE,
    1
FROM service_categories WHERE name = 'Oil Change';

INSERT INTO services (id, category_id, name, description, price, price_max, estimated_minutes, is_active, display_order) 
SELECT 
    UUID(),
    id,
    'Synthetic Oil Change',
    'Premium synthetic oil change with filter and inspection',
    79.99,
    NULL,
    45,
    TRUE,
    2
FROM service_categories WHERE name = 'Oil Change';

INSERT INTO services (id, category_id, name, description, price, price_max, estimated_minutes, is_active, display_order) 
SELECT 
    UUID(),
    id,
    'Brake Pad Replacement',
    'Replace front or rear brake pads',
    199.99,
    299.99,
    120,
    TRUE,
    1
FROM service_categories WHERE name = 'Brake Service';

INSERT INTO services (id, category_id, name, description, price, price_max, estimated_minutes, is_active, display_order) 
SELECT 
    UUID(),
    id,
    'Complete Brake Service',
    'Full brake system inspection and service',
    399.99,
    599.99,
    180,
    TRUE,
    2
FROM service_categories WHERE name = 'Brake Service';

INSERT INTO services (id, category_id, name, description, price, price_max, estimated_minutes, is_active, display_order) 
SELECT 
    UUID(),
    id,
    'Tire Rotation',
    'Rotate all four tires for even wear',
    29.99,
    NULL,
    30,
    TRUE,
    1
FROM service_categories WHERE name = 'Tire Service';

INSERT INTO services (id, category_id, name, description, price, price_max, estimated_minutes, is_active, display_order) 
SELECT 
    UUID(),
    id,
    'Engine Diagnostic',
    'Computer diagnostic scan and report',
    89.99,
    NULL,
    60,
    TRUE,
    1
FROM service_categories WHERE name = 'Engine Diagnostics';

-- Insert Sample Admin User
INSERT INTO users (id, email, password_hash, first_name, last_name, phone, role, is_active, email_verified) VALUES
(UUID(), 'admin@carrepair.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYIjJ8TfeZS', 'System', 'Administrator', '+1-555-0100', 'Admin', TRUE, TRUE);

-- Insert Sample Mechanic User and Profile
SET @mechanic_user_id = UUID();
INSERT INTO users (id, email, password_hash, first_name, last_name, phone, role, is_active, email_verified) VALUES
(@mechanic_user_id, 'john.smith@carrepair.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYIjJ8TfeZS', 'John', 'Smith', '+1-555-0101', 'Mechanic', TRUE, TRUE);

INSERT INTO mechanics (id, user_id, first_name, last_name, specializations, certifications, hire_date, hourly_rate, is_active) VALUES
(UUID(), @mechanic_user_id, 'John', 'Smith', 'Engine Repair, Brake Systems, Diagnostics', 'ASE Master Certified', '2020-01-15', 45.00, TRUE);

-- Insert Sample Customer
INSERT INTO customers (id, first_name, last_name, email, phone, address, is_vip, notes) VALUES
(UUID(), 'Jane', 'Doe', 'jane.doe@email.com', '+1-555-0200', '123 Main St, Springfield, IL 62701', FALSE, 'Prefers morning appointments');

-- =====================================================
-- VIEWS FOR COMMON QUERIES
-- =====================================================

-- View: Complete Appointment Details
CREATE VIEW vw_appointment_details AS
SELECT 
    a.id AS appointment_id,
    a.scheduled_date,
    a.status,
    a.total_amount,
    c.first_name AS customer_first_name,
    c.last_name AS customer_last_name,
    c.email AS customer_email,
    c.phone AS customer_phone,
    v.make,
    v.model,
    v.year,
    v.license_plate,
    CONCAT(m.first_name, ' ', m.last_name) AS mechanic_name,
    GROUP_CONCAT(s.name SEPARATOR ', ') AS services
FROM appointments a
INNER JOIN customers c ON a.customer_id = c.id
INNER JOIN vehicles v ON a.vehicle_id = v.id
LEFT JOIN mechanics m ON a.mechanic_id = m.id
LEFT JOIN appointment_services aps ON a.id = aps.appointment_id
LEFT JOIN services s ON aps.service_id = s.id
WHERE a.is_deleted = FALSE
GROUP BY a.id, a.scheduled_date, a.status, a.total_amount,
         c.first_name, c.last_name, c.email, c.phone,
         v.make, v.model, v.year, v.license_plate,
         m.first_name, m.last_name;

-- View: Invoice Summary
CREATE VIEW vw_invoice_summary AS
SELECT 
    i.id AS invoice_id,
    i.invoice_number,
    i.invoice_date,
    i.total_amount,
    i.amount_paid,
    (i.total_amount - i.amount_paid) AS balance_due,
    i.status,
    c.first_name AS customer_first_name,
    c.last_name AS customer_last_name,
    c.email AS customer_email,
    a.scheduled_date AS appointment_date
FROM invoices i
INNER JOIN appointments a ON i.appointment_id = a.id
INNER JOIN customers c ON a.customer_id = c.id
WHERE i.is_deleted = FALSE;

-- View: Customer Vehicle History
CREATE VIEW vw_customer_vehicle_history AS
SELECT 
    c.id AS customer_id,
    CONCAT(c.first_name, ' ', c.last_name) AS customer_name,
    v.id AS vehicle_id,
    CONCAT(v.year, ' ', v.make, ' ', v.model) AS vehicle_info,
    v.license_plate,
    COUNT(a.id) AS total_appointments,
    MAX(a.scheduled_date) AS last_service_date,
    SUM(a.total_amount) AS total_spent
FROM customers c
INNER JOIN vehicles v ON c.id = v.customer_id
LEFT JOIN appointments a ON v.id = a.vehicle_id AND a.is_deleted = FALSE
WHERE c.is_deleted = FALSE AND v.is_deleted = FALSE
GROUP BY c.id, c.first_name, c.last_name, v.id, v.year, v.make, v.model, v.license_plate;

-- =====================================================
-- STORED PROCEDURES
-- =====================================================

-- Procedure: Calculate Invoice Totals
DELIMITER //
CREATE PROCEDURE sp_calculate_invoice_totals(IN p_invoice_id CHAR(36))
BEGIN
    DECLARE v_sub_total DECIMAL(10, 2);
    DECLARE v_tax_rate DECIMAL(5, 4) DEFAULT 0.0825; -- 8.25% tax rate
    DECLARE v_tax_amount DECIMAL(10, 2);
    DECLARE v_total_amount DECIMAL(10, 2);
    
    -- Calculate subtotal from invoice items
    SELECT COALESCE(SUM(total_price), 0) INTO v_sub_total
    FROM invoice_items
    WHERE invoice_id = p_invoice_id AND is_deleted = FALSE;
    
    -- Calculate tax
    SET v_tax_amount = ROUND(v_sub_total * v_tax_rate, 2);
    
    -- Calculate total
    SET v_total_amount = v_sub_total + v_tax_amount;
    
    -- Update invoice
    UPDATE invoices
    SET sub_total = v_sub_total,
        tax_amount = v_tax_amount,
        total_amount = v_total_amount,
        updated_at = CURRENT_TIMESTAMP
    WHERE id = p_invoice_id;
END //
DELIMITER ;

-- Procedure: Get Available Mechanics for Date
DELIMITER //
CREATE PROCEDURE sp_get_available_mechanics(
    IN p_scheduled_date DATETIME,
    IN p_duration INT
)
BEGIN
    SELECT 
        m.id,
        CONCAT(m.first_name, ' ', m.last_name) AS mechanic_name,
        m.specializations
    FROM mechanics m
    WHERE m.is_active = TRUE 
    AND m.is_deleted = FALSE
    AND m.id NOT IN (
        SELECT mechanic_id
        FROM appointments
        WHERE mechanic_id IS NOT NULL
        AND is_deleted = FALSE
        AND status NOT IN ('Cancelled', 'Completed')
        AND (
            (scheduled_date <= p_scheduled_date AND DATE_ADD(scheduled_date, INTERVAL duration MINUTE) > p_scheduled_date)
            OR (scheduled_date < DATE_ADD(p_scheduled_date, INTERVAL p_duration MINUTE) AND DATE_ADD(scheduled_date, INTERVAL duration MINUTE) >= DATE_ADD(p_scheduled_date, INTERVAL p_duration MINUTE))
            OR (scheduled_date >= p_scheduled_date AND scheduled_date < DATE_ADD(p_scheduled_date, INTERVAL p_duration MINUTE))
        )
    );
END //
DELIMITER ;

-- =====================================================
-- TRIGGERS
-- =====================================================

-- Trigger: Update appointment total amount when appointment services change
DELIMITER //
CREATE TRIGGER trg_update_appointment_total_after_service_insert
AFTER INSERT ON appointment_services
FOR EACH ROW
BEGIN
    UPDATE appointments
    SET total_amount = (
        SELECT COALESCE(SUM(price), 0)
        FROM appointment_services
        WHERE appointment_id = NEW.appointment_id AND is_deleted = FALSE
    ),
    updated_at = CURRENT_TIMESTAMP
    WHERE id = NEW.appointment_id;
END //
DELIMITER ;

DELIMITER //
CREATE TRIGGER trg_update_appointment_total_after_service_update
AFTER UPDATE ON appointment_services
FOR EACH ROW
BEGIN
    UPDATE appointments
    SET total_amount = (
        SELECT COALESCE(SUM(price), 0)
        FROM appointment_services
        WHERE appointment_id = NEW.appointment_id AND is_deleted = FALSE
    ),
    updated_at = CURRENT_TIMESTAMP
    WHERE id = NEW.appointment_id;
END //
DELIMITER ;

DELIMITER //
CREATE TRIGGER trg_update_appointment_total_after_service_delete
AFTER UPDATE ON appointment_services
FOR EACH ROW
BEGIN
    IF NEW.is_deleted = TRUE AND OLD.is_deleted = FALSE THEN
        UPDATE appointments
        SET total_amount = (
            SELECT COALESCE(SUM(price), 0)
            FROM appointment_services
            WHERE appointment_id = NEW.appointment_id AND is_deleted = FALSE
        ),
        updated_at = CURRENT_TIMESTAMP
        WHERE id = NEW.appointment_id;
    END IF;
END //
DELIMITER ;

-- Trigger: Update invoice status based on payment
DELIMITER //
CREATE TRIGGER trg_update_invoice_status
BEFORE UPDATE ON invoices
FOR EACH ROW
BEGIN
    IF NEW.amount_paid >= NEW.total_amount THEN
        SET NEW.status = 'Paid';
    ELSEIF NEW.amount_paid > 0 AND NEW.amount_paid < NEW.total_amount THEN
        SET NEW.status = 'PartiallyPaid';
    ELSEIF NEW.amount_paid = 0 THEN
        IF NEW.status != 'Draft' AND NEW.status != 'Cancelled' THEN
            SET NEW.status = 'Pending';
        END IF;
    END IF;
END //
DELIMITER ;

DELIMITER ;

-- =====================================================
-- INDEXES FOR PERFORMANCE OPTIMIZATION
-- =====================================================

-- Additional composite indexes for common query patterns
CREATE INDEX idx_appointments_customer_date ON appointments(customer_id, scheduled_date);
CREATE INDEX idx_appointments_mechanic_date ON appointments(mechanic_id, scheduled_date);
CREATE INDEX idx_appointments_status_date ON appointments(status, scheduled_date);
CREATE INDEX idx_invoices_status_date ON invoices(status, invoice_date);
CREATE INDEX idx_vehicles_customer_deleted ON vehicles(customer_id, is_deleted);

-- =====================================================
-- GRANT PERMISSIONS (Optional - Adjust as needed)
-- =====================================================

-- Create application user with appropriate permissions
-- CREATE USER 'car_repair_app'@'localhost' IDENTIFIED BY 'SecurePassword123!';
-- GRANT SELECT, INSERT, UPDATE, DELETE ON car_repair_service.* TO 'car_repair_app'@'localhost';
-- GRANT EXECUTE ON car_repair_service.* TO 'car_repair_app'@'localhost';
-- FLUSH PRIVILEGES;

-- =====================================================
-- DATABASE SCHEMA COMPLETE
-- =====================================================

-- To verify the schema:
-- SHOW TABLES;
-- DESCRIBE table_name;

-- =====================================================
-- NOTES AND DOCUMENTATION
-- =====================================================
/*
DATABASE DESIGN PRINCIPLES APPLIED:

1. NORMALIZATION:
   - Database is in 3NF (Third Normal Form)
   - No redundant data except for intentional denormalization (price snapshots)
   - Clear separation of concerns

2. REFERENTIAL INTEGRITY:
   - Foreign key constraints ensure data consistency
   - Appropriate CASCADE and RESTRICT actions
   - Proper use of NULL for optional relationships

3. DATA TYPES:
   - CHAR(36) for UUIDs (consistent with .NET GUID)
   - DECIMAL for monetary values (avoids floating point errors)
   - ENUM for fixed value sets (roles, statuses)
   - TEXT for variable length content

4. INDEXING STRATEGY:
   - Primary keys on all tables
   - Foreign keys indexed for JOIN performance
   - Frequently queried columns indexed
   - Composite indexes for common query patterns

5. SOFT DELETE:
   - is_deleted flag instead of physical deletion
   - Maintains data integrity and audit trail
   - Allows data recovery if needed

6. AUDIT TRAIL:
   - created_at, updated_at timestamps
   - created_by, updated_by fields
   - Tracks all data modifications

7. BUSINESS LOGIC:
   - Price snapshots in appointment_services preserve historical pricing
   - Invoice calculations automated via triggers and procedures
   - Status transitions managed automatically

8. SCALABILITY:
   - InnoDB engine for transaction support
   - Proper indexing for query performance
   - Partitioning-ready design (by date fields)

KEY RELATIONSHIPS:

- Users (1) -> (M) RefreshTokens
- Users (1) -> (1) Mechanics
- Customers (1) -> (M) Vehicles
- Customers (1) -> (M) Appointments
- Vehicles (1) -> (M) Appointments
- Mechanics (1) -> (M) Appointments
- ServiceCategories (1) -> (M) Services
- Appointments (M) <-> (M) Services (via AppointmentServices)
- Appointments (1) -> (1) Invoices
- Invoices (1) -> (M) InvoiceItems
- Customers (1) -> (M) Reviews
- Appointments (1) -> (1) Reviews

USAGE EXAMPLES:

1. Create a new appointment:
   - Insert into appointments table
   - Insert services into appointment_services
   - Trigger automatically calculates total_amount

2. Generate invoice:
   - Insert into invoices table
   - Insert items into invoice_items
   - Call sp_calculate_invoice_totals procedure

3. Record payment:
   - Update invoices.amount_paid
   - Trigger automatically updates status

4. Find available mechanics:
   - Call sp_get_available_mechanics procedure
   - Checks for scheduling conflicts

5. View customer history:
   - Query vw_customer_vehicle_history view
   - Shows all services and spending
*/
