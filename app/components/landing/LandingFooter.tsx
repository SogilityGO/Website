import {useState} from 'react';
import {Container} from './ui';

const ABOUT_LINKS = [
  {label: 'About Us', href: 'https://www.sogilitygo.com/pages/about-us'},
  {label: 'Why SogilityGO', href: 'https://www.sogilitygo.com/pages/why-sogilitygo'},
  {label: 'Our Boards', href: 'https://www.sogilitygo.com/pages/our-boards'},
  {label: 'Our Lights', href: 'https://www.sogilitygo.com/pages/our-lights'},
  {label: 'Our App', href: 'https://www.sogilitygo.com/pages/our-app'},
  {label: 'Partnership', href: 'https://www.sogilitygo.com/pages/partnerships'},
  {label: 'Membership', href: 'https://www.sogilitygo.com/pages/membership'},
];

const RESOURCE_LINKS = [
  {label: 'Help Center', href: 'https://www.sogilitygo.com/pages/support'},
  {label: 'Contact Us', href: 'https://www.sogilitygo.com/pages/contact'},
  {label: 'Blog', href: 'https://www.sogilitygo.com/blogs/news'},
];

const TERMS_URL = 'https://www.sogilitygo.com/policies/terms-of-service';

export function LandingFooter() {
  return (
    <footer className="bg-sogility text-black">
      <Container className="py-12 lg:py-14">
        <Logo />

        <div className="mt-8 flex flex-col gap-10 lg:mt-10 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
          {/* Left — tagline + socials */}
          <div className="flex flex-col gap-6 lg:gap-8">
            <p className="max-w-[318px] text-[24px] font-light leading-[33px] tracking-[-0.24px]">
              Train different. Get better.
            </p>
            <div className="flex gap-4">
              <SocialIcon
                href="https://www.instagram.com/sogilitygo/"
                label="SogilityGO on Instagram"
              >
                <InstagramIcon />
              </SocialIcon>
              <SocialIcon
                href="https://www.tiktok.com/@sogilitygo"
                label="SogilityGO on TikTok"
              >
                <TiktokIcon />
              </SocialIcon>
            </div>
          </div>

          {/* Right — link columns + newsletter */}
          <div className="flex flex-col gap-10 lg:flex-1 lg:flex-row lg:justify-between lg:gap-12">
            <div className="flex gap-12">
              <FooterColumn title="About SogilityGo" links={ABOUT_LINKS} />
              <FooterColumn title="Resources" links={RESOURCE_LINKS} />
            </div>
            <Newsletter />
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col gap-5 border-t border-[#168a14] pt-6 text-[14px] leading-[18px] tracking-[-0.14px] lg:flex-row lg:items-center lg:justify-between">
          <p>
            © 2026,{' '}
            <a
              href="https://www.sogilitygo.com/"
              target="_blank"
              rel="noreferrer"
              className="underline"
            >
              SogilityGO
            </a>
            ®
          </p>
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:gap-12">
            <p className="flex items-center gap-2">
              Powered by <span className="font-bold tracking-[0.04em]">GOAL STATION</span>
            </p>
            <div className="flex gap-6">
              <a
                href="https://www.sogilitygo.com/policies/privacy-policy"
                target="_blank"
                rel="noreferrer"
                className="underline"
              >
                Privacy policy
              </a>
              <a
                href={TERMS_URL}
                target="_blank"
                rel="noreferrer"
                className="underline"
              >
                Terms of service
              </a>
              <a
                href="https://www.sogilitygo.com/policies/refund-policy"
                target="_blank"
                rel="noreferrer"
                className="underline"
              >
                Refund policy
              </a>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}

function Logo() {
  return (
    <div className="flex items-center gap-2 text-black">
      <span className="text-xl font-extrabold tracking-[0.2em]">SOGILITY</span>
      <span className="rounded-full bg-black px-2 py-0.5 text-sm font-extrabold text-white">
        GO
      </span>
    </div>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: {label: string; href: string}[];
}) {
  return (
    <div className="text-[16px] tracking-[-0.16px]">
      <p className="font-bold leading-[22px]">{title}</p>
      <ul>
        {links.map(({label, href}) => (
          <li key={label}>
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              className="block leading-[32px] hover:underline"
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Newsletter signup. NOTE: submit is a local placeholder — wire to the client's
 *  email provider (Shopify customer / Klaviyo) before launch. */
function Newsletter() {
  const [email, setEmail] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !agreed) return;
    setSent(true);
  };

  return (
    <div className="flex flex-col gap-4">
      <p className="text-[18px] font-bold italic tracking-[-0.18px]">Join today!</p>
      {sent ? (
        <p className="max-w-[311px] text-[14px] leading-[18px]">
          Thanks — you&rsquo;re on the list! 🎉
        </p>
      ) : (
        <form onSubmit={onSubmit} className="flex flex-col gap-2">
          <div className="flex h-14 w-full max-w-[311px] items-center gap-2 rounded-[32px] border border-[#168a14] pl-4 pr-2">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              aria-label="Email address"
              className="min-w-0 flex-1 bg-transparent text-[16px] tracking-[-0.16px] text-dark outline-none placeholder:text-dark/60"
            />
            <button
              type="submit"
              aria-label="Subscribe"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-black text-white transition hover:brightness-125"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>
          </div>
          <label className="flex items-center gap-2 text-[14px] leading-[18px] tracking-[-0.14px]">
            <input
              type="checkbox"
              required
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="h-[18px] w-[18px] shrink-0 rounded-[2px] border border-dark accent-black"
            />
            <span>
              I agree with the{' '}
              <a
                href={TERMS_URL}
                target="_blank"
                rel="noreferrer"
                className="underline"
              >
                Terms &amp; Conditions
              </a>
            </span>
          </label>
        </form>
      )}
    </div>
  );
}

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-full bg-black/10 text-black transition hover:bg-black/20"
    >
      {children}
    </a>
  );
}

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16Zm0 1.98c-3.15 0-3.5.01-4.74.07-1.14.05-1.76.24-2.18.4-.55.21-.94.47-1.35.88-.41.41-.67.8-.88 1.35-.16.42-.35 1.04-.4 2.18-.06 1.24-.07 1.59-.07 4.74s.01 3.5.07 4.74c.05 1.14.24 1.76.4 2.18.21.55.47.94.88 1.35.41.41.8.67 1.35.88.42.16 1.04.35 2.18.4 1.24.06 1.59.07 4.74.07s3.5-.01 4.74-.07c1.14-.05 1.76-.24 2.18-.4.55-.21.94-.47 1.35-.88.41-.41.67-.8.88-1.35.16-.42.35-1.04.4-2.18.06-1.24.07-1.59.07-4.74s-.01-3.5-.07-4.74c-.05-1.14-.24-1.76-.4-2.18a3.63 3.63 0 0 0-.88-1.35 3.63 3.63 0 0 0-1.35-.88c-.42-.16-1.04-.35-2.18-.4-1.24-.06-1.59-.07-4.74-.07Zm0 3.37a4.49 4.49 0 1 1 0 8.98 4.49 4.49 0 0 1 0-8.98Zm0 1.98a2.51 2.51 0 1 0 0 5.02 2.51 2.51 0 0 0 0-5.02Zm5.72-3.34a1.05 1.05 0 1 1-2.1 0 1.05 1.05 0 0 1 2.1 0Z" />
    </svg>
  );
}

function TiktokIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M16.6 5.82a4.28 4.28 0 0 1-1.05-2.82h-3.07v12.27a2.59 2.59 0 1 1-1.83-2.48V9.54a5.66 5.66 0 1 0 4.66 5.57V8.99a7.31 7.31 0 0 0 4.27 1.37V7.29a4.28 4.28 0 0 1-2.98-1.47Z" />
    </svg>
  );
}
