'use client';

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FiStar } from 'react-icons/fi';
import { useInView } from "react-intersection-observer";
import Carousel from "../shared/Carousel";

const ClientReviewsSection = () => {
  const { t } = useTranslation("client-reviews");
  const reviews = t("reviews", { returnObjects: true });

  const carouselItems = Array.isArray(reviews)
    ? reviews.map((review, index) => ({
        title: review.client_name,
        description: review.testimonial,
        id: index + 1,
        profileImage: review.photoUrl,
        icon: <FiStar className="carousel-icon" />
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
        className="mx-auto mt-[6rem] text-4xl"
      >
        {t("title")}
      </motion.h1>

      <motion.div
        ref={carouselRef}
        initial={{ opacity: 0, y: 30 }}
        animate={carouselInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative w-fit h-[40vh] mx-auto mt-[8rem]"
      >
        {carouselItems.length > 0 ? (
          <Carousel
            items={carouselItems}
            baseWidth={800}
            autoplay={true}
            autoplayDelay={3000}
            pauseOnHover={true}
            loop={true}
            round={false}
          />
        ) : (
          <p className="text-white">No reviews available.</p>
        )}
      </motion.div>
    </section>
  );
};

export default ClientReviewsSection;