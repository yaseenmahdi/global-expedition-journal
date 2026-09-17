# Global Expedition Journal — Case Study

## Executive Summary

Global Expedition Journal is an educational technology platform designed to help students explore the world through structured country research, quizzes, digital journaling, progress tracking, and teacher-supported learning.

The product originated from Global Ex Education's mission to make global learning more accessible to students regardless of whether they can physically travel. I served as the **sole technical developer and primary product builder**, translating that educational concept into a working full-stack application and a separate recruiter-friendly demo environment.

The project became an exercise in product engineering as much as application development: turning an evolving set of learning ideas into coherent user journeys, choosing what belonged in the app versus Canvas LMS, implementing role-aware student and teacher experiences, organizing content across all 195 countries, testing workflows, and iterating on usability and security.

## The Problem

Global learning opportunities are unevenly distributed. Travel, international programs, and experiential learning can be expensive or inaccessible, while traditional classroom materials often make global education feel passive.

The product goal was to create an experience where a student could choose a country, learn through structured prompts and exploration, complete activities and quizzes, document discoveries, earn visible progress, build a personal record of learning, and receive support from an educator.

At the same time, teachers needed a way to connect independent exploration to structured classroom learning.

## Product Strategy

The project evolved into a **dual learning ecosystem**.

### Global Expedition Journal

The web application supports self-paced exploration:

- interactive country discovery
- research prompts
- quizzes
- journaling
- XP and progression
- digital passport tracking
- student profiles
- teacher visibility and feedback

### Canvas LMS

Canvas was planned as the structured learning and community layer:

- guided assignments
- discussion
- reflection
- instructor-posted travel media
- peer interaction
- class showcases

This separation allowed the application to focus on interactive exploration while Canvas handled more traditional classroom structure.

## My Role

I owned the technical implementation of the application.

My responsibilities included:

- translating educational ideas into software requirements
- deciding how features connected across the student journey
- designing navigation and application flows
- implementing the React/TypeScript application
- organizing the structured 195-country content model
- implementing Supabase-backed application state
- building authentication and role-aware experiences
- implementing student progress, journal, quiz, passport, and XP workflows
- implementing teacher-facing features
- debugging and iterative refinement
- planning and executing acceptance/UX testing
- building a safe no-login demo environment
- preparing demonstrations and technical presentation materials

The original education concept and mission came from Global Ex Education and its founder; my contribution was turning that concept into the technical product.

## Design Evolution

The earliest product requirements described a broader set of concepts including a Passport, Scrapbook, Library, Checklist, Wishlist, Awards, AI-guided reflection, and a Canvas-connected learning journey.

Rather than implementing every idea as a disconnected page, the product evolved around a more focused core:

- country exploration
- research prompts
- progress tracking
- journaling
- quizzes
- XP
- digital passport
- teacher/class functionality

This reduced overlap between features and made the student journey easier to understand.

## Technical Solution

### Frontend

The application is built with React and TypeScript using Vite and Tailwind CSS.

The client includes distinct experiences for authentication, dashboard, world map, country browsing, country learning flows, journal, passport, student profile, teacher dashboard, settings/account flows, and progress/stat detail pages.

### Country Content Model

The project contains structured content for all **195 countries**.

Each country record supports educational information such as capital, language, population, food, landmark, facts, map identifiers, and quiz content.

This content model powers the exploration experience independently of user-generated application data.

### Supabase / PostgreSQL

Authenticated and user-generated state is modeled relationally in Supabase/PostgreSQL.

The schema supports profiles, roles, class-code grouping, exploration progress, journal entries, student activities, XP tracking, teacher comments, custom tags, and teacher-managed resources.

Row Level Security is used to enforce data-access boundaries, and the application adds role-aware routing for teacher functionality.

### Demo Architecture

A separate demo application provides a no-login product tour.

Instead of exposing real organizational accounts or application data, the demo uses seeded demonstration state. This allows recruiters and stakeholders to interact with representative workflows immediately while keeping the authenticated environment separate.

## Key Engineering Decisions

### 1. Separate reference content from user state

Country/reference content is predictable and version-controlled, while student activity is dynamic and user-specific.

Separating the two reduces unnecessary database complexity while preserving relational storage for the data that actually needs authentication, persistence, classroom relationships, and access control.

### 2. Separate the public demo from the authenticated application

A recruiter should not need an account or class code just to understand the product.

The no-login demo provides representative data and interaction without exposing production users or organizational information.

### 3. Use layered authorization

Teacher functionality uses both application-level role routing and database Row Level Security policies; production use would require an additional authorization review and hardening pass.

This is stronger than relying on UI hiding alone.

### 4. Treat progression as product behavior, not decoration

XP, exploration status, passport state, and journal activity are connected to the learning journey rather than being purely visual badges.

### 5. Use Canvas for structured classroom interaction

Instead of recreating an entire LMS inside the app, Canvas was positioned as the structured assignment/community layer while Global Expedition Journal handled exploratory learning.

## QA and Iteration

Testing was organized around eight modules:

1. Authentication & Security
2. Dashboard
3. Interactive World Map
4. Countries & Learning Journey
5. Journaling
6. Gamification & Passport
7. Teacher Dashboard
8. Mobile Responsiveness & UX

The testing plan emphasized scenario-based acceptance testing: could a real student or teacher complete the intended workflow, and did access boundaries and navigation behave correctly?

Testing targeted improper role access, account recovery, onboarding clarity, dashboard/stat routing, country-progress routing, map interaction, quiz retakes, journal images/tags, XP feedback, passport navigation, teacher roster visibility, teacher comments/ratings, resource/tag controls, and responsive navigation.

The resulting product added or strengthened role-aware routing, account-recovery routes, onboarding state, progress/stat views, journal media/tag support, progression behaviors, teacher feedback, and responsive navigation.

Testing was primarily manual acceptance and usability validation. Automated end-to-end coverage is a logical next engineering step.

## Constraints & Resourcefulness

The project materials document a six-month MVP build and approximately **$44 in direct platform/tooling spend**.

That number is useful as a resourcefulness story, but it should be understood as direct platform spend—not the value of engineering labor or a total product-development cost.

The project also had to recover from an earlier unsuccessful development effort. For a professional portfolio, the useful lesson is not the dispute itself; it is that the product was restarted, requirements were re-established, and the application was rebuilt into a working demonstrable system.

## Outcome

The resulting application includes:

- a 195-country exploration experience
- structured research content
- quizzes
- journaling
- XP/progression
- digital passport functionality
- student/teacher experiences
- role-aware access
- teacher feedback/tools
- responsive navigation
- an isolated public demo environment

The project was also prepared for live demonstration and presentation as part of a broader education-technology initiative.

## What I Would Build Next

1. Add automated end-to-end tests for the highest-risk student and teacher flows.
2. Expand telemetry/observability for product usage and errors.
3. Move more content management into administrator/teacher workflows where appropriate.
4. Continue accessibility testing against WCAG criteria.
5. Formalize LMS integration boundaries if direct Canvas integration becomes a product requirement.
6. Add richer content versioning and editorial review for country learning materials.
7. Harden teacher provisioning, authorization, and private media-storage policies before broader real-user deployment.

## Links

- [Live Demo](https://globe-explorer-passport.lovable.app/)
- [Demo Video](https://drive.google.com/file/d/1sk2XpoDBIPX1KCmV79zdjfs7Ry_cDYiM/view?usp=sharing)
- [Presentation](https://docs.google.com/presentation/d/1zTZE5I8KgdN6PaqBAc8NlFFjZAb4Qq_qFgvq2XIXMzg/edit?usp=sharing)
- [Architecture](ARCHITECTURE.md)
- [QA & Iteration](QA-AND-ITERATION.md)
