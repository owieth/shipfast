import Image from "next/image";
import React from "react";

type Props = {};

const Testimonials = (props: Props) => {
  const TestimonialsData = [
    {
      name: "Maria Smantha",
      job: "Web Developer",
      image: "https://tecdn.b-cdn.net/img/Photos/Avatars/img%20(1).jpg",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod eos id officiis hic tenetur quae quaerat ad velit ab hic tenetur.",
    },
    {
      name: "John Smantha",
      job: "Backend Developer",
      image: "https://tecdn.b-cdn.net/img/Photos/Avatars/img%20(1).jpg",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod eos id officiis hic tenetur quae quaerat ad velit ab hic tenetur.",
    },
    {
      name: "Marry Smantha",
      job: "Nodejs Developer",
      image: "https://tecdn.b-cdn.net/img/Photos/Avatars/img%20(1).jpg",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod eos id officiis hic tenetur quae quaerat ad velit ab hic tenetur.",
    },
  ];
  return (
    <div>
      <div className="mx-auto text-center md:max-w-xl lg:max-w-3xl">
        <h3 className="mb-6 text-3xl font-bold text-neutral-800 dark:text-neutral-200">
          Testimonials
        </h3>
        <p className="mb-6 pb-2 md:mb-12 md:pb-0">
          Here are some of the people that have experienced our services.
        </p>
      </div>

      <div className="grid gap-6 text-center md:grid-cols-3 lg:gap-12 px-6">
        {TestimonialsData.map((testimonial) => (
          <div
            key={testimonial.name}
            className="mb-12 md:mb-0 max-w-sm p-4 border"
          >
            <div className="mb-6 flex justify-center">
              <Image
                src={testimonial.image}
                className="w-32 rounded-full shadow-lg dark:shadow-black/30"
                alt={testimonial.name}
                width={128}
                height={128}
              />
            </div>
            <h5 className="mb-4 text-xl font-semibold">{testimonial.name}</h5>
            <h6 className="mb-4 font-semibold text-primary dark:text-primary-500">
              {testimonial.job}
            </h6>
            <p className="mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="inline-block h-7 w-7 pr-2"
                viewBox="0 0 24 24"
              >
                <path d="M13 14.725c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275zm-13 0c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275z" />
              </svg>
              {testimonial.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
