"use client";

import LenisProvider from "./providers/LenisProvider";
import {
  Section1Intro,
  Section2CatTalks,
  Section3Hunt,
  Section4River,
  Section5KingMeeting,
  Section6Peasants,
  Section7Ogre,
  Section8Ending,
} from "./components/sections";

export default function Home() {
  return (
    <LenisProvider>
      <main className="overflow-x-hidden">
        <Section1Intro />
        <Section2CatTalks />
        <Section3Hunt />
        <Section4River />
        <Section5KingMeeting />
        <Section6Peasants />
        <Section7Ogre />
        <Section8Ending />
      </main>
    </LenisProvider>
  );
}
