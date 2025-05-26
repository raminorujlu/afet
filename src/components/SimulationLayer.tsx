import { ArrowRight } from "lucide-react";

export const SimulationLayer = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-screen z-50 bg-red-950 flex flex-col items-center justify-center space-y-12 animate-pulse">
      <p className="font-bold text-red-500 uppercase text-6xl tracking-wider">
        Earthquake happening
      </p>
      <div className="grid grid-cols-1 md:grid-cols-5 md:w-2/3 w-full">
        <div>
          <p className="font-bold uppercase text-center text-red-400 text-4xl">
            drop
          </p>
        </div>
        <ArrowRight className="w-full text-red-500" size={42} strokeWidth={4} />
        <div>
          <p className="font-bold uppercase text-center text-red-400 text-4xl">
            cover
          </p>
        </div>
        <ArrowRight className="w-full text-red-500" size={42} strokeWidth={4} />
        <div>
          <p className="font-bold uppercase text-center text-red-400 text-4xl">
            hold on
          </p>
        </div>
      </div>
    </div>
  );
};
