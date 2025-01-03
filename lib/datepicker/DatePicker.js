'use strict';

var React = require('react');
var dayjs = require('dayjs');
var useDatePicker = require('../hooks/useDatePicker.js');
var SingleCalendar = require('./SingleCalendar.js');

const DatePicker = _ref => {
  let {
    className,
    date,
    onApply,
    name,
    placeholder,
    maxDate,
    minDate,
    format = "YYYY/MM/DD",
    autoApply = true
  } = _ref;
  let [inputValue, setInputValue] = React.useState("");
  let {
    startTime,
    setStartTime,
    getNextMonthProps,
    getPreMonthProps,
    onOpenCalendar,
    onCloseCalendar,
    isOpen,
    setIsOpen,
    weeks,
    getCalendarDays,
    year,
    month,
    months,
    getDayLabel,
    getDayProps,
    onPrevCalendar,
    onNextCalendar
  } = useDatePicker({
    startDate: date,
    name,
    onApply,
    maxDate,
    minDate,
    autoApply
  });
  let calendarsDays = getCalendarDays(year, month);
  React.useEffect(() => {
    if (date) {
      setInputValue(`${dayjs(date).format(format)} `);
    }
  }, [date]); // eslint-disable-line react-hooks/exhaustive-deps
  const onInputChange = e => {
    let value = e.target.value;
    setInputValue(value);
    setStartTime(dayjs(value).toDate());
  };
  const onInputBlur = () => {
    if (dayjs(inputValue).isValid()) {
      setStartTime(dayjs(inputValue).toDate());
    } else {
      if (startTime) {
        setInputValue(dayjs(startTime).format(format));
      } else {
        setInputValue("");
      }
    }
  };
  const onInputkeydown = e => {
    if (e.keyCode === 13) {
      onInputBlur();
      if (autoApply) {
        setIsOpen(false);
      }
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    className: [className, "datepicker_wapper", isOpen ? 'active' : ""].join(" ")
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: inputValue,
    placeholder: placeholder,
    onClick: onOpenCalendar,
    onChange: onInputChange,
    onBlur: onInputBlur,
    onKeyDown: onInputkeydown
  }), /*#__PURE__*/React.createElement(SingleCalendar, {
    isOpen: isOpen,
    getNextMonthProps: getNextMonthProps,
    getPreMonthProps: getPreMonthProps,
    calendarsDays: calendarsDays,
    weeks: weeks,
    onPrev: onPrevCalendar,
    onNext: onNextCalendar,
    months: months,
    month: month,
    year: year,
    getDayProps: getDayProps,
    getDayLabel: getDayLabel,
    onClose: onCloseCalendar
  }));
};

module.exports = DatePicker;
