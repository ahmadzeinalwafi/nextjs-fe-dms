export default function Developer() {
    return (
        <div className="bg-gray-900 text-white min-h-screen">
            <div className="max-w-4xl mx-auto p-8">
                <h1 className="text-3xl font-bold text-center mb-6">About the Developer of <span className="text-yellow-300">Node Sphere</span></h1>

                <div className="flex flex-col items-center">
                    {/* Developer's photo */}
                    <img
                        src="/static/profile.jpg" // Replace with your actual photo path
                        alt="Developer Photo"
                        className="w-32 h-32 rounded-full mb-6"
                    />

                    {/* Developer Bio */}
                    <p className="text-lg text-center mb-4">
                        I'm a Machine Learning Architect and MLOps Engineer with a passion for solving real-world problems using AI and computer vision.
                        I have experience leading cutting-edge projects in Smart Campus Systems, Smart Tourism, and Robotics.
                        My expertise spans TensorFlow, Docker, Scikit Learn, and various advanced tools in the AI and MLOps ecosystem.
                        I firmly believe that the true power of artificial intelligence innovation lies not solely in crafting machine learning models
                        but in creating a comprehensive experience ecosystem that seamlessly integrates every aspect of applications.
                    </p>
                    <p className="text-lg text-center mb-4 text-yellow-300">
                        When I'm not coding, you can find me diving into innovation and tech strategy to shape the future of AI-driven solutions.
                    </p>

                    {/* Skills Section */}
                    <h2 className="text-2xl font-semibold mb-2">Skills & Expertise</h2>
                    <ul className="list-disc pl-6 mb-6">
                        <li>Machine Learning & Deep Learning</li>
                        <li>AI-driven Solutions & Computer Vision</li>
                        <li>Cloud Technologies (Google Cloud Platform)</li>
                        <li>IoT Solutions & Smart Systems</li>
                        <li>Web Development (React, Next.js, Node.js, Go)</li>
                        <li>Robotics and Automation</li>
                    </ul>

                    {/* Experience Section */}
                    <h2 className="text-2xl font-semibold mb-2">Experience</h2>
                    <p className="text-lg mb-6">
                        Over the years, I've had the privilege of working on several high-impact projects across different industries.
                        From AI-driven smart parking systems to real-time monitoring with computer vision, I have honed my skills in both
                        technology architecture and hands-on implementation. My experience includes roles such as Machine Learning Engineer,
                        Solutions Architect, and Technical Lead.
                    </p>

                    {/* Education Section */}
                    <h2 className="text-2xl font-semibold mb-2">Education</h2>
                    <p className="text-lg mb-6">
                        I hold a degree in Engineering from Universitas Negeri Semarang. My academic background has equipped me with a strong foundation
                        in software development, data science, and machine learning.
                    </p>

                    {/* Contact Section */}
                    <h2 className="text-2xl font-semibold mb-2">Contact</h2>
                    <p className="text-lg mb-6">
                        Feel free to reach out to me for collaboration opportunities or any inquiries:
                    </p>
                    <p className="text-lg mb-6">
                        <strong>Email:</strong> ahmadzeinalwafi@outlook.com
                    </p>
                    <p className="text-lg">
                        <strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/ahmad-zein-al-wafi" target="_blank" className="text-blue-400">Ahmad Zein Al Wafi</a>
                    </p>
                </div>
            </div>
        </div>
    );
}