# 📋 Requests Tracker

A lightweight BPM-style request tracker — create, review, and approve requests with role-based access. Built with React and Supabase.

## 🚀 Live Demo

[→ Open Requests Tracker](https://rossiav802-code.github.io/requests-tracker/)

**Test accounts:**
- Approver: `test@example.com` / `test123456`
- Employee: `employee@example.com` / `test123456`

---

## 📖 How to Use

### 1. Log in
Open the app and sign in with one of the test accounts above. The role attached to your account determines what you can do:
- **Employee** — can create requests, but cannot approve or reject them
- **Approver** — can create requests *and* approve/reject any pending request

### 2. Create a request
Fill in the **title** (required) and an optional **description**, then choose one of two actions:
- **Сохранить черновик** (Save as draft) — saves the request with status `draft`. It's only visible to you and isn't sent for review yet
- **Отправить на согласование** (Submit for approval) — saves the request with status `pending`, making it visible to approvers

### 3. Track status
Every request shows a colored status badge:
| Status | Meaning | Color |
|---|---|---|
| `draft` | Saved, not yet submitted | gray |
| `pending` | Waiting for approver's decision | yellow |
| `approved` | Approved by an approver | green |
| `rejected` | Rejected by an approver | red |

### 4. Filter the list
Use the filter buttons above the list (**Все / Черновики / Ожидающие / Согласованные / Отклоненные**) to narrow the view down to a single status.

### 5. Approve or reject (approver only)
If you're logged in as an approver, each request shows two extra buttons:
- **Согласовать** (Approve) — sets status to `approved`
- **Отклонить** (Reject) — sets status to `rejected`

The list updates instantly — no page refresh needed.

---

## ✨ Features

- ✅ Email/password authentication
- 📝 Create requests as drafts or submit for approval
- 🔄 Status workflow: draft → pending → approved / rejected
- 👤 Role-based access — approvers can review, employees can only create
- 🎛️ Filter requests by status
- 🎨 Responsive UI with Tailwind CSS

---

## 🛠️ Tech Stack

`React` `JavaScript` `Supabase` `Tailwind CSS` `Vite`

- React (plain JSX)
- Supabase — authentication, PostgreSQL database, row-level security
- Tailwind CSS — styling
- Vite — build tool

---

## 📁 Project Structure
## 📁 Project Structure

```
src/
├── App.jsx           # main app logic, auth state, role loading
├── Login.jsx         # login form
├── RequestForm.jsx   # create draft / submit for approval
├── RequestList.jsx   # list, filters, approve/reject actions
├── requestsApi.js    # Supabase queries
└── supabaseClient.js # Supabase client setup
```
## 🗄️ Database Schema

**users**
| column | type | description |
|---|---|---|
| id | uuid | primary key |
| full_name | text | |
| role | text | `employee` or `approver` |

**requests**
| column | type | description |
|---|---|---|
| id | uuid | primary key |
| title | text | |
| description | text | optional |
| status | text | `draft`, `pending`, `approved`, `rejected` |
| author_id | uuid | references users.id |
| approver_id | uuid | references users.id, optional |
