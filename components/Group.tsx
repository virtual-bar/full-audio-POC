import React, { useState } from 'react';
import styled from 'styled-components';
import User from './User';
import { flexCentered } from './styles';

const GroupContainer = styled.div`
  ${flexCentered}
  border: 2px solid black;
  margin: 5px;
`;

// Break down passed source object and return only file paths
const createSourceArray = groupAudioSources => {
  const sourceArray: Array<string> = [];
  let index: number = 0;
  groupAudioSources.groupAudioSources.forEach(source => {
    sourceArray[index] = source[0];
    index++;
  });

  return sourceArray;
};

// Main component
const Group = groupAudioSources => {
  console.error('GROUP STARTED');

  console.log({ groupAudioSources });

  const audioCtx: AudioContext = groupAudioSources.audioContext.audioCtx;
  const groupGain: GainNode = groupAudioSources.audioContext.groupGain;
  const groupSources: Array<string> = createSourceArray(groupAudioSources);

  return (
    <>
      <GroupContainer>
        {groupSources.map(source => (
          <User audioCtx={audioCtx} groupGain={groupGain} source={source} />
        ))}
      </GroupContainer>
    </>
  );
};

export default Group;
