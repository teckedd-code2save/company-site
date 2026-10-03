# Company website update · 3 October 2026

The site now presents Serendepify’s products and client services with separate, prominent paths. The existing wordmark, typography, ivory/ink palette, coral/lime accents, and restrained motion remain. The personal portfolio is a separate repository and is unchanged by this release.

## Pages

- `/`: company introduction, three product entry points, services, product walkthroughs, and contact.
- `/products`: Haven, GroundControl, RentAWeekend, Convoy, and Forge.
- `/services`: product engineering, agents/integrations, interactive 3D, deployment/operations.
- `/company`: company context and founder link.
- `/contact`: a project brief that prepares an email draft; it does not claim that an email has been delivered. The visitor sends through their email app. A copy option and direct email link are also available.
- Unknown paths display a useful not-found page. Vite assets use absolute paths for direct and trailing-slash visits.

## Haven film

`public/media/haven-walkthrough.mp4` is a 30.37-second, 1280×720 H.264 film (about 3.3 MiB). It was assembled from timestamped browser captures of the actual public Haven app on 3 October 2026. It contains no generated interior images or simulated application responses.

Sequence:

1. Guided look-around in the furnished Courtyard House.
2. Kitchen and bedroom views.
3. Move and rotate the Heritage sofa in the expanded measured-room planner.
4. Switch to the floor-plan view.

The underlying browser capture was approximately 8–14 frames per second; the delivery file uses a 30 fps timeline with repeated captured frames. Playback is not represented as a performance benchmark. It is silent, with optional descriptive captions and a text description. Playback starts only when requested, and chapter controls seek into the same file. Video failure exposes a direct link to Haven.

The Courtyard House and furniture are sample content. The public film caption identifies the sample home and room planner; the description retains the need to check dimensions and clearance before ordering.

Primary capture routes:

- https://haven-room-studio-x9m4.createdliving1000.chatgpt.site/home
- https://haven-room-studio-x9m4.createdliving1000.chatgpt.site/shop

## Other product material

GroundControl’s discovery, authorized-agent, and deployment-verification images come from the product documentation repository’s `public/proof` directory. They retain the September 2026 recorded-screen label. Current descriptions follow the public product site and its philosophy, agent-access, and deployment guides at https://trygroundcontrol.serendepify.com/.

The RentAWeekend overview uses an existing product capture with illustrative grocery options. Its interactive planning sequence is explicitly labeled an example, with no suggestion that the website is running a live agent or displaying current prices. The product destination is https://rentmyweekend.serendepify.com/.

## Implementation notes

Company pages live in `src/sr/`, sharing `CompanyLayout`, `companyData`, `ProductShowcases`, and scoped `company.css` styles. Existing design tokens and brand primitives are reused. The vendored motion engine is not modified. The previously dormant checkout and payment APIs remain dormant.

Validation includes navigation and route tests, walkthrough interactions, Haven playback and chapter seeking, media fallback, and accurate email-draft encoding. Browser review covers desktop and mobile presentation, real video decoding, direct links, and the project inquiry flow.
