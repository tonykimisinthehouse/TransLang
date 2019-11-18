import React from 'react';

import {useSpring, animated} from 'react-spring'; // refer to https://www.react-spring.io/docs/hooks/basics

function Question() {
  const props = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: {duration: 750},
    fontFamily: 'PT Serif'
  })
  return (
    <animated.h1 style={props}>
      Read the question out loud: Understand what you're being asked to do.
    </animated.h1>// tie the animated values to your view
    )
}


export default Question;