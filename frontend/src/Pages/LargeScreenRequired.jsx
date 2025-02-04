export default function LargeScreenRequired() {
    return (
      <div className="md:hidden flex flex-col items-center justify-center h-screen bg-gray-100 p-6 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Screen Too Small! 📱🚫
        </h1>
        <p className="text-gray-600">
          This page is not optimized for small screens. Please visit on a larger device (tablet or desktop) for the best experience.
        </p>
      </div>
    );
  }
  