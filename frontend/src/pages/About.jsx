import React from 'react';
import '../css/About.css'
const isDark = localStorage.getItem('isDark');


const About = () => {
    return (
        <div>
            <div className={isDark ? 'darkFrame' : 'lightFrame'}>
                <div class="about">
                    <h1>About Us</h1>

                    <p>Welcome to [Your Event Management Website Name], where every event becomes an unforgettable experience!</p>

                    <p>We are passionate about simplifying event planning and providing tools to ensure seamless coordination and enjoyment for every occasion. Whether it’s a wedding, corporate conference, birthday party, or a casual gathering, our platform is designed to cater to your unique needs.</p>

                    <h2>What We Do</h2>
                    <p>Our platform offers an innovative way to manage and organize events with ease:</p>
                    <ul>
                        <li><strong>Create and Customize Events:</strong> From setting dates and times to adding participants and even integrating Zoom links for virtual events.</li>
                        <li><strong>Manage Participants:</strong> Easily add, edit, or remove participants for better coordination.</li>
                        <li><strong>User-Friendly Calendar:</strong> Navigate through your events effortlessly with our sleek and intuitive calendar view.</li>
                        <li><strong>Like and Save Your Favorites:</strong> Discover events and save your favorites for quick access later.</li>
                    </ul>

                    <h2>Why Choose Us?</h2>
                    <ol>
                        <li><strong>For Businesses and Individuals:</strong> Whether you're a business user managing large-scale events or a regular user organizing personal gatherings, our platform has everything you need.</li>
                        <li><strong>Tailored for Convenience:</strong> Enjoy a smooth experience on both desktop and mobile devices.</li>
                        <li><strong>Community First:</strong> We believe in connecting people and making event planning stress-free for everyone.</li>
                    </ol>

                    <h2>Our Vision</h2>
                    <p>We aim to revolutionize how events are planned and managed. Our goal is to empower users with modern tools that take the hassle out of coordination, leaving you with more time to focus on what truly matters – celebrating life’s moments.</p>

                    <p>Join us today and transform your events into cherished memories!</p>
                </div >
            </div>
        </div>
    )
}

export default About



