import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { useState, useEffect } from 'react';

const Testimonials = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const testimonials = [
    {
      name: "Vaibhavi Patil",
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      quote: "I sold my property through Sadguru Estate, and the entire process was quick and transparent. Their team managed negotiations professionally and got me the best deal possible. Great experience overall!",
      rating: 5,
      location: "Navi Mumbai"
    },
    {
      name: "Bhavika Jhadhav",
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      quote: "Sadguru Estate is truly a one-stop solution for property buyers in Navi Mumbai. From site visits to documentation, everything was handled smoothly. I would definitely recommend them to anyone looking for a reliable real estate consultant.",
      rating: 5,
      location: "Navi Mumbai"
    },
    {
      name: "Vikrant Mhatre",
      image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      quote: "I was looking for a 2BHK in Kharghar, and Sadguru Estate helped me find the perfect flat within my budget. They have excellent knowledge of Navi Mumbai property trends and always put the client's needs first.",
      rating: 5,
      location: "Kharghar"
    },
    {
      name: "Shivani Mane",
      image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      quote: "The consultants at Sadguru Estate are very professional and patient. They helped me compare multiple projects in Panvel before finalizing the one that met all my requirements. Excellent service and after-sales support!",
      rating: 5,
      location: "Panvel"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-16 bg-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-semibold text-gray-900 mb-4">What Our Clients Say</h2>
          <p className="text-xl text-gray-600">Real experiences from satisfied customers</p>
        </div>

        <div className="relative max-w-4xl mx-auto">  
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="text-center">
              <img 
                src={testimonials[currentSlide].image} 
                alt={testimonials[currentSlide].name}
                className="w-20 h-20 rounded-full mx-auto mb-6 object-cover"
              />
              
              <div className="flex justify-center mb-4">
                {[...Array(testimonials[currentSlide].rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-amber-400 fill-current" />
                ))}
              </div>

              <blockquote className="text-xl md:text-2xl text-gray-700 italic mb-6 leading-relaxed">
                "{testimonials[currentSlide].quote}"
              </blockquote>

              <div>
                <h4 className="text-xl font-semibold text-gray-900">{testimonials[currentSlide].name}</h4>
                <p className="text-gray-600">{testimonials[currentSlide].location}</p>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <button 
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-shadow"
          >
            <ChevronLeft className="h-6 w-6 text-gray-600" />
          </button>
          
          <button 
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-shadow"
          >
            <ChevronRight className="h-6 w-6 text-gray-600" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentSlide ? 'bg-amber-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;