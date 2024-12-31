import React, { useState } from 'react';
import dayjs from 'dayjs';
import useDatePicker from '../../hooks/useDatePicker';

const DateRangePicker = ({ className, startDate, endDate, onApply, name, placeholder, maxDate, minDate, format = "YYYY/MM/DD" }) => {
    let [inputValue, setInputValue] = useState("")
    const onApplyHandler = ({ startTime, endTime }, name) => {
        onApply({ startTime, endTime }, name)
        setInputValue(`${dayjs(startTime).format(format)} - ${dayjs(endTime).format(format)}`)
    }

    let { setStartTime, setEndTime, getNextMonthProps, getPreMonthProps, onOpenCalendar, onCloseCalendar, isOpen, weeks, getRangeCalendarDays, year, month, months, getDayLabel, getDayProps } = useDatePicker({ startDate, endDate, onApply: onApplyHandler, name, maxDate, minDate, isRange: true, format, autoApply: true })
    let calendarsDays = getRangeCalendarDays(year, month);
    const onInputChange = (e) => {
        let value = e.target.value;
        setInputValue(value)
        let [start, end] = value.split(" - ");
        if (dayjs(start).format(format) === start) {
            setStartTime(start)
        }
        if (dayjs(end).format(format) === end) {
            setEndTime(end)
        }

    }



    return (
        <div className={[className, "datepicker_wapper", isOpen ? 'active' : ""].join(" ")}>
            <input type="text" value={inputValue} placeholder={placeholder} onClick={onOpenCalendar} onChange={onInputChange} />
            <>
                {isOpen && <div className='calendar_wapper'>
                    <div className='calendar_control'>
                        <div {...getPreMonthProps()}> </div>
                        <div {...getNextMonthProps()}> </div>
                    </div>
                    <div className='calendar_list'>
                        {
                            calendarsDays.map((calendar, index) => {
                                let { days, year, month } = calendar;
                                return <div className='calendar_div' key={`calendar${year}${month}_${index}`}>
                                    <div className='calendar_header'>
                                        <div > {months[month]}</div>
                                        <div > {year}</div>
                                    </div>
                                    <div className='calendar_content'>
                                        {
                                            weeks.map((week, index) => {
                                                return <div key={`week_${index}`} className="calendar_header">{week}</div>
                                            })

                                        }
                                        {
                                            days.map((date, index) => {
                                                let { key, ...props } = getDayProps(date, month)
                                                return <div key={key} {...props}>{getDayLabel(date)}</div>
                                            })
                                        }
                                    </div>
                                </div>
                            })
                        }
                    </div>

                </div>}
                {isOpen && <div className='backdrop' onClick={onCloseCalendar}></div>}
            </>
        </div>
    );
};

export default DateRangePicker;