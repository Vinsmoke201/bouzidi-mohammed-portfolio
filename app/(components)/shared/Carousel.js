import { motion, useAnimation, useMotionValue, useTransform } from 'motion/react';
import { useEffect, useState } from 'react';
import { AiFillStar } from 'react-icons/ai';

const DEFAULT_ITEMS = [
  {
    title: 'Scenic View',
    description: 'A breathtaking landscape from a mountain top.',
    id: 1,
    image: 'https://images.unsplash.com/photo-1528181304800-259b08848526?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    title: 'Ocean Breeze',
    description: 'Calm waves lapping at the shore.',
    id: 2,
    image: 'https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    title: 'Sunset Glow',
    description: 'A vibrant sunset over the horizon.',
    id: 3,
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    title: 'Mountain Retreat',
    description: 'A serene mountain escape.',
    id: 4,
    image: 'https://images.unsplash.com/photo-1495103033382-fe343886b671?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    title: 'Forest Path',
    description: 'A peaceful walk through the woods.',
    id: 5,
    image: 'https://images.unsplash.com/photo-1506781961370-37a89d6b3095?q=80&w=3264&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    title: 'City Lights',
    description: 'Vibrant cityscape at night.',
    id: 6,
    image: 'https://images.unsplash.com/photo-1599576838688-8a6c11263108?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    title: 'Desert Dunes',
    description: 'Endless sands under the sun.',
    id: 7,
    image: 'https://images.unsplash.com/photo-1494094892896-7f14a4433b7a?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    title: 'Lush Valley',
    description: 'A green valley with flowing rivers.',
    id: 8,
    image: 'https://plus.unsplash.com/premium_photo-1664910706524-e783eed89e71?q=80&w=3869&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    title: 'Coastal Cliffs',
    description: 'Rugged cliffs by the sea.',
    id: 9,
    image: 'https://images.unsplash.com/photo-1503788311183-fa3bf9c4bc32?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    title: 'Urban Skyline',
    description: 'A modern city skyline at dusk.',
    id: 10,
    image: 'https://images.unsplash.com/photo-1585970480901-90d6bb2a48b5?q=80&w=3774&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];

const renderStars = (rating = 5) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(<AiFillStar key={i} className="text-xl" style={{ color: i < rating ? '#ffd700' : '#555' }} />);
  }
  return stars;
};

const GalleryItem = ({ item, index, faceCount, faceWidth, radius }) => {
  return (
    <div
      className="group absolute bg-[#000B20] border-2 border-[#1059AD] flex flex-col h-[44%] items-center justify-center p-[8%] [backface-visibility:hidden] md:p-[6%]"
      style={{
        width: `${faceWidth}px`,
        transform: `rotateY(${(360 / faceCount) * index}deg) translateZ(${radius}px)`,
      }}
    >
      <div className="flex flex-col items-center w-full">
        <img
          src={item.image}
          alt={item.title}
          className="pointer-events-none h-[68px] w-[68px] rounded-full border-[3px] border-white object-cover
                     transition-transform duration-300 ease-out group-hover:scale-105"
        />
        <div className="mx-auto flex flex-col mt-4">
          <div className="text-xl font-semibold text-white text-center">{item.title}</div>
          <div className="flex flex-row justify-center mt-2">{renderStars(5)}</div>
        </div>
      </div>
      <div className="mt-2 text-center">
        <p className="text-base text-gray-400">{item.description}</p>
      </div>
    </div>
  );
};

const RollingGallery = ({ autoplay = false, autoplayDelay = 3000, pauseOnHover = false, items = [] }) => {
  items = items.length > 0 ? items : DEFAULT_ITEMS;

  const [isScreenSizeSm, setIsScreenSizeSm] = useState(window.innerWidth <= 640);
  useEffect(() => {
    const handleResize = () => setIsScreenSizeSm(window.innerWidth <= 640);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const cylinderWidth = isScreenSizeSm ? 1100 : 1800;
  const faceCount = items.length;
  const faceWidth = (cylinderWidth / faceCount) * 1.5;
  const radius = cylinderWidth / (2 * Math.PI);
  const dragFactor = 0.02; // Reduced for lower mouse sensitivity

  const rotation = useMotionValue(0);
  const controls = useAnimation();

  const transform = useTransform(rotation, val => `rotate3d(0,1,0,${val}deg)`);

  const startInfiniteSpin = startAngle => {
    controls.start({
      rotateY: [startAngle, startAngle - 360],
      transition: {
        duration: 40, // Increased for slower autoplay
        ease: 'linear',
        repeat: Infinity
      }
    });
  };

  useEffect(() => {
    if (autoplay) {
      const currentAngle = rotation.get();
      startInfiniteSpin(currentAngle);
    } else {
      controls.stop();
    }
  }, [autoplay, controls, rotation]);

  const handleUpdate = latest => {
    if (typeof latest.rotateY === 'number') {
      rotation.set(latest.rotateY);
    }
  };

  const handleDrag = (_, info) => {
    controls.stop();
    rotation.set(rotation.get() + info.offset.x * dragFactor);
  };

  const handleDragEnd = (_, info) => {
    const finalAngle = rotation.get() + info.velocity.x * dragFactor;
    rotation.set(finalAngle);

    if (autoplay) {
      startInfiniteSpin(finalAngle);
    }
  };

  const handleMouseEnter = () => {
    if (autoplay && pauseOnHover) {
      controls.stop();
    }
  };

  const handleMouseLeave = () => {
    if (autoplay && pauseOnHover) {
      const currentAngle = rotation.get();
      startInfiniteSpin(currentAngle);
    }
  };

  return (
    <div className="relative h-[100%] w-full overflow-hidden">
      <div
        className="absolute top-0 left-0 h-full w-[48px] z-10"
        style={{
          background: 'linear-gradient(to right, #060010 0%, rgba(0,0,0,0) 100%)'
        }}
      />
      <div
        className="absolute top-0 right-0 h-full w-[48px] z-10"
        style={{
          background: 'linear-gradient(to left, #060010 0%, rgba(0,0,0,0) 100%)'
        }}
      />

      <div className="flex h-full items-center justify-center [perspective:1000px] [transform-style:preserve-3d]">
        <motion.div
          drag="x"
          dragElastic={0}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          animate={controls}
          onUpdate={handleUpdate}
          style={{
            transform: transform,
            rotateY: rotation,
            width: cylinderWidth,
            transformStyle: 'preserve-3d'
          }}
          className="flex min-h-full cursor-grab items-center justify-center [transform-style:preserve-3d]"
        >
          {items.map((item, i) => (
            <GalleryItem
              key={item.id}
              item={item}
              index={i}
              faceCount={faceCount}
              faceWidth={faceWidth}
              radius={radius}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default RollingGallery;