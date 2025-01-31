import { Hero_pict } from "../assets/products/assets_products"

const Hero = () => {
  return (
    <div className="relative w-full">
      {/* Image section */}
      <img
        src={Hero_pict}
        alt="hero"
        className="w-full h-screen object-cover" // Full-size image
      />

      {/* Text section on top of the image */}
      <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col items-center justify-center text-white p-4">
        <div className="container mx-auto text-center">
          <h1 className="text-[4vw] sm:text-[3vw] md:text-[2.5vw] lg:text-[2vw] font-bold text-white">
            T-Shirt
          </h1>
          <p className="text-[3vw] sm:text-[2.5vw] md:text-[2vw] lg:text-[1.5vw]">
            Comfortable, everyday wear
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
