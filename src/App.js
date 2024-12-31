import { useState } from "react";
import DatePicker from "./components/datepicker/DatePicker";
import DateRangePicker from "./components/datepicker/DateRangePicker";
import './scss/style.scss'
function App() {
  let [date, setDate] = useState("")


  const onDateHalder = ({ startTtime, endTime }, name) => {
    console.log('startTtime', startTtime, endTime);
    setDate(startTtime)
  }

  const onDateRangeHalder = ({ startTtime, endTime }, name) => {

  }
  return (
    <div >
      <DatePicker className="app_div" date={date} name="startTime" onApply={onDateHalder} maxDate={"2025/03/12"} minDate={"2024/08/01"} />
      <DateRangePicker className="app_div" startDate={""} endDate={""} name="dateR" onApply={onDateRangeHalder} maxDate={"2025/03/12"} minDate={"2024/08/01"} />
    </div>
  );
}

export default App;
