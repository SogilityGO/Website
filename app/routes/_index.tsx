import type {Route} from './+types/_index';
import {
  Hero,
  UnlockBanner,
  TrustedBy,
  TrainingTogether,
  PlayerJourney,
  VirtualCoach,
  Reviews,
  TrainingBoard,
  CoreSkills,
  StartTraining,
  OwnerMessage,
  Faq,
} from '~/components/landing/sections';

export const meta: Route.MetaFunction = () => {
  return [
    {title: 'SogilityGO — Elite soccer training at home'},
    {
      name: 'description',
      content:
        'A guided virtual coach. Real-time feedback. Measurable improvement. At-home elite soccer training with the ReboundIQ board.',
    },
  ];
};

export default function Homepage() {
  return (
    <>
      <Hero />
      <UnlockBanner />
      {/* Mobile order: Training together → Player journey → Trusted by (logos).
          Desktop order: Trusted by → Training together → Player journey. */}
      <div className="flex flex-col">
        <div className="order-3 lg:order-1">
          <TrustedBy />
        </div>
        <div className="order-1 lg:order-2">
          <TrainingTogether />
        </div>
        <div className="order-2 lg:order-3">
          <PlayerJourney />
        </div>
      </div>
      <VirtualCoach />
      <Reviews />
      <TrainingBoard />
      <CoreSkills />
      <StartTraining />
      <OwnerMessage />
      <Faq />
    </>
  );
}
