const floor = Math.floor;

export default function toVideoDuration(timestamp) {
  let group = [];
  let hours = floor(timestamp /  3600);
  let minutes = floor(timestamp % 3600 / 60);
  let seconds = floor(timestamp % 3600 % 60);

  if (hours > 0) {
    group.push((hours > 9) ? hours : '0' + hours);
  }

  group.push((minutes > 9) ? minutes : '0' + minutes);
  group.push((seconds > 9) ? seconds : '0' + seconds);

  return group.join(':');
}
