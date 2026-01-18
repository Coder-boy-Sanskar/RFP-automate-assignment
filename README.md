# RFP Automation Platform

This project is an end-to-end **RFP (Request for Proposal) automation platform** that allows users to submit an RFP query, receive AI-structured requirements, recommend vendors, and manage vendor communication via email.

---

## 1. Project Setup

### 1.a Prerequisites

Make sure you have the following installed/configured:

* **Node.js**: v18+ (recommended v20+)
* **Package Manager**: npm 
* **Database**: MongoDB  MongoDB Atlas
* **Email Service**:  SMTP (Gmail for local testing)
* **AI Provider**:  Groq LLM API
* **Git**

Environment variables required:

* `MONGODB_URI`
* `GROQ_API_KEY`
* `GMAIL_USER`
* `GMAIL_APP_PASSWORD`


---

### 1.b Install Steps (Frontend & Backend)

#### Backend

```bash
cd backend
npm install
```

Create a `.env` file:

```
* `MONGODB_URI`
* `GROQ_API_KEY`
* `GMAIL_USER`
* `GMAIL_APP_PASSWORD`
```

Start backend server:

```bash
npm start
```

---

#### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs by default on:

```
http://localhost:5173
```

---

### 1.c How to Configure Email Sending / Receiving

* **Sending Emails**:

  * Configured using **Nodemailer** with SMTP.
  * Emails are sent to vendors when an RFP is shared.

* **Receiving Emails **:

  * Using IMAP by runing a background job after few mins .
  * Incoming replies can be processed and mapped to the relevant RFP/vendor.

For local testing:

* Use Gmail SMTP with App Passwords


---

### 1.d How to Run Everything Locally

1. Start MongoDB by adding string of atlas
2. run seedVendor.js file via Node seedVendor.js
3. Run backend server
4. Run frontend server
5. Open browser at `http://localhost:5173`

Flow:

* Enter RFP query → AI parses requirements → Vendors recommended → Emails sent → Responses tracked
* vendor send response → we extract vendor info and rfp id from text body → get a score via Ai → store in DB

---

### 1.e Seed Data / Initial Scripts

Optional seed script:

```bash
Node seedVendor.js
```

Seed includes:

* Sample vendors


---

## 2. Tech Stack

### 2.a Stack Overview

**Frontend**:

* React
* Vite
* Tailwind CSS
* Axios
* Toastify

**Backend**:

* Node.js
* Express.js
* MongoDB + Mongoose


**AI Provider**:

*  Groq LLM

**Email Solution**:

* Nodemailer
* IMAP


**Key Libraries**:

* Axios
* dotenv
* cors
* nodemailer
* mongoose
* imap-simpler
* Toastify
* node-cron
* mailparser

---

## 3. API Documentation

### 3.a Main Endpoints

#### Get Vendor Recommendations

**POST** `/get-vendors`

Request Body:

```json
{
  "query": "Need software development for procurement system"
}
```

Success Response:

```json
{
    "message": "sucessfully sent vendor data",
    "vendors": [
        {
            "_id": "696c7b0f7d38ab430dfd2ed1",
            "name": "Sanskar Software Solutions",
            "email": "sanskar@yal.chat",
            "categories": [
                "software"
            ],
            "contactPerson": "Sanskar Kumar",
            "__v": 0,
            "createdAt": "2026-01-18T06:17:51.976Z",
            "updatedAt": "2026-01-18T06:17:51.976Z"
        },
    ]
}
```

Error Response:

```json
{
    "message": "please enter valid query"
}
```

---

#### Send Email to selected vendors

**GET** `/send-emails`

Success Response:

```json
{
      success: true,
      message: "RFP saved and emails sent successfully.",
      rfpId: rfp._id,
      emailsCount: emails.length,
    }
```

---

#### Get All RFPs 

**GET** `/get-rfps`

Request Body:

```json
{
 
}
```
Success Response:

```json
{ success: true, data: rfps }
```
#### Get vendor details for RFP

**POST** `/get-rfp-emailsent`

Request Body:

```json
{
    
    "rfpId":"696bc5fd10843ef6d4788cf3"
}
```
Success Response:

```json
{
    "success": true,
    "data": []
}
```
#### Get vendor Response  details for RFP

**POST** `/get-vendor-response`

Request Body:

```json
{
    
    "rfpId":"696bc5fd10843ef6d4788cf3"
}
```
Success Response:

```json
{
    "success": true,
    "data": []
}
```
---

## 4. Decisions & Assumptions

### 4.a Key Design Decisions

* **Modular architecture** separating frontend, backend, and AI logic
* Storing Structured RFP format in Db , Deviding RFPs into desired category
* Deviding vendors into defined catgory for better matching
*Using Imap to get vendor response
* extract vendor details and get relative score from ai based of RFP 


---

### 4.b Assumptions

* Vendors respond via email in a readable text format , we will not able to extract attachment currenlty
* we have defined 3 category initialy goods,service,software
* we are not recomending vendor based on vendor's prev service as we have no such data
* Vendor has to enter their email while responding so that we can extract their email and map
  

---

## 5. AI Tools Usage

### 5.a Tools Used

* ChatGPT


---

### 5.b What They Helped With

* Boilerplate code generation
* Data Modeling
* API design suggestions
* Extracting data from emails
* Structuring AI prompts for RFP parsing

---

### 5.c Notable Prompts / Approaches

* "Convert this RFP text into structured JSON"
* "Score vendors based on RFP requirements"
* "Generate professional vendor email content"

---

### 5.d Learnings & Changes

* Improved prompt engineering for predictable AI output
* Learned How Ai modal response can be more structured
* how to integrate email into systems

---

## Final Notes

This project is designed to be **extensible**, allowing future additions such as:

* Vendor dashboards
*vendor feedback so that we can recomend vendor based on prev service
* pagination if data  is too big 
* Also predefined types  we can select on querying to make process for concise 
