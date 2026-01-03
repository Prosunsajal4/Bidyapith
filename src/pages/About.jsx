import React from "react";
import {
  FaGraduationCap,
  FaUsers,
  FaAward,
  FaHeart,
  FaLinkedin,
  FaTwitter,
  FaGithub,
} from "react-icons/fa";

const About = () => {
  const team = [
    {
      name: "Prosun Das",
      role: "Founder & CEO",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      bio: "Passionate about education and technology",
      social: {
        linkedin: "https://linkedin.com/in/prosun-mukherjee-sajal",
        twitter: "https://twitter.com/prosunmukherje8",
        github: "https://github.com/Prosunsajal4",
      },
    },
    {
      name: "Ananya Sen",
      role: "Head of Content",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      bio: "Expert curriculum designer with 10+ years experience",
      social: {
        linkedin: "https://linkedin.com/in/ananya-sen-edu",
        twitter: "https://twitter.com/ananya_content",
        github: "https://github.com/ananyasen",
      },
    },
    {
      name: "Rahul Kumar",
      role: "Tech Lead",
      image: "https://randomuser.me/api/portraits/men/67.jpg",
      bio: "Full-stack developer and system architect",
      social: {
        linkedin: "https://linkedin.com/in/rahul-kumar-dev",
        twitter: "https://twitter.com/rahul_techie",
        github: "https://github.com/rahulkumar",
      },
    },
    {
      name: "Trisha Roy",
      role: "Marketing Head",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
      bio: "Digital marketing specialist",
      social: {
        linkedin: "https://linkedin.com/in/trisha-roy-marketing",
        twitter: "https://twitter.com/trisha_digital",
        github: "https://github.com/trisharoy",
      },
    },
  ];

  const milestones = [
    {
      year: "2020",
      event: "BidyaPith founded with a vision to democratize education",
    },
    { year: "2021", event: "Reached 1,000 students milestone" },
    { year: "2022", event: "Expanded to 50+ course categories" },
    { year: "2023", event: "Launched mobile app and reached 10,000 students" },
    { year: "2024", event: "Partnered with 100+ industry experts" },
    { year: "2025", event: "15,000+ active learners and growing!" },
  ];

  return (
    <div className="min-h-screen bg-base-100">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary py-20 text-white">
        <div className="w-11/12 max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            About BidyaPith
          </h1>
          <p className="text-white/90 max-w-3xl mx-auto text-lg">
            Empowering learners worldwide with quality education, expert
            instructors, and a supportive community since 2020.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-base-200">
        <div className="w-11/12 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <FaGraduationCap className="text-3xl text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold">Our Mission</h2>
                </div>
                <p className="text-accent">
                  To make quality education accessible to everyone, everywhere.
                  We believe that learning should be a lifelong journey, and
                  everyone deserves the opportunity to learn new skills and grow
                  professionally.
                </p>
              </div>
            </div>
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-secondary/10 rounded-full">
                    <FaHeart className="text-3xl text-secondary" />
                  </div>
                  <h2 className="text-2xl font-bold">Our Vision</h2>
                </div>
                <p className="text-accent">
                  To become the world's most trusted and accessible learning
                  platform, connecting passionate instructors with eager
                  learners and creating a global community of lifelong learners.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-base-100">
        <div className="w-11/12 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Our Impact</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="card bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-xl">
              <div className="card-body items-center text-center">
                <FaUsers className="text-4xl mb-2" />
                <h3 className="text-3xl font-bold">15,000+</h3>
                <p className="text-white/90">Active Students</p>
              </div>
            </div>
            <div className="card bg-gradient-to-br from-green-500 to-green-600 text-white shadow-xl">
              <div className="card-body items-center text-center">
                <FaGraduationCap className="text-4xl mb-2" />
                <h3 className="text-3xl font-bold">30+</h3>
                <p className="text-white/90">Courses</p>
              </div>
            </div>
            <div className="card bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-xl">
              <div className="card-body items-center text-center">
                <FaAward className="text-4xl mb-2" />
                <h3 className="text-3xl font-bold">50+</h3>
                <p className="text-white/90">Expert Instructors</p>
              </div>
            </div>
            <div className="card bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-xl">
              <div className="card-body items-center text-center">
                <FaHeart className="text-4xl mb-2" />
                <h3 className="text-3xl font-bold">95%</h3>
                <p className="text-white/90">Satisfaction Rate</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-base-200">
        <div className="w-11/12 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Our Journey</h2>
          <div className="space-y-6">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-20 text-right">
                  <span className="font-bold text-primary text-lg">
                    {milestone.year}
                  </span>
                </div>
                <div className="flex-shrink-0 w-4 h-4 bg-secondary rounded-full mt-1.5 relative">
                  {index !== milestones.length - 1 && (
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 w-0.5 h-12 bg-base-300"></div>
                  )}
                </div>
                <div className="flex-1 bg-base-100 p-4 rounded-lg shadow">
                  <p className="text-accent">{milestone.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-base-100">
        <div className="w-11/12 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Meet Our Team</h2>
          <p className="text-accent text-center mb-12 max-w-2xl mx-auto">
            The passionate people behind BidyaPith, working tirelessly to
            deliver the best learning experience.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <div
                key={index}
                className="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow"
              >
                <figure className="px-6 pt-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="rounded-full w-32 h-32 object-cover ring-4 ring-primary/20"
                  />
                </figure>
                <div className="card-body items-center text-center">
                  <h3 className="card-title">{member.name}</h3>
                  <p className="text-secondary font-medium">{member.role}</p>
                  <p className="text-accent text-sm">{member.bio}</p>
                  <div className="flex gap-3 mt-3">
                    <a
                      href={member.social.linkedin}
                      className="btn btn-circle btn-sm btn-ghost"
                    >
                      <FaLinkedin />
                    </a>
                    <a
                      href={member.social.twitter}
                      className="btn btn-circle btn-sm btn-ghost"
                    >
                      <FaTwitter />
                    </a>
                    <a
                      href={member.social.github}
                      className="btn btn-circle btn-sm btn-ghost"
                    >
                      <FaGithub />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
