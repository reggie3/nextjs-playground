import { Howl, Howler } from "howler";

const sfx = {
  groundImpact: new Howl({
    src: ["./assets/audio/groundImpactExplosion.mp3"],
    volume: 0.7,
  }),
  flakShot: new Howl({
    src: ["./assets/audio/flakShot.wav"],
  }),
  interceptorExplosion: new Howl({
    src: ["./assets/audio/interceptorExplosion.wav"],
    volume: 0.3,
  }),
  toggleMute: (shouldMute: boolean) => {
    Howler.mute(shouldMute);
  },
};

export default sfx;

/*
attributions:

Intercept Explosion:
https://freesound.org/people/tommccann/sounds/235968/

Flak Shot:
https://freesound.org/people/kantouth/sounds/104399/

*/
