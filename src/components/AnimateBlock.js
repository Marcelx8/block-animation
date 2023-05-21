import { useRef, useEffect, useCallback } from 'react';
import mojs from '@mojs/core';

const AnimateBlock = () => {
  const bouncyCircle = useRef();
  const animDom = useRef();

  useEffect(() => {
    if (bouncyCircle.current) return;

    bouncyCircle.current = new mojs.Shape({
      parent: animDom.current,
      shape: 'circle',
      fill: { '#FC46AD': '#F64040' },
      radius: { 50: 200 },
      duration: 1000,
      isShowStart: true,
      easing: 'elastic.inout',
    });

    bouncyCircle.current.play();
  });

  const clickHandler = useCallback(() => {
    bouncyCircle.current.play();
  }, []);

  return (
    <div ref={animDom} className="MojsExample">
      <button className="button" onClick={clickHandler}>
        Play animation
      </button>
    </div>
  );
};

export default AnimateBlock;
