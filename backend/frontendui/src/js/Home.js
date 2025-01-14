import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import Hero from './Hero';
import ContentBoxes from './ContentBoxes';
import Testimonials from './Testimonials';
import Header from './Header';
import Footer from './Footer';

// function Home() {
//   const testimonials = [
//     "Testimonial 1",
//     "Testimonial 2",
//     "Testimonial 3",
//   ];

//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 3000,
//   };

//   return (
//     <div className="Home">
//       <section className="background-section">
//         <div className="overlay">
//           <h1>Welcome to Our Website</h1>
//         </div>
//       </section>
//       <section className="info-section">
//         <div className="info-box">
//           <h2>Box 1</h2>
//           <p>Some information about Box 1</p>
//           <Link to="/quizes">Go to Quizes</Link>
//         </div>
//         <div className="info-box">
//           <h2>Box 2</h2>
//           <p>Some information about Box 2</p>
//           <Link to="/my-scores">Go to My Scores</Link>
//         </div>
//       </section>
//       <section className="testimonials-section">
//         <Slider {...settings}>
//           {testimonials.map((testimonial, index) => (
//             <div key={index} className="testimonial">
//               <p>{testimonial}</p>
//             </div>
//           ))}
//         </Slider>
//       </section>
//     </div>
//   );
// }

function Home() {
    return(
        <div>
            <Header/>
            <Hero/>
            <ContentBoxes/>
            <Testimonials/>
            <Footer />
        </div>
    );
}
export default Home;
