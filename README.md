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

Stage 1A

What Changed from Stage 0

In Stage 0, the Todo Card was primarily static with limited interaction.

In Stage 1A, the following enhancements were introduced:

1. Editable Task System
   Added full edit mode with form controls
   Users can update:
   Title
   Description
   Priority
   Due date
   Status
2. Status State Management
   Introduced dynamic status transitions:
   Todo
   In Progress
   Done
   Status is synchronized across:
   Checkbox toggle
   Status dropdown
   Status display badge
3. Priority Enhancements
   Priority is visually represented using:
   Colored badge
   Priority indicator dot
   Dynamic styling based on priority level
4. Expand / Collapse Description
   Long descriptions are collapsed by default
   Users can expand/collapse content interactively
   Accessible toggle button included
5. Time Awareness System
   Live “time remaining” updates every 45 seconds
   Displays:
   Due in X time
   Completed (if done)
   Overdue state when applicable

New Design Decisions

1. Dual Status Representation

A combination of:

Status badge (semantic state)
Checkbox (quick interaction control)

This improves both usability and clarity.

2. Minimal Overdue Signaling

Overdue state is communicated via:

Time label update
Subtle red “Overdue” indicator

Avoided excessive duplication of warnings to reduce UI noise.

3. Inline Editing Pattern

Editing occurs in-place (not modal-based) to:

Maintain context
Reduce cognitive load
Improve workflow speed 4. Visual Hierarchy
Title → primary focus
Status → secondary state
Priority → urgency signal
Time → temporal context

Known Limitations
Time calculation is based on client-side clock and may drift slightly
No backend persistence (state resets on refresh)
Edit mode does not trap focus (could be improved for accessibility)
No drag-and-drop task reordering
Overdue calculation is simplified (not timezone-aware beyond local system time)

Accessibility Notes
All interactive elements include data-testid for testing consistency
Buttons and inputs are keyboard accessible
Expand/collapse uses a semantic <button> element
Checkbox controls task completion state
Status updates are reflected in real-time UI feedback
Color is not the only indicator of state (icons/text also used)
