import React from 'react';
import useDatePicker from '../../hooks/useDatePicker';
import SingleCalendar from './SingleCalendar';

const DatePicker = ({ className,date,onApply,name, placeholder,maxDate,minDate}) => {

   let {getNextMonthProps,getPreMonthProps,onInputkeydown,onInputBlur, onInputChange,onOpenCalendar,onCloseCalendar,isOpen,weeks,getCalendarDays ,year,month,months,getDayLabel,getDayProps,onPrevCalendar,onNextCalendar,inputValue} = useDatePicker({ startDate:date ,onApply,name,maxDate,minDate,autoApply:true})
   let calendarsDays=getCalendarDays(year,month);

    return (
        <div className={[className,"datepicker_wapper",isOpen?'active':""].join(" ")}>
            <input type="text" value={inputValue} placeholder={placeholder} onClick={onOpenCalendar} onChange={onInputChange} onBlur={onInputBlur} onKeyDown={onInputkeydown}/>
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