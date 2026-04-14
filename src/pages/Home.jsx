import { Link } from 'react-router-dom'
import { FaMusic, FaFutbol, FaChalkboardTeacher, FaBook } from "react-icons/fa";
import "./Home.css"
import musicImg from '../assets/music.jpg';
import sportImg from '../assets/sport.jpg';
import workshopImg from '../assets/workshop.jpg';
import educationImg from '../assets/education.jpg';

function Home() {
return (
<div className="page-container">

{/* Hero Section */}
<div className='bg-primary text-white py-5'>
<div className='container text-center'>
<h1 className='display-4 fw-bold'>City Events</h1>
<p className='lead'>
Discover the best events near you <br />

</p>
<Link to='/events' className='btn btn-light btn-lg mt-3'>
Explore Events
</Link>
</div>
</div>

{/* Categories Section */}
<div className='container my-5'>
<h2 className='text-center mb-4'>Categories</h2>

<div className='row g-4'>
{[
{
icon: <i className="bi bi-music-note-beamed"></i>,
name: 'Music',
cat: 'music',
img: musicImg
},
{
icon: <i className="bi bi-trophy"></i>,
name: 'Sport',
cat: 'sport',
img: sportImg
},
{
icon: <i className="bi bi-easel"></i>,
name: 'Workshop',
cat: 'workshop',
img: workshopImg
},
{
icon: <i className="bi bi-book"></i>,
name: 'Education',
cat: 'education',
img: educationImg
}
].map((item) => (
<div className='col-md-3' key={item.cat}>
<Link
to={`/events?category=${item.cat}`}
className='text-decoration-none'
>
<div
className='category-card-pro'
style={{ backgroundImage: `url(${item.img})` }}
>
<div className="overlay">
<div className="content">
<div className="icon">{item.icon}</div>
<h5>{item.name}</h5>
</div>
</div>
</div>
</Link>
</div>
))}
</div>
</div>

{/* Footer Contact FULL WIDTH 🔥 */}
<footer className="footer-contact">
<div className="container text-center">

<p className="footer-title">Contact</p>

<p className="footer-info">
📧 contact@cityevents.com &nbsp; | &nbsp; 📞 +216 12 345 678
</p>

<div className="socials">
<a href="#"><i className="bi bi-instagram"></i></a>
<a href="#"><i className="bi bi-facebook"></i></a>
<a href="#"><i className="bi bi-snapchat"></i></a>
</div>

</div>
</footer>

</div>
)
}

export default Home