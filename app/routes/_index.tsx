import type {Route} from './+types/_index';
import {
  Hero,
  UnlockBanner,
  TrustedBy,
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
      <TrustedBy />
      <PlayerJourney />
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
