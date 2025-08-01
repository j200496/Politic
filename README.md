# 🗳️ Political Candidate Web App

This is a **Single Page Application (SPA)** built with **Angular** designed for political candidates to collect information from their supporters through a public form. It also includes an **admin panel** to edit and delete member records. The project connects to a **.NET API** for backend data management.

---

## 🚀 Main Features

### 🎯 Public Module
- A form that allows supporters to register with their personal details.
- Basic form validations (required fields, email format, etc.).
- Custom alerts using **SweetAlert2** to provide user feedback (successful registration, errors, etc.).

### 🔐 Admin Panel
- Optional login for secure access.
- List view of registered members.
- Edit and delete functionality for each record.
- Visual alerts to confirm actions like record deletion.

---

## 🛠️ Technologies Used

| Technology   | Purpose                          |
|--------------|----------------------------------|
| Angular      | Frontend SPA                     |
| .NET API     | Backend & data persistence       |
| SweetAlert2  | Interactive and friendly alerts  |
| Bootstrap    | Responsive design & styling      |
| Reactive Forms | Form handling and validation  |

---

## 📦 Installation and Running Locally

### Prerequisites
- Node.js and Angular CLI installed
- Working .NET API backend (check backend setup separately)

### Clone the repository
```bash
git clone https://github.com/yourusername/angular-candidate-app.git
cd angular-candidate-app
