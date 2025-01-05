import { useState } from "react";
import DatePicker from "./components/datepicker/DatePicker";
import DateRangePicker from "./components/datepicker/DateRangePicker";
import './components/datepicker/_datepicker.scss';

function App() {
  let [date, setDate] = useState("")
  let [searchArgs, setSearchArgs] = useState({
    startTime: "", endTime: ""
  })


  const onDateHalder = ({ startTime }, name) => {

    setDate(startTime)
  }

  const onDateRangeHalder = ({ startTime, endTime }, name) => {
    console.log("startTtime", startTime, endTime);
    setSearchArgs({
      startTime, endTime
    })
  }
  return (
    <div >
      <DatePicker className="app_div" date={date} name="startTime" onApply={onDateHalder} maxDate={"2025/03/12"} minDate={"2024/08/01"} />
      <DateRangePicker className="app_div" startTime={searchArgs.startTime || ""} endTime={searchArgs.endTime || ""} name="dateR" onApply={onDateRangeHalder} maxDate={"2025/03/12"} minDate={"2024/08/01"} />
    </div>
  );
}

export default App;
