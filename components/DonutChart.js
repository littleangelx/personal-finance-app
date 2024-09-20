const DonutChart = ({ data }) => {
  const total_value = data.reduce((a, b) => a + b.value, 0);
  const total_available = data.reduce((a, b) => a + b.maximum, 0);
  const convertToPercent = (num) => (num / total_value) * 100;
  const convertToDegrees = (num) => (num / 100) * 360;

  const css_string = data
    .reduce((items, item, index, array) => {
      item.start_value = index === 0 ? 0 : array[index - 1].end_value;
      item.end_value = item.start_value + item.value;
      item.start_percent = convertToPercent(item.start_value);
      item.end_percent = convertToPercent(item.end_value);
      item.start_degrees = convertToDegrees(item.start_percent);
      item.end_degrees = convertToDegrees(item.end_percent);

      items.push(item);
      return items;
    }, [])
    .map((chart) => {
      const { color, start_degrees, end_degrees } = chart;
      return `${color} ${start_degrees}deg ${end_degrees}deg`;
    })
    .join(", ");

  return (
    <div className="flex flex-col gap-8 grow relative self-center items-center">
      <div>
        <svg
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          className="w-60 h-60 rounded-full"
        >
          <clipPath id="hole">
            <path d="M 50 0 a 50 50 0 0 1 0 100 50 50 0 0 1 0 -100 v 18 a 2 2 0 0 0 0 64 2 2 0 0 0 0 -64" />
          </clipPath>

          <foreignObject
            x="0"
            y="0"
            width="100"
            height="100"
            clipPath="url(#hole)"
          >
            <div
              xmlns="http://www.w3.org/1999/xhtml"
              className="w-full h-full"
              style={{
                background: `conic-gradient(${css_string})`,
              }}
            />
          </foreignObject>
        </svg>
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <h3 className="text-grey-900 text-xl   font-bold text-center">
          £{total_value.toFixed(2)}
        </h3>
        <p className="text-xs text-grey-500 text-center">
          of £{total_available.toFixed(2)} limit
        </p>
      </div>
    </div>
  );
};

export default DonutChart;
