import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function SpiderWebIntro({ onComplete }) {
  const canvasRef = useRef(null);
  const overlayRef = useRef(null);
  const textRef = useRef(null);
  const subTextRef = useRef(null);
  const containerRef = useRef(null);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;
    let width = window.innerWidth;
    let height = window.innerHeight;

    canvas.width = width;
    canvas.height = height;

    const centerX = width / 2;
    const centerY = height / 2;
    const numRadials = 16;
    const numSpirals = 8;
    const maxRadius = Math.max(width, height) * 0.7;

    let radialProgress = 0;
    let spiralProgress = 0;
    let phase = 'thread'; // thread -> radials -> spirals -> text -> fadeout
    let threadY = -50;
    let threadTargetY = centerY - 60;
    let spiderY = -100;

    // Spider icon properties
    const drawSpider = (x, y, size, opacity) => {
      ctx.save();
      ctx.globalAlpha = opacity;
      ctx.fillStyle = '#e23636';
      ctx.strokeStyle = '#e23636';
      ctx.lineWidth = 2;

      // Body
      ctx.beginPath();
      ctx.ellipse(x, y, size * 0.35, size * 0.5, 0, 0, Math.PI * 2);
      ctx.fill();

      // Head
      ctx.beginPath();
      ctx.ellipse(x, y - size * 0.55, size * 0.25, size * 0.25, 0, 0, Math.PI * 2);
      ctx.fill();

      // Eyes
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.ellipse(x - size * 0.1, y - size * 0.58, size * 0.08, size * 0.06, -0.2, 0, 0 + Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(x + size * 0.1, y - size * 0.58, size * 0.08, size * 0.06, 0.2, 0, Math.PI * 2);
      ctx.fill();

      // Legs
      ctx.strokeStyle = '#e23636';
      ctx.lineWidth = 1.5;
      const legAngles = [-0.6, -0.3, 0.1, 0.4];
      legAngles.forEach((angle, i) => {
        // Left legs
        ctx.beginPath();
        ctx.moveTo(x - size * 0.3, y - size * 0.1 + i * size * 0.15);
        ctx.quadraticCurveTo(
          x - size * 0.9, y - size * 0.4 + i * size * 0.2 + angle * size,
          x - size * 0.7, y + size * 0.1 + i * size * 0.15 + angle * size * 0.5
        );
        ctx.stroke();
        // Right legs
        ctx.beginPath();
        ctx.moveTo(x + size * 0.3, y - size * 0.1 + i * size * 0.15);
        ctx.quadraticCurveTo(
          x + size * 0.9, y - size * 0.4 + i * size * 0.2 + angle * size,
          x + size * 0.7, y + size * 0.1 + i * size * 0.15 + angle * size * 0.5
        );
        ctx.stroke();
      });

      ctx.restore();
    };

    const drawWeb = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw main thread from top
      if (phase !== 'done') {
        ctx.beginPath();
        ctx.moveTo(centerX, 0);
        ctx.lineTo(centerX, Math.min(threadY, threadTargetY));
        ctx.strokeStyle = 'rgba(226, 54, 54, 0.6)';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      // Draw spider
      if (phase !== 'done' && spiderY < threadTargetY + 10) {
        drawSpider(centerX, Math.min(spiderY, threadTargetY - 30), 20, 1);
      }

      // Draw radial threads
      if (radialProgress > 0) {
        for (let i = 0; i < numRadials; i++) {
          const angle = (Math.PI * 2 * i) / numRadials;
          const currentLen = maxRadius * radialProgress;
          ctx.beginPath();
          ctx.moveTo(centerX, centerY);
          ctx.lineTo(
            centerX + Math.cos(angle) * currentLen,
            centerY + Math.sin(angle) * currentLen
          );
          ctx.strokeStyle = `rgba(226, 54, 54, ${0.15 + radialProgress * 0.2})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }

      // Draw spiral threads
      if (spiralProgress > 0) {
        for (let s = 1; s <= numSpirals; s++) {
          const spiralRadius = (maxRadius / (numSpirals + 1)) * s;
          if (spiralRadius * (1 / maxRadius) > spiralProgress) break;

          ctx.beginPath();
          for (let i = 0; i <= numRadials; i++) {
            const angle = (Math.PI * 2 * i) / numRadials;
            const wobble = Math.sin(i * 1.5 + s) * spiralRadius * 0.05;
            const x = centerX + Math.cos(angle) * (spiralRadius + wobble);
            const y = centerY + Math.sin(angle) * (spiralRadius + wobble);
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.strokeStyle = `rgba(226, 54, 54, ${0.08 + spiralProgress * 0.12})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    };

    // GSAP animation timeline
    const tl = gsap.timeline({
      onComplete: () => {
        phase = 'done';
        cancelAnimationFrame(animationId);
        setIsComplete(true);
        if (onComplete) onComplete();
      },
    });

    // Phase 1: Thread descends
    tl.to({ val: 0 }, {
      val: 1,
      duration: 0.8,
      ease: 'power2.out',
      onUpdate: function () {
        threadY = -50 + (threadTargetY + 50) * this.targets()[0].val;
        spiderY = -100 + (threadTargetY - 30 + 100) * this.targets()[0].val;
        drawWeb();
      },
    });

    // Phase 2: Radial threads shoot out
    tl.to({ val: 0 }, {
      val: 1,
      duration: 0.8,
      ease: 'power2.out',
      onUpdate: function () {
        phase = 'radials';
        radialProgress = this.targets()[0].val;
        drawWeb();
      },
    }, '+=0.2');

    // Phase 3: Spiral threads appear
    tl.to({ val: 0 }, {
      val: 1,
      duration: 0.6,
      ease: 'power1.out',
      onUpdate: function () {
        phase = 'spirals';
        spiralProgress = this.targets()[0].val;
        drawWeb();
      },
    }, '+=0.1');

    // Phase 4: Text appears
    tl.fromTo(
      textRef.current,
      { opacity: 0, scale: 0.8, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: 'back.out(1.7)' },
      '-=0.3'
    );

    tl.fromTo(
      subTextRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
      '-=0.2'
    );

    // Phase 5: Hold, then fade out
    tl.to(containerRef.current, {
      opacity: 0,
      scale: 1.1,
      duration: 0.8,
      ease: 'power2.inOut',
      delay: 1.2,
    });

    // Handle resize
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      tl.kill();
      cancelAnimationFrame(animationId);
    };
  }, [onComplete]);

  if (isComplete) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{ background: '#0a0a0a' }}
    >
      <canvas ref={canvasRef} className="absolute inset-0" />
      <div className="relative z-10 text-center">
        <h1
          ref={textRef}
          className="font-heading text-6xl md:text-8xl tracking-widest opacity-0"
          style={{ color: '#e23636' }}
        >
          WELCOME TO MY WEB
        </h1>
        <p
          ref={subTextRef}
          className="font-body text-lg md:text-xl mt-4 tracking-wider opacity-0"
          style={{ color: 'rgba(255,255,255,0.6)' }}
        >
          Crafted with great power & great responsibility
        </p>
      </div>
    </div>
  );
}
