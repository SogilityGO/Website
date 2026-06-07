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

export function LandingFooter() {
  return (
    <footer className="bg-sogility text-black">
      <Container className="flex flex-col gap-10 py-12 md:flex-row md:gap-[200px] md:py-16">
        <FooterColumn title="About SogilityGo" links={ABOUT_LINKS} />
        <FooterColumn title="Resources" links={RESOURCE_LINKS} />
      </Container>
    </footer>
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
