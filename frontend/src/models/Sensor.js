export class Sensor {
  constructor(device, sensor_id, type, value) {
    this.device = device;
    this.sensor_id = sensor_id;
    this.type = type;
    this.value = value;
  }
}
