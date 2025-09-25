'use client';

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useInView } from "react-intersection-observer";
import RollingGallery from "../shared/Carousel";

const ClientReviewsSection = () => {
  const { t } = useTranslation("client-reviews");
  const reviews = t("reviews", { returnObjects: true });

  const carouselItems = Array.isArray(reviews)
    ? reviews.map((review, index) => ({
        title: review.client_name,
        description: review.testimonial,
        id: index + 1,
        image: review.photoUrl || 'https://via.placeholder.com/300x120', // Fallback image
      }))
    : [];

  const [titleRef, titleInView] = useInView({ triggerOnce: true, threshold: 0.3 });
  const [carouselRef, carouselInView] = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section id="reviews" className="flex flex-col w-full h-screen magicpattern-2 relative">
      <motion.h1
        ref={titleRef}
        initial={{ opacity: 0, y: -20 }}
        animate={titleInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="mx-auto mt-[6rem] text-4xl text-white"
      >
        {t("title")}
      </motion.h1>

      <motion.div
        ref={carouselRef}
        initial={{ opacity: 0, y: 30 }}
        animate={carouselInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative w-full h-[70vh] mx-auto mt-[8rem]"
      >
        {carouselItems.length > 0 ? (
          <RollingGallery
            items={carouselItems}
            autoplay={true}
            autoplayDelay={3000}
            pauseOnHover={true}
          />
        ) : (
          <p className="text-white">No reviews available.</p>
        )}
      </motion.div>
    </section>
  );
};

export default ClientReviewsSection;