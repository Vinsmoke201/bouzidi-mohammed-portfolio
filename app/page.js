import ClientReviewsSection from "./(components)/client-reviews-section/ClientReviewsSection";
import PortfolioSection from "./(components)/portfolio-section/PortfolioSection";
import ServiceSection from "./(components)/service-section/ServiceSection";
import TopSection from "./(components)/top-section/TopSection";

export default function Home() {
  return (
    <div className="flex flex-col overflow-auto w-full ">
      <TopSection />
      <ServiceSection />
      <ClientReviewsSection />
      <PortfolioSection />
    </div>
  );
}
