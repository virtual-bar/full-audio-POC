import React, { useState, useEffect } from 'react';
import { Button } from './styles';

// Create new audio from source
const getAudio = audioSource => {
  const audio = new Audio(audioSource);
  return audio;
};

// Main component
const User = userAudioSources => {
  console.error('USER STARTED');

  const [playing, setPlaying] = useState(false);
  const userAudioCtx = userAudioSources.audioCtx;
  const groupGain = userAudioSources.groupGain;
  const userSource = getAudio(userAudioSources.source);

  console.log({ userAudioSources });

  // Function definition to toggle playing
  const togglePlaying = () => {
    setPlaying(!playing);
  };

  // Getter for audio source for use in useEffect
  const getSource = () => userSource;

  // One-Time post-render setup and connections
  useEffect(() => {
    const audioElement = getSource();
    const track = userAudioCtx.createMediaElementSource(audioElement);

    track.connect(groupGain).connect(userAudioCtx.destination);
  }, []);

  // Repeatable settings for playing and volume states
  useEffect(() => {
    const audioElement = getSource();

    if (playing && audioElement.paused) {
      audioElement.play();
    } else if (!playing && !audioElement.paused) {
      audioElement.pause();
    }
  }, [playing]);

  // Kill audioCtx before unloading
  window.addEventListener('beforeunload', () => {
    userAudioCtx.close();
  });

  return (
    <>
      <Button
        data-playing={playing}
        className="control-play"
        role="switch"
        onClick={togglePlaying}
      >
        {playing ? 'Playing' : 'Paused'}
      </Button>
    </>
  );
};

export default User;
