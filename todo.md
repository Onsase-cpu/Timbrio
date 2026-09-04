# Project TODO

- [x] Establish the rider and driver experience shell with role switching
- [x] Implement a reusable map-style trip view with simulated GPS markers and route polyline
- [x] Implement pickup and destination selection with route distance and ETA calculation
- [x] Implement driver matching and request acceptance simulation
- [x] Implement fare calculation with ride-class selection and transparent breakdown
- [x] Implement trip lifecycle controls from requesting through completion
- [x] Implement payment simulation with saved payment method display and receipt state
- [x] Implement ratings flow after trip completion
- [x] Implement trip history with completed ride details
- [x] Implement secure server procedures and database schema for rides, drivers, payments, ratings, and locations
- [x] Add unit tests for fare calculation, matching, trip lifecycle, payment simulation, and ratings
- [x] Polish black/orange/blue maximalist-minimalist-glassmorphism responsive UI
- [x] Verify browser flows, responsive layout, and production-safe secret handling
- [x] Prepare GitHub-ready documentation and configuration files
- [x] Apply the Drivana product name across UI copy, metadata, and documentation
- [x] Wire pickup and destination inputs to mutable coordinates and recalculate route, ETA, and fare from user selections
- [x] Use proximity and availability matching in the rider flow and connect driver acceptance to the request state
- [x] Show a full fare breakdown including base, distance, time, surge, and total
- [x] Connect payment capture to the UI and display a receipt reference after capture
- [x] Replace hardcoded trip history with the typed ride history procedure and loading/empty/error states
- [x] Add authorization and integrity checks to ride, payment, rating, and location mutations
- [x] Add Vitest coverage for trip lifecycle, payment capture, and rating submission
- [x] Add GitHub-ready README and setup documentation
- [x] Add GitHub-ready README and setup documentation
- [x] Add true availability state to rider matching and exclude offline or unavailable drivers from selection
- [x] Enforce actor integrity in ride location writes so rider and driver traces cannot be impersonated
- [x] Add successful procedure tests for payment capture and rating submission on a valid completed ride
- [x] Finish final hardening pass without further scope expansion and deliver one checkpoint

# Timbrio TODO

- [x] Rebrand the app shell and metadata to Timbrio without adding vendor or AI branding
- [x] Define lecturer, room, course, student group, availability, session, and conflict domain types
- [x] Implement deterministic constraint-solving timetable generation
- [x] Add SQL schema and typed backend procedures for timetable inputs and generated schedules
- [x] Build the Timbrio dashboard with overview metrics and generator controls
- [x] Build weekly timetable, resource matrix, and conflicts views
- [x] Add regenerate, clear, and export-ready interaction states
- [x] Add unit tests for capacity, availability, collisions, and generator output
- [x] Add GitHub-ready README and setup notes
- [x] Verify responsive layout, build, and final checkpoint
- [x] Add Timbrio database tables and typed timetable generation procedure
- [x] Replace prior product documentation with Timbrio-specific README and architecture notes
- [x] Capture Timbrio desktop and mobile previews and save the final checkpoint
- [x] Replace timetable.generate any-arrays with explicit Zod schemas for all scheduling inputs
- [x] Save the final Timbrio checkpoint after all changes
