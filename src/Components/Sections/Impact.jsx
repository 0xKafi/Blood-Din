import CountUp from "react-countup";

export default function QuickStats() {
  const stats = [
    { id: 1, value: 1200, label: "Active Donors" },
    { id: 2, value: 850, label: "Blood Requests Fulfilled" },
    { id: 3, value: 5000, label: "Lives Saved" },
    { id: 4, value: 150, label: "Donation Drives Organized" },
  ];

  return (
    <section className="bg-red-50 py-16 px-6 mb-24">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-red-600 mb-4">
          Together, We’re Making an Impact
        </h2>
        <p className="text-gray-600 mb-12">
          Every drop counts. Here’s how your support is saving lives.
        </p>

        <div className="grid gap-8 grid-cols-2 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.id} className="bg-white shadow rounded-2xl p-6">
              <h3 className="text-4xl font-bold text-red-600 mb-2">
                <CountUp end={stat.value} duration={2.5} separator="," />
                +
              </h3>
              <p className="text-gray-700">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
