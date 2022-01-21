import axios from "axios";
import { useState } from "react";

const api = axios.create({
  baseURL: `https://run.mocky.io/v3`,
});

export default ScheduleMeetings;
