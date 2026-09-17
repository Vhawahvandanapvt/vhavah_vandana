export default function Rating({ rating = 0, count = 0, size = "sm", showCount = true }) {
  const stars = Array.from({ length: 5 }, (_, i) => {
    const filled = rating >= i + 1;
    const half = rating >= i + 0.5 && rating < i + 1;
    return { filled, half };
  });

  const sizeClasses = {
    xs: "w-3 h-3",
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {stars.map((star, i) => (
          <svg
            key={i}
            className={`${sizeClasses[size]} ${star.filled ? "text-gold-500" : star.half ? "text-gold-400" : "text-gray-200"}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      {showCount && (
        <span className={`text-gray-500 ${size === "xs" ? "text-[10px]" : "text-xs"}`}>
          {rating > 0 ? rating.toFixed(1) : "New"} {count > 0 && `(${count})`}
        </span>
      )}
    </div>
  );
}
