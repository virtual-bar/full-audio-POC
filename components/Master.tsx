import React, { useState } from 'react';
import Group from './Group';

const audioSources: Array<string[]> = [
  ['/FeelItStill.mp3', 'a'],
  ['/NoComingDown.mp3', 'a'],
  ['/Silence.mp3', 'b'],
  ['/WeWantYourSoul.mp3', 'c'],
  ['/WhenIWasYoung.mp3', 'c'],
];

const filterSources = (group: string) => {
  return audioSources.filter(source => source[1] == `${group}`);
};

// Create group audio context(s)
const initializeGroupAudio = initialGain => {
  const AudioContext = window.AudioContext;
  const [audioCtx] = useState(new AudioContext());
  const [groupGain] = useState(audioCtx.createGain());

  groupGain.gain.setValueAtTime(initialGain, audioCtx.currentTime);

  return { audioCtx, groupGain };
};

const Master = () => {
  console.error('MASTER STARTED');

  const groupAAudio = initializeGroupAudio(1);
  const groupBAudio = initializeGroupAudio(0.1);
  const groupCAudio = initializeGroupAudio(1);

  return (
    <>
      <Group
        groupAudioSources={filterSources('a')}
        audioContext={groupAAudio}
        key={groupAAudio.audioCtx.currentTime}
      />
      <Group
        groupAudioSources={filterSources('b')}
        audioContext={groupBAudio}
        key={groupBAudio.audioCtx.currentTime}
      />
      <Group
        groupAudioSources={filterSources('c')}
        audioContext={groupCAudio}
        key={groupCAudio.audioCtx.currentTime}
      />
    </>
  );
};

export default Master;
