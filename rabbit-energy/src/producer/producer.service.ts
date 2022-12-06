import "fs";
import "readline";
import { readFileSync } from "fs";
import "node-cron";

export class ProducerService {
    
  async readEnergyCSV(): Promise<string[]> {
    const data = readFileSync('./sensor.csv')
    .toString()
    .split('\r\n')
    .map(e => e.trim())
    .map(e => e);
    console.log(data);
    return data;
  }
}