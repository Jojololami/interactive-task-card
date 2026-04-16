📝 Interactive Task Card UI

A high-fidelity, interactive Task Card built with React + TypeScript.  
Focus is on semantic HTML, accessibility, and UI polish.

---

How to Run Locally

### 1. Clone the repo

```bash
git clone https://github.com/Jojololami/interactive-task-card.git
2. Navigate into project
cd interactive-task-card
3. Install dependencies
npm install
4. Start development server
npm run dev
5. Open in browser
http://localhost:5173

Decisions Made
- Used React + TypeScript for type safety and scalability
- Chose inline styles + minimal CSS file to keep structure simple and readable
- Built TaskCard as a reusable component using props
- Centralized task data in parent component (Index.tsx) for state management
Used useState for:
- task completion tracking
- task deletion
- Implemented timeRemaining as a derived dynamic UI value
Used semantic HTML:
- article for card
- time for due date
- ul/li for tags

Trade-offs
- No backend integration (data is static in frontend state)
- No global state management
- No persistent storage (refresh resets tasks)
- Inline styles used instead of full CSS architecture (faster development, less scalability)
- Edit button is UI-only (no edit modal implemented because it is not required by spec)
```
