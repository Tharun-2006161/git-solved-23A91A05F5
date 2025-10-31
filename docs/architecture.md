# 🏗️ System Architecture

## Overview
DevOps Simulator follows a **microservices architecture** designed for **high availability**, **scalability**, and **ease of development**.  
This document outlines both **Production** and **Development** architectures.

---

## ⚙️ Components

### 1. Application Server
| Environment | Technology | Port | Scaling | Notes |
|--------------|-------------|------|----------|-------|
| **Production** | Node.js + Express | 8080 | Horizontal auto-scaling enabled | Optimized for load balancing |
| **Development** | Node.js + Express (with hot reload) | 3000 | Manual (single instance) | Chrome DevTools debugger on port 9229 |

---

### 2. Database Layer
| Environment | Database | Configuration | Backup | Notes |
|--------------|-----------|----------------|----------|-------|
| **Production** | PostgreSQL 14 | Master-slave replication | Daily automated backups | Encrypted connections |
| **Development** | PostgreSQL 14 (local instance) | Single instance (no replication) | Manual backups | Auto-seeds test data on startup |

---

### 3. Monitoring System
| Environment | Tool | Metrics | Alerts | Notes |
|--------------|------|----------|---------|-------|
| **Production** | Prometheus + Grafana | CPU, Memory, Disk, Network | Email notifications for critical issues | Integrated with alert manager |
| **Development** | Console logging + optional Prometheus | CPU, Memory, Disk, Network, Build time | Console warnings only | Includes experimental web dashboard |

---

### 4. Container Orchestration
| Environment | Tool | Services | Volume Mounts |
|--------------|------|-----------|----------------|
| **Production** | Kubernetes (auto-scaled) | App, Database, Cache | Persistent volumes |
| **Development** | Docker Compose | App, Database, Redis cache | Mounted code directory for hot reload |

---

### 5. Authentication System
| Environment | Method | Providers | Session Storage |
|--------------|----------|-------------|-----------------|
| **Production** | OAuth2 + JWT | Internal auth services | Secure token storage |
| **Development** | OAuth2 + JWT | Google, GitHub (testing only) | Redis-based session storage |

---

## 🚀 Deployment Strategy

| Environment | Method | Zero Downtime | Rollback |
|--------------|---------|----------------|-----------|
| **Production** | Rolling updates | ✅ Yes | Automated rollback on failure |
| **Development** | Docker Compose with hot reload | ❌ Not applicable | Git checkout previous commit |

---

## 👨‍💻 Development Workflow
1. Make code changes  
2. Auto-reload triggers rebuild  
3. Run unit tests  
4. Review console output  
5. Commit when stable  

---

## 🔒 Security

| Environment | Encryption | Credentials | CORS | Debug Access |
|--------------|-------------|--------------|-------|----------------|
| **Production** | SSL/TLS enabled | Encrypted secrets | Restricted | Disabled |
| **Development** | SSL/TLS disabled | Plain text (local only) | Enabled for all origins | Exposed endpoints for debugging |

---

## 🧪 Experimental Features (Development Only)
⚠️ *These are beta features available for internal testing:*
- Multi-cloud deployment simulation  
- AI-powered log analysis  
- Automatic rollback on anomaly detection  

---

### ✅ Summary
| Mode | Target | Deployment Tool | Monitoring | Scaling | Security |
|-------|---------|-----------------|-------------|----------|-----------|
| **Production** | Live users | Kubernetes | Prometheus + Grafana | Auto | High |
| **Development** | Local testing | Docker Compose | Console + Prometheus | Manual | Relaxed |
