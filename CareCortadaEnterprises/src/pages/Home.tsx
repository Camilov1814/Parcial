import MakeupCard from '../components/MakeupCard';
import Navbar from '../components/Navbar';
import { makeup } from '../products/makeup';
import { CartTab } from '../components/CartTab';
import Carrousel from '../components/Carrousel';

const Home = () => {
  return (
    <>
      <div className="flex flex-col items-center ">  {/* Added padding */}
      <CartTab />
        <Navbar />
        

        {/* Hero Section */}
        <section className="w-full bg-complement2 text-center py-20">
          <div className="container mx-auto">
            <h1 className="text-5xl font-title font-bold text-primary mb-4">
              Welcome to {`La Care Cortada`}!
            </h1>
            <p className="text-2xl font-sans text-complement1 mb-8">
              I'm Andrea Mesa, and I welcome you to my world of beauty and
              empowerment.
            </p>
            <button className="bg-primary text-white px-6 py-3 rounded hover:bg-secondary font-sans">
              Explore
            </button>
          </div>
        </section>

        {/* Featured Models */}
        <section className="w-full py-16">
          <div className="container mx-auto">
            <Carrousel />
          </div>
        </section>

        {/* Featured Products */}
        <section className="w-full py-16 bg-gray-100">
          <div className="container mx-auto">
            <h2 className="text-3xl font-title font-bold text-primary mb-6 text-center">
              Featured Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {makeup.slice(0, 4).map((product, key) => (
                <MakeupCard
                  key={key}
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  image={product.image}
                  slug={product.slug}
                />
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="w-full py-16 bg-complement2 text-center">
          <div className="container mx-auto">
            <h2 className="text-3xl font-title font-bold text-primary mb-6">
              About {`La Care Cortada`}
            </h2>
            <p className="text-xl font-sans text-white mb-8">
              Discover the story behind {`La Care Cortada`} and our commitment to
              empowering women in the beauty industry.
            </p>
            <button className="bg-white text-primary px-6 py-3 rounded hover:bg-secondary font-sans">
              Learn More
            </button>
          </div>
        </section>

        {/* Footer */}
        <footer className="w-full bg-primary text-white text-center p-4">
          <p className="font-sans">© 2024 Care Cortada. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
};

export default Home;  