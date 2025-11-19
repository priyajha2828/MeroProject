export default function Card({ title, amount, color, icon }) {
  return (
    <div className={`p-4 rounded shadow flex items-center gap-4 ${color}`}>
      {icon && (
        <div className="w-10 h-10 flex items-center justify-center bg-white rounded-full text-gray-700">
          {icon}
        </div>
      )}
      <div>
        <div className="text-sm text-gray-500">{title}</div>
        <div className="text-xl font-semibold mt-1">{amount}</div>
      </div>
    </div>
  );
}
