# Solution Notes

## 1. Why did you choose this tech stack?

I chose the MERN stack (MongoDB, Express, React, Node.js) because it's the stack I'm most experienced with. Since the assignment had a 72-hour deadline, using a familiar stack allowed me to focus on implementing the required features rather than learning new technologies. I was also able to reuse my existing JWT authentication architecture from a previous project, which reduced development time while keeping the implementation consistent.

## 2. How did AI help you during development?

I started by brainstorming the assignment with AI to make sure I understood the requirements correctly. Campaign Management and AI Email Generation were straightforward to reason through, but the Journey Builder — specifically representing conditional branching (trigger → action → condition → Yes/No outcomes) in a schema — was new to me, and AI helped me think through how to model that in Mongoose and Zod before writing it.

Beyond planning, I used AI for:

- Writing frontend boilerplate (forms, API wrapper functions, route wiring)
- Debugging — including tracing a schema mismatch between what my AI prompt told Gemini to return and what my Zod validator expected, and a bug where a populated MongoDB reference object was being sent back to the update endpoint instead of a plain ID string
- Making the UI responsive with Tailwind
- Writing this README and the Solution Notes document itself, so I could spend my own time on the application rather than documentation

I reviewed and tested everything AI generated rather than accepting it blindly — several of the fixes above came from AI producing something that failed at runtime, which I then had to trace back to the actual root cause before applying the fix.

## 3. Mention four edge cases you considered.

**1. AI response schema mismatch.**
The AI model can return perfectly valid JSON that still doesn't match the schema my application expects. For example, my prompt originally asked Gemini to return a field named `ctaText`, while my backend validator expected `ctaSuggestion`. Although the response was valid JSON, it failed validation because the field names didn't match. This reinforced the importance of validating both the structure and the content of AI-generated responses before using them in the application.

**2. Populated MongoDB references during updates.**
My `GET /journey/:id` endpoint populates `actions.campaignId` so the frontend can display the campaign name alongside its ID. When editing a journey, the frontend initially sent the populated object (`{ _id, name }`) back to the update endpoint instead of just the campaign ID. Since the backend expects an `ObjectId`, this failed validation. I handled this by converting populated objects back to their ID values before submitting updates.

**3. Expired or invalid JWT tokens.**
Protected endpoints need to handle expired or malformed authentication tokens gracefully. Without proper error handling, JWT verification can expose internal stack traces or library errors. I added authentication middleware that validates the token and returns a consistent `401 Unauthorized` response with a generic error message, preventing implementation details from being exposed to the client.

**4. Missing or undefined values from existing records.**
While editing campaigns, I encountered records where some fields were `undefined` instead of empty strings. The form logic assumed every value was a string, causing runtime errors when methods like `.trim()` were called. To make the application more robust, I normalized API responses before storing them in form state by defaulting missing values to empty strings and made the validation logic defensive against unexpected input.

## 4. If you had another three days to improve this application, what additional features would you build and why?

- **Skeleton loading states** on the frontend instead of plain "Loading..." text, for a more polished feel during data fetches.
- **The remaining bonus features** I didn't get to: campaign scheduling, campaign duplication, email templates, audience segmentation, and campaign analytics — analytics in particular, since a marketing team would want to know if their campaigns are actually working, not just that they exist.
- **Server-side search and pagination** for campaigns and journeys. Right now, search filtering happens entirely on the frontend against a list already fetched in full — that works fine at a small scale but won't hold up once there are hundreds of campaigns. I'd move filtering to the backend with query params and add real pagination instead of loading everything at once.
- **Automated tests.** I'd use AI to help scaffold Jest test cases for the campaign and journey controllers (similar to what I've done in a previous project), covering the edge cases above plus standard CRUD paths, so regressions get caught before they reach the UI.
