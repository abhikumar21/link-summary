# Link Saver with Auto-Summary

A minimalist, mobile-friendly web app to save, summarize, and manage links using the [Jina AI Summarizer](https://r.jina.ai). Built with **React + Vite + Tailwind CSS**, it includes simple authentication, localStorage-based bookmark management, and smooth responsive design.

## 🛠 Features

- **Demo Login**: `demo@test.com` / `password123`
- **Paste and Save Links** with automatic summaries
- **Summaries fetched via Jina AI API**
- **LocalStorage**-based persistence
- **Delete bookmarks**
- **Responsive UI** built with Tailwind CSS
- **Loading and error handling** for API calls

---

## Tech Stack

- **Frontend**: React (with Vite)
- **Styling**: Tailwind CSS
- **Storage**: localStorage
- **API**: [Jina AI Summary Endpoint](https://r.jina.ai)

---

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/abhikumar21/link-summary.git
cd myapp
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the app

```bash
npm run dev
```

## Demo Credentials

```bash
Email: demo@test.com
Password: password123
```

## Time breakdown
| Task  | Hours |
| ------------- | ------------- |
| Setup & Authentication  | 0.5  |
| Summarizer + Save Logic	  | 3  |
| View/Delete Functionality	  | 1.5  |
| Styling + Responsiveness	  | 1  |
| Testing + Polish	  | 1  |
| Total	  | 7  |



Task	Hours
Setup & Authentication	1
Summarizer + Save Logic	2
View/Delete Functionality	1.5
Styling + Responsiveness	1.5
Testing + Polish	1
Total	~7 hrs

## Improvements (Next Step)
- Add search and filter options
- Create backend to scrape titles (bypassing CORS)
- OAuth/real auth system
- Save to a real database (Firebase, Supabase)
