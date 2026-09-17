# QA & Iteration

## Purpose

The Global Expedition Journal testing plan was organized as **scenario-based acceptance and UX testing**.

Rather than testing isolated components only, the plan asked whether a student or teacher could successfully complete an intended workflow and whether security, routing, data visibility, and responsive behavior matched the product requirements.

The plan covered eight major modules.

## 1. Authentication & Security

### What was tested

- student and teacher signup/login
- class-code-based account flows
- role boundaries
- prevention of student access to teacher data
- teacher-role assignment and privilege-boundary behavior
- password recovery/reset
- first-time onboarding

### Resulting improvements

The application architecture includes role-aware routing for teacher functionality, Supabase role data, Row Level Security policies, password recovery/update routes, and onboarding-related profile state.

## 2. Dashboard & Navigation

### What was tested

- routing from dashboard stat cards
- navigation into in-progress countries
- interaction with recent journal activity
- access to detailed progress views

### Resulting improvements

The application includes dedicated routes/views for countries explored, countries in progress, journal-entry totals, and XP/progression so dashboard metrics have meaningful drill-down paths.

## 3. Interactive World Map

### What was tested

- country hover behavior
- status visualization
- country-selection behavior
- context-appropriate actions such as starting, continuing, or reviewing exploration

### Resulting improvements

The map experience was refined around clear country states and predictable navigation into country workflows.

## 4. Country Learning Journey

### What was tested

- learner-level considerations
- points/progression behavior
- automatic progress from meaningful activity
- interactive research prompts
- quiz behavior and retakes
- kid-friendly learning resources

### Resulting improvements

The country experience evolved from static information into a connected learning workflow involving research prompts, quizzes, progress state, journal activity, XP, and passport progression.

## 5. Journaling

### What was tested

- country selection
- image uploads
- predefined tags
- custom tags
- persistence and display of journal content

### Resulting improvements

The journal data model and UI support richer student artifacts rather than text-only notes.

## 6. Gamification & Passport

### What was tested

- XP awards
- visible XP feedback/animation
- passport navigation
- locked/in-progress/completed country states
- profile/avatar presentation tied to progression

### Resulting improvements

Progression was connected to navigation and learning activity so passport and XP behaviors reinforce the underlying educational journey.

## 7. Teacher Dashboard

### What was tested

- roster visibility
- student XP/progress visibility
- comments
- ratings
- classroom tags
- resource controls

### Resulting improvements

Teacher functionality expanded beyond simple roster viewing to include feedback and classroom-level content controls.

## 8. Mobile Responsiveness & UX

### What was tested

- child-friendly visual language
- mobile navigation
- tablet behavior
- desktop navigation
- long-page usability

### Resulting improvements

Navigation behavior was differentiated by viewport, with compact navigation for smaller devices and persistent navigation patterns for desktop use.

## Findings Summary

The highest-value testing areas were not cosmetic. They centered on:

- **authorization:** validating student/teacher boundaries and identifying remaining hardening work
- **recoverability:** ensuring users were not stranded after losing access
- **onboarding:** reducing confusion for first-time users
- **navigation:** making dashboard/map/passport elements lead somewhere useful
- **data-rich journaling:** supporting photos and tags
- **progress coherence:** connecting quizzes, activities, XP, and passport state
- **teacher usefulness:** turning teacher views into actionable feedback tools
- **responsive behavior:** keeping the product usable on student devices

## How Testing Changed the Product

The QA process drove or validated improvements in role-aware routing, password reset/account-recovery flows, onboarding support, progress/stat routing, map and country navigation, journal media/tag support, XP and passport interactions, teacher feedback/management tools, and mobile/desktop navigation. Production authorization and storage hardening remain separate follow-up work.

## Testing Method

The documented process is best described as:

- scenario-based acceptance testing
- manual functional testing
- UX validation
- role/security workflow validation
- responsive-device validation

It should **not** be represented as a fully automated QA suite.

## Current Limitation

Automated end-to-end test coverage is the clearest next step.

High-priority automated scenarios would include:

1. student signup → class join → country exploration → journal → quiz → passport
2. teacher signup → class creation → student visibility → feedback
3. student blocked from teacher-only route/data
4. password reset/update flow
5. journal image/tag persistence
6. country progress and XP transitions
7. mobile navigation smoke tests

## Portfolio Summary

> Designed and executed scenario-based acceptance and UX testing across authentication, role-aware workflows, navigation, country exploration, journaling, gamification, teacher workflows, and responsive behavior; used findings to improve onboarding, routing, progression, teacher feedback, and mobile usability while identifying production-hardening priorities.
