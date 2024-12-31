import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isBetween from 'dayjs/plugin/isBetween'
import { useEffect, useState } from 'react';
dayjs.extend(isSameOrBefore);
dayjs.extend(isBetween);
let weeks = ["日", "一", "二", "三", "四", "五", "六"];
let months = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];



const useDatePicker = ({ startDate, endDate, name, onApply, isRange = false, format = "YYYY/MM/DD", maxDate, minDate, autoApply, isFuture = false }) => {
    let [startTime, setStartTime] = useState(startDate);
    let [endTime, setEndTime] = useState(endDate);
    let [isOpen, setIsOpen] = useState(false)
    let [year, setYear] = useState(dayjs(startDate).year());
    let [month, setMonth] = useState(dayjs(startDate).month());

    let [isStartRange, setIsStartRange] = useState(false);
    let [ranges, setRanges] = useState([])

    useEffect(() => {
        if (isRange) {
            setStartTime(dayjs(startTime).format(format))
            setEndTime(dayjs(endTime).format(format))

        } else {
            if (!startTime) {
                setStartTime(dayjs().format(format))
            }

        }

    }, [startTime, endTime]) // eslint-disable-line react-hooks/exhaustive-deps



    const onOpenCalendar = () => {
        if (endTime) {
            setYear(dayjs(endTime).year())
            setMonth(dayjs(endTime).month())
        } else {
            setYear(dayjs(startTime).year())
            setMonth(dayjs(startTime).month())
        }

        setIsOpen(true)

    }
    const getLastMonthWeeks = (monthStartDay) => {
        let firstWeek = dayjs(monthStartDay).day();
        let lastMonthWeekStartDate = dayjs(monthStartDay).subtract(firstWeek, "days");
        let lastMonthWeeks = [];
        for (let i = 0; i < firstWeek; i++) {
            lastMonthWeeks = [...lastMonthWeeks, dayjs(lastMonthWeekStartDate).add(i, 'days').format(format)]
        }
        return lastMonthWeeks;
    }
    const getNextMonthWeeks = (monthEndDay) => {
        let endWeek = dayjs(monthEndDay).day();
        let lastMonthWeeks = [];

        for (let i = 1; i < 7 - endWeek; i++) {
            lastMonthWeeks = [...lastMonthWeeks, dayjs(monthEndDay).add(i, 'days').format(format)]
        }
        return lastMonthWeeks;
    }
    const getCalendarDays = (year, month) => {
        let monthStartDay = dayjs(`${year}/${month + 1}/01`).startOf('day').format(format)
        let monthDays = dayjs(monthStartDay).daysInMonth()
        let calendarsDays = []
        for (let i = 0; i < monthDays; i++) {
            calendarsDays = [...calendarsDays, dayjs(monthStartDay).add(i, 'days').format(format)]
        }
        let lastMonthWeeks = getLastMonthWeeks(monthStartDay);
        let NextMonthWeeks = getNextMonthWeeks(calendarsDays[calendarsDays.length - 1])

        return [...lastMonthWeeks, ...calendarsDays, ...NextMonthWeeks];
    }

    const getRangeCalendarDays = (year, month) => {
        //range year month->往前還是往後??
        if (!year) {
            year = dayjs().year()
        }
        if (!month) {
            month = dayjs().month()
        }
        if (isFuture) {
            let firstStartDay = dayjs(`${year}/${month + 1}/01`).startOf('day')
            let secondStartDay = dayjs(`${year}/${month + 2}/01`).startOf('day')
            return [getCalendarDays(firstStartDay.year(), firstStartDay.month()), getCalendarDays(secondStartDay.year(), secondStartDay.month())]
        } else {
            let firstStartDay = dayjs(`${year}/${month}/01`).startOf('day')
            let secondStartDay = dayjs(`${year}/${month + 1}/01`).startOf('day')
            return [{
                month: firstStartDay.month(),
                year: firstStartDay.year(),
                days: getCalendarDays(firstStartDay.year(), firstStartDay.month())
            }, {
                month: secondStartDay.month(),
                year: secondStartDay.year(),
                days: getCalendarDays(secondStartDay.year(), secondStartDay.month())
            }]
        }
    }
    const onClickDate = (date) => {
        console.log('onClickDate');
        setStartTime(date)

        if (autoApply) {
            setIsOpen(false)
        }
        onApply({ startTime: date }, name)
    }

    const onClickRangeDate = (date) => {

        if (isStartRange) {
            if (dayjs(startTime).isAfter(date)) {
                setStartTime(date)
                setEndTime(startTime)
                onApply({ startTime: date, endTime: startTime }, name)
            } else {
                setEndTime(date)
                onApply({ startTime: startTime, endTime: date }, name)
            }
            if (autoApply) {
                setIsOpen(false)
            }

        } else {
            setStartTime(date)
            setEndTime("")

        }
        setIsStartRange(!isStartRange)

    }
    const onMouseEnterHandler = (date) => {
        // console.log('onMouseEnter', date);
        if (isStartRange) {
            console.log('onMouseEnter', date);
            let ranges = [];
            let start = startTime;
            let end = date;
            if (dayjs(startTime).isAfter(date)) {
                start = date;
                end = startTime;
            }
            let diff = dayjs(end).diff(dayjs(start), 'day');

            for (let i = 1; i <= diff; i++) {
                ranges = [...ranges, dayjs(start).add(i, 'day').format(format)];
            }
            setRanges(ranges)

        } else {
            setRanges([])
        }
    }

    const getDayProps = (date, month) => {
        let date_month = dayjs(date).month();
        let classNames = [dayjs(date).isSame(dayjs(startTime)) ? 'active' : ''];
        classNames = [...classNames, dayjs(date).isSame(dayjs(endTime)) ? 'active' : ''];
        classNames = [...classNames, isRange ? '' : 'redius'];
        classNames = [...classNames, isRange && startTime === date ? 'startTime' : ''];
        classNames = [...classNames, isRange && endTime === date ? 'endTime' : ''];
        classNames = [...classNames, isRange && dayjs(date).isBetween(startTime, endTime, "()") ? 'bw_active' : ''];
        classNames = [...classNames, isRange && ranges.includes(date) ? 'hover' : ''];
        let isDisabled = false;
        if (maxDate) {
            if (dayjs(date).isAfter(dayjs(maxDate))) {
                classNames = [...classNames, "line-through"]
                isDisabled = true;
            }
        }
        if (minDate) {
            if (dayjs(date).isBefore(dayjs(minDate))) {
                classNames = [...classNames, "line-through"]
                isDisabled = true;
            }
        }

        if (date_month === month && !isDisabled) {
            classNames = [...classNames, "day_item"]
        } else {
            classNames = [...classNames, "day_disalbed"]
            isDisabled = true;
        }

        console.log('isRange', isRange);

        return {
            key: `day${month}_${dayjs(date).format("YYYYMMDD")}`,
            onClick: () => isDisabled ? "" : (isRange ? onClickRangeDate(date) : onClickDate(date)),
            onMouseEnter: () => isRange ? onMouseEnterHandler(date) : "",
            className: classNames.join(" ")
        }
    }
    const getDayLabel = (date) => {
        return dayjs(date).date()
    }

    const getPreMonthProps = () => {
        let isDisabled = dayjs(`${year}/${month + 1}/01`).startOf('month').isSameOrBefore(dayjs(minDate));

        return {
            onClick: () => isDisabled ? "" : onPrevCalendar(),
            className: ["month_prev month_control", isDisabled ? 'disabled' : ''].join(" ")
        }
    }

    const onPrevCalendar = () => {
        let preDate = dayjs(`${year}/${month + 1}/01`).subtract(1, 'month');
        let preMonth = preDate.month();
        let preYear = preDate.year();
        setMonth(preMonth);
        setYear(preYear)
    }

    const getNextMonthProps = () => {
        let isDisabled = dayjs(maxDate).isSameOrBefore(dayjs(`${year}/${month + 1}/01`).endOf('month'));
        return {
            onClick: () => isDisabled ? "" : onNextCalendar(),
            className: ["month_next month_control", isDisabled ? 'disabled' : ''].join(" ")
        }
    }

    const onNextCalendar = () => {
        let nextDate = dayjs(`${year}/${month + 1}/01`).add(1, 'month');
        let nextMonth = nextDate.month();
        let nextYear = nextDate.year();
        setMonth(nextMonth);
        setYear(nextYear)
    }

    const onCloseCalendar = () => {
        setIsOpen(false)
    }


    return { getRangeCalendarDays, getNextMonthProps, getPreMonthProps, setEndTime, setStartTime, onOpenCalendar, onCloseCalendar, isOpen, setIsOpen, getCalendarDays, startTime, endTime, weeks, months, year, month, getDayProps, getDayLabel, onPrevCalendar, onNextCalendar };
};

export default useDatePicker;