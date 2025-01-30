"use client"
import Image from "next/image";
import Footer from "./_components/Footer";
import FloatingAlert from "./_components/Alert/FloatingAlert";

export default function Home() {

  return (
    <div>
      <FloatingAlert/>
      <div className="bg-gray-900 text-gray-100">
        <section className="relative bg-gradient-to-r from-blue-900 to-blue-2000 text-white py-20">
          <div className="container mx-auto px-6 lg:px-20">
            <div className="lg:flex lg:items-center lg:justify-between">
              <div className="lg:w-1/2">
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">
                  Welcome to <span className="text-yellow-300">Node Sphere</span>
                </h1>
                <p className="text-lg lg:text-xl mb-6">
                  Transform IoT into real-world impact with cutting-edge monitoring and management solutions.
                </p>
                <a href="#features" className="btn btn-primary btn-lg rounded-lg shadow-lg">Explore Features</a>
              </div>
              <div className="lg:w-1/2 mt-10 lg:mt-0">
                <img src="/static/hero.webp" alt="IoT Dashboard" className="w-full rounded-xl shadow-lg" />
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="py-20 bg-gray-800">
          <div className="container mx-auto px-6 lg:px-20">
            <h2 className="text-3xl lg:text-5xl font-bold text-center mb-12">Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              <div className="card bg-blue-900 p-6 shadow-lg">
                <div className="card-body">
                  <h3 className="text-xl font-semibold mb-4">Real-Time Monitoring</h3>
                  <p>Stay updated with live data streams and visualizations for all your IoT devices.</p>
                </div>
              </div>
              <div className="card bg-yellow-900 p-6 shadow-lg">
                <div className="card-body">
                  <h3 className="text-xl font-semibold mb-4">Device Management</h3>
                  <p>Easily manage, configure, and control your IoT ecosystem from one platform.</p>
                </div>
              </div>
              <div className="card bg-green-900 p-6 shadow-lg">
                <div className="card-body">
                  <h3 className="text-xl font-semibold mb-4">Custom Alerts</h3>
                  <p>Set up alerts and notifications to ensure you're always in the loop.</p>
                </div>
              </div>
              <div className="card bg-red-900 p-6 shadow-lg">
                <div className="card-body">
                  <h3 className="text-xl font-semibold mb-4">Analytics & Insights [SOON]</h3>
                  <p>Analyze performance and gain actionable insights with AI-powered analytics. </p>
                </div>
              </div>
              <div className="card bg-purple-900 p-6 shadow-lg">
                <div className="card-body">
                  <h3 className="text-xl font-semibold mb-4">Scalable Architecture</h3>
                  <p>Scale effortlessly with a robust architecture built for IoT growth.</p>
                </div>
              </div>
              <div className="card bg-gray-700 p-6 shadow-lg">
                <div className="card-body">
                  <h3 className="text-xl font-semibold mb-4">Secure Connectivity</h3>
                  <p>Ensure end-to-end security for all your IoT devices and communications.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-r from-blue-900 to-gray-800 text-white py-20">
          <div className="container mx-auto px-6 lg:px-20 text-center">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">Get Started with Node Sphere</h2>
            <p className="text-lg lg:text-xl mb-8">
              Transform how you monitor and manage IoT devices. Start your journey today.
            </p>
            <a href="#" className="btn btn-secondary btn-lg rounded-lg shadow-lg">Request a Demo</a>
          </div>
        </section>

        <section className="py-20 bg-gray-800">
          <div className="mockup-window bg-base-300 w-1/2 mx-auto">
            <div className="bg-base-200 flex justify-center px-20 py-16">
              <div className="carousel w-full">
                <div id="slide1" className="carousel-item relative w-full">
                  <div className="flex justify-center items-center h-full">
                    <p className="text-center w-1/2">
                      In today's world of interconnected devices, managing and monitoring each IoT unit can often become overwhelming. That's why I created <span className="text-yellow-300">Node Sphere</span>, a comprehensive platform designed to make the management of your IoT devices more efficient and seamless. <br/> [1]
                    </p>
                  </div>

                  <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                    <a href="#slide4" className="btn btn-circle">❮</a>
                    <a href="#slide2" className="btn btn-circle">❯</a>
                  </div>
                </div>
                <div id="slide2" className="carousel-item relative w-full">
                  <div className="flex justify-center items-center h-full">
                    <p className="text-center w-1/2">
                    <span className="text-yellow-300">Node Sphere</span> gives you the ability to monitor your entire IoT ecosystem in real-time. Our intuitive dashboard allows you to easily track device performance, manage configurations, and receive instant alerts if something goes wrong. Whether you're overseeing just a few devices or managing an entire network, <span className="text-yellow-300">Node Sphere</span> adapts to meet your needs. <br/> [2]
                    </p>
                  </div>
                  <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                    <a href="#slide1" className="btn btn-circle">❮</a>
                    <a href="#slide3" className="btn btn-circle">❯</a>
                  </div>
                </div>
                <div id="slide3" className="carousel-item relative w-full">
                  <div className="flex justify-center items-center h-full">
                    <p className="text-center w-1/2">
                      What makes <span className="text-yellow-300">Node Sphere</span> stand out is its simplicity and scalability. You don't have to worry about the size of your network, as the platform grows with your needs. You can trust <span className="text-yellow-300">Node Sphere</span> to streamline your operations and provide you with accurate, real-time insights on the health of each device. <br/> [3]
                    </p>
                  </div>
                  <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                    <a href="#slide2" className="btn btn-circle">❮</a>
                    <a href="#slide4" className="btn btn-circle">❯</a>
                  </div>
                </div>
                <div id="slide4" className="carousel-item relative w-full">
                  <div className="flex justify-center items-center h-full">
                    <p className="text-center w-1/2">
                      With robust security features, you can rest assured knowing your data and devices are protected. <span className="text-yellow-300">Node Sphere</span> ensures that every device in your network is functioning optimally and securely, giving you more time to focus on what matters most. <br/> [4]
                    </p>
                  </div>
                  <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                    <a href="#slide3" className="btn btn-circle">❮</a>
                    <a href="#slide1" className="btn btn-circle">❯</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
      <Footer/>
    </div>
  );
}
