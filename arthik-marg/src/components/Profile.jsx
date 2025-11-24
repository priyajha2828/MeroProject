export default function Profile() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">My Account</h2>

      <div className="mt-4 space-y-4">

        <div className="p-4 bg-white dark:bg-gray-900 rounded shadow">
          <h3 className="font-semibold">Basic Information</h3>

          <div className="mt-4">
            <p className="text-sm text-gray-400">Preview Photo</p>
            <div className="w-20 h-20 bg-gray-300 rounded-full"></div>
          </div>

          <div className="mt-4">
            <label>Your Name</label>
            <input className="w-full p-2 rounded border mt-1" value="Rejina Agrawal" />
          </div>

          <div className="mt-4">
            <label>Your Phone Number</label>
            <input className="w-full p-2 rounded border mt-1" value="+977 9827335786" />
          </div>

          <div className="mt-4">
            <label>Your Email</label>
            <input className="w-full p-2 rounded border mt-1" placeholder="Enter your Email" />
          </div>
        </div>

        <button className="px-4 py-2 bg-emerald-500 text-white rounded">
          Update Account
        </button>

      </div>
    </div>
  );
}
