import React, { useState } from 'react';
import dayjs from 'dayjs';
import useDatePicker from '../../hooks/useDatePicker';
import SingleCalendar from './SingleCalendar';

const DatePicker = ({ className, date, onApply, name, placeholder, maxDate, minDate, format = "YYYY/MM/DD", autoApply = true }) => {
    let [inputValue, setInputValue] = useState("")

    const onApplyHandler = ({ startTime }, name) => {
        onApply({ startTime }, name)
        setInputValue(dayjs(startTime).format(format))
    }
    let { startTime, setStartTime, getNextMonthProps, getPreMonthProps, onOpenCalendar, onCloseCalendar, isOpen, setIsOpen, weeks, getCalendarDays, year, month, months, getDayLabel, getDayProps, onPrevCalendar, onNextCalendar } = useDatePicker({ startDate: date, onApply: onApplyHandler, name, maxDate, minDate, autoApply })
    let calendarsDays = getCalendarDays(year, month);
    const onInputChange = (e) => {
        let value = e.target.value;
        setInputValue(value)
        setStartTime(dayjs(value).toDate())

    }
    const onInputBlur = () => {
        if (dayjs(inputValue).isValid()) {
            setStartTime(dayjs(inputValue).toDate())
        } else {
            if (startTime) {
                setInputValue(dayjs(startTime).format(format))
            } else {
                setInputValue("")
            }

        }

    }
    const onInputkeydown = (e) => {
        if (e.keyCode === 13) {
            onInputBlur();
            if (autoApply) {
                setIsOpen(false)
            }

        }

    }

    return (
        <div className={[className, "datepicker_wapper", isOpen ? 'active' : ""].join(" ")}>
            <input type="text" value={inputValue} placeholder={placeholder} onClick={onOpenCalendar} onChange={onInputChange} onBlur={onInputBlur} onKeyDown={onInputkeydown} />
            <SingleCalendar
                isOpen={isOpen}
                getNextMonthProps={getNextMonthProps}
                getPreMonthProps={getPreMonthProps}
                calendarsDays={calendarsDays}
                weeks={weeks}
                onPrev={onPrevCalendar}
                onNext={onNextCalendar}
                months={months}
                month={month}
                year={year}
                getDayProps={getDayProps}
                getDayLabel={getDayLabel}
                onClose={onCloseCalendar}
            />
        </div>

    );
};

export default DatePicker; 