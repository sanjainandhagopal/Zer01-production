'use client';
import React, { useEffect, useState } from 'react';
import Image from "next/image";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import NavigationBar from '@/app/NavigationBar/page';
import { fetchUser } from '@/app/OperatorFunctions/userVerifier';
import { useRouter } from 'next/navigation';
import { Slab } from 'react-loading-indicators';

const projects = [
  {
    id: 1,
    title: "AI-Powered Chatbot System",
    Description: `An AI-Powered Customer Support System is designed to streamline and enhance the customer support process using artificial intelligence. By leveraging technologies like Natural Language Processing (NLP), machine learning, and automation, the system provides instant, accurate, and scalable customer assistance across various channels. This project can significantly reduce operational costs while improving customer satisfaction and retention.

Key Features
24/7 Support Availability
Always-on support to handle queries, even during off-business hours.
Natural Language Processing (NLP)
Understands and processes customer queries in natural language, making interactions more human-like.
Sentiment Analysis
Analyzes customer emotions and tones to provide empathetic and tailored responses.
Multilingual Support
Communicates in multiple languages to cater to diverse user bases globally.
Personalization
Learns customer behavior and history to offer contextually relevant responses and recommendations.
`,
    image: "/Screenshot (1).png",
    github: "https://github.com/patrickloeber/chatbot-deployment?tab=readme-ov-file"
  },
  {
    id: 2,
    title: "personalized recommendation engine",
    Description: `Description: 
### *Personalized Recommendation Engine*

*Description:*  
A personalized recommendation engine is a system designed to predict and suggest items (products, services, or content) that a user is likely to find appealing based on their preferences, behaviors, or similarities with other users. It leverages data-driven algorithms, such as machine learning or collaborative filtering, to deliver tailored recommendations, enhancing user engagement and satisfaction.

---

### *Use Cases:*
1. *E-commerce:* Suggest products similar to a user's browsing or purchase history.
2. *Streaming Platforms:* Recommend movies, shows, or music based on viewing or listening habits.
3. *Online Education:* Propose courses or learning materials that match a user's interests and progress.
4. *Travel Services:* Recommend destinations, hotels, or activities based on past bookings.
5. *Healthcare:* Suggest personalized wellness programs, medications, or treatments.

---

### *Key Features:*
1. *User Behavior Analysis:* Track clicks, views, purchases, ratings, and session data.
2. *Dynamic User Profiling:* Update user preferences in real time as they interact with the platform.
3. *Multi-Modal Recommendations:* Combine textual, visual, and contextual data to enhance accuracy.
4. *Collaborative Filtering:* Leverage data from similar users to make predictions.
5. *Content-Based Filtering:* Analyze item features (e.g., genre, keywords) to recommend similar items.
6. *Hybrid Models:* Combine multiple algorithms for improved performance.
7. *Scalability:* Handle large datasets with millions of users and items.

---

### *Technologies Used:*
1. *Data Processing:* Python, Pandas, and Apache Spark.
2. *Machine Learning Frameworks:* TensorFlow, PyTorch, and Scikit-learn.
3. *Recommendation Algorithms:*
   - Collaborative Filtering (User-based and Item-based)
   - Matrix Factorization (SVD, ALS)
   - Neural Networks (Deep Learning for recommendations)
   - Hybrid Models (e.g., weighted or stacked ensembles)
4. *Database Systems:* MongoDB, MySQL, or Redis for storing user and item data.
5. *Deployment:* Docker, Kubernetes, AWS, or Azure for scaling and maintaining the system.

---

### *Steps to Build:*
1. *Data Collection:*
   - Gather data on user interactions (clicks, purchases, ratings).
   - Collect metadata about items (descriptions, categories, images).

2. *Data Preprocessing:*
   - Clean and normalize the data.
   - Handle missing values and outliers.
   - Transform data into suitable formats (e.g., user-item matrices).

3. *Model Development:*
   - Choose an algorithm (Collaborative, Content-based, or Hybrid).
   - Train the model using historical data.
   - Evaluate using metrics like precision, recall, or RMSE.

4. *Real-Time Recommendations:*
   - Integrate the model with a recommendation API.
   - Fetch live user data to generate real-time suggestions.

5. *Testing and Iteration:*
   - A/B test the recommendations.
   - Use feedback loops to refine and improve the model.

6. *Deployment:*
   - Scale the system for high traffic.
   - Monitor performance and retrain the model periodically.

---

### *Advantages:*
1. *Enhanced User Experience:* Delivers content or products that users are more likely to appreciate.
2. *Increased Revenue:* Drives cross-selling and upselling opportunities.
3. *Customer Retention:* Builds loyalty by making users feel understood.
4. *Efficient Discovery:* Helps users find relevant items in vast inventories.

---

Would you like to explore implementation details, algorithms, or use cases in a specific domain?`,
    image: "/Screenshot (3).png",
    github: "https://github.com/611noorsaeed/E-Commerece-Recommendation-System-Machine-Learning-Product-Recommendation-system-/tree/main",
  },
  {
    id: 3,
    title: "Face and emotion analysis",
    Description: `### *Face and Emotion Analysis System*

*Description:*  
Face and emotion analysis is a technology-driven system that uses computer vision and machine learning to detect and interpret facial features, expressions, and emotions in real-time or from images/videos. By analyzing subtle facial movements and patterns, the system determines the emotional state, demographic attributes, and other relevant information about the individual.

---

### *Applications:*
1. *Healthcare:* Monitor mental health by analyzing stress, anxiety, or depression.
2. *Retail:* Understand customer reactions to products or advertisements.
3. *Education:* Enhance virtual classrooms by tracking student engagement.
4. *Security:* Detect suspicious or threatening behaviors in surveillance.
5. *Entertainment:* Customize content based on viewer reactions.
6. *Human Resources:* Analyze candidate emotions during interviews.

---

### *Key Features:*
1. *Facial Detection:*
   - Locate and identify faces in images or video streams.
   - Detect multiple faces in group settings.

2. *Emotion Recognition:*
   - Recognize emotions such as happiness, sadness, anger, fear, surprise, disgust, or neutrality.
   - Analyze micro-expressions for deeper emotional insights.

3. *Facial Landmark Detection:*
   - Identify key points like eyes, nose, mouth, and eyebrows for accurate expression mapping.

4. *Demographic Analysis:*
   - Estimate age, gender, and ethnicity.

5. *Real-Time Processing:*
   - Analyze emotions in live video feeds with minimal latency.

6. *Heatmaps and Metrics:*
   - Provide visual heatmaps of emotional intensities and engagement metrics.

---

### *Technologies Used:*
1. *Computer Vision Libraries:*
   - OpenCV, Dlib
   - Mediapipe (for real-time facial tracking)
2. *Deep Learning Frameworks:*
   - TensorFlow, PyTorch
3. *Pre-trained Models:*
   - FaceNet (for face recognition)
   - EmotionNet or AffectNet (for emotion detection)
4. *Data Annotation Tools:*
   - LabelImg, VGG Image Annotator
5. *Hardware:*
   - GPU-accelerated processing for real-time analysis (e.g., NVIDIA CUDA).

---

### *Steps to Build:*
1. *Data Collection and Preprocessing:*
   - Collect labeled datasets (e.g., FER-2013, AffectNet).
   - Normalize and augment data for robust training.

2. *Model Selection and Training:*
   - Train models for face detection (e.g., Haar Cascades, SSD, YOLO).
   - Use convolutional neural networks (CNNs) for emotion recognition.
   - Fine-tune models using transfer learning on specific datasets.

3. *Facial Landmark Detection:*
   - Use pre-trained models to detect facial landmarks.
   - Map these landmarks to analyze facial muscle movements.

4. *Emotion Classification:*
   - Extract features from landmarks or raw images.
   - Classify emotions using machine learning algorithms or deep learning models.

5. *Integration and Deployment:*
   - Build APIs for integration with web or mobile applications.
   - Use frameworks like Flask or FastAPI for deploying backend services.

---

### *Challenges:*
1. *Ethical Concerns:* Privacy issues and potential misuse of data.
2. *Bias:* Models may show bias due to imbalanced datasets.
3. *Accuracy:* Difficulty in interpreting subtle or mixed emotions.
4. *Environment Factors:* Performance may degrade in poor lighting or occlusions.

---

### *Advantages:*
1. *Enhanced Interactivity:* Applications respond dynamically to user emotions.
2. *Actionable Insights:* Businesses can tailor strategies based on emotional data.
3. *Improved Safety:* Identifies distress or anomalies in real-time surveillance.

---

Would you like to explore detailed algorithms, implementation steps, or potential datasets for such a system?`,
    image: "/Screenshot (4).png",
    github: "https://github.com/ROHIT4999/FACE-AND-EMOTION-ANALYSIS",
  },
  {
    id: 4,
    title: "e-commerce platform",
    Description: `### *E-Commerce Platform*

*Description:*  
An e-commerce platform is a web application where users can browse, search, and purchase products online. It incorporates features like product catalogs, user accounts, shopping carts, payment processing, and an admin dashboard for inventory management. Built using the MERN stack (MongoDB, Express.js, React.js, and Node.js), it ensures scalability, responsiveness, and a seamless user experience.

---

### *Core Features:*

#### *1. User Authentication and Authorization:*
   - *Login/Signup:* Secure user registration and authentication using JWT.
   - *Role-Based Access:* Separate roles for customers and admins.
   - *Password Management:* Implement password hashing with bcrypt and a "forgot password" functionality.

#### *2. Product Catalog and Search:*
   - *Product Categories:* Organize items into categories for easy navigation.
   - *Search Bar:* Full-text search to locate products quickly.
   - *Filters and Sorting:* Filter by price, rating, category, and other attributes.

#### *3. Shopping Cart and Wishlist:*
   - *Cart Management:* Add, remove, or update product quantities.
   - *Wishlist:* Save items for future purchases.

#### *4. Order Management:*
   - *Checkout Process:* Streamlined checkout with address input and order summary.
   - *Order Tracking:* Users can track their order status (e.g., Processing, Shipped, Delivered).
   - *Order History:* View past orders with details.

#### *5. Payment Integration:*
   - *Secure Payment Gateway:* Integrate with Stripe, PayPal, or Razorpay for online transactions.
   - *Promo Codes:* Add discount functionality for promotional campaigns.

#### *6. Admin Dashboard:*
   - *Inventory Management:* Add, update, or delete products.
   - *Order Management:* View and update order statuses.
   - *User Management:* View registered users and manage roles.
   - *Reports and Analytics:* Track sales and product performance.

#### *7. Responsive Design:*
   - Mobile-first approach for seamless experience on all devices.
   - Use Material-UI, Bootstrap, or TailwindCSS for design consistency.

---

### *Advanced Features (Optional):*
   - *Product Recommendations:* Use machine learning or collaborative filtering for personalized suggestions.
   - *Real-Time Notifications:* Notify users of order updates or discounts.
   - *Review and Ratings System:* Allow customers to leave reviews and rate products.
   - *Multi-Vendor Support:* Enable multiple sellers to manage their own inventories.
   - *Chat Support:* Real-time chat feature for customer support.

---

### *Technologies Used:*

#### *Frontend (React.js):*
   - *Components:* Build reusable components for headers, product lists, and forms.
   - *State Management:* Use Context API or Redux for managing cart, user sessions, and more.
   - *Routing:* React Router for dynamic navigation.

#### *Backend (Node.js, Express.js):*
   - *API Development:* RESTful APIs for user authentication, product data, and orders.
   - *Middleware:* Use Express.js for request handling and validation.

#### *Database (MongoDB):*
   - *Schema Design:* Collections for users, products, orders, and reviews.
   - *Queries:* Use Mongoose to manage CRUD operations.

#### *Deployment:*
   - *Frontend:* Deploy using Vercel or Netlify.
   - *Backend:* Host on Heroku, AWS, or Render.
   - *Database:* Use MongoDB Atlas for cloud database hosting.

---

### *Steps to Build:*
1. *Set Up Project Structure:*
   - Create separate directories for frontend and backend.
   - Initialize the project with npm or yarn.

2. *Design Database Schema:*
   - Create schemas for users, products, orders, and cart items.

3. *Develop Backend:*
   - Build APIs for user authentication, product CRUD, cart operations, and orders.
   - Implement middleware for error handling and security.

4. *Build Frontend:*
   - Design the user interface using React.
   - Consume backend APIs with Axios or Fetch.
   - Handle state with Context API or Redux.

5. *Integrate Payment Gateway:*
   - Add payment SDK (e.g., Stripe) for secure transactions.

6. *Test and Deploy:*
   - Test functionalities like authentication, cart, and checkout.
   - Deploy the application on cloud platforms.

---

### *Advantages:*
1. *Scalability:* Can handle large product catalogs and user bases.
2. *User Engagement:* Features like recommendations and reviews enhance user satisfaction.
3. *Revenue Generation:* Integrating multiple payment gateways ensures smooth transactions.

Would you like to dive deeper into any specific feature, such as building the cart, integrating payments, or designing the database?`,
    image: "/Screenshot (5).png",
    github: "https://github.com/Muhammad-Feroz/React-Ecommerce-App",
  },
  {
    id: 5,
    title: "Event Management System",
    Description: `### *Event Management System*

*Description:*  
An Event Management System is a web application designed to help users create, manage, and participate in events such as conferences, workshops, concerts, or meetups. The platform streamlines event organization, attendee registration, and communication, making the process efficient for both organizers and participants.

---

### *Features:*

#### *For Event Organizers:*
1. *Event Creation:*
   - Add event details like name, description, date, time, location, and ticket prices.
   - Upload images, banners, or promotional materials.
2. *Ticket Management:*
   - Set ticket types (free, paid, VIP).
   - Define ticket limits and availability.
3. *Attendee Management:*
   - View and manage the list of registered attendees.
   - Export attendee data as CSV for offline use.
4. *Dashboard and Analytics:*
   - Track event performance with metrics like ticket sales and attendee count.
   - View revenue reports for paid events.
5. *Notifications:*
   - Send reminders or updates to attendees via email or SMS.

#### *For Attendees:*
1. *Event Browsing:*
   - Search and filter events by category, location, or date.
   - View detailed event pages with descriptions, schedules, and ticket options.
2. *Registration:*
   - Register for events and purchase tickets.
   - Receive e-tickets via email.
3. *Calendar Integration:*
   - Add events to personal calendars (Google, Outlook, etc.).
4. *Feedback and Ratings:*
   - Provide feedback or ratings for events attended.

#### *Additional Features:*
- *Event Calendar:* Interactive calendar view for browsing upcoming events.
- *User Authentication:* Login and registration with role-based access (admin, organizer, attendee).
- *Payment Integration:* Secure payment options using Stripe, PayPal, or Razorpay.
- *Real-Time Updates:* Live updates for event status (e.g., sold out, cancelled).

---

### *Technologies Used:*
1. *Frontend (React.js):*
   - Build a responsive and interactive user interface.
   - Use libraries like Material-UI or Bootstrap for styling.
2. *Backend (Node.js with Express.js):*
   - Create REST APIs for handling data like events, users, and tickets.
3. *Database (MongoDB):*
   - Store user details, event information, and ticket data.
4. *Authentication:*
   - Implement JWT-based authentication for secure login.
5. *Real-Time Communication:*
   - Use WebSockets (e.g., Socket.io) for live notifications or updates.
6. *Deployment:*
   - Host the application on AWS, Heroku, or Vercel.
   - Use Cloudinary for storing event images.

---

### *Workflow:*
1. *Organizers:*
   - Register and log in to their account.
   - Create events with all necessary details.
   - Monitor ticket sales and attendee engagement via a dashboard.

2. *Attendees:*
   - Browse events or search for specific ones.
   - Register or purchase tickets using integrated payment options.
   - Receive event updates and reminders.

3. *Admin:*
   - Monitor platform usage, approve events, and handle disputes.
   - Generate platform-wide analytics reports.

---

### *Use Cases:*
- *Corporate Events:* Conferences, product launches, and workshops.
- *Social Events:* Weddings, reunions, and community gatherings.
- *Entertainment:* Concerts, festivals, and theater performances.
- *Educational:* Webinars, hackathons, and academic seminars.

---

### *Advantages:*
1. *Simplified Event Planning:* Easy setup and management for organizers.
2. *Improved Attendee Experience:* Simplifies event discovery and registration.
3. *Data Insights:* Provides actionable insights into attendee behavior and event success.
4. *Cost-Effective:* Reduces the need for manual processes and third-party services.

Would you like detailed steps on implementation or any specific feature?`,
    image: "/Screenshot (6).png",
    github: "https://github.com/Harshita-2000/event-management-page",
  },
  {
    id: 6,
    title: "real time chat application",
    Description: `### *Real-Time Chat Application*

*Description:*  
A real-time chat application allows users to send and receive messages instantly, enabling both one-on-one and group conversations. It leverages WebSocket technology for live communication, ensuring a seamless and engaging user experience. This project is perfect for honing skills in the MERN stack while implementing features like authentication, notifications, and real-time updates.

---

### *Core Features:*
1. *User Authentication:*
   - Secure signup and login using JWT (JSON Web Tokens).
   - Social login (Google, Facebook) for convenience.

2. *Real-Time Messaging:*
   - Instant message sending and receiving using WebSockets (Socket.IO).
   - Support for one-on-one chats and group conversations.

3. *Chat Management:*
   - Create, delete, or leave chat groups.
   - Pin or favorite specific conversations for easy access.

4. *Media and File Sharing:*
   - Allow users to send images, videos, and documents.
   - Preview attachments before sending.

5. *Typing Indicators:*
   - Show when a user is typing in a conversation.

6. *Delivery and Read Receipts:*
   - Display message status (sent, delivered, read).

7. *Online/Offline Status:*
   - Indicate if a user is currently online or offline.

8. *Message History:*
   - Store and retrieve past conversations for users.
   - Enable search functionality within chats.

9. *Notifications:*
   - Push notifications for new messages (even when offline).
   - In-app alerts for new messages or added group members.

---

### *Advanced Features (Optional):*
1. *Voice and Video Calls:*
   - Implement one-on-one or group calling functionality using WebRTC.
2. *End-to-End Encryption:*
   - Ensure message security and privacy.
3. *Theming:*
   - Allow users to switch between light and dark modes.

---

### *Technologies and Tools:*

1. *Frontend (React.js):*
   - Create a dynamic and responsive user interface.
   - Use React Context API or Redux for state management.
   - Style the UI with Material-UI, TailwindCSS, or Bootstrap.

2. *Backend (Node.js and Express.js):*
   - Handle APIs for user authentication and chat data.
   - Use WebSocket (Socket.IO) for real-time communication.

3. *Database (MongoDB):*
   - Store user profiles, message history, and group data.
   - Use Mongoose for schema modeling.

4. *Deployment:*
   - Host on platforms like AWS, Heroku, or Vercel.
   - Use MongoDB Atlas for the database.

5. *Optional Tools:*
   - *Push Notifications:* Firebase Cloud Messaging.
   - *File Storage:* AWS S3 or Cloudinary for uploaded files.

---

### *Steps to Build:*

1. *Setup Backend:*
   - Initialize a Node.js project and set up Express.js.
   - Implement user authentication (JWT).
   - Create WebSocket endpoints for real-time messaging.

2. *Setup Frontend:*
   - Create React components for the chat UI.
   - Implement authentication and routing using React Router.
   - Use state management to handle message data.

3. *Integrate WebSockets:*
   - Establish WebSocket connections between the client and server.
   - Handle real-time updates like new messages, typing indicators, and user status.

4. *Implement Chat Features:*
   - Develop APIs for managing chat groups and retrieving message history.
   - Build the UI for chats, including message bubbles, timestamps, and attachments.

5. *Testing and Debugging:*
   - Test for edge cases, such as large file uploads or high user concurrency.
   - Use tools like Postman for API testing.

6. *Deployment:*
   - Deploy the frontend and backend on cloud platforms.
   - Configure DNS and SSL for secure communication.

---

### *Challenges:*
1. *Scalability:* Ensuring the system handles multiple concurrent users efficiently.
2. *Latency:* Minimizing delay in message delivery for a seamless experience.
3. *Security:* Protecting sensitive user data with encryption and secure authentication.

---

Would you like detailed guidance on a specific feature or implementation for this project?`,
    image: "/Screenshot (7).png",
    github: "https://github.com/alamorre/fullstack-chat",
  },
  {
    id: 7,
    title: "Job Portal system",
    Description: `### *Job Portal System*

*Description:*  
A job portal is a platform that connects job seekers with employers. It enables job seekers to search and apply for jobs while allowing employers to post job openings, manage applications, and shortlist candidates. The portal can cater to various industries and job types, making it a one-stop solution for hiring and finding employment.

---

### *Key Features:*

#### *For Job Seekers:*
1. *User Registration and Profile Creation:*
   - Register and create a detailed profile with personal details, skills, education, and work experience.
   - Upload resumes or CVs in PDF format.

2. *Job Search and Filters:*
   - Search jobs by title, location, salary range, company, and employment type (e.g., full-time, part-time, remote).
   - Save searches and favorite jobs.

3. *Job Application:*
   - Apply for jobs directly through the portal.
   - Track application status (e.g., pending, shortlisted, rejected).

4. *Personalized Dashboard:*
   - View recommended jobs based on skills and interests.
   - Keep track of application history and saved jobs.

#### *For Employers:*
1. *Company Registration and Profile Management:*
   - Create a company profile with logos, descriptions, and contact details.

2. *Job Posting:*
   - Post job openings with detailed descriptions, required qualifications, and deadlines.

3. *Applicant Management:*
   - View and filter applicants based on resumes and profile details.
   - Shortlist, reject, or schedule interviews.

4. *Employer Dashboard:*
   - Manage all job postings, applications, and communication with candidates.

#### *For Admins:*
1. *User and Content Moderation:*
   - Manage and verify job seeker and employer accounts.
   - Moderate job postings and ensure policy compliance.

2. *Platform Analytics:*
   - Monitor user activity, job postings, and application statistics.

3. *Revenue Management:*
   - Manage subscriptions, featured job listings, and advertisements.

---

### *Additional Features:*
1. *Notifications:*
   - Send email or in-app notifications for job updates, application status, and employer responses.

2. *Advanced Search:*
   - Include AI-based search with natural language understanding for more accurate job matching.

3. *Premium Services:*
   - Offer resume writing, skill assessments, or featured profiles for job seekers.
   - Highlight job postings for employers with a premium plan.

4. *Third-Party Integrations:*
   - Integrate with LinkedIn or other platforms for importing profiles.
   - Payment gateways for premium subscriptions.

---

### *Technologies Used:*

#### *Frontend (React):*
- React.js for building interactive UI.
- React Router for navigation.
- State Management: Context API, Redux, or Zustand.

#### *Backend (Node.js & Express.js):*
- REST API or GraphQL for communication between client and server.
- JWT for secure authentication and authorization.

#### *Database (MongoDB):*
- Store user profiles, job listings, and application data.
- Indexing for fast job searches.

#### *Other Tools:*
- *Cloud Storage:* AWS S3 for resume and profile image uploads.
- *Real-Time Features:* WebSockets or Firebase for notifications.
- *Deployment:* Host the application on AWS, Heroku, or Vercel.

---

### *Workflow:*

1. *User Registration:*
   - Users sign up as job seekers or employers.
   - Authentication with JWT ensures secure login.

2. *Profile Setup:*
   - Job seekers and employers complete their profiles.
   - Data is stored securely in MongoDB.

3. *Job Posting and Search:*
   - Employers post jobs through the backend API.
   - Job seekers search and filter jobs using frontend forms.

4. *Application and Management:*
   - Job seekers apply, and applications are saved in the database.
   - Employers manage applicants through their dashboard.

5. *Notifications and Updates:*
   - Notifications are sent for application status and new job postings.

6. *Admin Monitoring:*
   - Admin oversees activities, ensures compliance, and generates platform analytics.

---

### *Possible Enhancements:*
1. *Gamified User Experience:*
   - Add achievements or badges for job seekers completing their profiles or getting hired.
   
2. *Skill Assessments:*
   - Incorporate tests or certifications to validate candidate skills.

3. *Machine Learning:*
   - Use AI to recommend jobs or candidates based on past interactions and preferences.

---

Would you like guidance on implementing any specific module or feature in the portal?`,
    image: "/Screenshot (8).png",
    github: "https://github.com/emmannweb/job-portal-mern-stack",
  },
];

export default function Catelog() {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [errorUser, setErrorUser] = useState(null);
  const route = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUser(setUser, setLoadingUser, setErrorUser);
  }, []);

  const handleViewProject = (project) => {
    setLoading(true);
    route.push(
      `/Project/Viewer/ProjectExplorer?id=${project.id}&title=${encodeURIComponent(
        project.title
      )}&description=${encodeURIComponent(
        project.Description
      )}&image=${encodeURIComponent(project.image)}&github=${encodeURIComponent(
        project.github
      )}`
    );
  };  
  
  if(loading) {
    return (
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black z-50">
        <div style={{ transform: 'rotate(180deg)' }}>
          <Slab color="#0e1c8e" size="large" text="" textColor="" />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <NavigationBar user={user}/>
    <div className="max-w-7xl mx-auto mt-20">
      {/* Project Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300"
          >
            {/* Project Image */}
            
              <div className="relative w-full">
                            {/* First image */}
                            <Image
                              src={project.image}
                              width={180}
                              height={180}
                              alt="Course Background"
                              className='mx-auto w-full h-50'
                            />
                          </div>
      

            {/* Project Details */}
            <div className="p-6">
              <a href='Project/Viewer' className="text-xl font-semibold mb-2">{project.title}</a>
              <p className="text-gray-300 text-sm mb-4">{project.intro}</p>

              {/* Links */}
              <div className="flex justify-between items-center">
                {/* GitHub Link */}
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1 text-gray-300 hover:text-white transition"
                >
                  <FaGithub size={20} />
                  <span className="text-sm">GitHub</span>
                </a>
                {/* Live Demo Link */}
                <a
                  href={project.liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1 text-gray-300 hover:text-white transition"
                >
                  <FaExternalLinkAlt size={20} />
                  <span className="text-sm">Live Demo</span>
                </a>
              </div>
            </div>
            <button 
              onClick={() => handleViewProject(project)}
              className='text-[10px] md:text-lg btn mx-auto'
              >Explore Project</button>
          </div>
        ))}
      </div>
    </div>
  </div>
  
  )
}
