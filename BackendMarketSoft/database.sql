-- ============================================
-- MarketSoft - Supermarket Management System
-- Database: PostgreSQL
-- Script: Database creation only
-- Note: Tables and sample data are created by Sequelize on npm start
-- ============================================

-- Drop database if exists (WARNING: deletes all data!)
DROP DATABASE IF EXISTS marketsoft;

-- Create database
CREATE DATABASE marketsoft
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'Spanish_Spain.1252'
    LC_CTYPE = 'Spanish_Spain.1252'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;

-- ============================================
-- END OF SCRIPT
-- ============================================
