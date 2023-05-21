import { useRef, useEffect, useCallback } from 'react';
import mojs from '@mojs/core';

const DURATION = 2500;
const bouncePath = mojs.easing.path('M0, 100 C0, 100 15.898474554477906, 49.81581115980782 20, 30 C21.29141491928783, 86.10932951174482 68.1102019929423, 86.37745506536945 75, 60 C90.46122657848623, 83.90825922034482 100, 0 100, 0 ');

const MOVEMENT_OPTS = {
  duration: DURATION,
  x: { 400: -271 }
}

const SQUARE_OPTS = {
  y: { [-300]: 70, delay: 0, duration: 2500, easing: bouncePath },
}

const BouncingBlock = () => {
  const container = useRef(null);
  const squareRef = useRef(null);
  const shadowRef = useRef(null);

  useEffect(() => {
    squareRef.current = new mojs.Html({
      ...MOVEMENT_OPTS,
      ...SQUARE_OPTS,
      el: '#square',
      rotateZ: { 90: [-135], curve: bouncePath },
    }).then({
      x: -271,
      y: { 70: -70 },
      rotateZ: { 0: [-155] },
      duration: 500,
      easing: 'cubic.out'
    });

    shadowRef.current = new mojs.Html({
      el: '#shadow',
      y: -40,
      x: -271,
      delay: 2150,
      opacity: {
        0: 1, curve: function (k) {
          return Math.max((bouncePath(k) - 1) / 4, .25);
        }
      },
      scaleX: {
        1: 1, curve: function (k) {
          return 1.35 * bouncePath(k);
        }
      }
    }).then({
      duration: 250,
      delay: 250,
      opacity: {
        0.25: 0.25
      },
      scaleX: {
        1.35: 0.75
      },
    });

    squareRef.current.play();
    shadowRef.current.play();
  }, []);

  const animate = useCallback(() => {
    squareRef.current.play();
    shadowRef.current.play();
  }, []);

  return (
    <>
      <button className="button" onClick={animate}>
        Play animation
      </button>
      <div className="container">
        <div className="img-container">
        </div>
        <div ref={container} className="animation">
          <div id="square" className="square" />
          <div id="shadow" className="shadow"></div>
        </div>
      </div>
    </>
  );

}

export default BouncingBlock;