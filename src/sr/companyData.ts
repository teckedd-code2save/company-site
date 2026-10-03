import { CONVOY_URL, FORGE_URL } from './media';

export const destinations = {
  haven: 'https://haven-room-studio-x9m4.createdliving1000.chatgpt.site',
  groundcontrol: 'https://trygroundcontrol.serendepify.com',
  weekend: 'https://rentmyweekend.serendepify.com',
};

export const products = [
  { id: 'haven', name: 'Haven', category: 'Rooms, reimagined', status: 'Interactive preview', description: 'Look around a home. Try a new arrangement. Find furniture that fits your space.', image: '/media/haven-home.jpg', alt: 'Haven’s furnished Courtyard House, with a sofa, lounge chair and open kitchen.', href: `${destinations.haven}/home`, action: 'Step inside Haven' },
  { id: 'groundcontrol', name: 'GroundControl', category: 'Apps, in good hands', status: 'Open source', description: 'Connect your agents to the apps on your own server. Discover, deploy, and check what’s running.', image: '/media/groundcontrol-agents.jpg', alt: 'GroundControl’s Agents workspace showing an authorized ChatGPT connection.', href: destinations.groundcontrol, action: 'Explore GroundControl' },
  { id: 'rentaweekend', name: 'RentAWeekend', category: 'Your time, back', status: 'For life in Ghana', description: 'Find a plan for your day—or local help with the errands in its way.', image: '/media/rentaweekend-planning.jpg', alt: 'RentAWeekend showing a grocery request, compared options and a local helper workflow.', href: destinations.weekend, action: 'Start a plan' },
];

export const tools = [
  { name: 'Convoy', type: 'Deployment workflows', description: 'Rehearse a release, review the plan, and follow it into production.', href: CONVOY_URL },
  { name: 'Forge', type: 'Developer tooling', description: 'Engineering practices and project context, ready for your coding agents.', href: FORGE_URL },
];

export const services = [
  { id: 'product', number: '01', title: 'Product engineering', short: 'Web products, marketplaces, and tools your team can use.', detail: 'Bring a new product, an early prototype, or a workflow that needs improving. We can work through the user experience, application, data, and integrations with you.', deliverables: 'A defined scope, working software, and a practical handover.', example: 'Explore RentAWeekend', exampleHref: '/products#rentaweekend' },
  { id: 'agents', number: '02', title: 'Agents & integrations', short: 'Give AI a useful role in your existing systems.', detail: 'Connect agents to APIs, business tools, and real workflows. Define what they can read, what they can change, and where a person needs to stay involved.', deliverables: 'Connected tools, explicit access boundaries, and a workflow you can inspect.', example: 'Explore GroundControl', exampleHref: '/products#groundcontrol' },
  { id: 'spatial', number: '03', title: 'Interactive 3D', short: 'Let people explore, arrange, and try things for themselves.', detail: 'Room planners, product configurators, and spatial shopping experiences. We connect the visual experience to the choices your users actually need to make.', deliverables: 'An interactive browser experience, with responsive controls and sensible loading.', example: 'Explore Haven', exampleHref: '/products#haven' },
  { id: 'operations', number: '04', title: 'Deployment & operations', short: 'Get your application online, and make it easier to run.', detail: 'Set up delivery workflows, connect your infrastructure, and make releases and runtime checks easier to follow. Start with a new app or an existing deployment.', deliverables: 'A working release path, operational checks, and clear documentation.', example: 'See the GroundControl approach', exampleHref: `${destinations.groundcontrol}/docs/philosophy` },
];

export function serviceFromQuery(search: string) {
  const value = new URLSearchParams(search).get('service');
  return services.some(service => service.id === value) ? value! : 'product';
}
