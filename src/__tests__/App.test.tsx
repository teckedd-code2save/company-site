import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import App from '@/App';

afterEach(() => { cleanup(); window.history.replaceState({}, '', '/'); });

describe('Company visitor journeys', () => {
  it('offers products and client services from the homepage and represents all three main products', () => {
    render(<App />);
    expect(screen.getByRole('link', { name: 'Explore products' })).toHaveAttribute('href', '#products');
    expect(screen.getAllByRole('link', { name: 'Discuss a project' }).every(link => link.getAttribute('href') === '/contact')).toBe(true);
    for (const name of ['Haven', 'GroundControl', 'RentAWeekend']) expect(screen.getByRole('heading', { level: 3, name })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Explore our services' })).toHaveAttribute('href', '/services');
    expect(screen.queryByText(/GroundControl at the centre/)).not.toBeInTheDocument();
  });

  it('lets visitors switch product walkthrough steps', () => {
    render(<App />);
    fireEvent.click(within(screen.getByRole('group', { name: 'GroundControl walkthrough' })).getByRole('button', { name: /Discover/ }));
    expect(screen.getByRole('heading', { name: 'Start with the apps you already run.' })).toBeInTheDocument();
    fireEvent.click(within(screen.getByRole('group', { name: 'RentAWeekend planning flow' })).getByRole('button', { name: /The research/ }));
    expect(screen.getByRole('heading', { name: 'Keep uncertainty visible' })).toBeInTheDocument();
    expect(screen.getByText('Example planning flow')).toBeInTheDocument();
  });

  it('keeps the Haven film user-controlled and supports chapter playback and a fallback', () => {
    render(<App />);
    const video = screen.getByLabelText('Haven: look around the home and arrange furniture') as HTMLVideoElement;
    expect(video).not.toHaveAttribute('autoplay');
    expect(video).toHaveAttribute('preload', 'none');
    Object.defineProperty(video, 'readyState', { configurable: true, value: 1 });
    const play = vi.spyOn(video, 'play');
    fireEvent.click(screen.getByRole('button', { name: /03Place furniture|03 Place furniture/ }));
    expect(video.currentTime).toBe(19.62);
    expect(play).toHaveBeenCalled();
    expect(video).toHaveAttribute('controls');
    fireEvent.error(video);
    expect(screen.getByRole('alert')).toHaveTextContent('The film couldn’t load.');
    expect(screen.getByRole('link', { name: /Explore the home in Haven instead/ })).toHaveAttribute('href', 'https://haven-room-studio-x9m4.createdliving1000.chatgpt.site/home');
  });

  it('connects a specific service to an inquiry and prepares an accurate email draft without claiming delivery', () => {
    window.history.replaceState({}, '', '/contact?service=spatial');
    render(<App />);
    expect(screen.getByLabelText('What kind of help?')).toHaveValue('spatial');
    fireEvent.change(screen.getByLabelText('Your name'), { target: { value: 'Example visitor' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'visitor@example.com' } });
    fireEvent.change(screen.getByLabelText('Tell us about the project'), { target: { value: 'A room planner & furniture catalogue\nFor our shop.' } });
    fireEvent.click(screen.getByRole('button', { name: /Prepare my brief/ }));
    const href = screen.getByRole('link', { name: /Open email draft/ }).getAttribute('href')!;
    const draft = new URL(href);
    expect(draft.protocol).toBe('mailto:');
    expect(draft.searchParams.get('subject')).toContain('Interactive 3D');
    expect(draft.searchParams.get('body')).toContain('A room planner & furniture catalogue\nFor our shop.');
    expect(draft.searchParams.get('body')).toContain('visitor@example.com');
    expect(screen.getByText(/Nothing is sent until you send it/)).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText('Tell us about the project'), { target: { value: 'An updated brief' } });
    expect(screen.queryByRole('link', { name: /Open email draft/ })).not.toBeInTheDocument();
  });

  it.each([
    ['/products', 'Different ideas.Working products.'],
    ['/services', 'Bring the problem.Let’s build from there.'],
    ['/company', 'Curiosity hasa day job.'],
    ['/missing', 'Let’s get yousomewhere useful.'],
  ])('supports a direct visit to %s', (path, heading) => {
    window.history.replaceState({}, '', path);
    render(<App />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(heading);
  });

  it('recovers from an unknown inquiry category', () => {
    window.history.replaceState({}, '', '/contact?service=unknown');
    render(<App />);
    expect(screen.getByLabelText('What kind of help?')).toHaveValue('product');
  });
});
