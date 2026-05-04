import React, { useEffect, useRef } from 'react';

const Background3D: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    type ShapeType = 'cube' | 'sphere' | 'pyramid' | 'wireframe';
    const shapeTypes: ShapeType[] = ['cube', 'sphere', 'pyramid', 'wireframe'];

    const shapes: Array<{
      x: number;
      y: number;
      size: number;
      rotation: number;
      rotationSpeed: number;
      type: ShapeType;
      opacity: number;
    }> = [];

    for (let i = 0; i < 8; i++) {
      shapes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: 40 + Math.random() * 60,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: 0.001 + Math.random() * 0.002,
        type: shapeTypes[Math.floor(Math.random() * shapeTypes.length)],
        opacity: 0.1 + Math.random() * 0.15,
      });
    }

    const drawCube = (x: number, y: number, size: number, rotation: number, opacity: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.strokeStyle = `rgba(0, 240, 255, ${opacity})`;
      ctx.lineWidth = 1;

      const half = size / 2;
      ctx.strokeRect(-half, -half, size, size);

      ctx.beginPath();
      ctx.moveTo(-half * 0.7, -half * 0.7);
      ctx.lineTo(half * 0.7, -half * 0.7);
      ctx.lineTo(half * 0.7, half * 0.7);
      ctx.lineTo(-half * 0.7, half * 0.7);
      ctx.closePath();
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(-half, -half);
      ctx.lineTo(-half * 0.7, -half * 0.7);
      ctx.moveTo(half, -half);
      ctx.lineTo(half * 0.7, -half * 0.7);
      ctx.moveTo(half, half);
      ctx.lineTo(half * 0.7, half * 0.7);
      ctx.moveTo(-half, half);
      ctx.lineTo(-half * 0.7, half * 0.7);
      ctx.stroke();

      ctx.restore();
    };

    const drawSphere = (x: number, y: number, size: number, rotation: number, opacity: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.strokeStyle = `rgba(0, 240, 255, ${opacity})`;
      ctx.lineWidth = 1;

      const radius = size / 2;
      ctx.beginPath();
      ctx.arc(0, 0, radius, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.ellipse(0, 0, radius, radius * 0.3, rotation, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.ellipse(0, 0, radius * 0.3, radius, rotation, 0, Math.PI * 2);
      ctx.stroke();

      ctx.restore();
    };

    const drawPyramid = (x: number, y: number, size: number, rotation: number, opacity: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.strokeStyle = `rgba(0, 240, 255, ${opacity})`;
      ctx.lineWidth = 1;

      const half = size / 2;
      ctx.beginPath();
      ctx.moveTo(0, -half);
      ctx.lineTo(-half, half);
      ctx.lineTo(half, half);
      ctx.closePath();
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, -half);
      ctx.lineTo(0, half * 0.3);
      ctx.stroke();

      ctx.restore();
    };

    const drawWireframe = (x: number, y: number, size: number, rotation: number, opacity: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.strokeStyle = `rgba(0, 240, 255, ${opacity})`;
      ctx.lineWidth = 1;

      const half = size / 2;
      const segments = 6;

      for (let i = 0; i < segments; i++) {
        const angle = (Math.PI * 2 * i) / segments;
        const x1 = Math.cos(angle) * half;
        const y1 = Math.sin(angle) * half;
        const x2 = Math.cos(angle + Math.PI * 2 / segments) * half;
        const y2 = Math.sin(angle + Math.PI * 2 / segments) * half;

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(x1, y1);
        ctx.stroke();
      }

      ctx.restore();
    };

    const drawGrid = () => {
      const gridSize = 60;
      const gridOpacity = 0.08;

      ctx.strokeStyle = `rgba(0, 240, 255, ${gridOpacity})`;
      ctx.lineWidth = 0.5;

      const offsetY = (time * 30) % gridSize;

      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      for (let y = -gridSize + offsetY; y < canvas.height; y += gridSize) {
        const fadeOut = Math.max(0, 1 - (y / canvas.height));
        ctx.strokeStyle = `rgba(0, 240, 255, ${gridOpacity * fadeOut})`;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
    };

    const animate = () => {
      ctx.fillStyle = '#1a1a1a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      drawGrid();

      shapes.forEach((shape) => {
        shape.rotation += shape.rotationSpeed;
        shape.y = (shape.y + 0.2) % (canvas.height + 100);

        switch (shape.type) {
          case 'cube':
            drawCube(shape.x, shape.y, shape.size, shape.rotation, shape.opacity);
            break;
          case 'sphere':
            drawSphere(shape.x, shape.y, shape.size, shape.rotation, shape.opacity);
            break;
          case 'pyramid':
            drawPyramid(shape.x, shape.y, shape.size, shape.rotation, shape.opacity);
            break;
          case 'wireframe':
            drawWireframe(shape.x, shape.y, shape.size, shape.rotation, shape.opacity);
            break;
        }
      });

      time += 0.01;
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};

export default Background3D;
