const MatchScore = ({ score }) => {
  let color = "bg-red-500"; // Default: Red (<50%)

  if (score >= 80) color = "bg-green-500"; // Green (80%+)
  else if (score >= 50) color = "bg-yellow-500"; // Yellow (50-79%)

  return (
      <div className="w-full bg-gray-300 rounded-lg overflow-hidden">
          <div className={`h-4 ${color}`} style={{ width: `${score}%` }}></div>
      </div>
  );
};

export default MatchScore;
