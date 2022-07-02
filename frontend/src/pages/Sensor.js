import React from 'react'
import { useSearchParams } from 'react-router-dom';

function Sensor() {
const [searchParams] = useSearchParams();
console.log(searchParams); // ▶ URLSearchParams {}

  return (
    <div>{searchParams.get("id")}</div>
  )
}

export default Sensor