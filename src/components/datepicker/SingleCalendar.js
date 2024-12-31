import React from 'react';

const SingleCalendar = ({ getNextMonthProps, getPreMonthProps, calendarsDays, weeks, months, month, year, getDayProps, getDayLabel, isOpen, onClose }) => {

    return (<>
        {isOpen && <div className='calendar_wapper single'>
            <div className='calendar_control'>
                <div {...getPreMonthProps()}> </div>
                <div {...getNextMonthProps()}> </div>
            </div>
            <div className='calendar_header'>
                <div > {months[month]}</div>
                <div > {year}</div>
            </div>
            <div className='calendar_content '>
                {
                    weeks.map((week, index) => {
                        return <div key={`week_${index}`} className="calendar_header">{week}</div>
                    })

                }
                {
                    calendarsDays.map((date, index) => {
                        let { key, ...props } = getDayProps(date, month)
                        return <div key={key} {...props}>{getDayLabel(date)}</div>
                    })
                }
            </div>

        </div>}
        {isOpen && <div className='backdrop' onClick={onClose}></div>}
    </>
    );
};

export default SingleCalendar;