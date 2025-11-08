import React from "react";
import { useNavigate } from "react-router-dom";

const Specialist = () => {
  const navigate = useNavigate();
  const categories = [
    {
      name: "General Physicians",
      img: "https://media.istockphoto.com/id/1412630553/vector/smiling-female-doctor-with-crossed-arms-and-stethoscope-vector-flat-illustration.jpg?s=612x612&w=0&k=20&c=hTFRP0GvNI8Nqp94qpsnb4MD-VxuE9kwxAirSBX9xHc=",
    },
    {
      name: "Gynecologist",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF6fDM7O4UryyZ8eQA4p_HK-JX9KjUEk9Uvg&s",
    },
    {
      name: "Pediatricians",
      img: "https://i.pinimg.com/736x/ff/c1/1b/ffc11b3c8112fd551a806c0bcf9337d0.jpg",
    },
    {
      name: "Neurologist",
      img:" https://media.istockphoto.com/id/1279181570/vector/brain-and-neurology.jpg?s=612x612&w=0&k=20&c=zok3oI4aRzdFwPuE_nnDYFt9pfOMpdvRTMdLM8fGrDA=",
    },
    {
      name: "Gastroenterologist",
      img: "https://media.istockphoto.com/id/1308833944/vector/online-gastroenterologist-hepatologist-doctor-internet-consultationt-diagnose-liver-organ.jpg?s=612x612&w=0&k=20&c=QgBQcq4G7WGJA3gC5S9As5HnXNmaFYZ4GHPI4kM1kEU=",
    },
  ];

  return (
    <div className="px-6 md:px-20 py-12 bg-gray-50">
      {/* Section Header */}
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-sky-600">Find Your Specialist</h2>
        <p className="mt-2 text-gray-600 text-sm md:text-base">
          Browse our specialists and book your appointment easily.
        </p>
      </div>

      {/* Horizontal Scrollable Cards */}
      <div className="flex overflow-x-auto gap-6 py-4 scrollbar-hide">
        {categories.map((category, idx) => (
          <div
            key={idx}
            onClick={() => navigate("/all-doctor")}
            className="flex-none w-56 bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 cursor-pointer"
          >
            <div className="h-48 rounded-t-3xl overflow-hidden">
              <img
                src={category.img}
                alt={category.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold text-gray-800">{category.name}</h3>
              <p className="mt-1 text-gray-500 text-sm">
                Trusted & experienced doctors
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Specialist;
